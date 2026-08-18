import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, ArrowLeft, Eye, CheckCircle2, User, Share2, Sparkles, Send, Copy, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { getPostBySlug, blogPosts, BlogPost as StaticPost } from '@/data/blogData';
import SocialShare from '@/components/SocialShare';
import RelatedPosts from '@/components/RelatedPosts';
import { toast } from 'sonner';

interface NormalizedPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  categoryName: string;
  categorySlug: string;
  created_at: string;
  views: number;
  readTime: number;
  author: {
    name: string;
    role: string;
    avatar: string;
    handle: string;
  };
  takeaways?: string[];
  tags?: string[];
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<NormalizedPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setIsLoading(true);

      // 1. Check static data first for instant loading
      const staticPost = getPostBySlug(slug);

      if (staticPost) {
        setPost({
          id: staticPost.id,
          title: staticPost.title,
          slug: staticPost.slug,
          content: staticPost.content,
          excerpt: staticPost.excerpt,
          thumbnail: staticPost.thumbnail,
          categoryName: staticPost.category.toUpperCase(),
          categorySlug: staticPost.category,
          created_at: staticPost.publishedAt,
          views: staticPost.views || 8500,
          readTime: staticPost.readTime,
          author: typeof staticPost.author === 'object' ? staticPost.author : {
            name: staticPost.author || 'A+ Hustler Team',
            role: 'Senior Market Analyst',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
            handle: '@aplushustler',
          },
          takeaways: staticPost.takeaways,
          tags: staticPost.tags,
        });
        setIsLoading(false);
        return;
      }

      // 2. Fetch from Supabase DB
      const { data, error } = await supabase
        .from('blogs')
        .select('*, category:categories(name, slug)')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (!error && data) {
        const readTime = Math.max(3, Math.ceil((data.content || '').split(' ').length / 200));
        setPost({
          id: data.id,
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt || '',
          thumbnail: data.thumbnail || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
          categoryName: data.category?.name || 'Crypto',
          categorySlug: data.category?.slug || 'crypto',
          created_at: data.publish_at || data.created_at,
          views: (data.views || 0) + 1,
          readTime,
          author: {
            name: 'A+ Hustler Editorial',
            role: 'Senior Market Analyst',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
            handle: '@aplushustler',
          },
          tags: ['Verified Guide', data.category?.name || 'Article'],
        });

        // Increment view count in DB
        supabase.from('blogs').update({ views: (data.views || 0) + 1 }).eq('id', data.id).then();
      }

      setIsLoading(false);
    };

    fetchPost();
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    toast.success('Article link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-28 pb-20 min-h-screen flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-muted-foreground font-medium text-sm">Loading article...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="pt-28 pb-20 min-h-screen">
          <div className="container mx-auto px-4 text-center max-w-md">
            <div className="text-6xl mb-4">📚</div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">Article Not Found</h1>
            <p className="text-muted-foreground text-sm mb-8">The guide you are looking for may have been moved or updated.</p>
            <Link to="/blog">
              <Button variant="gold" className="font-bold">Browse All Articles</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Parse markdown headings and blocks nicely
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-display text-2xl md:text-3xl font-bold text-foreground mt-8 mb-4 border-b border-border/60 pb-3 flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full inline-block" />
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="font-display text-xl font-bold text-foreground mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      if (trimmed.startsWith('#### ')) {
        return (
          <h4 key={idx} className="font-display text-lg font-semibold text-primary mt-4 mb-2">
            {trimmed.replace('#### ', '')}
          </h4>
        );
      }

      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className="my-6 p-5 rounded-2xl bg-primary/10 border-l-4 border-primary text-foreground font-medium text-sm md:text-base leading-relaxed shadow-sm">
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        return (
          <li key={idx} className="ml-6 list-disc text-muted-foreground my-1.5 leading-relaxed text-sm md:text-base">
            {trimmed.replace(/^(\*|-)\s+/, '')}
          </li>
        );
      }

      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <li key={idx} className="ml-6 list-decimal text-muted-foreground my-1.5 leading-relaxed text-sm md:text-base">
            {trimmed.replace(/^\d+\.\s+/, '')}
          </li>
        );
      }

      if (trimmed === '---') {
        return <hr key={idx} className="my-8 border-border/80" />;
      }

      if (!trimmed) {
        return <div key={idx} className="h-3" />;
      }

      return (
        <p key={idx} className="text-muted-foreground leading-relaxed my-3 text-base md:text-lg">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | A+ Hustler Journal</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`${post.categoryName}, crypto guide, ${post.title}, side hustle, AplusHustler`} />
        <link rel="canonical" href={`https://aplushustler.com/blog/${post.slug}`} />

        {/* Open Graph Article */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://aplushustler.com/blog/${post.slug}`} />
        <meta property="og:site_name" content="AplusHustler" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.thumbnail} />
        <meta property="article:published_time" content={post.created_at} />
        <meta property="article:section" content={post.categoryName} />
        <meta property="article:author" content={post.author.name} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AplusHustler" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.thumbnail} />

        {/* Article JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://aplushustler.com/blog/${post.slug}`
            },
            "headline": post.title,
            "description": post.excerpt,
            "image": [post.thumbnail],
            "datePublished": post.created_at,
            "dateModified": post.created_at,
            "author": {
              "@type": "Person",
              "name": post.author.name
            },
            "publisher": {
              "@type": "Organization",
              "name": "AplusHustler",
              "logo": {
                "@type": "ImageObject",
                "url": "https://aplushustler.com/placeholder.svg"
              }
            },
            "articleSection": post.categoryName
          })}
        </script>
      </Helmet>

      {/* Fixed Scroll Reading Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-primary to-emerald-400 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />

      <main className="pt-24 pb-20 bg-background min-h-screen">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Top Breadcrumb & Back Link */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Journal
            </Link>

            <SocialShare
              title={post.title}
              description={post.excerpt}
              url={window.location.href}
              variant="compact"
            />
          </div>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1 text-xs font-semibold">
                {post.categoryName}
              </Badge>
              {(post.tags || []).map((t, idx) => (
                <span key={idx} className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground font-mono">
                  #{t}
                </span>
              ))}
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author Profile Header */}
            <div className="p-4 rounded-2xl bg-card border border-border/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/40" />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-foreground text-sm">
                    {post.author.name}
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-xs text-muted-foreground">{post.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {post.readTime} min read
                </span>
                {post.views > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      {post.views.toLocaleString()} views
                    </span>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Featured Hero Thumbnail */}
          <div className="mb-10 rounded-3xl overflow-hidden border border-border/80 shadow-xl relative group">
            <img 
              src={post.thumbnail} 
              alt={post.title}
              className="w-full h-72 md:h-[420px] object-cover"
            />
          </div>

          {/* Key Takeaways Box (if available) */}
          {post.takeaways && post.takeaways.length > 0 && (
            <div className="mb-10 p-6 md:p-8 rounded-2xl bg-primary/10 border border-primary/30 shadow-md">
              <div className="flex items-center gap-2 mb-4 text-primary font-bold font-display text-lg">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Key Takeaways & Executive Summary
              </div>
              <ul className="grid gap-2.5 text-sm md:text-base text-foreground/90 font-medium">
                {(post.takeaways || []).map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-bold text-base">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Formatted Article Body */}
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
            {post.excerpt && (
              <p className="text-lg md:text-xl font-medium text-foreground/90 leading-relaxed mb-8 border-l-4 border-amber-400 pl-4 py-1 italic bg-amber-500/5 rounded-r-xl">
                "{post.excerpt}"
              </p>
            )}

            <div className="text-foreground/90">
              {renderFormattedContent(post.content)}
            </div>
          </div>

          {/* Author Box at Bottom */}
          <div className="max-w-3xl mx-auto mt-12 p-6 md:p-8 rounded-3xl bg-card border border-border flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary/50 shrink-0" />
              <div>
                <h3 className="font-bold text-foreground text-lg">{post.author.name}</h3>
                <p className="text-xs text-primary font-semibold mb-1">{post.author.role}</p>
                <p className="text-xs text-muted-foreground">Expert contributor specializing in verified web3 opportunities, trading strategies, and personal wealth creation.</p>
              </div>
            </div>

            <a href="https://t.me/Aplus_info" target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Button variant="gold" className="font-bold text-xs gap-2">
                <Send className="w-4 h-4" /> Follow on Telegram
              </Button>
            </a>
          </div>

          {/* Social Share & Join Community CTA */}
          <div className="max-w-3xl mx-auto mt-10 pt-4">
            <SocialShare
              title={post.title}
              description={post.excerpt}
              url={typeof window !== 'undefined' ? window.location.href : `https://aplushustler.com/blog/${post.slug}`}
              variant="card"
            />
          </div>

          {/* Related Articles Section */}
          <div className="max-w-4xl mx-auto mt-12">
            <RelatedPosts currentPostId={post.id} categoryId={post.categorySlug} />
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default BlogPost;

