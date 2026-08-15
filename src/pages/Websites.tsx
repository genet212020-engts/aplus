import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Globe, Star, Search, X } from 'lucide-react';

interface Website {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  featured?: boolean;
  tags: string[];
  icon: string;
}

const websites: Website[] = [
  {
    id: '1',
    name: 'CoinMarketCap',
    description: 'Track crypto prices, market cap, and trading volume in real-time. The go-to resource for crypto data.',
    category: 'Research',
    url: 'https://coinmarketcap.com',
    featured: true,
    tags: ['Prices', 'Analytics', 'Data'],
    icon: '📊'
  },
  {
    id: '2',
    name: 'TradingView',
    description: 'Advanced charting platform for technical analysis. Create custom charts and share trading ideas.',
    category: 'Charts',
    url: 'https://tradingview.com',
    featured: true,
    tags: ['Charts', 'Analysis', 'Signals'],
    icon: '📈'
  },
  {
    id: '3',
    name: 'CoinGecko',
    description: 'Comprehensive crypto data aggregator. Track DeFi, NFTs, and discover new projects.',
    category: 'Research',
    url: 'https://coingecko.com',
    featured: true,
    tags: ['DeFi', 'NFT', 'Discovery'],
    icon: '🦎'
  },
  {
    id: '4',
    name: 'DeFiLlama',
    description: 'Track total value locked (TVL) across DeFi protocols. Find the best yields and opportunities.',
    category: 'DeFi',
    url: 'https://defillama.com',
    tags: ['TVL', 'Yields', 'Protocols'],
    icon: '🦙'
  },
  {
    id: '5',
    name: 'Dexscreener',
    description: 'Real-time DEX charts and token discovery. Find new tokens before they pump.',
    category: 'Trading',
    url: 'https://dexscreener.com',
    tags: ['DEX', 'Charts', 'Discovery'],
    icon: '🔍'
  },
  {
    id: '6',
    name: 'Etherscan',
    description: 'Ethereum blockchain explorer. Track transactions, wallets, and smart contracts.',
    category: 'Explorer',
    url: 'https://etherscan.io',
    tags: ['Ethereum', 'Transactions', 'Contracts'],
    icon: '🔷'
  },
  {
    id: '7',
    name: 'Crypto Fear & Greed',
    description: 'Market sentiment indicator. Know when to buy the fear and sell the greed.',
    category: 'Sentiment',
    url: 'https://alternative.me/crypto/fear-and-greed-index/',
    tags: ['Sentiment', 'Psychology', 'Timing'],
    icon: '😱'
  },
  {
    id: '8',
    name: 'Glassnode',
    description: 'On-chain analytics and intelligence. Deep insights into blockchain data.',
    category: 'Analytics',
    url: 'https://glassnode.com',
    tags: ['On-chain', 'Metrics', 'Research'],
    icon: '🔮'
  },
  {
    id: '9',
    name: 'Messari',
    description: 'Crypto research and data. Professional-grade reports and market intelligence.',
    category: 'Research',
    url: 'https://messari.io',
    tags: ['Reports', 'Intelligence', 'Pro'],
    icon: '📑'
  },
  {
    id: '10',
    name: 'LunarCrush',
    description: 'Social analytics for crypto. Track what\'s trending on social media.',
    category: 'Social',
    url: 'https://lunarcrush.com',
    tags: ['Social', 'Trending', 'Sentiment'],
    icon: '🌙'
  },
  {
    id: '11',
    name: 'Token Terminal',
    description: 'Financial data on crypto protocols. Revenue, users, and fundamentals.',
    category: 'Analytics',
    url: 'https://tokenterminal.com',
    tags: ['Revenue', 'Fundamentals', 'Data'],
    icon: '💹'
  },
  {
    id: '12',
    name: 'Crypto News',
    description: 'Latest crypto news and updates. Stay informed about market-moving events.',
    category: 'News',
    url: 'https://cryptonews.com',
    tags: ['News', 'Updates', 'Events'],
    icon: '📰'
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Research': return 'bg-investment/20 text-investment border-investment/30';
    case 'Charts': 
    case 'Trading': return 'bg-crypto/20 text-crypto border-crypto/30';
    case 'DeFi': return 'bg-finance/20 text-finance border-finance/30';
    case 'Analytics': return 'bg-primary/20 text-primary border-primary/30';
    default: return 'bg-muted text-muted-foreground border-border/50';
  }
};

