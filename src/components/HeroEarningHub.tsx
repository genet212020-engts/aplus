import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  TrendingUp,
  Zap,
  DollarSign,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Sliders,
  Wallet,
  Coins,
  Bot,
  Flame,
  Clock,
  ChevronRight,
  Copy,
  Check,
  Radio,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { AppIconBadge } from '@/components/AppIconBadge';
import { cn } from '@/lib/utils';

interface LiveTransaction {
  id: string;
  app: string;
  category: string;
  amount: string;
  asset: string;
  txHash: string;
  time: string;
  icon: string;
  verified: boolean;
  network: string;
}

const LIVE_STREAM: LiveTransaction[] = [
  {
    id: 'tx-1',
    app: 'ME PASS Wallet',
    category: 'Wallet & P2P',
    amount: '+$120.00',
    asset: 'USDT',
    txHash: '0x8f...39b2',
    time: 'Just now',
    icon: '🛡️',
    verified: true,
    network: 'BNB Chain',
  },
  {
    id: 'tx-2',
    app: 'mPaisa Task Rewards',
    category: 'Tasks & Games',
    amount: '+$25.00',
    asset: 'Cash/UPI',
    txHash: 'tx_7839120',
    time: '2m ago',
    icon: '🎮',
    verified: true,
    network: 'Instant Payout',
  },
  {
    id: 'tx-3',
    app: 'Grass DePIN Node',
    category: 'DePIN Mining',
    amount: '+$85.00',
    asset: 'SOL',
    txHash: '5Kz...9Qwe',
    time: '4m ago',
    icon: '🌱',
    verified: true,
    network: 'Solana',
  },
  {
    id: 'tx-4',
    app: 'Monad Testnet Airdrop',
    category: 'Testnet Airdrop',
    amount: '+$350.00',
    asset: 'MONAD',
    txHash: '0x3c...90e1',
    time: '6m ago',
    icon: '🚀',
    verified: true,
    network: 'EVM Testnet',
  },
  {
    id: 'tx-5',
    app: 'HiFami Daily Bonus',
    category: 'Micro Tasks',
    amount: '+$15.50',
    asset: 'USD',
    txHash: 'pay_99412',
    time: '8m ago',
    icon: '💵',
    verified: true,
    network: 'Binance Pay',
  },
  {
    id: 'tx-6',
    app: 'Blum Telegram Mini-App',
    category: 'Telegram Bot',
    amount: '+$45.00',
    asset: 'TON',
    txHash: 'EQC...18fa',
    time: '11m ago',
    icon: '🎁',
    verified: true,
    network: 'TON Network',
  },
];

const PILLARS_DATA = [
  {
    icon: Wallet,
    title: 'Crypto & Web3 Safe',
    badge: '🔒 Non-Custodial',
    color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    desc: 'Zero-gas testnet airdrops, background DePIN bandwidth mining & verified Telegram mini-apps.',
  },
  {
    icon: TrendingUp,
    title: 'Instant Cashflow Apps',
    badge: '💵 Daily Payouts',
    color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    desc: 'Mobile micro-tasks, game rewards & sign-up bonuses withdrawable via Binance, UPI & USDT.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Risk & Zero Hype',
    badge: '🛡️ 100% Free Audit',
    color: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    desc: 'Never deposit upfront money. Unbiased smart contract verification & audited payout proof hashes.',
  },
];

