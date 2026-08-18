import { Link } from 'react-router-dom';
import { Send, Twitter, Youtube, Users, Sparkles, ExternalLink, Bell, ShieldCheck, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import ProofTicker from '@/components/ProofTicker';

const Footer = () => {
  const [socials, setSocials] = useState({
    telegramUrl: 'https://t.me/Aplus_info',
    telegramHandle: '@Aplus_info',
    telegramMembers: '25,000+ Members',
    twitterUrl: 'https://twitter.com/AplusHustler',
    twitterHandle: '@AplusHustler',
    twitterFollowers: '18,500+ Followers',
    youtubeUrl: 'https://youtube.com/@AplusHustler',
    youtubeHandle: '@AplusHustler',
    youtubeSubscribers: '12,000+ Subscribers',
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('admin_social_config');
      if (saved) {
        setSocials(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const socialCommunities = [
    {
      name: 'Telegram Channel',
      handle: socials.telegramHandle,
      url: socials.telegramUrl,
      icon: Send,
      stats: socials.telegramMembers,
      badge: '🟢 Live Airdrop Signals',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      description: 'Get instant notifications for new verified withdrawal proofs, zero-investment airdrops & bot claim alerts.',
      cta: 'Join Telegram Channel',
      buttonClass: 'bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/20',
    },
    {
      name: 'Twitter (X) Alpha',
      handle: socials.twitterHandle,
      url: socials.twitterUrl,
      icon: Twitter,
      stats: socials.twitterFollowers,
      badge: '🔥 Daily Market Alpha',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      description: 'Follow for real-time Web3 updates, daily market analysis, airdrop giveaways, and community polls.',
      cta: `Follow ${socials.twitterHandle}`,
      buttonClass: 'bg-slate-900 hover:bg-black text-white border border-white/20 shadow-md',
    },
    {
      name: 'YouTube Guides',
      handle: socials.youtubeHandle,
      url: socials.youtubeUrl,
      icon: Youtube,
      stats: socials.youtubeSubscribers,
      badge: '🎥 Video Tutorials',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
      description: 'Watch step-by-step video walkthroughs on how to claim testnets, run DePIN nodes, and cash out crypto.',
      cta: 'Subscribe on YouTube',
      buttonClass: 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20',
    },
  ];

  return (
    <footer className="deep-gradient mt-20 border-t border-primary-foreground/15 text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Live Auto-Moving Proofs Ticker */}
        <ProofTicker className="mb-12 bg-primary-foreground/5 border-primary-foreground/20 text-foreground" />

        {/* Dedicated Social Media & Community Hub Section */}
        <div className="mb-14 p-6 md:p-8 rounded-3xl bg-primary-foreground/5 border border-primary-foreground/15 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <Badge className="bg-amber-400/20 text-amber-300 border-amber-400/30 text-xs px-3 py-1 mb-2 font-semibold inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                AplusHustler Community Growth Hub
              </Badge>
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                Join 55,000+ Smart Crypto Earners
              </h3>
              <p className="text-primary-foreground/80 text-sm mt-1 max-w-2xl">
                Connect across our official social channels to get instant airdrop alerts, step-by-step guides, and verified withdrawal proof notifications.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold bg-primary-foreground/10 px-4 py-2 rounded-xl border border-primary-foreground/20 shrink-0">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Free to Join • 100% Zero Cost</span>
            </div>
          </div>

          {/* Social Media Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialCommunities.map((social) => {
              const IconComponent = social.icon;
              return (
                <div
                  key={social.name}
                  className="rounded-2xl bg-card/20 border border-primary-foreground/15 p-5 hover:border-primary-foreground/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-base text-primary-foreground leading-snug">
                            {social.name}
                          </h4>
                          <span className="text-xs text-primary-foreground/70 font-mono">
                            {social.handle}
                          </span>
                        </div>
                      </div>

                      <Badge variant="outline" className={`text-[10px] px-2 py-0.5 border ${social.badgeColor} font-semibold shrink-0`}>
                        {social.badge}
                      </Badge>
                    </div>

                    <p className="text-xs text-primary-foreground/75 leading-relaxed mb-4">
                      {social.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-primary-foreground/10 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-primary-foreground/70 flex items-center gap-1">
                      <Users className="w-3 h-3 text-emerald-400" /> {social.stats}
                    </span>

                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                    >
                      <Button
                        size="sm"
                        className={`text-xs font-semibold h-8 px-3 gap-1.5 ${social.buttonClass}`}
                      >
                        {social.cta} <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Standard Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="relative h-11 w-11 rounded-xl overflow-hidden border border-amber-400/40 shadow-lg shrink-0">
                <img
                  src="/logo.jpg"
                  alt="A+ Hustler Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-primary-foreground tracking-wider leading-none">
                  A+ HUSTLER
                </span>
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-widest mt-1">
                  Verified Crypto & Earning
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-xs leading-relaxed mb-4">
              Breaking down the money game for smart hustlers. Verified zero-investment guides for Crypto, Side Hustles & Instant Airtime Earning.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/Aplus_info"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-colors"
                title="Telegram Channel"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/AplusHustler"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-colors"
                title="Twitter (X)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@AplusHustler"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-colors"
                title="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-amber-300 font-bold mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/category/crypto" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center gap-1.5">
                  🔐 Crypto Guides & Airdrops
                </Link>
              </li>
              <li>
                <Link to="/category/finance" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center gap-1.5">
                  💰 Airtime & Micro-Earning
                </Link>
              </li>
              <li>
                <Link to="/category/investment" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center gap-1.5">
                  🔍 Testnets & DePIN Nodes
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-amber-300 font-bold mb-4">
              Explore & Verify
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/airdrops" className="text-emerald-300 font-bold hover:underline flex items-center gap-1">
                  🔥 Free Crypto Airdrops
                </Link>
              </li>
              <li>
                <Link to="/proof" className="text-emerald-300 font-bold hover:underline flex items-center gap-1">
                  🛡️ Audited Withdrawal Proofs
                </Link>
              </li>
              <li>
                <Link to="/apps" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  📱 Verified Earning Apps
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  📖 Master Guides & Blog
                </Link>
              </li>
              <li>
                <Link to="/blog?tab=tools" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  🛠️ Curated Web Tools
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About AplusHustler
                </Link></li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-amber-300 font-bold mb-4">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/15 text-[11px] text-primary-foreground/80">
              <span className="font-semibold text-emerald-300 flex items-center gap-1 mb-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Zero Fee Guarantee
              </span>
              We never charge users or sell paid financial advice.
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-primary-foreground/15 mt-10 pt-6 text-center flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/70">
          <p>© {new Date().getFullYear()} AplusHustler.com. All rights reserved. Educational & informational purposes only.</p>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a href="https://t.me/Aplus_info" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground flex items-center gap-1">
              <Send className="w-3 h-3 text-sky-400" /> Telegram
            </a>
            <a href="https://twitter.com/AplusHustler" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground flex items-center gap-1">
              <Twitter className="w-3 h-3 text-blue-400" /> Twitter
            </a>
            <a href="https://youtube.com/@AplusHustler" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground flex items-center gap-1">
              <Youtube className="w-3 h-3 text-red-400" /> YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

