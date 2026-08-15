import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { blogPosts, BlogPost as StaticBlogPost } from '@/data/blogData';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, Search, X, Sparkles, Flame, TrendingUp, Send, CheckCircle2, ShieldCheck, Users } from 'lucide-react';
import { toast } from 'sonner';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dbPosts, setDbPosts] = useState<StaticBlogPost[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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

  const featuredPosts = useMemo(() => {
    return allPosts.filter(p => p.featured);
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      // Category filter
      if (selectedCategory !== 'all' && post.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(query);
        const matchesCategory = post.category.toLowerCase().includes(query);
        const authorName = typeof post.author === 'object' ? post.author.name : post.author;
        const matchesAuthor = authorName.toLowerCase().includes(query);

        if (!matchesTitle && !matchesExcerpt && !matchesCategory && !matchesAuthor) {
          return false;
        }
      }

      return true;
    });
  }, [allPosts, searchQuery, selectedCategory]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    toast.success('Subscribed! You will receive daily market alerts on Telegram.');
    setNewsletterEmail('');
  };

  return (
    <>
      <Helmet>
        <title>Crypto & Finance Journal | Market Intelligence - A+ Hustler</title>
        <meta
          name="description"
          content="Read verified crypto trading, personal finance, and high-yield investment articles. Real market insights and zero-cost earning guides."
        />
        <meta name="keywords" content="ME PASS token guide, mPaisa airtime, Monad testnet, Berachain faucet, crypto guides, side hustle articles, AplusHustler journal" />
        <link rel="canonical" href="https://aplushustler.com/blog" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aplushustler.com/blog" />
        <meta property="og:title" content="Crypto & Finance Journal | Market Intelligence - A+ Hustler" />
        <meta property="og:description" content="Read verified crypto trading, personal finance, and high-yield investment articles. Real market insights and zero-cost earning guides." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crypto & Finance Journal | Market Intelligence - A+ Hustler" />
        <meta name="twitter:description" content="Read verified crypto trading, personal finance, and high-yield investment articles. Real market insights and zero-cost earning guides." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80" />

        {/* JSON-LD Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "A+ Hustler Crypto & Finance Journal",
            "description": "Verified market intelligence, zero-investment earning guides, and crypto tutorials.",
            "url": "https://aplushustler.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "AplusHustler",
              "logo": "https://aplushustler.com/placeholder.svg"
            },
            "blogPost": allPosts.slice(0, 10).map((post) => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "image": post.thumbnail,
              "datePublished": post.publishedAt,
              "url": `https://aplushustler.com/blog/${post.slug}`,
              "author": {
                "@type": "Person",
                "name": typeof post.author === 'object' ? post.author.name : post.author
              }
            }))
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-20 pb-20">
        {/* Hero Section */}
        <section className="py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto animate-fade-up">
              <Badge className="mb-4 bg-primary/10 border-primary/30 text-primary px-4 py-2 font-semibold">
                <BookOpen className="w-4 h-4 mr-2" />
                Verified Market Intelligence & Trading Guides
              </Badge>

              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 leading-tight text-foreground">
                The <span className="text-gradient-gold">A+ Hustler</span> Journal
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
                Master crypto trading, personal finance, and high-payout web3 opportunities with zero fluff and maximum actionable value.
              </p>

              {/* Reader Metrics Bar */}
              <div className="flex items-center justify-center gap-6 mb-8 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 font-semibold text-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>120K+ Active Readers</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 font-semibold text-foreground">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Verified Strategies</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="max-w-md mx-auto relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search trading guides, airdrops, finance rules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-10 py-6 text-base bg-card border-border focus:border-primary rounded-xl shadow-md"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <CategoryFilter
                activeCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
              />
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 mt-6">
          {/* Featured Posts (Only show if no active search or category filter) */}
          {!searchQuery && selectedCategory === 'all' && (
            <section className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Featured High-Impact Guides
                  </h2>
                  <p className="text-xs text-muted-foreground">Handpicked masterclasses recommended for all traders and hustle seekers</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} featured={post.id === '1'} />
                ))}
              </div>
            </section>
          )}

          {/* All Posts / Filtered Results */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {searchQuery
                    ? `Search Results (${filteredPosts.length})`
                    : selectedCategory !== 'all'
                    ? `${selectedCategory.toUpperCase()} Guides (${filteredPosts.length})`
                    : 'Latest Journal Publications'}
                </h2>
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card/40 border border-border/60 rounded-3xl p-8 max-w-md mx-auto">
                <div className="text-5xl mb-4">📖</div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  No articles found
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Try adjusting your search terms or selecting a different category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>

          {/* VIP Telegram & Newsletter Alert Banner */}
          <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-card via-secondary/60 to-card border border-primary/30 relative overflow-hidden shadow-xl">
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <Badge className="mb-3 bg-amber-500/20 text-amber-300 border-amber-500/30 px-3.5 py-1">
                <TrendingUp className="w-3.5 h-3.5 mr-1.5" /> Instant Alpha & Signal Alerts
              </Badge>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
                Never Miss a Zero-Cost Crypto Airdrop or Payout Alert
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed max-w-xl mx-auto">
                Join our private Telegram community and daily market dispatch to receive instant notifications whenever a new high-paying app or crypto guide drops.
              </p>

              {subscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold text-sm inline-flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> You are subscribed to A+ Hustler Market Alerts!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="bg-background border-border py-5 text-sm"
                  />
                  <Button type="submit" variant="gold" className="py-5 font-bold text-xs gap-1.5 shrink-0">
                    <Send className="w-4 h-4" /> Subscribe Free
                  </Button>
                </form>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Blog;

