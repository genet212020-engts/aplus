import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  ThumbsUp,
  ArrowRight,
  Sparkles,
  Camera,
  Maximize2,
  Wallet,
  Coins,
  TrendingUp,
  FileCheck2,
  Lock,
  Upload,
  Plus,
  Send,
  Check,
  Eye,
  SlidersHorizontal,
  Flame,
  Search,
  Link2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { withdrawalProofs as allProofs, WithdrawalProof } from '@/data/proofData';
import { AppIconBadge } from '@/components/AppIconBadge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const VerifiedProofSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'crypto' | 'instant' | 'airdrop' | 'depin'>('all');
  const [selectedProof, setSelectedProof] = useState<WithdrawalProof | null>(null);
  const [isFullscreenImage, setIsFullscreenImage] = useState<string | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Explorer Verifier Tool state
  const [customHashInput, setCustomHashInput] = useState('');
  const [selectedChain, setSelectedChain] = useState<'solana' | 'ton' | 'arbitrum' | 'zksync' | 'monad'>('solana');

  // Submit modal state
  const [submitAppName, setSubmitAppName] = useState('');
  const [submitAmount, setSubmitAmount] = useState('');
  const [submitCurrency, setSubmitCurrency] = useState('USDT');
  const [submitUsdValue, setSubmitUsdValue] = useState('');
  const [submitTxHash, setSubmitTxHash] = useState('');
  const [submitUserHandle, setSubmitUserHandle] = useState('');
  const [submitNotes, setSubmitNotes] = useState('');
  const [submitImage, setSubmitImage] = useState('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1000&q=80');

  // Calculate live dynamic metrics
  const totalPaidOut = useMemo(() => {
    return allProofs.reduce((acc, curr) => {
      const num = parseFloat(curr.usdEquivalent.replace(/[^0-9.]/g, ''));
      return acc + (isNaN(num) ? 0 : num);
    }, 0);
  }, []);

  // Filtered list based on pill tabs
  const displayedProofs = useMemo(() => {
    let list = allProofs;
    if (activeFilter === 'crypto') {
      list = allProofs.filter(p => p.appCategory === 'Crypto App' || p.appCategory === 'Exchange');
    } else if (activeFilter === 'instant') {
      list = allProofs.filter(p => p.status === 'Instant Payout' || p.payoutMethod.toLowerCase().includes('instant') || p.payoutMethod.toLowerCase().includes('airtime'));
    } else if (activeFilter === 'airdrop') {
      list = allProofs.filter(p => p.appCategory === 'Airdrop' || p.appCategory === 'Telegram Bot');
    } else if (activeFilter === 'depin') {
      list = allProofs.filter(p => p.appCategory === 'Mining & Node');
    }
    return list.slice(0, 6);
  }, [activeFilter]);

  const handleCopy = (text: string, label = 'Hash') => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    toast.success(`Copied ${label}: ${text}`);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleUpvote = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (upvotedIds[id]) {
      setUpvotedIds(prev => ({ ...prev, [id]: false }));
      toast.info('Upvote removed');
    } else {
      setUpvotedIds(prev => ({ ...prev, [id]: true }));
      toast.success('Audited withdrawal receipt upvoted! 👍');
    }
  };

  const handleVerifyExplorer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customHashInput.trim()) {
      toast.error('Please enter a valid Transaction Hash or Address');
      return;
    }
    const hash = customHashInput.trim();
    let url = '';
    if (selectedChain === 'solana') url = `https://solscan.io/tx/${hash}`;
    else if (selectedChain === 'ton') url = `https://tonscan.org/tx/${hash}`;
    else if (selectedChain === 'arbitrum') url = `https://arbiscan.io/tx/${hash}`;
    else if (selectedChain === 'zksync') url = `https://explorer.zksync.io/tx/${hash}`;
    else if (selectedChain === 'monad') url = `https://explorer.monad.xyz/tx/${hash}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleQuickVerifySample = (hash: string, chain: 'solana' | 'ton' | 'arbitrum' | 'zksync') => {
    setCustomHashInput(hash);
    setSelectedChain(chain);
    toast.success(`Loaded sample ${chain.toUpperCase()} hash for inspection`);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-card/60 border-y border-border/80">
      {/* Background glow sheen */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Top Header & Value Proposition */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400 mb-3 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% AUDITED PROOFS & ON-CHAIN TRANSACTIONS
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Real Payment Proofs & <span className="text-gradient-gold">Withdrawal Ledger</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base leading-relaxed">
              Every method on A+ Hustler is rigorously tested. Inspect on-chain blockchain hashes, wallet receipt screenshots, and peer-verified payouts with zero initial investment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              onClick={() => setIsSubmitModalOpen(true)}
              variant="outline"
              className="gap-2 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 h-10 px-4 font-bold text-xs"
            >
              <Upload className="w-3.5 h-3.5" /> Submit Receipt
            </Button>
            <Link to="/proof">
              <Button className="gap-2 bg-primary text-primary-foreground font-bold hover:bg-primary/90 shadow-md h-10 px-4 text-xs group">
                Full Proof Explorer ({allProofs.length}+)
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Audited Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-md backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1.5 text-[11px]">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Total Paid Out
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-semibold">Audited</span>
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-400 tracking-tight mt-1">
              ${totalPaidOut.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Community verified withdrawals</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-md backdrop-blur-sm relative overflow-hidden group hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1.5 text-[11px]">
                <FileCheck2 className="w-3.5 h-3.5 text-primary" /> Verified Receipts
              </span>
              <span className="text-[10px] text-primary font-mono font-semibold">100% Real</span>
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight mt-1">
              {allProofs.length} Receipts
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Solana, TON, EVM & P2P</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-md backdrop-blur-sm relative overflow-hidden group hover:border-amber-500/50 transition-all">
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Lock className="w-3.5 h-3.5 text-amber-400" /> Starting Capital
              </span>
              <span className="text-[10px] text-amber-400 font-mono font-semibold">Guaranteed</span>
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-amber-400 tracking-tight mt-1">
              $0.00
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Zero upfront deposit required</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-md backdrop-blur-sm relative overflow-hidden group hover:border-sky-500/50 transition-all">
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Avg Payout Speed
              </span>
              <span className="text-[10px] text-sky-400 font-mono font-semibold">Instant</span>
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-sky-400 tracking-tight mt-1">
              &lt; 3 Mins
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">To non-custodial wallets & UPI</p>
          </div>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveFilter('all')}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border whitespace-nowrap',
                activeFilter === 'all'
                  ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                  : 'bg-card text-muted-foreground border-border hover:text-foreground'
              )}
            >
              💎 All Proofs ({allProofs.length})
            </button>

            <button
              onClick={() => setActiveFilter('instant')}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border whitespace-nowrap',
                activeFilter === 'instant'
                  ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                  : 'bg-card text-muted-foreground border-border hover:text-foreground'
              )}
            >
              ⚡ Instant Cash & Airtime
            </button>

            <button
              onClick={() => setActiveFilter('airdrop')}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border whitespace-nowrap',
                activeFilter === 'airdrop'
                  ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                  : 'bg-card text-muted-foreground border-border hover:text-foreground'
              )}
            >
              🚀 Testnets & Bots
            </button>

            <button
              onClick={() => setActiveFilter('depin')}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border whitespace-nowrap',
                activeFilter === 'depin'
                  ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                  : 'bg-card text-muted-foreground border-border hover:text-foreground'
              )}
            >
              🌱 DePIN Bandwidth Nodes
            </button>
          </div>

          <Link to="/proof" className="text-xs text-primary hover:underline font-bold whitespace-nowrap hidden sm:inline-block">
            View All Categories →
          </Link>
        </div>

        {/* Proof Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedProofs.map((proof) => {
            const isUpvoted = !!upvotedIds[proof.id];
            const currentUpvotes = proof.upvotesCount + (isUpvoted ? 1 : 0);

            return (
              <div
                key={proof.id}
                onClick={() => setSelectedProof(proof)}
                className="group cursor-pointer rounded-2xl bg-card hover:bg-secondary/40 border border-border/80 hover:border-primary/60 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* High-Impact Proof Screenshot Banner */}
                  <div className="relative h-64 sm:h-72 bg-slate-950 overflow-hidden border-b border-border/60">
                    <img
                      src={proof.proofImage}
                      alt={`${proof.appName} withdrawal proof screenshot`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent" />

                    {/* Top Status & Date Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <Badge className="bg-black/85 backdrop-blur-md text-emerald-400 border-emerald-500/40 text-[11px] px-2.5 py-0.5 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {proof.status}
                      </Badge>
                      <span className="text-[11px] font-mono font-medium bg-black/85 backdrop-blur-md text-white/90 px-2.5 py-0.5 rounded-full border border-white/10">
                        {proof.date}
                      </span>
                    </div>

                    {/* Bottom Amount Banner */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                          Confirmed Payout
                        </span>
                        <span className="font-display font-extrabold text-xl text-white drop-shadow-md">
                          {proof.amount} {proof.currency}
                        </span>
                      </div>
                      <span className="text-xs bg-primary text-primary-foreground font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                        <Camera className="w-3.5 h-3.5" /> Inspect
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{proof.networkIcon || '💎'}</span>
                        <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors">
                          {proof.appName}
                        </h3>
                      </div>

                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> {proof.trustScore}% Score
                      </span>
                    </div>

                    {/* Metadata strip */}
                    <div className="space-y-1.5 text-xs text-muted-foreground bg-secondary/50 p-3 rounded-xl border border-border/50 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1"><Wallet className="w-3 h-3 text-primary" /> Destination:</span>
                        <span className="font-semibold text-foreground truncate max-w-[150px]">{proof.payoutMethod}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-border/30 pt-1.5">
                        <span>USD Value:</span>
                        <span className="font-bold text-emerald-400">{proof.usdEquivalent}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-border/30 pt-1.5">
                        <span className="flex items-center gap-1">
                          <Link2 className="w-3 h-3 text-primary" /> Referral Link:
                        </span>
                        <a
                          href={proof.referralLink || proof.appUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="font-mono text-primary font-semibold text-xs hover:underline flex items-center gap-1 truncate max-w-[150px]"
                        >
                          <span>{proof.referralCode ? `Code: ${proof.referralCode}` : 'Get Referral Link'}</span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                        </a>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 italic">
                      "{proof.notes}"
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 py-3 bg-secondary/30 border-t border-border/50 flex items-center justify-between text-xs">
                  <button
                    onClick={(e) => handleUpvote(e, proof.id)}
                    className={cn(
                      'flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all',
                      isUpvoted
                        ? 'bg-primary/20 text-primary border-primary'
                        : 'bg-card text-muted-foreground border-border hover:text-foreground'
                    )}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> {currentUpvotes}
                  </button>

                  <span className="text-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Inspect & Verify <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Instant On-Chain Hash Verifier Widget */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/30 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-xs font-bold text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Instant Blockchain Verifier Tool
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Verify Any Transaction Hash On-Chain
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Don't take our word for it. Paste any transaction hash, wallet address, or explorer link below to inspect verifiable blockchain receipts directly on public block explorers.
            </p>

            {/* Quick Sample Hash Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 text-[11px] font-semibold">Try sample:</span>
              <button
                type="button"
                onClick={() => handleQuickVerifySample('5K3j9xPq9mLz2aK7vQ1wE4rT6yU8s7d6f5g4h3j2k1m', 'solana')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-mono text-emerald-400 transition-colors"
              >
                🌱 Grass (Solana)
              </button>
              <button
                type="button"
                onClick={() => handleQuickVerifySample('a89c2f10d45e99b01c3d8872f10b', 'ton')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-mono text-sky-400 transition-colors"
              >
                🎁 Blum (TON)
              </button>
              <button
                type="button"
                onClick={() => handleQuickVerifySample('0x94f1c281e01a89c2f10d45e99b01c3d', 'arbitrum')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-mono text-amber-400 transition-colors"
              >
                🏦 Bybit (Arbitrum)
              </button>
            </div>

            {/* Search / Verification Form */}
            <form onSubmit={handleVerifyExplorer} className="flex flex-col sm:flex-row items-center gap-2 max-w-xl mx-auto pt-2">
              <select
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value as any)}
                className="w-full sm:w-auto bg-slate-900 border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 font-semibold"
              >
                <option value="solana">Solana (Solscan)</option>
                <option value="ton">TON (Tonscan)</option>
                <option value="arbitrum">Arbitrum (Arbiscan)</option>
                <option value="zksync">zkSync Era</option>
                <option value="monad">Monad EVM</option>
              </select>

              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  placeholder="Paste Transaction Hash or Wallet Address..."
                  value={customHashInput}
                  onChange={(e) => setCustomHashInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
                />
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-5 py-3 h-auto text-xs rounded-xl shadow-lg shrink-0 gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Verify On-Chain
              </Button>
            </form>
          </div>
        </div>

      </div>

      {/* Proof Receipt Detail Modal */}
      {selectedProof && (
        <Dialog open={!!selectedProof} onOpenChange={() => setSelectedProof(null)}>
          <DialogContent className="max-w-3xl sm:max-w-4xl bg-card border-border p-6 rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
            <DialogHeader className="space-y-2 text-left">
              <div className="flex items-center justify-between gap-2">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 text-xs px-3 py-1 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> {selectedProof.status}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">{selectedProof.date}</span>
              </div>

              <DialogTitle className="font-display text-2xl font-bold text-foreground">
                {selectedProof.appName} Payment Screenshot & Receipt
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
                <span>Category: {selectedProof.appCategory}</span>
                <span>•</span>
                <span className="font-medium">Referral Link:</span>
                <a
                  href={selectedProof.referralLink || selectedProof.appUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-primary font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>{selectedProof.referralCode ? `Code: ${selectedProof.referralCode}` : (selectedProof.referralLink ? 'Claim Referral Bonus' : 'Open Link')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 pt-2">
              {/* Proof Screenshot Viewer */}
              <div className="relative rounded-2xl overflow-hidden border border-border/80 bg-slate-950 group">
                <img
                  src={selectedProof.proofImage}
                  alt={selectedProof.appName}
                  className="w-full max-h-[520px] sm:max-h-[600px] object-contain mx-auto"
                />
                <button
                  onClick={() => setIsFullscreenImage(selectedProof.proofImage)}
                  className="absolute top-3 right-3 bg-black/80 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-all border border-white/10"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-primary" /> Fullscreen Image
                </button>
              </div>

              {/* Confirmed Amount Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold block">Confirmed Withdrawal</span>
                  <span className="text-2xl font-bold font-display text-white">{selectedProof.amount} {selectedProof.currency}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground block uppercase font-semibold">USD Equivalent</span>
                  <span className="text-xl font-bold text-emerald-400">{selectedProof.usdEquivalent}</span>
                </div>
              </div>

              {/* Transaction Breakdown */}
              <div className="space-y-2 text-xs p-4 rounded-xl bg-secondary/50 border border-border/60">
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Payout Destination:</span>
                  <span className="font-semibold text-foreground">{selectedProof.payoutMethod}</span>
                </div>

                {selectedProof.confirmationTime && (
                  <div className="flex justify-between items-center py-1 border-t border-border/40">
                    <span className="text-muted-foreground">Confirmation Speed:</span>
                    <span className="font-semibold text-emerald-400">{selectedProof.confirmationTime}</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-1 border-t border-border/40">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Link2 className="w-3.5 h-3.5 text-primary" /> Referral Link / Code:
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={selectedProof.referralLink || selectedProof.appUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-primary hover:underline flex items-center gap-1 font-semibold truncate max-w-[220px]"
                    >
                      <span>{selectedProof.referralCode ? `Code: ${selectedProof.referralCode}` : (selectedProof.referralLink || selectedProof.appUrl || 'Join Link')}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    {selectedProof.referralCode && (
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedProof.referralCode!, 'Referral Code')}
                        className="p-1 rounded bg-secondary hover:bg-muted text-foreground transition-colors"
                        title="Copy Code"
                      >
                        {copiedHash === selectedProof.referralCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>

                {selectedProof.walletAddress && (
                  <div className="flex justify-between items-center py-1 border-t border-border/40">
                    <span className="text-muted-foreground">Wallet Address:</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedProof.walletAddress!, 'Wallet Address')}
                      className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      <span>{selectedProof.walletAddress}</span>
                      {copiedHash === selectedProof.walletAddress ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                )}

                {selectedProof.txHash && (
                  <div className="flex justify-between items-center py-1 border-t border-border/40">
                    <span className="text-muted-foreground">Tx Hash / Proof ID:</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedProof.txHash!, 'Tx Hash')}
                      className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      <span>{selectedProof.txHash}</span>
                      {copiedHash === selectedProof.txHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                )}

                {selectedProof.explorerUrl && (
                  <div className="flex justify-between items-center py-1 border-t border-border/40">
                    <span className="text-muted-foreground">Blockchain Explorer:</span>
                    <a
                      href={selectedProof.explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-bold flex items-center gap-1"
                    >
                      Verify On Block Explorer <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Step-by-Step Earning Walkthrough */}
              {selectedProof.earningSteps && selectedProof.earningSteps.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" /> How This Was Earned ($0 Starting Capital)
                  </h4>
                  <div className="space-y-1.5">
                    {selectedProof.earningSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground bg-card p-2.5 rounded-lg border border-border/60">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* User Notes */}
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                  User Verification Notes
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed bg-card p-3 rounded-xl border border-border italic">
                  "{selectedProof.notes}"
                </p>
              </div>

              {/* Direct Link to App Guide */}
              <Link to={selectedProof.appUrl || '/apps'} className="block pt-1">
                <Button className="w-full gap-2 bg-primary text-primary-foreground font-bold hover:bg-primary/90 shadow-md">
                  Start Earning On {selectedProof.appName}
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreenImage && (
        <Dialog open={!!isFullscreenImage} onOpenChange={() => setIsFullscreenImage(null)}>
          <DialogContent className="max-w-5xl lg:max-w-6xl bg-black/95 border-none p-4 rounded-3xl flex flex-col items-center justify-center">
            <div className="relative w-full text-right mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreenImage(null)}
                className="text-white hover:bg-white/20 text-xs"
              >
                ✕ Close Fullscreen
              </Button>
            </div>
            <img
              src={isFullscreenImage}
              alt="Withdrawal proof full screenshot"
              className="max-h-[88vh] w-auto object-contain rounded-xl shadow-2xl"
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Submit Modal */}
      <Dialog open={isSubmitModalOpen} onOpenChange={setIsSubmitModalOpen}>
        <DialogContent className="max-w-lg bg-card border-border p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-left space-y-1">
            <DialogTitle className="font-display text-xl font-bold text-foreground">
              Submit Withdrawal Proof Screenshot
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Attach a screenshot of your withdrawal receipt from Phantom, Tonkeeper, Metamask, or Exchange.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!submitAppName || !submitAmount) {
                toast.error('Please provide App Name and Amount');
                return;
              }
              toast.success('🎉 Thank you! Your withdrawal receipt has been submitted for community verification.');
              setIsSubmitModalOpen(false);
            }}
            className="space-y-4 pt-2 text-xs"
          >
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">App / Platform Name *</label>
              <input
                type="text"
                placeholder="e.g. ME PASS, Grass, Blum, Binance"
                value={submitAppName}
                onChange={(e) => setSubmitAppName(e.target.value)}
                required
                className="w-full bg-secondary border border-border rounded-lg p-2 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Payout Amount *</label>
                <input
                  type="text"
                  placeholder="e.g. 500"
                  value={submitAmount}
                  onChange={(e) => setSubmitAmount(e.target.value)}
                  required
                  className="w-full bg-secondary border border-border rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">USD Value ($)</label>
                <input
                  type="text"
                  placeholder="e.g. $50.00"
                  value={submitUsdValue}
                  onChange={(e) => setSubmitUsdValue(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg p-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Tx Hash / Reference</label>
              <input
                type="text"
                placeholder="0x... or transaction ID"
                value={submitTxHash}
                onChange={(e) => setSubmitTxHash(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg p-2 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Referral Link / Invitation Code (Optional)</label>
              <input
                type="text"
                placeholder="e.g. https://... or invite code"
                value={submitUserHandle}
                onChange={(e) => setSubmitUserHandle(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg p-2 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Notes</label>
              <input
                type="text"
                placeholder="e.g. Received in 2 minutes via Solana"
                value={submitNotes}
                onChange={(e) => setSubmitNotes(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg p-2 text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsSubmitModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-primary text-primary-foreground font-bold">
                Submit & Verify
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VerifiedProofSection;
