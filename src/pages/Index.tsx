import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { ReferralCodeBox } from '@/components/ReferralCodeBox';
import BlogCard from '@/components/BlogCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import { getFeaturedPosts } from '@/data/blogData';
import { getFeaturedAirdrops, Airdrop } from '@/data/airdropData';
import { AirdropCard } from '@/components/AirdropCard';
import { AirdropDetailModal } from '@/components/AirdropDetailModal';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

const Index = () => {
  const featuredPosts = getFeaturedPosts();
  const featuredAirdrops = getFeaturedAirdrops();

  const [selectedAirdrop, setSelectedAirdrop] = useState<Airdrop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* ME PASS */}
              <div className="p-6 rounded-2xl bg-card border border-border/80 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
                        🛡️
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">ME PASS (MEC)</h3>
                        <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">1 MEC ≈ $6</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Daily check-in & KYC verified wallet. Get 1 MEC Stake + 0.1 MEC fast bonus. Instant P2P cashout!
                  </p>
                  <div className="mb-4">
                    <ReferralCodeBox code="x4ccdp3m" appName="ME PASS" label="Code" />
                  </div>
                </div>
                <Link to="/apps" className="w-full">
                  <Button className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
                    Get App & Claim 💎
                  </Button>
                </Link>
              </div>

              {/* mPaisa */}
              <div className="p-6 rounded-2xl bg-card border border-border/80 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
                        🎮
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">mPaisa App</h3>
                        <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">Ethio & Safaricom</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Play mobile games & complete daily micro-tasks to cash out Ethio Telecom, Safaricom airtime, USDT & PUBG UC.
                  </p>
                  <div className="p-2.5 rounded-xl bg-secondary/60 border border-border/40 text-xs text-foreground font-medium mb-4 flex items-center gap-1.5">
                    <span>⚡ Direct Local Airtime & USDT</span>
                  </div>
                </div>
                <Link to="/apps" className="w-full">
                  <Button className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
                    Play & Earn 📱
                  </Button>
                </Link>
              </div>

              {/* HiFami */}
              <div className="p-6 rounded-2xl bg-card border border-border/80 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
                        💵
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">HiFami App</h3>
                        <span className="text-xs text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">$0.10 Min Payout</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Instant $0.10 registration bonus you can withdraw immediately! Earn $0.15 for every referral download.
                  </p>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 mb-4">
                    🎁 $0.10 Instant Bonus + $0.15 / Referral
                  </div>
                </div>
                <Link to="/apps" className="w-full">
                  <Button className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
                    Withdraw Instant $0.10 🔥
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Featured <span className="text-gradient-gold">Guides</span>
                </h2>
                <p className="text-muted-foreground mt-2">Top picks to start your journey</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
