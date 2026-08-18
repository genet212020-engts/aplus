import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Target, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Zap, 
  Lock, 
  FileText, 
  Send, 
  Twitter, 
  Youtube, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Award,
  ExternalLink
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const stats = [
  { value: '25,000+', label: 'Active Community Members', icon: Users, color: 'text-sky-400' },
  { value: '100+', label: 'Verified Earning Guides', icon: BookOpen, color: 'text-amber-400' },
  { value: '100%', label: 'Free & Transparent Access', icon: Lock, color: 'text-emerald-400' },
  { value: '$0', label: 'Minimum Capital Barrier', icon: Zap, color: 'text-purple-400' },
];

const verificationProcess = [
  {
    step: '01',
    title: 'Alpha Scouting & Sourcing',
    description: 'We track testnets, node programs, DeFi protocols, and Web3 micro-earning apps directly from verified protocol builders and team announcements.',
    icon: Globe,
  },
  {
    step: '02',
    title: 'Sandbox Security Audit',
    description: 'Every app, contract, and bot is tested in a isolated sandbox environment to check permissions, smart contract safety, and data privacy.',
    icon: ShieldCheck,
  },
  {
    step: '03',
    title: 'On-Chain & Withdrawal Proof',
    description: 'We execute actual transactions and request payouts to verify real-world liquidity and transaction hash validity before publishing.',
    icon: CheckCircle2,
  },
  {
    step: '04',
    title: 'Step-by-Step Guide Creation',
    description: 'We publish comprehensive, beginner-friendly guides complete with screenshots, required tools, and exact task execution steps.',
    icon: FileText,
  },
];

const pillars = [
  {
    title: 'Crypto & Web3 Onboarding',
    subtitle: 'Democratizing Decentralized Wealth',
    description: 'Practical, hype-free education covering non-custodial wallet security, zero-investment airdrops, testnet interaction, and DePIN node operations.',
    icon: Zap,
    color: 'from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30',
    tags: ['Airdrops & Testnets', 'DePIN Nodes', 'Wallet Security', 'Exchange Onboarding']
  },
  {
    title: 'Personal Finance & Cashflow',
    subtitle: 'Sustainable Money Management',
    description: 'Actionable financial literacy frameworks for modern hustlers — budgeting, emergency fund planning, debt mitigation, and digital revenue streams.',
    icon: TrendingUp,
    color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    tags: ['Budgeting Systems', 'Cashflow Models', 'Micro-Earning', 'Emergency Buffers']
  },
  {
    title: 'Risk-First Investing',
    subtitle: 'Capital Preservation Above All',
    description: 'Unbiased analysis of investment vehicles, market dynamics, risk-adjusted returns, and scam identification — without upsells or paid courses.',
    icon: ShieldCheck,
    color: 'from-sky-500/20 to-blue-500/10 text-sky-400 border-sky-500/30',
    tags: ['Risk Management', 'Scam Prevention', 'Portfolio Allocation', 'No Hype']
  },
];

