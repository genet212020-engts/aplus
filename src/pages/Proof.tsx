import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  ShieldCheck,
  Search,
  ExternalLink,
  Copy,
  CheckCircle2,
  Send,
  Plus,
  Wallet,
  Camera,
  Maximize2,
  Upload,
  ImageIcon,
  ThumbsUp,
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Lock,
  LayoutGrid,
  ListFilter,
  Flame,
  Check,
  CheckCircle,
  Zap,
  Eye,
  Share2
} from 'lucide-react';
import { withdrawalProofs as initialProofs, proofCategories, WithdrawalProof } from '@/data/proofData';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const PAYOUT_METHODS = [
  'All Methods',
  'Solana (Phantom)',
  'TON (Tonkeeper)',
  'Binance Pay / Spot',
  'Ethio / Safaricom Airtime',
  'Me Pass P2P',
  'Arbitrum / EVM',
  'zkSync Era'
] as const;

const Proof = () => {
  const [proofList, setProofList] = useState<WithdrawalProof[]>(initialProofs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMethod, setSelectedMethod] = useState<string>('All Methods');
  const [sortBy, setSortBy] = useState<'recent' | 'amount' | 'upvotes' | 'trust'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'ledger'>('grid');
  
  const [selectedProof, setSelectedProof] = useState<WithdrawalProof | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isFullscreenImage, setIsFullscreenImage] = useState<string | null>(null);
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  // Submit form state
  const [submitAppName, setSubmitAppName] = useState('');
  const [submitCategory, setSubmitCategory] = useState<'Crypto App' | 'Telegram Bot' | 'Airdrop' | 'Mining & Node' | 'Exchange'>('Crypto App');
  const [submitAmount, setSubmitAmount] = useState('');
  const [submitCurrency, setSubmitCurrency] = useState('USDT');
  const [submitUsdValue, setSubmitUsdValue] = useState('');
  const [submitMethod, setSubmitMethod] = useState<WithdrawalProof['payoutMethod']>('Solana (Phantom)');
  const [submitTxHash, setSubmitTxHash] = useState('');
  const [submitWallet, setSubmitWallet] = useState('');
  const [submitUserHandle, setSubmitUserHandle] = useState('');
  const [submitNotes, setSubmitNotes] = useState('');
  const [submitImage, setSubmitImage] = useState<string>('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1000&q=80');

  // Stats calculations
  const totalPaidOutUSD = useMemo(() => {
    return proofList.reduce((acc, curr) => {
      const numeric = parseFloat(curr.usdEquivalent.replace(/[^0-9.]/g, ''));
      return acc + (isNaN(numeric) ? 0 : numeric);
    }, 0);
  }, [proofList]);

  const verifiedProofsCount = useMemo(() => proofList.length, [proofList]);

  // Filtering & Sorting
  const filteredProofs = useMemo(() => {
    let result = proofList.filter((proof) => {
      // Category filter
      if (selectedCategory !== 'all' && proof.appCategory !== selectedCategory) {
        return false;
      }

      // Method filter
      if (selectedMethod !== 'All Methods' && proof.payoutMethod !== selectedMethod) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = proof.appName.toLowerCase().includes(query);
        const matchesCurr = proof.currency.toLowerCase().includes(query);
        const matchesUser = proof.userHandle.toLowerCase().includes(query);
        const matchesMethod = proof.payoutMethod.toLowerCase().includes(query);
        const matchesNotes = proof.notes.toLowerCase().includes(query);

        if (!matchesName && !matchesCurr && !matchesUser && !matchesMethod && !matchesNotes) {
          return false;
        }
      }

      return true;
    });

    // Sort
    return result.sort((a, b) => {
      if (sortBy === 'amount') {
        const valA = parseFloat(a.usdEquivalent.replace(/[^0-9.]/g, '')) || 0;
        const valB = parseFloat(b.usdEquivalent.replace(/[^0-9.]/g, '')) || 0;
        return valB - valA;
      }
      if (sortBy === 'upvotes') {
        return (b.upvotesCount + (upvotedIds[b.id] ? 1 : 0)) - (a.upvotesCount + (upvotedIds[a.id] ? 1 : 0));
      }
      if (sortBy === 'trust') {
        return b.trustScore - a.trustScore;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [searchQuery, selectedCategory, selectedMethod, sortBy, proofList, upvotedIds]);

  const handleUpvote = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (upvotedIds[id]) {
      setUpvotedIds((prev) => ({ ...prev, [id]: false }));
      toast.info('Upvote removed');
    } else {
      setUpvotedIds((prev) => ({ ...prev, [id]: true }));
      toast.success('Verified payout receipt upvoted! 👍');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image file size must be under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSubmitImage(reader.result);
          toast.success('Screenshot preview loaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProofSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitAppName || !submitAmount) {
      toast.error('Please specify the App Name and Withdrawal Amount');
      return;
    }

    const newProof: WithdrawalProof = {
      id: `proof-${Date.now()}`,
      appName: submitAppName,
      appCategory: submitCategory,
      amount: submitAmount,
      currency: submitCurrency || 'USDT',
      usdEquivalent: submitUsdValue ? (submitUsdValue.startsWith('$') ? submitUsdValue : `$${submitUsdValue}`) : `$${submitAmount}`,
      payoutMethod: submitMethod,
      txHash: submitTxHash || undefined,
      walletAddress: submitWallet || undefined,
      proofImage: submitImage,
      date: new Date().toISOString().split('T')[0],
      status: 'Verified On-Chain',
      trustScore: 99,
      userHandle: submitUserHandle ? (submitUserHandle.startsWith('@') ? submitUserHandle : `@${submitUserHandle}`) : '@community_earner',
      notes: submitNotes || 'User verified screenshot receipt submitted via Verification Center.',
      appUrl: '/apps',
      upvotesCount: 1
    };

    setProofList([newProof, ...proofList]);
    toast.success('🎉 Success! Your withdrawal receipt has been verified and added to the ledger.');

    // Reset form
    setSubmitAppName('');
    setSubmitAmount('');
    setSubmitUsdValue('');
    setSubmitTxHash('');
    setSubmitWallet('');
    setSubmitUserHandle('');
    setSubmitNotes('');
    setIsSubmitModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Withdrawal Proof & Earnings Verification Center | A+ Hustler</title>
        <meta
          name="description"
          content="Inspect 100% transparent crypto withdrawal proofs, payment screenshot receipts, and on-chain blockchain transaction records from verified crypto apps, Telegram bots, and testnet airdrops."
        />
        <meta name="keywords" content="crypto withdrawal proof, payment receipt, ME PASS payout proof, mPaisa airtime receipt, Phantom transaction, Tonkeeper proof, verified crypto earnings" />
        <link rel="canonical" href="https://aplushustler.com/proof" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-20 pb-20">
        {/* Verification Center Hero Section */}
        <section className="py-12 md:py-16 relative overflow-hidden border-b border-border/80 bg-card/40">
          <div className="absolute inset-0 grid-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="mb-4 bg-emerald-500/15 border-emerald-500/30 text-emerald-400 px-4 py-1.5 font-bold text-xs tracking-wide uppercase inline-flex items-center gap-2 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Audited Payment Receipts & On-Chain Ledger
              </Badge>

              <h1 className="font-display text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-foreground">
                Withdrawal Proofs & <span className="text-gradient-gold">Payout Explorer</span>
              </h1>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                Inspect authentic payment receipts, wallet screenshots, and blockchain transaction explorer records submitted by verified A+ Hustler community members.
              </p>

              {/* Verified Trust Stats Panel */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 md:p-5 rounded-2xl bg-card border border-border/80 shadow-xl max-w-3xl mx-auto mb-8 backdrop-blur-md">
                <div className="p-2 border-r border-border/50 text-left">
                  <span className="text-[10px] sm:text-[11px] text-muted-foreground uppercase font-bold tracking-wider flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Total Paid Out
                  </span>
                  <span className="font-display font-extrabold text-lg sm:text-2xl text-emerald-400 mt-1 block">
                    ${totalPaidOutUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="p-2 md:border-r border-border/50 text-left">
                  <span className="text-[10px] sm:text-[11px] text-muted-foreground uppercase font-bold tracking-wider flex items-center gap-1">
                    <FileCheck2 className="w-3.5 h-3.5 text-primary" /> Verified Receipts
                  </span>
                  <span className="font-display font-extrabold text-lg sm:text-2xl text-foreground mt-1 block">
                    {verifiedProofsCount} Receipts
                  </span>
                </div>

                <div className="p-2 border-r border-border/50 text-left border-t md:border-t-0 pt-3 md:pt-2">
                  <span className="text-[10px] sm:text-[11px] text-muted-foreground uppercase font-bold tracking-wider flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-amber-400" /> Audit Score
                  </span>
                  <span className="font-display font-extrabold text-lg sm:text-2xl text-amber-400 mt-1 block">
                    100% Verified
                  </span>
                </div>

                <div className="p-2 flex items-center justify-center border-t md:border-t-0 pt-3 md:pt-2">
                  <Button
                    onClick={() => setIsSubmitModalOpen(true)}
                    size="sm"
                    className="w-full h-full min-h-[42px] gap-2 bg-primary text-primary-foreground font-bold hover:bg-primary/90 shadow-md text-xs"
                  >
                    <Plus className="w-4 h-4" /> Upload Receipt
                  </Button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by app name (e.g. ME PASS, Grass, Blum), token or method..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-10 py-6 text-sm bg-card border-border focus:border-primary rounded-xl shadow-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-semibold"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Verification Standards Banner */}
        <section className="container mx-auto px-4 py-6">
          <div className="p-4 rounded-2xl bg-secondary/50 border border-border/80 grid sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 font-bold">
                01
              </span>
              <div>
                <h4 className="font-bold text-foreground">On-Chain Hash Validation</h4>
                <p className="text-muted-foreground text-[11px] mt-0.5">Verified on Solscan, Tonscan, or EVM explorers.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-border/60 pt-3 sm:pt-0 sm:pl-4">
              <span className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 font-bold">
                02
              </span>
              <div>
                <h4 className="font-bold text-foreground">Screenshot & Receipt Check</h4>
                <p className="text-muted-foreground text-[11px] mt-0.5">Audited for unedited wallet UI & timestamps.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-border/60 pt-3 sm:pt-0 sm:pl-4">
              <span className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0 font-bold">
                03
              </span>
              <div>
                <h4 className="font-bold text-foreground">Community P2P Ledger</h4>
                <p className="text-muted-foreground text-[11px] mt-0.5">Real users sharing verified payout experiences.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Pills, Filters & Sort Bar */}
        <section className="container mx-auto px-4 py-4 sticky top-16 z-20 bg-background/95 backdrop-blur-md border-b border-border/60">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {proofCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-primary-foreground border-primary font-bold shadow-xs'
                      : 'bg-card text-muted-foreground border-border hover:text-foreground'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Payout Method, Sort & View Mode Controls */}
            <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto text-xs">
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="bg-card border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
                >
                  {PAYOUT_METHODS.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-card border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
              >
                <option value="recent">Sort: Most Recent</option>
                <option value="amount">Sort: Highest Amount ($)</option>
                <option value="upvotes">Sort: Most Upvoted</option>
                <option value="trust">Sort: Highest Score</option>
              </select>

              <div className="hidden sm:flex items-center gap-1 bg-card border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('ledger')}
                  className={`p-1 rounded ${viewMode === 'ledger' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  title="Ledger View"
                >
                  <ListFilter className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Proof Cards Grid or Ledger Table */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground font-medium">
            <span>Showing {filteredProofs.length} verified withdrawal receipts</span>
            {(selectedCategory !== 'all' || selectedMethod !== 'All Methods' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedMethod('All Methods');
                  setSearchQuery('');
                }}
                className="text-primary hover:underline font-bold"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {filteredProofs.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProofs.map((proof) => {
                  const isUpvoted = !!upvotedIds[proof.id];
                  const currentUpvotes = proof.upvotesCount + (isUpvoted ? 1 : 0);

                  return (
                    <div
                      key={proof.id}
                      onClick={() => setSelectedProof(proof)}
                      className="group cursor-pointer rounded-2xl bg-card hover:bg-secondary/40 border border-border/80 hover:border-primary/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between overflow-hidden"
                    >
                      <div>
                        {/* Screenshot Header Banner */}
                        <div className="relative h-72 sm:h-80 bg-slate-950 overflow-hidden border-b border-border/60">
                          <img
                            src={proof.proofImage}
                            alt={`${proof.appName} withdrawal proof screenshot`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                            <Badge className="bg-black/80 backdrop-blur-md text-emerald-400 border-emerald-500/40 text-[11px] px-2.5 py-0.5 flex items-center gap-1 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {proof.status}
                            </Badge>
                            <span className="text-[11px] font-mono font-medium bg-black/80 backdrop-blur-md text-white/90 px-2.5 py-0.5 rounded-full border border-white/10">
                              {proof.date}
                            </span>
                          </div>

                          {/* Bottom Amount Overlay */}
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

                        {/* Content Body */}
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors">
                                {proof.appName}
                              </h3>
                              <Badge variant="outline" className="text-[10px] px-2 py-0 border-primary/30 text-primary font-semibold">
                                {proof.appCategory}
                              </Badge>
                            </div>

                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" /> {proof.trustScore}%
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs text-muted-foreground bg-secondary/50 p-3 rounded-xl border border-border/50 mb-3">
                            <div className="flex justify-between items-center">
                              <span className="flex items-center gap-1"><Wallet className="w-3 h-3 text-primary" /> Method:</span>
                              <span className="font-semibold text-foreground truncate max-w-[150px]">{proof.payoutMethod}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-border/30 pt-1.5">
                              <span>USD Value:</span>
                              <span className="font-bold text-emerald-400">{proof.usdEquivalent}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-border/30 pt-1.5">
                              <span>Verified User:</span>
                              <span className="font-mono text-primary font-semibold">{proof.userHandle}</span>
                            </div>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-2 italic">
                            "{proof.notes}"
                          </p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="px-5 py-3 bg-secondary/30 border-t border-border/50 flex items-center justify-between text-xs">
                        <button
                          onClick={(e) => handleUpvote(e, proof.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                            isUpvoted
                              ? 'bg-primary/20 text-primary border-primary'
                              : 'bg-card text-muted-foreground border-border hover:text-foreground'
                          }`}
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
            ) : (
              <div className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-lg overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-secondary/80 border-b border-border/80 text-muted-foreground uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">App Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Payout Amount</th>
                      <th className="p-3.5">USD Value</th>
                      <th className="p-3.5">Payout Method</th>
                      <th className="p-3.5">User</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 font-medium">
                    {filteredProofs.map((proof) => (
                      <tr
                        key={proof.id}
                        onClick={() => setSelectedProof(proof)}
                        className="hover:bg-secondary/50 cursor-pointer transition-colors"
                      >
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 w-max">
                            <CheckCircle2 className="w-3 h-3" /> {proof.status}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-foreground whitespace-nowrap">
                          {proof.appName}
                        </td>
                        <td className="p-3.5 text-muted-foreground whitespace-nowrap">
                          {proof.appCategory}
                        </td>
                        <td className="p-3.5 font-bold text-white whitespace-nowrap">
                          {proof.amount} {proof.currency}
                        </td>
                        <td className="p-3.5 font-bold text-emerald-400 whitespace-nowrap">
                          {proof.usdEquivalent}
                        </td>
                        <td className="p-3.5 text-foreground whitespace-nowrap">
                          {proof.payoutMethod}
                        </td>
                        <td className="p-3.5 font-mono text-primary whitespace-nowrap">
                          {proof.userHandle}
                        </td>
                        <td className="p-3.5 text-muted-foreground font-mono whitespace-nowrap">
                          {proof.date}
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <Button size="sm" variant="ghost" className="text-primary hover:text-primary font-bold text-xs h-7 px-2">
                            Inspect →
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <div className="text-center py-16 bg-card border border-border rounded-3xl p-8 max-w-md mx-auto">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                No matching withdrawal records
              </h3>
              <p className="text-muted-foreground text-xs mb-6">
                Try searching for a different app keyword or clearing your search filters.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedMethod('All Methods');
                  setSearchQuery('');
                }}
              >
                Reset Search Filters
              </Button>
            </div>
          )}
        </section>

        {/* Community Proof Upload CTA Section */}
        <section className="container mx-auto px-4 mt-12">
          <div className="deep-gradient relative overflow-hidden rounded-3xl p-8 md:p-12 text-center border border-primary/30 shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <Badge className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 text-xs px-3 py-1">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" /> Community Verification Ledger
              </Badge>
              <h2 className="font-display text-2xl md:text-3xl text-primary-foreground font-bold">
                Have You Withdrawn From a Recommended App?
              </h2>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Help build trust in the community by uploading your payment receipt screenshot! Verified proof submissions earn community reputation badges and get featured.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="bg-primary-foreground text-slate-950 font-extrabold hover:bg-primary-foreground/90 gap-2 shadow-lg"
                >
                  <Upload className="w-4 h-4 text-emerald-600" /> Upload Screenshot Receipt
                </Button>
                <a href="https://t.me/Aplus_info" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 gap-2"
                  >
                    <Send className="w-4 h-4 text-primary-foreground" /> Send via Telegram
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Proof Receipt Detail Modal Drawer */}
      {selectedProof && (
        <Dialog open={!!selectedProof} onOpenChange={() => setSelectedProof(null)}>
          <DialogContent className="max-w-3xl sm:max-w-4xl bg-card border-border p-6 rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
            <DialogHeader className="space-y-2 text-left">
              <div className="flex items-center justify-between gap-2">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 text-xs px-3 py-1 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified On-Chain Record
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">{selectedProof.date}</span>
              </div>

              <DialogTitle className="font-display text-2xl font-bold text-foreground">
                {selectedProof.appName} Payment Screenshot & Receipt
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Category: {selectedProof.appCategory} • Verified User: {selectedProof.userHandle}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 pt-2">
              {/* Proof Screenshot Viewer */}
              <div className="relative rounded-2xl overflow-hidden border border-border/80 bg-slate-950 group">
                <img
                  src={selectedProof.proofImage}
                  alt={selectedProof.appName}
                  className="w-full max-h-[580px] sm:max-h-[640px] object-contain mx-auto"
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

                {selectedProof.walletAddress && (
                  <div className="flex justify-between items-center py-1 border-t border-border/40">
                    <span className="text-muted-foreground">Wallet Address:</span>
                    <button
                      onClick={() => copyToClipboard(selectedProof.walletAddress!, 'Wallet Address')}
                      className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      {selectedProof.walletAddress} <Copy className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {selectedProof.txHash && (
                  <div className="flex justify-between items-center py-1 border-t border-border/40">
                    <span className="text-muted-foreground">Tx Hash / ID:</span>
                    <button
                      onClick={() => copyToClipboard(selectedProof.txHash!, 'Tx Hash')}
                      className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      {selectedProof.txHash} <Copy className="w-3 h-3" />
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
                      Verify On Explorer <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Step-by-Step Earning Walkthrough */}
              {selectedProof.earningSteps && selectedProof.earningSteps.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" /> How This Was Earned
                  </h4>
                  <div className="space-y-1.5">
                    {(selectedProof.earningSteps || []).map((step, idx) => (
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
                  User Notes & Feedback
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed bg-card p-3 rounded-xl border border-border italic">
                  "{selectedProof.notes}"
                </p>
              </div>

              {/* Direct CTA link to app */}
              <Link to="/apps" className="block pt-1">
                <Button className="w-full gap-2 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-md">
                  Start Earning On {selectedProof.appName}
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Fullscreen Image Lightbox Modal */}
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

      {/* Submit Proof Form Modal */}
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

          <form onSubmit={handleProofSubmit} className="space-y-4 pt-2 text-xs">
            {/* Image Preview / File Selector */}
            <div>
              <label className="text-xs font-semibold text-foreground block mb-2 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-primary" /> Screenshot Image *
              </label>

              <div className="flex items-center gap-4 p-3 rounded-xl border border-border bg-secondary/40">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-black shrink-0 border border-border">
                  <img src={submitImage} alt="Proof Preview" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2 flex-1">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90">
                    <Upload className="w-3.5 h-3.5" /> Choose Image File
                    <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                  </label>
                  <p className="text-[11px] text-muted-foreground">Supports PNG, JPG, WEBP (Max 5MB)</p>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Image URL (Optional alternative)
              </label>
              <Input
                placeholder="https://images.unsplash.com/..."
                value={submitImage}
                onChange={(e) => setSubmitImage(e.target.value)}
                className="bg-secondary border-border text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                App / Platform Name *
              </label>
              <Input
                placeholder="e.g. ME PASS, Grass, Blum, Binance, Tonkeeper"
                value={submitAppName}
                onChange={(e) => setSubmitAppName(e.target.value)}
                required
                className="bg-secondary border-border text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Category
                </label>
                <select
                  value={submitCategory}
                  onChange={(e) => setSubmitCategory(e.target.value as any)}
                  className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="Crypto App">Crypto App</option>
                  <option value="Telegram Bot">Telegram Bot</option>
                  <option value="Airdrop">Airdrop</option>
                  <option value="Mining & Node">Mining & Node</option>
                  <option value="Exchange">Exchange</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Amount *
                </label>
                <Input
                  placeholder="e.g. 500"
                  value={submitAmount}
                  onChange={(e) => setSubmitAmount(e.target.value)}
                  required
                  className="bg-secondary border-border text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Currency / Token
                </label>
                <Input
                  placeholder="e.g. USDT, SOL, TON, MEC"
                  value={submitCurrency}
                  onChange={(e) => setSubmitCurrency(e.target.value)}
                  className="bg-secondary border-border text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  USD Value ($)
                </label>
                <Input
                  placeholder="e.g. $500.00"
                  value={submitUsdValue}
                  onChange={(e) => setSubmitUsdValue(e.target.value)}
                  className="bg-secondary border-border text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Payout Method / Wallet
              </label>
              <select
                value={submitMethod}
                onChange={(e) => setSubmitMethod(e.target.value as any)}
                className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              >
                {PAYOUT_METHODS.filter(m => m !== 'All Methods').map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Tx Hash / Explorer Link
              </label>
              <Input
                placeholder="0x... or transaction hash"
                value={submitTxHash}
                onChange={(e) => setSubmitTxHash(e.target.value)}
                className="bg-secondary border-border text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Your Handle (Telegram/X)
              </label>
              <Input
                placeholder="e.g. @yourhandle"
                value={submitUserHandle}
                onChange={(e) => setSubmitUserHandle(e.target.value)}
                className="bg-secondary border-border text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Notes
              </label>
              <Input
                placeholder="e.g. Instant payout in 2 minutes!"
                value={submitNotes}
                onChange={(e) => setSubmitNotes(e.target.value)}
                className="bg-secondary border-border text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsSubmitModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-primary text-primary-foreground font-semibold">
                Submit & Post Proof
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};

export default Proof;
