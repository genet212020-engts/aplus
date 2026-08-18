import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import WebToolCard from '@/components/WebToolCard';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { blogPosts, BlogPost as StaticBlogPost, webTools, categories, webToolCategories, WebToolItem } from '@/data/blogData';
import { supabase } from '@/integrations/supabase/client';
import {
  BookOpen,
  Search,
  X,
  Sparkles,
  Flame,
  Globe,
  TrendingUp,
  Send,
  CheckCircle2,
  ShieldCheck,
  Users,
  Compass,
  Layers,
  Star,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

type ViewTab = 'all' | 'guides' | 'tools';

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // If navigated via /websites or query param tab=tools, default to tools tab
  const initialTab: ViewTab = useMemo(() => {
    if (location.pathname === '/websites') return 'tools';
    const tabParam = searchParams.get('tab');
    if (tabParam === 'tools') return 'tools';
    if (tabParam === 'guides') return 'guides';
    return 'all';
  }, [location.pathname, searchParams]);

  const [activeTab, setActiveTab] = useState<ViewTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(() => searchParams.get('category') || 'all');
  const [selectedToolCategory, setSelectedToolCategory] = useState<string>('All');
  const [dbPosts, setDbPosts] = useState<StaticBlogPost[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const q = searchParams.get('search') || searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
    const cat = searchParams.get('category');
    if (cat !== null) {
      setSelectedCategory(cat);
      if (cat === 'tools') {
        setActiveTab('tools');
      }
    }
    const tab = searchParams.get('tab');
    if (tab === 'tools' || tab === 'guides' || tab === 'all') {
      setActiveTab(tab as ViewTab);
    }
  }, [searchParams]);

  // Fetch articles from Supabase DB to combine with static articles
  useEffect(() => {
    const fetchDbBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*, category:categories(name, slug)')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped: StaticBlogPost[] = data.map((b) => ({
            id: b.id,
            title: b.title || 'Untitled Post',
            slug: b.slug || b.id,
            excerpt: b.excerpt || ((b.content || '').slice(0, 150) + '...'),
            content: b.content || '',
            category: b.category?.slug || 'crypto',
            thumbnail: b.thumbnail || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
            author: {
              name: 'A+ Editorial Team',
              role: 'Market Analyst',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
              handle: '@aplushustler',
            },
            publishedAt: b.publish_at || b.created_at || new Date().toISOString(),
            readTime: Math.max(3, Math.ceil((b.content || '').split(' ').length / 200)),
            views: b.views || 0,
            featured: b.views ? b.views > 50 : false,
            tags: ['Verified', b.category?.name || 'Guide'],
          }));

          setDbPosts(mapped);
        }
      } catch (err) {
        console.warn('Could not fetch DB blogs, relying on static data:', err);
      }
    };

    fetchDbBlogs();
  }, []);

  // Merge static blog posts with DB posts (deduplicating by slug)
  const allPosts = useMemo(() => {
    const map = new Map<string, StaticBlogPost>();
    // First add static posts
    blogPosts.forEach(p => map.set(p.slug, p));
    // Override/add DB posts
    dbPosts.forEach(p => map.set(p.slug, p));
    return Array.from(map.values());
  }, [dbPosts]);

  // Filtered Blog Posts
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      // Category filter
      if (selectedCategory !== 'all' && selectedCategory !== 'tools') {
        if (selectedCategory === 'guides') {
          if (post.category !== 'guides' && !post.tags?.includes('Guides')) return false;
        } else if (post.category !== selectedCategory) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(query);
        const matchesCategory = post.category.toLowerCase().includes(query);
        const authorName = typeof post.author === 'object' ? post.author.name : post.author;
        const matchesAuthor = authorName.toLowerCase().includes(query);
        const matchesTags = post.tags && post.tags.some(t => t.toLowerCase().includes(query));

        if (!matchesTitle && !matchesExcerpt && !matchesCategory && !matchesAuthor && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [allPosts, searchQuery, selectedCategory]);

  // Filtered Web Tools
  const filteredWebTools = useMemo(() => {
    return webTools.filter((tool) => {
      // Sub-category filter for tools
      if (selectedToolCategory !== 'All' && tool.category !== selectedToolCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(query);
        const matchesDescription = tool.description.toLowerCase().includes(query);
        const matchesCategory = tool.category.toLowerCase().includes(query);
        const matchesTags = tool.tags.some(t => t.toLowerCase().includes(query));

        if (!matchesName && !matchesDescription && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedToolCategory]);

  const featuredPosts = useMemo(() => {
    return allPosts.filter(p => p.featured);
  }, [allPosts]);

  const featuredTools = useMemo(() => {
    return webTools.filter(t => t.featured);
  }, []);

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'tools') {
      setActiveTab('tools');
    } else if (catId === 'guides') {
      setActiveTab('guides');
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    toast.success('Subscribed! You will receive daily market alerts and guide updates.');
    setNewsletterEmail('');
  };

  return (
    <>
      <Helmet>
        <title>Crypto Guides, Market Blog & Web Tools Directory | A+ Hustler</title>
        <meta
          name="description"
          content="The ultimate hub for step-by-step crypto earning guides, market strategy articles, and curated web tools including TradingView, DeFiLlama, and Dexscreener."
        />
        <meta
          name="keywords"
          content="crypto guides, crypto web tools, tradingview, defillama, dexscreener, etherscan, airdrop masterclass, zero investment crypto, AplusHustler blog"
        />
        <link rel="canonical" href="https://aplushustler.com/blog" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aplushustler.com/blog" />
        <meta property="og:title" content="Crypto Guides, Market Blog & Web Tools Directory | A+ Hustler" />
        <meta
          property="og:description"
          content="Explore step-by-step earning guides, financial blueprints, and our verified directory of the best crypto analytics and research web tools."
        />
        <meta property="og:image" content="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-20 pb-20">
        {/* Unified Hero Section */}
        <section className="py-14 md:py-18 relative overflow-hidden border-b border-border/70 bg-card/30">
          <div className="absolute inset-0 grid-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto animate-fade-up">
              <Badge className="mb-4 bg-primary/10 border-primary/30 text-primary px-4 py-1.5 font-bold text-xs tracking-wide uppercase inline-flex items-center gap-2 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Guides, Market Intelligence & Curated Web Tools
              </Badge>

              <h1 className="font-display text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-foreground">
                Knowledge Hub & <span className="text-gradient-gold">Web Tools</span>
              </h1>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                Master zero-capital earnings with verified step-by-step guides, market breakdowns, and our curated suite of live crypto analytics, charting tools, and on-chain scanners.
              </p>

              {/* Universal Search Bar */}
              <div className="max-w-xl mx-auto relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search guides, tools (e.g. DeFiLlama, TradingView), strategies, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-10 py-5 text-sm bg-card border-border focus:border-primary rounded-xl shadow-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="inline-flex p-1.5 rounded-2xl bg-card border border-border/80 shadow-md backdrop-blur-md">
                  <button
                    onClick={() => { setActiveTab('all'); setSelectedCategory('all'); }}
                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                      activeTab === 'all'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    All ({allPosts.length + webTools.length})
                  </button>

                  <button
                    onClick={() => { setActiveTab('guides'); }}
                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                      activeTab === 'guides'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Guides & Articles ({allPosts.length})
                  </button>

                  <button
                    onClick={() => { setActiveTab('tools'); }}
                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                      activeTab === 'tools'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    Web Tools & Directory ({webTools.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="container mx-auto px-4 py-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 rounded-2xl border border-border/60 bg-card/40 p-2 backdrop-blur-md w-fit mx-auto max-w-full overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: ALL CONTENT VIEW */}
          {activeTab === 'all' && (
            <div className="space-y-16">
              {/* Featured Web Tools Spotlight */}
              {selectedCategory === 'all' && !searchQuery && (
                <section>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 text-[10px] uppercase font-bold px-2 py-0.5">
                          Essential Toolkit
                        </Badge>
                        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                          Top Curated Web Tools & Scanners
                        </h2>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        High-utility analytics, DEX chart monitors, and blockchain intelligence platforms.
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab('tools')}
                      className="text-xs font-semibold gap-1.5 border-primary/30 text-primary hover:bg-primary/10 self-start sm:self-auto"
                    >
                      View All {webTools.length} Web Tools <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {featuredTools.slice(0, 6).map((tool) => (
                      <WebToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </section>
              )}

              {/* Master Guides & Blog Articles Grid */}
              <section>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                      {selectedCategory === 'all' ? 'Latest Guides & Intelligence Reports' : `${categories.find(c => c.id === selectedCategory)?.name || 'Filtered'} Articles`}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Step-by-step blueprints, DeFi breakdowns, and verified cashflow models.
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground font-semibold bg-muted/60 px-2.5 py-1 rounded-lg border">
                    {filteredPosts.length} Guides Found
                  </span>
                </div>

                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card rounded-2xl border border-border/80 p-8">
                    <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-60" />
                    <h3 className="font-bold text-base text-foreground mb-1">No articles found</h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      Try clearing your search query or switching to another category.
                    </p>
                    <Button size="sm" variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </section>
            </div>
          )}

          {/* TAB 2: GUIDES ONLY VIEW */}
          {activeTab === 'guides' && (
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    Master Guides & Blueprint Library
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    In-depth articles covering zero-capital crypto setups, DeFi yield farming, and verified airdrop workflows.
                  </p>
                </div>
                <span className="text-xs text-muted-foreground font-semibold bg-muted/60 px-2.5 py-1 rounded-lg border">
                  {filteredPosts.length} Guides
                </span>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-2xl border border-border/80 p-8">
                  <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-60" />
                  <h3 className="font-bold text-base text-foreground mb-1">No guides match your search</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Try searching for different keywords or explore our web tools directory.
                  </p>
                  <Button size="sm" variant="outline" onClick={() => setSearchQuery('')}>
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WEB TOOLS DIRECTORY VIEW */}
          {activeTab === 'tools' && (
            <div>
              {/* Tool Sub-category Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" /> Curated Web Tools & Crypto Platforms
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Free, audited websites and scanners for research, charts, DEX pairs, DeFi yields, and smart contract audits.
                  </p>
                </div>
                <span className="text-xs text-muted-foreground font-semibold bg-muted/60 px-2.5 py-1 rounded-lg border self-start sm:self-auto">
                  {filteredWebTools.length} Web Tools
                </span>
              </div>

              {/* Tool Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
                {webToolCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedToolCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                      selectedToolCategory === cat
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Tools Grid */}
              {filteredWebTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredWebTools.map((tool) => (
                    <WebToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-2xl border border-border/80 p-8">
                  <Globe className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-60" />
                  <h3 className="font-bold text-base text-foreground mb-1">No web tools found</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    No web tools matched "{searchQuery}". Try selecting another category filter.
                  </p>
                  <Button size="sm" variant="outline" onClick={() => { setSearchQuery(''); setSelectedToolCategory('All'); }}>
                    Show All Tools
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Newsletter Subscription Banner */}
          <div className="mt-16 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-card via-card/80 to-primary/10 border border-border shadow-xl relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] font-bold uppercase tracking-wider mb-3">
                <Send className="w-3 h-3 mr-1" /> Daily Alpha & Guide Updates
              </Badge>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-foreground mb-2">
                Never Miss a Zero-Capital Guide or Web Tool
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-6 leading-relaxed">
                Join 55,000+ hustlers who receive verified testnet blueprints, payment proofs, and new crypto tool breakdowns straight to their inbox.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>You're subscribed! Check your inbox for our Top 10 Web Tools Cheat Sheet.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="bg-background/80 border-border text-xs md:text-sm h-11 rounded-xl focus:border-primary"
                  />
                  <Button type="submit" className="bg-primary text-primary-foreground font-bold h-11 px-6 rounded-xl shrink-0 shadow-md">
                    Subscribe Free
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Blog;
