import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  X,
  Smartphone,
  Zap,
  FileText,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  CornerDownLeft,
  ExternalLink,
  Flame,
  Check
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { apps as initialApps, AppItem } from '@/data/appData';
import { airdrops as initialAirdrops, Airdrop } from '@/data/airdropData';
import { blogPosts as initialBlogPosts, BlogPost } from '@/data/blogData';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { AppIconBadge } from '@/components/AppIconBadge';

interface NavSearchBarProps {
  className?: string;
  isMobile?: boolean;
  onSearchSubmitted?: () => void;
}

const TRENDING_KEYWORDS = [
  'ME PASS',
  'mPaisa',
  'Monad Testnet',
  'HiFami',
  'Berachain',
  'Telegram Bot',
  'Airtime',
  'Instant Withdrawal',
];

export const NavSearchBar: React.FC<NavSearchBarProps> = ({
  className,
  isMobile = false,
  onSearchSubmitted,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'apps' | 'airdrops' | 'guides'>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [dbBlogs, setDbBlogs] = useState<BlogPost[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch Supabase blogs to index dynamic articles alongside static ones
  useEffect(() => {
    let isMounted = true;
    const fetchDbBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*, category:categories(name, slug)')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0 && isMounted) {
          const mapped: BlogPost[] = data.map((b) => ({
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
          setDbBlogs(mapped);
        }
      } catch {
        // ignore offline / fallback
      }
    };
    fetchDbBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Global keyboard shortcut (Cmd+K / Ctrl+K) to focus search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search indexing
  const combinedBlogs = useMemo(() => {
    const ids = new Set(initialBlogPosts.map((p) => p.id));
    const uniqueDb = dbBlogs.filter((p) => !ids.has(p.id));
    return [...initialBlogPosts, ...uniqueDb];
  }, [dbBlogs]);

  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return { apps: [], airdrops: [], guides: [], total: 0, flatList: [] };
    }

    // 1. Filter Apps
    const matchedApps = initialApps.filter(
      (app) =>
        app.name.toLowerCase().includes(trimmed) ||
        app.description.toLowerCase().includes(trimmed) ||
        (app.longDescription && app.longDescription.toLowerCase().includes(trimmed)) ||
        app.category.toLowerCase().includes(trimmed) ||
        app.tags.some((t) => t.toLowerCase().includes(trimmed))
    );

    // 2. Filter Airdrops
    const matchedAirdrops = initialAirdrops.filter(
      (drop) =>
        drop.name.toLowerCase().includes(trimmed) ||
        drop.ticker.toLowerCase().includes(trimmed) ||
        drop.blockchain.toLowerCase().includes(trimmed) ||
        drop.shortDescription.toLowerCase().includes(trimmed) ||
        drop.category.toLowerCase().includes(trimmed)
    );

    // 3. Filter Guides / Articles
    const matchedGuides = combinedBlogs.filter(
      (post) =>
        post.title.toLowerCase().includes(trimmed) ||
        post.excerpt.toLowerCase().includes(trimmed) ||
        post.content.toLowerCase().includes(trimmed) ||
        post.category.toLowerCase().includes(trimmed) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(trimmed)))
    );

    // Build flattened list for keyboard navigation
    const flatList: Array<{ type: 'app' | 'airdrop' | 'guide'; item: any; url: string }> = [];

    if (activeFilter === 'all' || activeFilter === 'apps') {
      matchedApps.forEach((a) => flatList.push({ type: 'app', item: a, url: `/apps?search=${encodeURIComponent(a.name)}` }));
    }
    if (activeFilter === 'all' || activeFilter === 'airdrops') {
      matchedAirdrops.forEach((d) => flatList.push({ type: 'airdrop', item: d, url: `/airdrops?id=${d.id}` }));
    }
    if (activeFilter === 'all' || activeFilter === 'guides') {
      matchedGuides.forEach((g) => flatList.push({ type: 'guide', item: g, url: `/blog/${g.slug}` }));
    }

    return {
      apps: matchedApps,
      airdrops: matchedAirdrops,
      guides: matchedGuides,
      total: matchedApps.length + matchedAirdrops.length + matchedGuides.length,
      flatList,
    };
  }, [query, combinedBlogs, activeFilter]);

  // Handle Form Submission (SearchAction defined in Schema)
  const handleExecuteSearch = (customQuery?: string) => {
    const finalQuery = (customQuery ?? query).trim();
    if (!finalQuery) return;

    setIsOpen(false);
    inputRef.current?.blur();
    if (onSearchSubmitted) onSearchSubmitted();

    // Route smartly based on active filter or default to Apps with search query param
    if (activeFilter === 'guides') {
      navigate(`/blog?search=${encodeURIComponent(finalQuery)}`);
    } else if (activeFilter === 'airdrops') {
      navigate(`/airdrops?search=${encodeURIComponent(finalQuery)}`);
    } else {
      navigate(`/apps?search=${encodeURIComponent(finalQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.flatList.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.flatList.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && searchResults.flatList[selectedIndex]) {
        const target = searchResults.flatList[selectedIndex];
        setIsOpen(false);
        if (onSearchSubmitted) onSearchSubmitted();
        navigate(target.url);
      } else {
        handleExecuteSearch();
      }
    }
  };

  const handleSelectResult = (url: string) => {
    setIsOpen(false);
    inputRef.current?.blur();
    if (onSearchSubmitted) onSearchSubmitted();
    navigate(url);
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {/* Search Input Bar (Schema SearchAction target compatible) */}
      <form
        role="search"
        action="/apps"
        method="GET"
        onSubmit={(e) => {
          e.preventDefault();
          handleExecuteSearch();
        }}
        className="relative flex items-center w-full"
      >
        <div className="relative w-full flex items-center">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none transition-colors group-focus-within:text-primary" />

          <input
            ref={inputRef}
            type="search"
            name="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search posts, apps, guides..."
            autoComplete="off"
            spellCheck={false}
            className={cn(
              'w-full pl-9.5 pr-20 py-2 text-xs sm:text-sm font-medium rounded-full bg-secondary/80 hover:bg-secondary border border-border/80 focus:border-primary focus:bg-background text-foreground placeholder:text-muted-foreground/80 transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-primary/20',
              isMobile && 'py-2.5 text-sm pl-10 pr-12 bg-background border-border shadow-md'
            )}
          />

          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedIndex(-1);
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              !isMobile && (
                <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-background/90 border border-border text-[10px] font-mono text-muted-foreground shadow-xs pointer-events-none">
                  <span>⌘</span>K
                </kbd>
              )
            )}
          </div>
        </div>
      </form>

      {/* Floating Instant Search Dropdown Popover */}
      {isOpen && (
        <div
          className={cn(
            'absolute left-0 right-0 top-full mt-2 rounded-2xl bg-card/95 border border-border shadow-2xl z-50 overflow-hidden backdrop-blur-2xl animate-in fade-in-50 zoom-in-95 duration-150',
            isMobile ? 'w-full max-h-[75vh] flex flex-col' : 'w-[420px] lg:w-[500px] max-h-[600px] flex flex-col -left-4 lg:left-0'
          )}
        >
            {/* Header Filter Bar */}
            <div className="p-3 border-b border-border/60 bg-muted/30 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-semibold scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg transition-all',
                    activeFilter === 'all'
                      ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  All {query ? `(${searchResults.total})` : ''}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('apps')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg transition-all flex items-center gap-1',
                    activeFilter === 'apps'
                      ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  <Smartphone className="w-3 h-3" /> Apps {query ? `(${searchResults.apps.length})` : ''}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('airdrops')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg transition-all flex items-center gap-1',
                    activeFilter === 'airdrops'
                      ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  <Zap className="w-3 h-3" /> Airdrops {query ? `(${searchResults.airdrops.length})` : ''}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('guides')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg transition-all flex items-center gap-1',
                    activeFilter === 'guides'
                      ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  <FileText className="w-3 h-3" /> Guides {query ? `(${searchResults.guides.length})` : ''}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-secondary text-xs transition-colors"
                aria-label="Close search dropdown"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          {/* Results Area */}
          <div className="overflow-y-auto p-3 space-y-4 flex-1 overscroll-contain">
            {/* Empty Query View: Show Trending / Quick Searches */}
            {!query.trim() && (
              <div className="py-2 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Trending & Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-1.5 px-1">
                  {TRENDING_KEYWORDS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagClick(tag)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-secondary/80 text-foreground hover:bg-primary/20 hover:text-primary transition-all border border-border/60 font-medium"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-border/40 px-1 text-xs text-muted-foreground flex items-center justify-between">
                  <span>Quick shortcuts:</span>
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="bg-secondary px-1.5 py-0.5 rounded border border-border">↑↓</span> to navigate
                    <span className="bg-secondary px-1.5 py-0.5 rounded border border-border">↵</span> to select
                  </div>
                </div>
              </div>
            )}

            {/* Query Entered But No Results */}
            {query.trim() && searchResults.total === 0 && (
              <div className="text-center py-8 px-4">
                <div className="text-3xl mb-2">🔍</div>
                <p className="text-foreground font-bold text-sm">No exact matches found for "{query}"</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Try searching for keywords like "ME PASS", "mPaisa", "Monad", or "Wallet".
                </p>
                <button
                  type="button"
                  onClick={() => handleExecuteSearch()}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all border border-primary/20"
                >
                  <Search className="w-3.5 h-3.5" />
                  Execute broad search in Earning Apps
                </button>
              </div>
            )}

            {/* Matching Results List */}
            {query.trim() && searchResults.total > 0 && (
              <div className="space-y-4">
                {/* 1. Earning Apps */}
                {(activeFilter === 'all' || activeFilter === 'apps') && searchResults.apps.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between px-1 mb-2">
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" /> Earning Apps ({searchResults.apps.length})
                      </span>
                      <Link
                        to={`/apps?search=${encodeURIComponent(query)}`}
                        onClick={() => setIsOpen(false)}
                        className="text-[11px] text-primary hover:underline font-semibold"
                      >
                        View all in Apps →
                      </Link>
                    </div>

                    <div className="space-y-1.5">
                      {searchResults.apps.slice(0, 4).map((app) => {
                        return (
                          <div
                            key={app.id}
                            onClick={() => handleSelectResult(`/apps?search=${encodeURIComponent(app.name)}`)}
                            className="p-2.5 rounded-xl bg-secondary/40 hover:bg-primary/10 border border-border/60 hover:border-primary/40 cursor-pointer flex items-center justify-between gap-3 transition-all group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <AppIconBadge
                                icon={app.icon}
                                name={app.name}
                                category={app.category}
                                verified={app.verified}
                                size="xs"
                              />
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                    {app.name}
                                  </span>
                                  <Badge variant="outline" className="text-[9px] py-0 px-1.5 border-primary/30 text-primary">
                                    {app.category}
                                  </Badge>
                                  {app.verified && <ShieldCheck className="w-3 h-3 text-emerald-400" />}
                                </div>
                                <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                                  {app.description}
                                </p>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              {app.welcomeBonus ? (
                                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                                  Bonus
                                </span>
                              ) : (
                                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-0.5">
                                  <Star className="w-2.5 h-2.5 fill-amber-400" /> {app.rating}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. Airdrops & Testnets */}
                {(activeFilter === 'all' || activeFilter === 'airdrops') && searchResults.airdrops.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between px-1 mb-2">
                      <span className="text-[11px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" /> Airdrops & Testnets ({searchResults.airdrops.length})
                      </span>
                      <Link
                        to={`/airdrops?search=${encodeURIComponent(query)}`}
                        onClick={() => setIsOpen(false)}
                        className="text-[11px] text-primary hover:underline font-semibold"
                      >
                        View all in Airdrops →
                      </Link>
                    </div>

                    <div className="space-y-1.5">
                      {searchResults.airdrops.slice(0, 4).map((drop) => {
                        return (
                          <div
                            key={drop.id}
                            onClick={() => handleSelectResult(`/airdrops?id=${drop.id}`)}
                            className="p-2.5 rounded-xl bg-secondary/40 hover:bg-primary/10 border border-border/60 hover:border-primary/40 cursor-pointer flex items-center justify-between gap-3 transition-all group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <AppIconBadge
                                icon={drop.icon}
                                name={drop.name}
                                category={drop.category}
                                blockchain={drop.blockchain}
                                size="xs"
                              />
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                    {drop.name}
                                  </span>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold">
                                    ${drop.ticker}
                                  </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                                  {drop.shortDescription}
                                </p>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="text-[11px] font-bold text-emerald-400 block">
                                {drop.estimatedReward}
                              </span>
                              <span className="text-[9px] text-muted-foreground font-mono">
                                {drop.blockchain}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Guides & Blog Posts */}
                {(activeFilter === 'all' || activeFilter === 'guides') && searchResults.guides.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between px-1 mb-2">
                      <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" /> Guides & Articles ({searchResults.guides.length})
                      </span>
                      <Link
                        to={`/blog?search=${encodeURIComponent(query)}`}
                        onClick={() => setIsOpen(false)}
                        className="text-[11px] text-sky-400 hover:underline font-semibold"
                      >
                        View all in Blog →
                      </Link>
                    </div>

                    <div className="space-y-1.5">
                      {searchResults.guides.slice(0, 4).map((post) => {
                        return (
                          <div
                            key={post.id}
                            onClick={() => handleSelectResult(`/blog/${post.slug}`)}
                            className="p-2.5 rounded-xl bg-secondary/40 hover:bg-sky-500/10 border border-border/60 hover:border-sky-500/40 cursor-pointer flex items-center justify-between gap-3 transition-all group"
                          >
                            <div className="min-w-0">
                              <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                {post.title}
                              </h5>
                              <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                                {post.excerpt}
                              </p>
                            </div>

                            <div className="text-right shrink-0 text-[10px] text-muted-foreground font-mono">
                              <span className="text-sky-400 font-semibold">{post.readTime}m read</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Submit Bar */}
          {query.trim() && (
            <div className="p-2.5 bg-muted/40 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground shrink-0">
              <span className="truncate">
                Press <kbd className="px-1.5 py-0.5 rounded bg-background border border-border font-mono text-[10px] text-foreground">Enter</kbd> to search for "{query}"
              </span>
              <button
                type="button"
                onClick={() => handleExecuteSearch()}
                className="flex items-center gap-1 text-primary hover:text-primary/80 font-bold transition-colors shrink-0"
              >
                Search <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavSearchBar;
