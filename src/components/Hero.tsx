import { ArrowRight, Wallet, TrendingUp, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HeroEarningHub } from '@/components/HeroEarningHub';

const stats = [
  { value: '100+', label: 'Verified Guides' },
  { value: '25K+', label: 'Community' },
  { value: '$0', label: 'To Start' },
];

const Hero = () => {
  return (
    <section className="hero-gradient relative overflow-hidden border-b border-border">
      {/* Background ambient lighting grid */}
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-primary/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center py-10 lg:py-20">
          
          {/* Left Column: Headline & Value Proposition (7 cols on LG) */}
          <div className="lg:col-span-7 max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-bold tracking-wide text-primary uppercase">No Capital Required • 100% Free</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold mb-6 leading-[1.08] tracking-tight stagger-1 animate-fade-up">
              <span className="text-foreground">Breaking the</span>
              <br />
              <span className="text-gradient-gold">Money Game</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl stagger-2 animate-fade-up">
              Free, practical education on crypto, personal finance, and investing — engineered for hustlers starting from zero with verified payout blueprints.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 stagger-3 animate-fade-up">
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
            <div className="grid grid-cols-3 gap-4 border-t border-border/60 pt-6 max-w-md stagger-4 animate-fade-up">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">{stat.value}</div>
                  <div className="text-[11px] text-muted-foreground uppercase font-semibold tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Animated Interactive Zero-Capital Earning Hub (5 cols on LG) */}
          <div className="lg:col-span-5 relative animate-fade-up stagger-2">
            <HeroEarningHub />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
