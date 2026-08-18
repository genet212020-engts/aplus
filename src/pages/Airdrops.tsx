import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Zap,
  Search,
  X,
  Sparkles,
  Award,
  Filter,
  CheckCircle2,
  Bookmark,
  TrendingUp,
  Layers,
  Send,
  Plus
} from 'lucide-react';
import { airdrops as initialAirdrops, airdropCategories, Airdrop } from '@/data/airdropData';
import { AirdropCard } from '@/components/AirdropCard';
import { AirdropDetailModal } from '@/components/AirdropDetailModal';
import { toast } from 'sonner';

const Airdrops = () => {
  const [airdropList] = useState<Airdrop[]>(() => {
    try {
      const saved = localStorage.getItem('admin_airdrops');
      return saved ? JSON.parse(saved) : initialAirdrops;
    } catch {
      return initialAirdrops;
    }
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(() => searchParams.get('category') || 'all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [tabView, setTabView] = useState<'all' | 'saved' | 'completed'>('all');

  const [selectedAirdrop, setSelectedAirdrop] = useState<Airdrop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle search parameter updates
  useEffect(() => {
    const q = searchParams.get('search') || searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
    const cat = searchParams.get('category');
    if (cat !== null) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Local storage bookmarks & completed
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('airdrop_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedList, setCompletedList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('airdrop_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Handle URL search params for direct modal opening (e.g. /airdrops?id=monad-testnet)
  useEffect(() => {
    const airdropId = searchParams.get('id');
    if (airdropId) {
      const found = airdropList.find((a) => a.id === airdropId);
      if (found) {
        setSelectedAirdrop(found);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, airdropList]);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let updated: string[];
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter((item) => item !== id);
      toast.info('Removed from saved airdrops');
    } else {
      updated = [...bookmarks, id];
      toast.success('Saved to your bookmarks');
    }
    setBookmarks(updated);
    localStorage.setItem('airdrop_bookmarks', JSON.stringify(updated));
  };

  const toggleCompleted = (id: string) => {
    let updated: string[];
    if (completedList.includes(id)) {
      updated = completedList.filter((item) => item !== id);
    } else {
      updated = [...completedList, id];
    }
    setCompletedList(updated);
    localStorage.setItem('airdrop_completed', JSON.stringify(updated));
  };

  const openAirdropModal = (airdrop: Airdrop) => {
    setSelectedAirdrop(airdrop);
    setIsModalOpen(true);
    setSearchParams({ id: airdrop.id });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAirdrop(null);
    setSearchParams({});
  };

  // Filter logic
  const filteredAirdrops = useMemo(() => {
    return airdropList.filter((airdrop) => {
      // Tab view filter
      if (tabView === 'saved' && !bookmarks.includes(airdrop.id)) return false;
      if (tabView === 'completed' && !completedList.includes(airdrop.id)) return false;

      // Category filter
      if (selectedCategory !== 'all' && airdrop.category !== selectedCategory) return false;

      // Status filter
      if (selectedStatus !== 'all' && airdrop.status !== selectedStatus) return false;

      // Difficulty filter
      if (selectedDifficulty !== 'all' && airdrop.difficulty !== selectedDifficulty) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = airdrop.name.toLowerCase().includes(query);
        const matchesTicker = airdrop.ticker.toLowerCase().includes(query);
        const matchesChain = airdrop.blockchain.toLowerCase().includes(query);
        const matchesCategory = airdrop.category.toLowerCase().includes(query);
        const matchesReqs = airdrop.requirements.some((r) => r.toLowerCase().includes(query));

        if (!matchesName && !matchesTicker && !matchesChain && !matchesCategory && !matchesReqs) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedStatus, selectedDifficulty, tabView, bookmarks, completedList]);

  return (
    <>
      <Helmet>
        <title>Crypto Airdrops 2025 | Free Testnets & Retroactive Guides - A+ Hustler</title>
        <meta
          name="description"
          content="Explore verified 100% free crypto airdrops, testnet guides, DePIN nodes, and retroactive reward tasks with step-by-step execution instructions."
        />
        <meta name="keywords" content="crypto airdrops 2025, Monad testnet, Berachain airdrop, Scroll L2, Story Protocol, Linea mainnet, free crypto airdrops, zero investment crypto" />
        <link rel="canonical" href="https://aplushustler.com/airdrops" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aplushustler.com/airdrops" />
        <meta property="og:title" content="Crypto Airdrops 2025 | Free Testnets & Retroactive Guides - A+ Hustler" />
        <meta property="og:description" content="Explore verified 100% free crypto airdrops, testnet guides, DePIN nodes, and retroactive reward tasks with step-by-step execution instructions." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crypto Airdrops 2025 | Free Testnets & Retroactive Guides - A+ Hustler" />
        <meta name="twitter:description" content="Explore verified 100% free crypto airdrops, testnet guides, DePIN nodes, and retroactive reward tasks with step-by-step execution instructions." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80" />

        {/* JSON-LD Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Verified Crypto Airdrops & Testnet Guides 2025",
            "description": "Step-by-step crypto airdrop strategy guides requiring $0 investment.",
            "url": "https://aplushustler.com/airdrops",
            "numberOfItems": (airdropList || []).length,
            "itemListElement": (airdropList || []).slice(0, 10).map((airdrop, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "HowTo",
                "name": `${airdrop.name} (${airdrop.ticker}) Airdrop & Testnet Guide`,
                "description": airdrop.shortDescription,
                "estimatedCost": {
                  "@type": "MonetaryAmount",
                  "currency": "USD",
                  "value": airdrop.investmentRequired === '0$ (Free)' ? '0' : '0'
                },
                "step": (airdrop.steps || []).map((step, sIdx) => ({
                  "@type": "HowToStep",
                  "position": sIdx + 1,
                  "name": step.title,
                  "text": step.description
                }))
              }
            }))
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto animate-fade-up">
              <Badge className="mb-6 bg-primary/10 border-primary/30 text-primary px-4 py-2 font-semibold">
                <Zap className="w-4 h-4 mr-2 text-primary" />
                Verified & Hand-Picked Crypto Airdrops
              </Badge>

              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
                Turn $0 Into Thousands With{' '}
                <span className="text-gradient-gold">Real Airdrops</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                Step-by-step actionable guides to participate in confirmed & potential crypto token distributions with full transparent data.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md max-w-2xl mx-auto mb-10 shadow-xl">
                <div>
                  <span className="text-xs text-muted-foreground block">Active Airdrops</span>
                  <span className="font-display font-bold text-xl text-foreground mt-0.5 block">
                    {airdropList.length} Protocol Guides
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">100% Free Testnets</span>
                  <span className="font-display font-bold text-xl text-emerald-400 mt-0.5 block">
                    {airdropList.filter((a) => a.investmentRequired.includes('$0')).length} Available
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Est. Rewards Pool</span>
                  <span className="font-display font-bold text-xl text-primary mt-0.5 block">
                    $25,000+
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Community Alerts</span>
                  <a
                    href="https://t.me/Aplus_info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-bold text-sm text-cyan-400 hover:underline flex items-center justify-center gap-1 mt-1"
                  >
                    <Send className="w-3.5 h-3.5" /> Join Telegram
                  </a>
                </div>
              </div>

              {/* Main Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name (Monad, Berachain), ticker ($MON), chain, or requirements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-10 py-6 text-base bg-card border-border focus:border-primary rounded-2xl shadow-lg"
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
            </div>
          </div>
        </section>

        {/* Filters & Tabs Section */}
        <section className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-border/60">
            {/* Navigation Tabs (All, Saved, Completed) */}
            <div className="flex items-center gap-2 bg-card border border-border p-1 rounded-xl w-full md:w-auto">
              <button
                onClick={() => setTabView('all')}
                className={`flex-1 md:flex-initial px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tabView === 'all'
                    ? 'bg-primary text-primary-foreground shadow'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                All Airdrops ({airdropList.length})
              </button>

              <button
                onClick={() => setTabView('saved')}
                className={`flex-1 md:flex-initial px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  tabView === 'saved'
                    ? 'bg-primary text-primary-foreground shadow'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                Saved ({bookmarks.length})
              </button>

              <button
                onClick={() => setTabView('completed')}
                className={`flex-1 md:flex-initial px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  tabView === 'completed'
                    ? 'bg-primary text-primary-foreground shadow'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Done ({completedList.length})
              </button>
            </div>

            {/* Category horizontal badges */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {airdropCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    selectedCategory === cat.id
                      ? 'bg-primary/20 text-primary border-primary/50 font-bold'
                      : 'bg-card text-muted-foreground border-border/70 hover:text-foreground hover:border-border'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 pt-4 text-xs">
            <span className="text-muted-foreground flex items-center gap-1 font-medium">
              <Filter className="w-3.5 h-3.5" /> Filters:
            </span>

            {/* Status Selector */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-card text-foreground border border-border/80 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Ending Soon">Ending Soon</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Upcoming">Upcoming</option>
            </select>

            {/* Difficulty Selector */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-card text-foreground border border-border/80 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy (Beginner)</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Advanced</option>
            </select>

            {/* Reset Filters */}
            {(selectedCategory !== 'all' ||
              selectedStatus !== 'all' ||
              selectedDifficulty !== 'all' ||
              searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                }}
                className="h-7 text-xs text-muted-foreground hover:text-foreground"
              >
                Reset Filters
              </Button>
            )}
          </div>
        </section>

        {/* Results Grid */}
        <section className="container mx-auto px-4 py-8 pb-20">
          {filteredAirdrops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAirdrops.map((airdrop) => (
                <AirdropCard
                  key={airdrop.id}
                  airdrop={airdrop}
                  onSelect={openAirdropModal}
                  isBookmarked={bookmarks.includes(airdrop.id)}
                  onToggleBookmark={toggleBookmark}
                  isCompleted={completedList.includes(airdrop.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card/40 border border-border/60 rounded-3xl p-8 max-w-xl mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                No Airdrops Found
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                No airdrop matching your selected filter criteria was found. Try resetting your search or filter tags.
              </p>
              <Button
                variant="gold"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                  setTabView('all');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </section>

        {/* Telegram Community Callout */}
        <section className="container mx-auto px-4 pb-20">
          <div className="deep-gradient relative overflow-hidden rounded-[2rem] p-8 md:p-12 text-center border border-primary/30">
            <div className="absolute inset-0 grid-overlay opacity-30" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <Badge className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                🚀 Never Miss an Alpha Drop
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl text-primary-foreground font-bold">
                Get Instant Airdrop Faucet Alerts & Snapshot Reminders
              </h2>
              <p className="text-primary-foreground/80 text-sm md:text-base leading-relaxed">
                Join 10,000+ hustlers in our official Telegram channel where we post real-time testnet updates, snapshot dates, and instant claim notifications.
              </p>
              <a
                href="https://t.me/Aplus_info"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-2"
              >
                <Button className="bg-primary-foreground text-accent font-bold px-8 py-6 rounded-xl text-base hover:scale-105 transition-transform duration-300 shadow-xl">
                  <Send className="w-5 h-5 mr-2 text-primary" /> Join @Aplus_info on Telegram
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Airdrop Detailed Step-by-Step Modal */}
      <AirdropDetailModal
        airdrop={selectedAirdrop}
        isOpen={isModalOpen}
        onClose={closeModal}
        isBookmarked={selectedAirdrop ? bookmarks.includes(selectedAirdrop.id) : false}
        onToggleBookmark={toggleBookmark}
        isCompleted={selectedAirdrop ? completedList.includes(selectedAirdrop.id) : false}
        onToggleCompleted={toggleCompleted}
      />

      <Footer />
    </>
  );
};

export default Airdrops;
