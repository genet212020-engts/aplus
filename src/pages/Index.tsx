import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import BlogCard from '@/components/BlogCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import { getFeaturedPosts } from '@/data/blogData';
import { getFeaturedAirdrops, Airdrop } from '@/data/airdropData';
import { apps as allApps, AppItem } from '@/data/appData';
import { AirdropCard } from '@/components/AirdropCard';
import { AirdropDetailModal } from '@/components/AirdropDetailModal';
import { AppCard } from '@/components/AppCard';
import { VerifiedProofSection } from '@/components/VerifiedProofSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const featuredPosts = getFeaturedPosts();
  const featuredAirdrops = getFeaturedAirdrops();

  const [earningAppsList] = useState<AppItem[]>(() => {
    try {
      const saved = localStorage.getItem('admin_earning_apps');
      return saved ? JSON.parse(saved) : allApps;
    } catch {
      return allApps;
    }
  });

  const topEarningApps = earningAppsList.filter(a => a.featured !== false).slice(0, 3);

  const [selectedAirdrop, setSelectedAirdrop] = useState<Airdrop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectApp = (app: AppItem) => {
    navigate(`/apps?app=${app.id}`);
  };

  return (
    <>
      <Helmet>
        <title>AplusHustler - NO Investment Crypto, Airdrops & Finance Guides</title>
        <meta name="description" content="Breaking down the money game for smart hustlers. Free crypto airdrop guides, finance education, and investment strategies with zero investment required." />
        <meta name="keywords" content="AplusHustler, ME PASS, mPaisa, HiFami, Monad testnet, Berachain airdrop, free crypto earning, side hustle apps, zero investment crypto" />
        <link rel="canonical" href="https://aplushustler.com/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aplushustler.com/" />
        <meta property="og:site_name" content="AplusHustler" />
        <meta property="og:title" content="AplusHustler - NO Investment Crypto, Airdrops & Finance Guides" />
        <meta property="og:description" content="Breaking down the money game for smart hustlers. Free crypto airdrop guides, finance education, and investment strategies with zero investment required." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AplusHustler" />
        <meta name="twitter:title" content="AplusHustler - NO Investment Crypto, Airdrops & Finance Guides" />
        <meta name="twitter:description" content="Breaking down the money game for smart hustlers. Free crypto airdrop guides, finance education, and investment strategies with zero investment required." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80" />

        {/* JSON-LD Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AplusHustler",
            "url": "https://aplushustler.com/",
            "description": "NO Investment Crypto, Airdrops & Finance Guides",
            "publisher": {
              "@type": "Organization",
              "name": "AplusHustler",
              "logo": "https://aplushustler.com/placeholder.svg"
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      
      <main>
        {/* Header Ad */}
        <div className="pt-20 pb-4 flex justify-center">
          <AdPlaceholder position="header" />
        </div>

        <Hero />

        {/* Featured Top Earning Apps Section */}
        <section className="py-16 bg-card/40 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-2">
                  <Zap className="w-3.5 h-3.5" /> 100% Free & Verified Payouts
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Top <span className="text-gradient-gold">Earning Apps</span>
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Earn crypto, USD, airtime & game rewards with zero initial investment.
                </p>
              </div>

              <Link to="/apps">
                <Button variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary/10">
                  Explore All Apps 💵 <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topEarningApps.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  variant="featured"
                  onSelect={handleSelectApp}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Verified Community Payment Proofs Section */}
        <VerifiedProofSection />

        {/* Featured Posts Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Featured <span className="text-gradient-gold">Guides & Tools</span>
                </h2>
                <p className="text-muted-foreground mt-2">Expert crypto blueprints, money setups & web utilities</p>
              </div>
              <Link to="/blog">
                <Button variant="outline" className="border-border hover:border-primary/50 text-foreground font-semibold flex items-center gap-2">
                  All Guides & Tools <ArrowRight className="w-4 h-4 text-primary" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(featuredPosts || []).map((post, index) => (
                <BlogCard key={post.id} post={post} featured={index === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* In-Content Ad */}
        <div className="container mx-auto px-4 py-8">
          <AdPlaceholder position="in-content" />
        </div>

        {/* Sidebar Ads Section */}
        <section className="py-12 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-6 flex-wrap">
              <AdPlaceholder position="sidebar" />
              <AdPlaceholder position="sidebar" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="deep-gradient relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center">
              <div className="absolute inset-0 grid-overlay opacity-40" />
              <div className="relative">
                <h2 className="font-display text-3xl md:text-5xl text-primary-foreground mb-4">
                  Join the Community
                </h2>
                <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8 text-lg">
                  Get exclusive tips, early access to guides, and connect with fellow hustlers on Telegram.
                </p>
                <a href="https://t.me/Aplus_info" target="_blank" rel="noopener noreferrer">
                  <button className="bg-primary-foreground text-accent px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform duration-300">
                    Join @Aplus_info on Telegram
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AirdropDetailModal
        airdrop={selectedAirdrop}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAirdrop(null);
        }}
      />

      <Footer />
    </>
  );
};

export default Index;