export const HeroEarningHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'calculator' | 'pillars'>('feed');
  const [balance, setBalance] = useState(1437.82);
  const [currentTxIndex, setCurrentTxIndex] = useState(0);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Calculator State
  const [hoursPerDay, setHoursPerDay] = useState(1.5);
  const [hasDePin, setHasDePin] = useState(true);
  const [hasAirdrops, setHasAirdrops] = useState(true);
  const [hasMobileApps, setHasMobileApps] = useState(true);

  // Live balance increment counter
  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prev) => +(prev + Math.random() * 0.75 + 0.15).toFixed(2));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Live transaction rotating stream
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTxIndex((prev) => (prev + 1) % LIVE_STREAM.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    toast.success(`Copied proof hash: ${hash}`);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  // Dynamic Yield Calculation ($0 starting capital)
  const calculateEstimatedEarnings = () => {
    let baseWeekly = 0;
    if (hasDePin) baseWeekly += 15; // Passive bandwidth mining (Grass, Nodepay)
    if (hasAirdrops) baseWeekly += Math.round(hoursPerDay * 22); // Testnets (Monad, Berachain)
    if (hasMobileApps) baseWeekly += Math.round(hoursPerDay * 12); // Task & Reward apps (mPaisa, HiFami)

    const monthlyLow = Math.round(baseWeekly * 4);
    const monthlyHigh = Math.round(monthlyLow * 1.65);
    return { weekly: baseWeekly, monthlyRange: `$${monthlyLow} - $${monthlyHigh}` };
  };

  const yieldData = calculateEstimatedEarnings();
  const currentTx = LIVE_STREAM[currentTxIndex];

  return (
    <div className="relative w-full">
      {/* Dynamic Multi-Color Ambient Glow Backdrop */}
      <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-primary/30 via-emerald-500/20 to-sky-500/25 blur-2xl opacity-75 animate-pulse pointer-events-none" />

      {/* Main Glassmorphic Panel */}
      <div className="relative rounded-[2rem] bg-card/90 dark:bg-slate-950/90 border border-border/80 shadow-2xl backdrop-blur-2xl overflow-hidden transition-all duration-300">
        
        {/* Top Metallic Luster Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500" />

        <div className="p-5 sm:p-6 space-y-4.5">
          
          {/* Header Status & Navigation Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <Radio className="w-4 h-4 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-sm text-foreground">Verified Earning Hub</h3>
                  <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.2 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    PRO
                  </span>
                </div>
                <p className="text-[11px] text-emerald-400 font-mono font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE ZERO-CAPITAL NETWORK
                </p>
              </div>
            </div>

            {/* Interactive Mode Pills */}
            <div className="flex items-center p-1 rounded-xl bg-secondary/80 border border-border/70 text-xs font-semibold self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab('feed')}
                className={cn(
                  'px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 text-[11px]',
                  activeTab === 'feed'
                    ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Zap className="w-3 h-3" /> Live Feed
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className={cn(
                  'px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 text-[11px]',
                  activeTab === 'calculator'
                    ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Sliders className="w-3 h-3" /> Calculator
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pillars')}
                className={cn(
                  'px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 text-[11px]',
                  activeTab === 'pillars'
                    ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <ShieldCheck className="w-3 h-3" /> Blueprint
              </button>
            </div>
          </div>

          {/* TAB CONTENT WITH SMOOTH ANIMATED TRANSITION */}
          <AnimatePresence mode="wait">
            {activeTab === 'feed' && (
              <motion.div
                key="feed"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                {/* Real-time Community Verified Payout Meter */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/35 relative overflow-hidden shadow-inner text-center">
                  
                  {/* Subtle Grid Sheen */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none" />
                  
                  <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold uppercase tracking-wider mb-1 px-1">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      Audited Community Paid Out
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">100% Verified Ledger</span>
                  </div>

                  <div className="font-mono font-extrabold text-3xl sm:text-4xl text-emerald-300 tracking-tight flex items-center justify-center gap-1.5 py-1">
                    <DollarSign className="w-7 h-7 text-emerald-400 animate-bounce" />
                    <span>
                      {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs font-normal text-emerald-400/90 font-sans ml-1">USDT</span>
                  </div>

                  {/* Active Ticking Payout Stream Card */}
                  <div className="mt-3">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentTx.id}
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="p-3 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-between text-left gap-3 shadow-md"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <AppIconBadge
                            icon={currentTx.icon}
                            name={currentTx.app}
                            category={currentTx.category}
                            size="sm"
                            verified
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-white truncate">{currentTx.app}</span>
                              <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-emerald-500/30 text-emerald-400">
                                {currentTx.network}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] mt-0.5">
                              <span className="text-emerald-400 font-mono font-bold">{currentTx.amount}</span>
                              <span className="text-slate-400">•</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(currentTx.txHash)}
                                className="text-slate-400 hover:text-slate-200 font-mono text-[10px] flex items-center gap-1 transition-colors"
                                title="Click to copy audit hash"
                              >
                                <span>{currentTx.txHash}</span>
                                {copiedHash === currentTx.txHash ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3 text-slate-500" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-slate-400 font-mono block">{currentTx.time}</span>
                          <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 inline-block mt-0.5">
                            On-Chain
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Hot Live Highlights Mini-List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-foreground px-1">
                    <span className="flex items-center gap-1.5 uppercase text-[11px] tracking-wider text-muted-foreground">
                      <Flame className="w-3.5 h-3.5 text-amber-400" /> Active Zero-Cost Opportunities
                    </span>
                    <Link to="/apps" className="text-primary hover:underline text-[11px] font-semibold flex items-center gap-0.5">
                      Explore All <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/apps?app=app-1"
                      className="p-2.5 rounded-xl bg-secondary/50 hover:bg-primary/10 border border-border/70 hover:border-primary/40 transition-all group block"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🛡️</span>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                            ME PASS
                          </h5>
                          <span className="text-[10px] font-bold text-amber-400 block">$6 Free Bonus</span>
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/apps?app=app-2"
                      className="p-2.5 rounded-xl bg-secondary/50 hover:bg-emerald-500/10 border border-border/70 hover:border-emerald-500/40 transition-all group block"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🎮</span>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-foreground group-hover:text-emerald-400 transition-colors truncate">
                            mPaisa App
                          </h5>
                          <span className="text-[10px] font-bold text-emerald-400 block">Instant Payouts</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'calculator' && (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                {/* Estimated Yield Output Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/30 text-center relative overflow-hidden">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-0.5">
                    Estimated Zero-Cost Potential
                  </span>
                  <div className="font-mono font-extrabold text-3xl sm:text-4xl text-amber-300 tracking-tight py-1">
                    {yieldData.monthlyRange} <span className="text-xs font-normal text-muted-foreground font-sans">/ Month</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Based on ~${yieldData.weekly}/week with zero initial deposit required
                  </p>
                </div>

                {/* Interactive Sliders & Toggles */}
                <div className="space-y-3 p-3.5 rounded-xl bg-secondary/40 border border-border/70">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" /> Daily Free Time:
                    </span>
                    <span className="font-bold font-mono text-foreground text-sm">{hoursPerDay} hrs / day</span>
                  </div>

                  <input
                    type="range"
                    min="0.5"
                    max="4"
                    step="0.5"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(parseFloat(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />

                  <div className="pt-2 border-t border-border/50 space-y-2 text-xs">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-emerald-400" /> DePIN Background Nodes (Grass/Nodepay)
                      </span>
                      <input
                        type="checkbox"
                        checked={hasDePin}
                        onChange={(e) => setHasDePin(e.target.checked)}
                        className="rounded accent-emerald-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Coins className="w-3 h-3 text-amber-400" /> Free Testnets (Monad, Berachain)
                      </span>
                      <input
                        type="checkbox"
                        checked={hasAirdrops}
                        onChange={(e) => setHasAirdrops(e.target.checked)}
                        className="rounded accent-amber-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <DollarSign className="w-3 h-3 text-sky-400" /> Micro-Task & Bot Rewards
                      </span>
                      <input
                        type="checkbox"
                        checked={hasMobileApps}
                        onChange={(e) => setHasMobileApps(e.target.checked)}
                        className="rounded accent-sky-500 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'pillars' && (
              <motion.div
                key="pillars"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs font-bold text-foreground px-1 mb-1">
                  <span className="flex items-center gap-1.5 uppercase text-[11px] tracking-wider text-muted-foreground">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Zero-Risk Guarantee
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">$0 Deposit Required</span>
                </div>

                {PILLARS_DATA.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="p-3 rounded-xl bg-secondary/50 border border-border/70 hover:border-primary/40 transition-all flex items-start gap-3 group"
                    >
                      <div className={cn('p-2 rounded-xl border shrink-0 mt-0.5', pillar.color)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                            {pillar.title}
                          </h4>
                          <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-background text-muted-foreground border border-border shrink-0">
                            {pillar.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Action Ledger CTA with Dynamic Pulsing Aura */}
          <div className="pt-2 border-t border-border/50">
            <Link to="/proof" className="block">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs font-bold border-primary/40 hover:border-primary hover:bg-primary/10 gap-2 h-9 rounded-xl transition-all shadow-xs hover:shadow-amber-500/20 group"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Inspect All Verified Payout Proofs</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroEarningHub;