const About = () => {
  const [socials, setSocials] = useState({
    telegramUrl: 'https://t.me/Aplus_info',
    telegramHandle: '@Aplus_info',
    telegramMembers: '25,000+ Members',
    twitterUrl: 'https://twitter.com/AplusHustler',
    twitterHandle: '@AplusHustler',
    youtubeUrl: 'https://youtube.com/@AplusHustler',
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('admin_social_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSocials(prev => ({ ...prev, ...parsed }));
      }
    } catch {
      // fallback to defaults
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us - AplusHustler | Verified Web3 & Financial Literacy</title>
        <meta 
          name="description" 
          content="Discover AplusHustler's mission, editorial standards, and verification protocol for zero-investment crypto airdrops, financial literacy, and online earning guides." 
        />
      </Helmet>

      <Navbar />
      
      <main className="pt-24 pb-24">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-12 lg:py-20 border-b border-border/80">
          <div className="absolute inset-0 grid-overlay" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">Democratizing Financial & Web3 Education</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6 leading-tight">
                Empowering Hustlers with <span className="text-gradient-gold">Verified Wealth Intelligence</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                AplusHustler is a premier educational research platform dedicated to breaking down complex crypto, personal finance, and micro-earning strategies into safe, actionable, and 100% free guides.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href={socials.telegramUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="hero" size="lg" className="shadow-lg shadow-primary/20 gap-2">
                    <Send className="w-4 h-4" /> Join Telegram Alpha
                  </Button>
                </a>
                <Link to="/proof">
                  <Button variant="outline" size="lg" className="border-primary/40 hover:border-primary">
                    View Withdrawal Proofs
                  </Button>
                </Link>
              </div>
            </div>

            {/* METRICS GRID */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 max-w-5xl mx-auto">
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div key={stat.label} className="bg-card/80 border border-border/80 rounded-2xl p-5 sm:p-6 text-center backdrop-blur-sm hover:border-primary/40 transition-all">
                    <div className="inline-flex p-3 rounded-xl bg-secondary/80 mb-3">
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mb-1">{stat.value}</div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* MISSION & EDITORIAL PHILOSOPHY */}
        <section className="py-16 sm:py-20 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-xs font-bold uppercase tracking-widest text-primary border-primary/30 bg-primary/10 mb-3 px-3 py-1">
                Our Foundational Promise
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Why AplusHustler Exists
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <div className="bg-card border border-border rounded-2xl p-8 flex flex-col justify-between hover:border-primary/30 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">The Problem We Solve</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4">
                    The online earning and Web3 space is flooded with deceptive course sellers, paid access groups, unverified signal chats, and high-risk referral scams that target beginners.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    Many smart, motivated individuals lack access to structured, transparent financial literacy and clear execution steps.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/60 text-xs font-mono text-amber-400">
                  ✓ 100% Free Access • Zero Hidden Paywalls
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8 flex flex-col justify-between hover:border-primary/30 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">Our Practical Solution</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4">
                    We test every platform, mobile task app, and testnet protocol first. We verify on-chain transaction hashes, test real withdrawal routes, and publish free guides.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    Whether you are an aspiring crypto researcher or looking to build passive digital cashflow, we provide the blueprints without taking your money.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/60 text-xs font-mono text-emerald-400">
                  ✓ Real Withdrawal Hash Verification
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE CURRICULUM & PILLARS */}
        <section className="py-16 deep-gradient border-y border-border/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <Badge variant="outline" className="text-xs font-bold uppercase tracking-widest text-amber-400 border-amber-500/30 bg-amber-500/10 mb-3 px-3 py-1">
                Curriculum Focus
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                What We Research & Teach
              </h2>
              <p className="text-primary-foreground/70 text-base sm:text-lg">
                Structured categories designed to take you from foundational understanding to execution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={pillar.title} className="bg-card/90 border border-border rounded-2xl p-7 flex flex-col justify-between hover:border-amber-400/50 transition-all group">
                    <div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} border flex items-center justify-center mb-6`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
                        {pillar.subtitle}
                      </span>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-amber-300 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-border/60">
                      <div className="flex flex-wrap gap-1.5">
                        {pillar.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* EDITORIAL VERIFICATION PROTOCOL */}
        <section className="py-16 sm:py-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <Badge variant="outline" className="text-xs font-bold uppercase tracking-widest text-sky-400 border-sky-500/30 bg-sky-500/10 mb-3 px-3 py-1">
                Quality & Safety Protocol
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                How We Audit & Verify Content
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Our strict 4-stage verification framework guarantees that every guide published on AplusHustler meets safety and authenticity standards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {verificationProcess.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.step} className="bg-card border border-border/80 rounded-2xl p-6 relative overflow-hidden group hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                        STAGE {item.step}
                      </span>
                      <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FOUNDER & COMMUNITY LEADERSHIP */}
        <section className="py-16 bg-card/50 border-y border-border/80">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 text-center">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-amber-400 via-emerald-500 to-sky-500 p-1 mx-auto shadow-2xl">
                    <div className="w-full h-full bg-slate-950 rounded-[0.9rem] flex flex-col items-center justify-center p-3 text-center">
                      <span className="text-4xl sm:text-5xl mb-1">👑</span>
                      <span className="font-display font-extrabold text-xs sm:text-sm text-amber-300 tracking-wider">A+ HUSTLER</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-display font-bold text-xl text-foreground">Fitsum</h3>
                    <p className="text-xs text-muted-foreground font-mono">Founder & Lead Researcher</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-semibold text-primary">
                      📍 Ethiopia & Global Web3
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-amber-400 border-amber-500/30 bg-amber-500/10">
                    Founder's Note
                  </Badge>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    "Knowledge is the ultimate leverage."
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    "I created <strong>AplusHustler.com</strong> (and the <strong>AplusEthiopia</strong> community) because I experienced firsthand how difficult it is to find reliable, scam-free information when starting with zero capital.
                  </p>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Our mission is simple: To give driven individuals everywhere the exact tools, verification proofs, and step-by-step guides they need to participate safely in the global digital economy."
                  </p>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <a href={socials.telegramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:underline">
                      <Send className="w-3.5 h-3.5" /> Telegram Channel
                    </a>
                    <span className="text-muted-foreground">•</span>
                    <a href={socials.twitterUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline">
                      <Twitter className="w-3.5 h-3.5" /> Twitter / X
                    </a>
                    <span className="text-muted-foreground">•</span>
                    <a href={socials.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:underline">
                      <Youtube className="w-3.5 h-3.5" /> YouTube Channel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMMUNITY JOIN CTA */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto deep-gradient border border-primary-foreground/20 rounded-3xl p-8 sm:p-12 text-center text-primary-foreground relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="text-3xl mb-4 block">🚀</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-4">
                Ready to Join {socials.telegramMembers}?
              </h2>
              <p className="text-primary-foreground/80 text-base sm:text-lg mb-8 leading-relaxed">
                Get instant notifications when new verified airdrops, testnets, withdrawal proofs, and earning apps are published.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={socials.telegramUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto shadow-xl shadow-sky-500/20 gap-2">
                    <Send className="w-4 h-4" /> Join Telegram Channel {socials.telegramHandle}
                  </Button>
                </a>
                <Link to="/apps" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 hover:bg-white/10 text-primary-foreground">
                    Explore Earning Apps
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL & DISCLAIMER DISCLAIMER */}
        <section className="container mx-auto px-4 max-w-4xl text-center text-xs text-muted-foreground/70 space-y-2">
          <p>
            <strong>Disclaimer:</strong> AplusHustler.com provides educational content and community guides for informational purposes only. None of the content on this website constitutes financial, investment, legal, or trading advice.
          </p>
          <p>
            Cryptocurrency markets, decentralized applications, and digital micro-tasks carry inherent risks. Users should always exercise due diligence (DYOR), practice self-custody wallet hygiene, and never invest money they cannot afford to lose.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
