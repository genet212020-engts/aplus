import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ExternalLink,
  CheckCircle2,
  Share2,
  Copy,
  DollarSign,
  Award,
  Zap,
  ShieldAlert,
  Calendar,
  Twitter,
  Disc as Discord,
  Send,
  Layers,
  ArrowUpRight,
  ListCheck,
  Bookmark
} from 'lucide-react';
import { Airdrop } from '@/data/airdropData';
import { toast } from 'sonner';

interface AirdropDetailModalProps {
  airdrop: Airdrop | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
  isCompleted?: boolean;
  onToggleCompleted?: (id: string) => void;
}

export const AirdropDetailModal: React.FC<AirdropDetailModalProps> = ({
  airdrop,
  isOpen,
  onClose,
  isBookmarked = false,
  onToggleBookmark,
  isCompleted = false,
  onToggleCompleted,
}) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (airdrop) {
      const savedSteps = localStorage.getItem(`airdrop_steps_${airdrop.id}`);
      if (savedSteps) {
        try {
          setCompletedSteps(JSON.parse(savedSteps));
        } catch {
          setCompletedSteps({});
        }
      } else {
        setCompletedSteps({});
      }
    }
  }, [airdrop]);

  if (!airdrop) return null;

  const toggleStep = (stepNumber: number) => {
    const updated = { ...completedSteps, [stepNumber]: !completedSteps[stepNumber] };
    setCompletedSteps(updated);
    localStorage.setItem(`airdrop_steps_${airdrop.id}`, JSON.stringify(updated));
    toast.success(`Step ${stepNumber} ${updated[stepNumber] ? 'marked as done' : 'unmarked'}`);
  };

  const copyShareLink = () => {
    const url = `${window.location.origin}/airdrops?id=${airdrop.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Airdrop link copied to clipboard!');
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const totalSteps = airdrop.steps?.length || 0;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border p-6 md:p-8 rounded-2xl shadow-2xl">
        <DialogHeader className="text-left space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-muted to-muted/30 border border-border flex items-center justify-center text-4xl shadow-inner shrink-0">
                {airdrop.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <DialogTitle className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {airdrop.name}
                  </DialogTitle>
                  <span className="text-sm font-mono font-bold px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/30">
                    ${airdrop.ticker}
                  </span>
                </div>
                <DialogDescription className="text-muted-foreground flex items-center gap-2 mt-1">
                  <Layers className="w-4 h-4 text-primary" />
                  <span>{airdrop.blockchain}</span>
                  <span>•</span>
                  <span>{airdrop.category}</span>
                </DialogDescription>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              {onToggleBookmark && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleBookmark(airdrop.id)}
                  className={`gap-1.5 ${
                    isBookmarked
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={copyShareLink}
                className="gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl bg-muted/30 border border-border/60 text-sm">
            <div>
              <span className="text-xs text-muted-foreground block">Estimated Reward</span>
              <span className="font-semibold text-emerald-400 text-base flex items-center gap-1 mt-0.5">
                <Award className="w-4 h-4" />
                {airdrop.estimatedReward}
              </span>
            </div>

            <div>
              <span className="text-xs text-muted-foreground block">Cost / Investment</span>
              <span className="font-semibold text-foreground text-base flex items-center gap-1 mt-0.5">
                <DollarSign className="w-4 h-4 text-primary" />
                {airdrop.investmentRequired}
              </span>
            </div>

            <div>
              <span className="text-xs text-muted-foreground block">Difficulty</span>
              <span className="font-semibold text-foreground text-base capitalize mt-0.5 block">
                {airdrop.difficulty}
              </span>
            </div>

            <div>
              <span className="text-xs text-muted-foreground block">Status</span>
              <span className="font-semibold text-primary text-base capitalize mt-0.5 block">
                {airdrop.status}
              </span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Funding & Description */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-base mb-2">
              About {airdrop.name}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              {airdrop.fullDescription}
            </p>

            {airdrop.funding && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                <Zap className="w-3.5 h-3.5" />
                <span>Raised Funding: {airdrop.funding}</span>
              </div>
            )}
          </div>

          {/* External official links */}
          <div className="p-4 rounded-xl surface-card border border-border/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2">
                Official Channels:
              </span>
              {airdrop.twitterUrl && (
                <a href={airdrop.twitterUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs hover:text-primary">
                    <Twitter className="w-3.5 h-3.5" /> X / Twitter
                  </Button>
                </a>
              )}
              {airdrop.discordUrl && (
                <a href={airdrop.discordUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs hover:text-primary">
                    <Discord className="w-3.5 h-3.5" /> Discord
                  </Button>
                </a>
              )}
              {airdrop.telegramUrl && (
                <a href={airdrop.telegramUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs hover:text-primary">
                    <Send className="w-3.5 h-3.5" /> Telegram
                  </Button>
                </a>
              )}
            </div>

            <a href={airdrop.airdropUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="gap-2 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-lg glow-gold">
                Participate Official Portal
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>

          {/* Requirements Checklist tags */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-2">
              Prerequisites & Requirements
            </h4>
            <div className="flex flex-wrap gap-2">
              {(airdrop.requirements || []).map((req) => (
                <Badge
                  key={req}
                  variant="outline"
                  className="bg-muted/40 text-muted-foreground border-border/60 text-xs px-3 py-1"
                >
                  ✓ {req}
                </Badge>
              ))}
            </div>
          </div>

          {/* Step-by-Step Interactive Guide */}
          <div className="border-t border-border/60 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                  <ListCheck className="w-5 h-5 text-primary" />
                  Step-by-Step Execution Guide
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Check off steps as you complete them to track your progress.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-primary">
                  {completedCount} / {(airdrop.steps || []).length} Done ({progressPercent}%)
                </span>
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {(airdrop.steps || []).map((step) => {
                const isStepDone = !!completedSteps[step.stepNumber];
                return (
                  <div
                    key={step.stepNumber}
                    className={`p-4 rounded-xl border transition-all ${
                      isStepDone
                        ? 'bg-emerald-500/5 border-emerald-500/30'
                        : 'bg-card/60 border-border/70 hover:border-border'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={`step-${airdrop.id}-${step.stepNumber}`}
                        checked={isStepDone}
                        onCheckedChange={() => toggleStep(step.stepNumber)}
                        className="mt-1 border-primary/50 data-[state=checked]:bg-primary"
                      />

                      <div className="flex-1">
                        <label
                          htmlFor={`step-${airdrop.id}-${step.stepNumber}`}
                          className={`font-semibold text-sm cursor-pointer block ${
                            isStepDone ? 'line-through text-muted-foreground' : 'text-foreground'
                          }`}
                        >
                          Step {step.stepNumber}: {step.title}
                        </label>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {step.description}
                        </p>

                        {step.link && (
                          <a
                            href={step.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2 font-medium"
                          >
                            Open Link <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Complete Airdrop Toggle */}
          {onToggleCompleted && (
            <div className="pt-4 flex justify-between items-center border-t border-border/60">
              <span className="text-sm text-muted-foreground">
                Finished all steps for this airdrop?
              </span>
              <Button
                variant={isCompleted ? 'outline' : 'gold'}
                onClick={() => {
                  onToggleCompleted(airdrop.id);
                  toast.success(
                    isCompleted
                      ? 'Marked as in progress'
                      : '🎉 Congratulations! Marked as completed.'
                  );
                }}
                className="gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                {isCompleted ? 'Completed (Click to Undo)' : 'Mark All Completed'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
