import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, CheckCircle2, DollarSign, Zap, ShieldAlert, Award, Clock, ArrowRight, Bookmark } from 'lucide-react';
import { Airdrop } from '@/data/airdropData';

interface AirdropCardProps {
  airdrop: Airdrop;
  onSelect: (airdrop: Airdrop) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string, e: React.MouseEvent) => void;
  isCompleted?: boolean;
}

export const AirdropCard: React.FC<AirdropCardProps> = ({
  airdrop,
  onSelect,
  isBookmarked = false,
  onToggleBookmark,
  isCompleted = false,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Hard':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-primary/15 text-primary border-primary/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'Ending Soon':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse';
      case 'Confirmed':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
      case 'Upcoming':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      default:
        return 'bg-secondary text-foreground border-border';
    }
  };

  return (
    <div
      onClick={() => onSelect(airdrop)}
      className="group relative cursor-pointer rounded-2xl surface-card hover-lift p-5 md:p-6 flex flex-col justify-between transition-all duration-300 border border-border/80 hover:border-primary/50 overflow-hidden"
    >
      {/* Background glow overlay */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />

      <div>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-muted to-muted/40 border border-border/50 flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300">
              {airdrop.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-bold text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
                  {airdrop.name}
                </h3>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  ${airdrop.ticker}
                </span>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                {airdrop.blockchain}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onToggleBookmark && (
              <button
                type="button"
                onClick={(e) => onToggleBookmark(airdrop.id, e)}
                className={`p-2 rounded-lg border transition-colors ${
                  isBookmarked
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                    : 'bg-muted/40 border-border/50 text-muted-foreground hover:text-foreground'
                }`}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Airdrop'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
              </button>
            )}

            {airdrop.isHot && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-amber-400" /> HOT
              </span>
            )}
          </div>
        </div>

        {/* Status & Funding row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="outline" className={`text-xs px-2.5 py-0.5 font-medium ${getStatusColor(airdrop.status)}`}>
            {airdrop.status}
          </Badge>
          <Badge variant="outline" className={`text-xs px-2.5 py-0.5 font-medium ${getDifficultyColor(airdrop.difficulty)}`}>
            {airdrop.difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs px-2.5 py-0.5 bg-secondary/80 text-foreground border-border/60">
            {airdrop.category}
          </Badge>
          {isCompleted && (
            <Badge variant="outline" className="text-xs px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border-emerald-500/40 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Done
            </Badge>
          )}
        </div>

        {/* Short description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {airdrop.shortDescription}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-card/60 border border-border/50 mb-5 text-xs">
          <div>
            <span className="text-muted-foreground block text-[11px]">Est. Reward</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
              <Award className="w-3.5 h-3.5" />
              {airdrop.estimatedReward}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[11px]">Cost</span>
            <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
              <DollarSign className="w-3.5 h-3.5 text-primary" />
              {airdrop.investmentRequired}
            </span>
          </div>
          {airdrop.funding && (
            <div className="col-span-2 pt-2 border-t border-border/40 flex justify-between items-center text-[11px]">
              <span className="text-muted-foreground">Funding Backing:</span>
              <span className="font-medium text-foreground truncate max-w-[200px]">
                {airdrop.funding}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex items-center justify-between gap-2 border-t border-border/40">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {airdrop.steps?.length || 0} Steps
        </span>

        <Button
          size="sm"
          className="gap-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30 transition-all font-semibold rounded-lg"
        >
          View Full Guide
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};
