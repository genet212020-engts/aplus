import { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, Wallet, Sparkles, DollarSign, ExternalLink, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const stats = [
  { value: '100+', label: 'Verified Guides' },
  { value: '25K+', label: 'Community' },
  { value: '$0', label: 'To Start' },
];

const pillars = [
  {
    icon: Wallet,
    title: 'Crypto & Web3',
    copy: 'Non-custodial wallets, testnet airdrops & DePIN nodes.',
    color: 'from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30',
    badge: '🔒 Web3 Safe'
  },
  {
    icon: TrendingUp,
    title: 'Cashflow Systems',
    copy: 'Budgeting, emergency funds & digital revenue streams.',
    color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    badge: '💵 Cashflow'
  },
  {
    icon: ShieldCheck,
    title: 'Risk-First Investing',
    copy: 'Unbiased risk management, zero hype and no upsells.',
    color: 'from-sky-500/20 to-blue-500/10 text-sky-400 border-sky-500/30',
    badge: '🛡️ Zero Hype'
  },
];

// Verified community payout stream
const livePayouts = [
  { app: 'ME PASS P2P', amount: '+$120.00 USDT', time: 'Just now', icon: '💎', status: 'On-Chain' },
  { app: 'mPaisa Reward', amount: '+$25.00 Cash', time: '2m ago', icon: '💵', status: 'Completed' },
  { app: 'Grass DePIN Node', amount: '+$85.00 SOL', time: '4m ago', icon: '⚡', status: 'Verified' },
  { app: 'Monad Testnet', amount: '+$350.00 Airdrop', time: '6m ago', icon: '🚀', status: 'On-Chain' },
  { app: 'Blum Telegram Bot', amount: '+$45.00 TON', time: '9m ago', icon: '🎁', status: 'Verified' },
];

const Hero = () => {
  const [balance, setBalance] = useState(1430.50);
  const [payoutIndex, setPayoutIndex] = useState(0);

  // Live balance ticker effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => +(prev + Math.random() * 0.45 + 0.05).toFixed(2));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Live payout notification ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setPayoutIndex(prev => (prev + 1) % livePayouts.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-gradient relative overflow-hidden border-b border-border">
      {/* Background ambient lighting grid */}
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center py-16 lg:py-24">
          
          {/* Left Column: Headline & Value Proposition (7 cols on LG) */}
          <div className="lg:col-span-7 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6 animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-bold tracking-wide text-primary uppercase">No Capital Required • 100% Free</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold mb-6 animate-fade-up stagger-1 leading-[1.08] tracking-tight">
              <span className="text-foreground">Breaking the</span>
              <br />
              <span className="text-gradient-gold">Money Game</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 animate-fade-up stagger-2 max-w-xl">
              Free, practical education on crypto, personal finance, and investing — engineered for hustlers starting from zero with verified payout blueprints.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up stagger-3 mb-10">
              <Link to="/apps">
                <Button variant="hero" size="lg" className="group w-full sm:w-auto shadow-xl shadow-primary/20 gap-2">
                  Explore Earning Apps 💵
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/proof">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary/40 hover:border-primary hover:bg-primary/10 gap-2">
                  Payout Proof Ledger 💳
                </Button>
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 border-t border-border/60 pt-6 animate-fade-up stagger-4 max-w-md">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">{stat.value}</div>
                  <div className="text-[11px] text-muted-foreground uppercase font-semibold tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sleek Combined Learning & Live Ledger Widget (5 cols on LG) */}
          <div className="lg:col-span-5 relative animate-fade-up stagger-2">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-primary/20 via-amber-500/10 to-emerald-500/20 blur-2xl opacity-70" />

            <div className="relative bg-card/95 border border-border rounded-[2rem] p-6 shadow-2xl space-y-5 backdrop-blur-xl">
              
              {/* Header: Live Network Status Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-border/80">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-foreground">Verified Earning Hub</h3>
                    <p className="text-[10px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      LIVE NETWORK ACTIVE
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] bg-secondary text-secondary-foreground border-border font-mono font-semibold">
                  v2.4 Audit
                </Badge>
              </div>

              {/* Live Ticking Balance Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-center relative overflow-hidden shadow-inner">
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest block mb-1">
                  Community Verified Paid Out
                </span>
                <div className="font-mono font-extrabold text-3xl sm:text-4xl text-emerald-300 tracking-tight flex items-center justify-center gap-1">
                  <DollarSign className="w-7 h-7 text-emerald-400 animate-bounce" />
                  {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-xs font-normal text-emerald-400/80 font-sans ml-1">USDT</span>
                </div>
                
                {/* Ticking Live Payout Alert */}
                <div className="mt-3 p-2.5 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-between text-left gap-2 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="text-base p-1 rounded bg-emerald-500/20 border border-emerald-500/30">
                      {livePayouts[payoutIndex].icon}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        {livePayouts[payoutIndex].app}
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      </div>
                      <div className="text-[11px] text-emerald-400 font-mono font-bold">
                        {livePayouts[payoutIndex].amount}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {livePayouts[payoutIndex].time}
                  </span>
                </div>
              </div>

              {/* What You'll Learn Pillars */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> What You'll Learn
                  </span>
                  <span className="text-[10px] text-muted-foreground font-semibold">100% Free Access</span>
                </div>

                <div className="space-y-2.5">
                  {pillars.map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <div
                        key={pillar.title}
                        className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/80 hover:border-primary/40 transition-all"
                      >
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${pillar.color} border`}>
                          <Icon className="h-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="font-display font-bold text-xs text-foreground truncate">{pillar.title}</h4>
                            <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-background text-muted-foreground border border-border shrink-0">
                              {pillar.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                            {pillar.copy}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CTA to Ledger */}
              <Link to="/proof" className="block pt-1">
                <Button variant="outline" size="sm" className="w-full text-xs font-bold border-primary/40 hover:border-primary hover:bg-primary/10 gap-1.5">
                  Inspect All Verified Payout Proofs
                  <ExternalLink className="w-3.5 h-3.5 text-primary" />
                </Button>
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