const categories = ['All', 'Research', 'Charts', 'Trading', 'DeFi', 'Analytics', 'Explorer', 'Sentiment', 'Social', 'News'];

const Websites = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredWebsites = useMemo(() => {
    let filtered = websites;
    
    // Apply category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(site => site.category === categoryFilter);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(site => 
        site.name.toLowerCase().includes(query) ||
        site.description.toLowerCase().includes(query) ||
        site.category.toLowerCase().includes(query) ||
        site.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [searchQuery, categoryFilter]);

  const featuredSites = filteredWebsites.filter(w => w.featured);
  const otherSites = filteredWebsites.filter(w => !w.featured);

  return (
    <>
      <Helmet>
        <title>Best Crypto Websites 2024 | A+Hustler - Research & Analysis Tools</title>
        <meta name="description" content="Discover the best crypto websites for research, charts, and analytics. CoinMarketCap, TradingView, and more essential tools." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto animate-fade-up">
              <Badge className="mb-6 bg-primary/10 border-primary/30 text-primary px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                Curated Web Tools
              </Badge>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-foreground">Essential Crypto</span>
                <br />
                <span className="text-gradient-gold">Websites & Tools</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
                The best crypto websites for research, charts, and staying ahead of the market.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search websites by name, category, or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-10 py-6 text-base bg-card border-border focus:border-primary rounded-xl"
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
              <Tabs value={categoryFilter} onValueChange={setCategoryFilter} className="w-full">
                <TabsList className="bg-card border border-border p-1 rounded-xl flex-wrap h-auto gap-1">
                  {categories.map((cat) => (
                    <TabsTrigger 
                      key={cat}
                      value={cat} 
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-1.5 text-sm"
                    >
                      {cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Search Results Info */}
        {searchQuery && (
          <section className="container mx-auto px-4 pt-4">
            <p className="text-muted-foreground">
              Found <span className="text-primary font-semibold">{filteredWebsites.length}</span> website{filteredWebsites.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
          </section>
        )}

        {/* Featured Sites */}
        {featuredSites.length > 0 && (
          <section className="py-12 container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Must-Have Tools</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {featuredSites.map((site, index) => (
                <div 
                  key={site.id} 
                  className={`group relative animate-fade-up stagger-${index + 1}`}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                  
                  <div className="relative h-full rounded-2xl surface-card hover-lift p-6">
                    {/* Featured badge */}
                    <div className="absolute -top-3 -right-3">
                      <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg glow-gold">
                        Featured
                      </div>
                    </div>
                    
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-4xl shadow-inner">
                        {site.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {site.name}
                        </h3>
                        <Badge variant="outline" className={`mt-1.5 ${getCategoryColor(site.category)}`}>
                          {site.category}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {site.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(site.tags || []).map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground border border-border/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action */}
                    <a href={site.url} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                        <ExternalLink className="w-4 h-4" />
                        Visit Website
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Sites */}
        {otherSites.length > 0 && (
          <section className="py-12 pb-20 container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold mb-8 text-foreground">More Resources</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherSites.map((site, index) => (
                <div 
                  key={site.id} 
                  className={`group animate-fade-up stagger-${(index % 3) + 1}`}
                >
                  <div className="h-full rounded-2xl surface-card hover-lift p-5">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center text-2xl">
                        {site.icon}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                          {site.name}
                        </h3>
                        <Badge variant="outline" className={`text-[10px] ${getCategoryColor(site.category)}`}>
                          {site.category}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {site.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(site.tags || []).slice(0, 2).map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground border border-border/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Visit button */}
                    <a href={site.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Visit
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredWebsites.length === 0 && (
          <section className="py-20 container mx-auto px-4 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display text-xl font-bold mb-2">No websites found</h3>
            <p className="text-muted-foreground mb-4">Try a different search term</p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </section>
        )}
      </main>
      
      <Footer />
    </>
  );
};

export default Websites;
