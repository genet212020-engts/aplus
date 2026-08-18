import { useState } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, ExternalLink, Maximize2, Wallet, Copy, Link2 } from 'lucide-react';
import { withdrawalProofs, WithdrawalProof } from '@/data/proofData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface ProofTickerProps {
  className?: string;
}

const ProofTicker = ({ className = '' }: ProofTickerProps) => {
  const [selectedProof, setSelectedProof] = useState<WithdrawalProof | null>(null);
  const [isFullscreenImage, setIsFullscreenImage] = useState<string | null>(null);

  // Duplicate list to achieve continuous seamless loop
  const tickerItems = [...(withdrawalProofs || []), ...(withdrawalProofs || [])];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className={`w-full overflow-hidden bg-card/60 border border-border/80 rounded-3xl p-4 sm:p-6 shadow-xl backdrop-blur-md relative ${className}`}>
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-border/60 px-2">
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500/15 border-emerald-500/30 text-emerald-400 font-bold text-xs px-3 py-1 flex items-center gap-1.5 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Live Verified Withdrawal Proofs
          </Badge>
          <span className="text-[10px] text-muted-foreground font-mono hidden md:inline-block">
            • Hover to Pause • Auto Scrolling
          </span>
        </div>

        <Link
          to="/proof"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors group"
        >
          View Full Proof Ledger ({withdrawalProofs.length}+)
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Auto-moving horizontal marquee container */}
      <div className="relative w-full overflow-hidden py-2 mask-linear-gradient">
        {/* Subtle gradient overlays on edges for smooth fading */}
        <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee gap-4 flex items-center">
          {tickerItems.map((proof, index) => (
            <div
              key={`${proof.id}-${index}`}
              onClick={() => setSelectedProof(proof)}
              className="w-64 sm:w-72 shrink-0 rounded-2xl bg-secondary/60 hover:bg-secondary/90 border border-border/80 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer overflow-hidden group flex flex-col justify-between"
            >
              {/* Image banner */}
              <div className="relative h-36 bg-black overflow-hidden border-b border-border/40">
                <img
                  src={proof.proofImage}
                  alt={`${proof.appName} withdrawal proof`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1">
                  <span className="text-[9px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> {proof.status}
                  </span>
                  <span className="text-[9px] font-mono bg-black/80 text-slate-300 px-2 py-0.5 rounded-full border border-white/10">
                    {proof.date}
                  </span>
                </div>

                {/* Bottom Amount Banner */}
                <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between">
                  <div>
                    <span className="text-[9px] text-emerald-400 uppercase font-bold tracking-wider block">
                      Confirmed Payout
                    </span>
                    <span className="font-display font-extrabold text-sm text-white drop-shadow">
                      {proof.amount} {proof.currency}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-xs text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    {proof.usdEquivalent}
                  </span>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-xs text-foreground truncate group-hover:text-primary transition-colors">
                    {proof.appName}
                  </h4>
                  <span className="text-[10px] text-primary font-mono font-semibold truncate max-w-[100px]">
                    {proof.referralCode ? `Ref: ${proof.referralCode}` : (proof.userHandle || 'Verified')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/40">
                  <span className="truncate max-w-[140px] flex items-center gap-1">
                    <Wallet className="w-3 h-3 text-primary shrink-0" /> {proof.payoutMethod}
                  </span>
                  <span className="text-primary font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    Inspect <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proof Receipt Detail Dialog Modal */}
      {selectedProof && (
        <Dialog open={!!selectedProof} onOpenChange={() => setSelectedProof(null)}>
          <DialogContent className="max-w-2xl bg-card border-border p-6 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto z-50">
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
                  className="w-full max-h-[480px] object-contain mx-auto"
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

                <div className="flex justify-between items-center py-1 border-t border-border/40">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Link2 className="w-3.5 h-3.5 text-primary" /> Referral Link / Code:
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={selectedProof.referralLink || selectedProof.appUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-primary hover:underline flex items-center gap-1 font-semibold truncate max-w-[200px]"
                    >
                      <span>{selectedProof.referralCode ? `Code: ${selectedProof.referralCode}` : (selectedProof.referralLink || selectedProof.appUrl || 'Join Link')}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    {selectedProof.referralCode && (
                      <button
                        onClick={() => copyToClipboard(selectedProof.referralCode!, 'Referral Code')}
                        className="p-1 rounded bg-secondary hover:bg-muted text-foreground transition-colors"
                        title="Copy Code"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    )}
                  </div>
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

              {/* User Notes */}
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                  User Notes & Feedback
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed bg-card p-3 rounded-xl border border-border italic">
                  "{selectedProof.notes}"
                </p>
              </div>

              <Link to="/proof" className="block pt-1">
                <Button className="w-full gap-2 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-md">
                  View All Proofs on Full Ledger
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Lightbox Modal for Fullscreen Screenshot */}
      {isFullscreenImage && (
        <Dialog open={!!isFullscreenImage} onOpenChange={() => setIsFullscreenImage(null)}>
          <DialogContent className="max-w-5xl bg-black/95 border-none p-4 rounded-3xl flex flex-col items-center justify-center z-[60]">
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
              className="max-h-[85vh] w-auto object-contain rounded-xl shadow-2xl"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProofTicker;
