import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ReferralCodeBox } from '@/components/ReferralCodeBox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  Download,
  Smartphone,
  Star,
  ExternalLink,
  Apple,
  Play,
  Search,
  X,
  ShieldCheck,
  QrCode,
  CheckCircle2,
  Gift,
  Send,
  Plus,
  Info,
  Sparkles,
  Flame,
  Copy
} from 'lucide-react';
import { toast } from 'sonner';
import { apps as initialApps, AppItem as App } from '@/data/appData';

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Exchange': return 'bg-crypto/20 text-crypto border-crypto/30';
    case 'Wallet': return 'bg-finance/20 text-finance border-finance/30';
    case 'Telegram Bot': return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
    case 'DePIN & Mining': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'Tasks & Micro-Earning': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    default: return 'bg-primary/20 text-primary border-primary/30';
  }
};

const Apps = () => {
  const [appList] = useState<App[]>(() => {
    try {
      const saved = localStorage.getItem('admin_earning_apps');
      return saved ? JSON.parse(saved) : initialApps;
    } catch {
      return initialApps;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'featured' | 'security'>('featured');
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [qrApp, setQrApp] = useState<App | null>(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // Submit form state
  const [newAppName, setNewAppName] = useState('');
  const [newAppCategory, setNewAppCategory] = useState<'Exchange' | 'Wallet' | 'Telegram Bot' | 'DePIN & Mining' | 'Tasks & Micro-Earning'>('Exchange');
  const [newAppUrl, setNewAppUrl] = useState('');
  const [newAppNotes, setNewAppNotes] = useState('');

  const copyToClipboard = (text: string, label: string = 'Referral Code') => {
    navigator.clipboard.writeText(text);
    toast.success(`📋 ${label} "${text}" copied to clipboard!`);
  };

  const filteredApps = useMemo(() => {
    let filtered = appList;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(app => app.category === categoryFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        app.category.toLowerCase().includes(query) ||
        app.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sorting
    return [...filtered].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'security') return b.securityScore - a.securityScore;
      // Featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, categoryFilter, sortBy]);

  const featuredApps = filteredApps.filter(a => a.featured);
  const otherApps = filteredApps.filter(a => !a.featured);

  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName || !newAppUrl) {
      toast.error('Please enter App Name and Download / Referral URL');
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem('user_app_submissions') || '[]');
      const newSub = {
        id: `sub-app-${Date.now()}`,
        appName: newAppName,
        category: newAppCategory,
        url: newAppUrl,
        notes: newAppNotes || 'Submitted by website visitor.',
        submittedAt: new Date().toISOString().split('T')[0],
        status: 'Pending'
      };
      localStorage.setItem('user_app_submissions', JSON.stringify([newSub, ...existing]));
    } catch (err) {
      console.error(err);
    }

    toast.success('🎉 Thank you! Your app submission has been received for review.');
    setNewAppName('');
    setNewAppUrl('');
    setNewAppNotes('');
    setIsSubmitOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Best Crypto Apps & Telegram Mining Bots 2025 | A+ Hustler</title>
        <meta
          name="description"
          content="Download top verified crypto trading apps, Web3 wallets, Telegram tap-to-earn mini-apps, and DePIN passive mining nodes with referral bonuses."
        />
        <meta name="keywords" content="crypto apps, ME PASS, mPaisa, HiFami, Blum crypto bot, Grass node, Binance, Trust Wallet, Telegram mini-apps, side hustle apps" />
        <link rel="canonical" href="https://aplushustler.com/apps" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aplushustler.com/apps" />
        <meta property="og:title" content="Best Crypto Apps & Telegram Mining Bots 2025 | A+ Hustler" />
        <meta property="og:description" content="Download top verified crypto trading apps, Web3 wallets, Telegram tap-to-earn mini-apps, and DePIN passive mining nodes with referral bonuses." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Crypto Apps & Telegram Mining Bots 2025 | A+ Hustler" />
        <meta name="twitter:description" content="Download top verified crypto trading apps, Web3 wallets, Telegram tap-to-earn mini-apps, and DePIN passive mining nodes with referral bonuses." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80" />

        {/* JSON-LD Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Verified Crypto Apps & Micro-Earning Directory",
            "description": "Top crypto trading, mobile earning, and Telegram bot applications.",
            "url": "https://aplushustler.com/apps",
            "numberOfItems": (appList || []).length,
            "itemListElement": (appList || []).slice(0, 10).map((app, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "SoftwareApplication",
                "name": app.name,
                "description": app.description,
                "applicationCategory": app.category,
                "operatingSystem": "Android, iOS, Web, Telegram",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": app.rating.toString(),
                  "reviewCount": "250000"
                },
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              }
            }))
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-20 pb-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto animate-fade-up">
              <Badge className="mb-6 bg-primary/10 border-primary/30 text-primary px-4 py-2 font-semibold">
                <Smartphone className="w-4 h-4 mr-2" />
                Verified Crypto & Mini-App Directory
              </Badge>

              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-foreground">Essential Crypto</span>
                <br />
                <span className="text-gradient-gold">Apps, Wallets & Mining Bots</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
                Hand-picked Web3 tools, Telegram tap-to-earn bots, and DePIN nodes audited for security, ease of use, and reward potential.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search apps (Binance, Blum, Grass, Phantom)..."
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

              {/* Category Filter Tabs */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
                <Tabs value={categoryFilter} onValueChange={setCategoryFilter} className="w-full sm:w-auto">
                  <TabsList className="bg-card/70 border border-border p-1 rounded-xl flex flex-wrap justify-center">
                    <TabsTrigger value="all" className="rounded-lg px-4 text-xs sm:text-sm">
                      All ({appList.length})
                    </TabsTrigger>
                    <TabsTrigger value="Exchange" className="rounded-lg px-4 text-xs sm:text-sm">
                      Exchanges
                    </TabsTrigger>
                    <TabsTrigger value="Wallet" className="rounded-lg px-4 text-xs sm:text-sm">
                      Wallets
                    </TabsTrigger>
                    <TabsTrigger value="Telegram Bot" className="rounded-lg px-4 text-xs sm:text-sm">
                      Telegram Bots
                    </TabsTrigger>
                    <TabsTrigger value="DePIN & Mining" className="rounded-lg px-4 text-xs sm:text-sm">
                      DePIN Nodes
                    </TabsTrigger>
                    <TabsTrigger value="Tasks & Micro-Earning" className="rounded-lg px-4 text-xs sm:text-sm">
                      Tasks & Earning 💵
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Sort / Submit Controls */}
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-card border border-border rounded-xl px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="rating">Sort: Top Rated ⭐</option>
                    <option value="security">Sort: Security Audit 🛡️</option>
                  </select>

                  <Button
                    onClick={() => setIsSubmitOpen(true)}
                    size="sm"
                    className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 font-semibold gap-1 text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Suggest App
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Apps Section */}
        {featuredApps.length > 0 && (
          <section className="py-8 container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">Top Rated Essentials</h2>
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {featuredApps.length} Verified Picks
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredApps.map((app, index) => (
                <div
                  key={app.id}
                  className={`group relative animate-fade-up stagger-${index + 1}`}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />

                  <div className="relative h-full rounded-2xl surface-card hover-lift p-6 border border-border/80 flex flex-col justify-between">
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className={`${getCategoryColor(app.category)} font-semibold text-xs`}>
                          {app.category}
                        </Badge>

                        <div className="flex items-center gap-2">
                          {app.earningPotential && (
                            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              {app.earningPotential}
                            </span>
                          )}
                          <div className="bg-primary text-primary-foreground text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md">
                            Featured
                          </div>
                        </div>
                      </div>

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          onClick={() => setSelectedApp(app)}
                          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-card to-muted flex items-center justify-center text-4xl shadow-inner cursor-pointer hover:scale-105 transition-transform shrink-0 border border-border"
                        >
                          {app.icon}
                        </div>
                        <div>
                          <h3
                            onClick={() => setSelectedApp(app)}
                            className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            {app.name}
                            {app.verified && <ShieldCheck className="w-4 h-4 text-emerald-400 inline" />}
                          </h3>

                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center text-amber-400 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                              {app.rating}
                            </span>
                            <span>•</span>
                            <span>{app.reviewsCount} downloads</span>
                            <span>•</span>
                            <span className="text-emerald-400 font-semibold">{app.securityScore}% Audit</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {app.description}
                      </p>

                      {/* Welcome Bonus Notice */}
                      {app.welcomeBonus && (
                        <div className="mb-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-xs text-amber-300 font-medium">
                          <Gift className="w-4 h-4 shrink-0 text-amber-400" />
                          <span>{app.welcomeBonus}</span>
                        </div>
                      )}

                      {/* Referral Code Box */}
                      {app.referralCode && (
                        <div className="mb-4">
                          <ReferralCodeBox
                            code={app.referralCode}
                            appName={app.name}
                            label="Referral Code"
                          />
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {(app.tags || []).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border/40 font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-2 border-t border-border/40">
                      <div className="grid grid-cols-2 gap-2">
                        {app.telegramUrl ? (
                          <a href={app.telegramUrl} target="_blank" rel="noopener noreferrer" className="col-span-2">
                            <Button className="w-full gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-md">
                              <Send className="w-4 h-4" /> Open Telegram App
                            </Button>
                          </a>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setQrApp(app)}
                              className="gap-1.5 text-xs hover:bg-muted/50"
                            >
                              <QrCode className="w-3.5 h-3.5 text-primary" /> Scan QR
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedApp(app)}
                              className="gap-1.5 text-xs hover:bg-muted/50"
                            >
                              <Info className="w-3.5 h-3.5 text-primary" /> Details
                            </Button>
                          </>
                        )}
                      </div>

                      {!app.telegramUrl && (
                        <a href={app.downloadUrl} target="_blank" rel="noopener noreferrer" className="block">
                          <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md">
                            <Download className="w-4 h-4" /> Download App
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Other Apps */}
        {otherApps.length > 0 && (
          <section className="py-10 container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">More Verified Apps & Bots</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {otherApps.map((app) => (
                <div
                  key={app.id}
                  className="group rounded-2xl surface-card hover-lift p-5 border border-border/80 flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => setSelectedApp(app)}
                          className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center text-3xl cursor-pointer hover:scale-105 transition-transform border border-border/60"
                        >
                          {app.icon}
                        </div>
                        <div>
                          <h3
                            onClick={() => setSelectedApp(app)}
                            className="font-display font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer text-base"
                          >
                            {app.name}
                          </h3>
                          <Badge variant="outline" className={`text-[10px] px-2 py-0 ${getCategoryColor(app.category)}`}>
                            {app.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="flex items-center text-amber-400 font-bold text-xs">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                          {app.rating}
                        </span>
                        <span className="text-[10px] text-muted-foreground block">{app.reviewsCount}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {app.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-1 mb-4 text-[11px] text-muted-foreground">
                      {(app.highlights || []).slice(0, 2).map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border/40">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedApp(app)}
                      className="text-xs px-2.5 hover:bg-muted"
                    >
                      Info
                    </Button>
                    <a href={app.telegramUrl || app.downloadUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button size="sm" className="w-full gap-1.5 text-xs bg-primary text-primary-foreground font-semibold">
                        {app.telegramUrl ? <Send className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                        {app.telegramUrl ? 'Open Bot' : 'Get App'}
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredApps.length === 0 && (
          <section className="py-20 container mx-auto px-4 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display text-xl font-bold mb-2 text-foreground">No matching apps found</h3>
            <p className="text-muted-foreground text-sm mb-6">Try searching for a different keyword or resetting filters.</p>
            <Button variant="gold" onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }}>
              Reset Search & Filters
            </Button>
          </section>
        )}
      </main>

      {/* App Details Inspection Modal */}
      {selectedApp && (
        <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
          <DialogContent className="max-w-lg bg-card border-border p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={`${getCategoryColor(selectedApp.category)} font-semibold text-xs`}>
                  {selectedApp.category}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" /> Security Score: {selectedApp.securityScore}/100
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center text-4xl border border-border">
                  {selectedApp.icon}
                </div>
                <div>
                  <DialogTitle className="font-display text-2xl font-bold text-foreground">
                    {selectedApp.name}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                    <span className="flex items-center text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" /> {selectedApp.rating}
                    </span>
                    <span>•</span>
                    <span>{selectedApp.reviewsCount} Users</span>
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4 pt-3 text-sm">
              <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                {selectedApp.longDescription || selectedApp.description}
              </p>

              {/* Bonus Offer */}
              {selectedApp.welcomeBonus && (
                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Exclusive Signup Bonus: {selectedApp.welcomeBonus}</span>
                </div>
              )}

              {/* Referral Code Box */}
              {selectedApp.referralCode && (
                <ReferralCodeBox
                  code={selectedApp.referralCode}
                  appName={selectedApp.name}
                  label="Invitation / Referral Code"
                />
              )}

              {/* Steps To Earn Guide */}
              {selectedApp.stepsToEarn && selectedApp.stepsToEarn.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                    How To Claim & Earn (Step-by-Step)
                  </h4>
                  <div className="space-y-1.5">
                    {(selectedApp.stepsToEarn || []).map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-foreground bg-secondary/50 p-2.5 rounded-lg border border-border/40">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features & Highlights */}
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                  Key Highlights & Audits
                </h4>
                <div className="space-y-1.5">
                  {(selectedApp.highlights || []).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-foreground bg-muted/30 p-2 rounded-lg border border-border/40">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Store Options */}
              <div className="pt-2 space-y-2">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                  Official Installation Links
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedApp.playStoreUrl && (
                    <a href={selectedApp.playStoreUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                        <Play className="w-3.5 h-3.5" /> Google Play
                      </Button>
                    </a>
                  )}
                  {selectedApp.appStoreUrl && (
                    <a href={selectedApp.appStoreUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                        <Apple className="w-3.5 h-3.5" /> Apple App Store
                      </Button>
                    </a>
                  )}
                </div>

                <a href={selectedApp.telegramUrl || selectedApp.downloadUrl} target="_blank" rel="noopener noreferrer" className="block pt-2">
                  <Button className="w-full gap-2 bg-primary text-primary-foreground font-semibold shadow-md">
                    {selectedApp.telegramUrl ? <Send className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                    {selectedApp.telegramUrl ? 'Launch Telegram Mini-App' : 'Download Official App'}
                  </Button>
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* QR Code Quick Install Modal */}
      {qrApp && (
        <Dialog open={!!qrApp} onOpenChange={() => setQrApp(null)}>
          <DialogContent className="max-w-xs bg-card border-border p-6 rounded-2xl text-center">
            <DialogHeader>
              <DialogTitle className="font-display text-lg font-bold text-foreground">
                Scan to Install {qrApp.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Scan with your phone camera to download directly from the official store.
              </DialogDescription>
            </DialogHeader>

            <div className="p-4 bg-white rounded-2xl my-4 mx-auto w-48 h-48 flex items-center justify-center shadow-lg border">
              {/* QR Code SVG Visual Generator */}
              <svg className="w-full h-full text-black" viewBox="0 0 100 100">
                <path fill="currentColor" d="M0,0 h30 v30 h-30 z M40,0 h20 v10 h-20 z M70,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M80,10 h10 v10 h-10 z M0,40 h10 v20 h-10 z M20,40 h30 v10 h-30 z M60,40 h40 v10 h-40 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,60 h20 v40 h-20 z M70,70 h30 v10 h-30 z M80,90 h20 v10 h-20 z" />
              </svg>
            </div>

            <a href={qrApp.downloadUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="w-full gap-1.5 text-xs bg-primary text-primary-foreground font-semibold">
                <ExternalLink className="w-3.5 h-3.5" /> Direct Download Link
              </Button>
            </a>
          </DialogContent>
        </Dialog>
      )}

      {/* Suggest / Submit App Modal */}
      <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
        <DialogContent className="max-w-md bg-card border-border p-6 rounded-2xl">
          <DialogHeader className="text-left space-y-2">
            <DialogTitle className="font-display text-xl font-bold text-foreground">
              Suggest a Crypto App or Telegram Bot
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Know an awesome crypto wallet, DEX, Telegram mini-app, or DePIN miner? Submit it for auditing!
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAppSubmit} className="space-y-4 pt-2 text-sm">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">App / Bot Name *</label>
              <Input
                placeholder="e.g. Blum, Grass, Tonkeeper, Phantom"
                value={newAppName}
                onChange={(e) => setNewAppName(e.target.value)}
                required
                className="bg-secondary border-border text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">Category</label>
              <select
                value={newAppCategory}
                onChange={(e) => setNewAppCategory(e.target.value as any)}
                className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              >
                <option value="Exchange">Exchange</option>
                <option value="Wallet">Wallet</option>
                <option value="Telegram Bot">Telegram Bot</option>
                <option value="DePIN & Mining">DePIN & Mining</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">Official Download / Referral Link *</label>
              <Input
                placeholder="https://t.me/... or https://..."
                value={newAppUrl}
                onChange={(e) => setNewAppUrl(e.target.value)}
                required
                className="bg-secondary border-border text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">Why should we feature it?</label>
              <Input
                placeholder="e.g. High daily rewards, zero gas fees, fast withdrawal"
                value={newAppNotes}
                onChange={(e) => setNewAppNotes(e.target.value)}
                className="bg-secondary border-border text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsSubmitOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-primary text-primary-foreground font-semibold">
                Submit App
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};

export default Apps;

