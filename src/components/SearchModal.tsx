import { useState, useEffect } from 'react';
import { Search, X, Zap, Smartphone, FileText, ArrowRight, Sparkles, Star, Gift, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { blogPosts, BlogPost } from '@/data/blogData';
import { airdrops, Airdrop } from '@/data/airdropData';
import { apps, AppItem } from '@/data/appData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_TAGS = ['ME PASS', 'mPaisa', 'Monad', 'HiFami', 'Blum', 'Binance', 'Berachain', 'Trust Wallet', 'Airdrop'];

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'apps' | 'articles' | 'airdrops'>('all');
  
  const [appResults, setAppResults] = useState<AppItem[]>([]);
  const [articleResults, setArticleResults] = useState<BlogPost[]>([]);
  const [airdropResults, setAirdropResults] = useState<Airdrop[]>([]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setAppResults([]);
      setArticleResults([]);
      setAirdropResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();

    // 1. Search Apps
    const filteredApps = apps.filter(
      app =>
        app.name.toLowerCase().includes(searchTerm) ||
        app.description.toLowerCase().includes(searchTerm) ||
        (app.longDescription && app.longDescription.toLowerCase().includes(searchTerm)) ||
        app.category.toLowerCase().includes(searchTerm) ||
        app.tags.some(t => t.toLowerCase().includes(searchTerm))
    );
    setAppResults(filteredApps);

    // 2. Search Blog Articles
    const posts = blogPosts.filter(
      post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm) ||
        (post.tags && post.tags.some(t => t.toLowerCase().includes(searchTerm)))
    );
    setArticleResults(posts);

    // 3. Search Airdrops
    const drops = airdrops.filter(
      drop =>
        drop.name.toLowerCase().includes(searchTerm) ||
        drop.ticker.toLowerCase().includes(searchTerm) ||
        drop.blockchain.toLowerCase().includes(searchTerm) ||
        drop.shortDescription.toLowerCase().includes(searchTerm) ||
        drop.category.toLowerCase().includes(searchTerm)
    );
    setAirdropResults(drops);
  }, [query]);

  const handleClose = () => {
    setQuery('');
    setAppResults([]);
    setArticleResults([]);
    setAirdropResults([]);
    onClose();
  };

  const totalResults =
    (activeTab === 'all' || activeTab === 'apps' ? appResults.length : 0) +
    (activeTab === 'all' || activeTab === 'articles' ? articleResults.length : 0) +
    (activeTab === 'all' || activeTab === 'airdrops' ? airdropResults.length : 0);

  const hasAnyResults = appResults.length > 0 || articleResults.length > 0 || airdropResults.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col p-6 bg-card border-border shadow-2xl rounded-2xl">
        <DialogHeader className="pb-2 border-b border-border/60">
          <DialogTitle className="text-foreground text-xl font-display font-bold flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Search Apps, Articles & Airdrops
          </DialogTitle>
        </DialogHeader>

        {/* Input Field */}
        <div className="relative mt-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Type keywords (e.g., 'ME PASS', 'Monad', 'Telegram', 'Binance')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-11 pr-10 py-6 text-base bg-secondary/80 border-border/80 focus:border-primary rounded-xl font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Tag Suggestions */}
        {query.trim().length === 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Trending Keywords
            </p>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-secondary text-foreground hover:bg-primary/20 hover:text-primary transition-all border border-border/50 font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category Tab Filter */}
        {hasAnyResults && (
          <div className="flex items-center gap-2 mt-4 pt-2 border-t border-border/40 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              All ({appResults.length + articleResults.length + airdropResults.length})
            </button>

            {appResults.length > 0 && (
              <button
                onClick={() => setActiveTab('apps')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'apps'
                    ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Apps ({appResults.length})
              </button>
            )}

            {airdropResults.length > 0 && (
              <button
                onClick={() => setActiveTab('airdrops')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'airdrops'
                    ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <Zap className="w-3.5 h-3.5" /> Airdrops ({airdropResults.length})
              </button>
            )}

            {articleResults.length > 0 && (
              <button
                onClick={() => setActiveTab('articles')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'articles'
                    ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Articles ({articleResults.length})
              </button>
            )}
          </div>
        )}

        {/* Results Container */}
        <div className="mt-4 overflow-y-auto space-y-6 flex-1 pr-1">
          {query.trim().length < 2 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-foreground font-semibold text-sm">Instant Global Search</p>
              <p className="text-muted-foreground text-xs mt-1">
                Type at least 2 characters to search through verified earning apps, guides & airdrop testnets.
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">👻</div>
              <p className="text-foreground font-semibold text-sm">No matches found for "{query}"</p>
              <p className="text-muted-foreground text-xs mt-1">
                Try searching for broader terms like "Wallet", "Telegram", "Monad", or "Airtime".
              </p>
            </div>
          ) : (
            <>
              {/* 1. App Results */}
              {(activeTab === 'all' || activeTab === 'apps') && appResults.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" /> Earning Apps & Bots ({appResults.length})
                  </h4>
                  <div className="space-y-2">
                    {appResults.map((app) => (
                      <Link
                        key={app.id}
                        to="/apps"
                        onClick={handleClose}
                        className="block p-3.5 rounded-xl bg-card hover:bg-secondary/90 border border-border/80 transition-all hover:border-emerald-500/50 shadow-sm group"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl p-2 rounded-xl bg-muted/60 shrink-0 border border-border/50">
                              {app.icon}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                                  {app.name}
                                </h5>
                                <Badge variant="outline" className="text-[10px] px-2 py-0 border-primary/30 text-primary">
                                  {app.category}
                                </Badge>
                                {app.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                {app.description}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            {app.welcomeBonus ? (
                              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 block">
                                Bonus
                              </span>
                            ) : (
                              <span className="text-xs text-amber-400 font-bold flex items-center justify-end gap-0.5">
                                <Star className="w-3 h-3 fill-amber-400" /> {app.rating}
                              </span>
                            )}
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1 ml-auto" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Airdrop Results */}
              {(activeTab === 'all' || activeTab === 'airdrops') && airdropResults.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Airdrops & Testnets ({airdropResults.length})
                  </h4>
                  <div className="space-y-2">
                    {airdropResults.map((drop) => (
                      <Link
                        key={drop.id}
                        to={`/airdrops?id=${drop.id}`}
                        onClick={handleClose}
                        className="block p-3.5 rounded-xl bg-card hover:bg-secondary/90 border border-border/80 transition-all hover:border-primary/50 shadow-sm group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl">{drop.icon}</span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                                  {drop.name}
                                </h5>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold">
                                  ${drop.ticker}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                {drop.shortDescription}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xs text-emerald-400 font-bold block">
                              {drop.estimatedReward}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              {drop.blockchain}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Blog Article Results */}
              {(activeTab === 'all' || activeTab === 'articles') && articleResults.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Guides & Journal ({articleResults.length})
                  </h4>
                  <div className="space-y-2">
                    {articleResults.map((post) => (
                      <Link
                        key={post.id}
                        to={`/blog/${post.slug}`}
                        onClick={handleClose}
                        className="block p-3.5 rounded-xl bg-card hover:bg-secondary/90 border border-border/80 transition-all hover:border-sky-500/50 shadow-sm group"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h5 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                              {post.title}
                            </h5>
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="text-right shrink-0 text-xs text-muted-foreground">
                            <span className="font-semibold text-primary block">{post.readTime} min read</span>
                            <span className="text-[10px] uppercase font-mono">{post.category}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
