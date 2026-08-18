import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Download,
  Send,
  Info,
  Star,
  ShieldCheck,
  Gift,
  CheckCircle2,
  Bookmark,
  Share2,
  ExternalLink,
  Sparkles,
  Zap,
  TrendingUp,
  Globe,
  Play,
  Apple,
} from 'lucide-react';
import { AppItem } from '@/data/appData';
import { AppIconBadge } from '@/components/AppIconBadge';
import { ReferralCodeBox } from '@/components/ReferralCodeBox';
import { SocialShare } from '@/components/SocialShare';
import { cn } from '@/lib/utils';

export interface AppCardProps {
  app: AppItem;
  variant?: 'featured' | 'standard' | 'compact';
  onSelect: (app: AppItem) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string, e: React.MouseEvent) => void;
  className?: string;
}

export const getAppCategoryColor = (category: string) => {
  switch (category) {
    case 'Exchange':
      return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
    case 'Wallet':
      return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    case 'Telegram Bot':
      return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
    case 'DePIN & Mining':
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    case 'Tasks & Micro-Earning':
      return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
    default:
      return 'bg-primary/15 text-primary border-primary/30';
  }
};

export const AppCard: React.FC<AppCardProps> = ({
  app,
  variant = 'standard',
  onSelect,
  isBookmarked = false,
  onToggleBookmark,
  className,
}) => {
  const isFeatured = variant === 'featured' || app.featured;

  // Render Compact Variant (ideal for sidebars, lists, or home highlights)
  if (variant === 'compact') {
    return (
      <div
        onClick={() => onSelect(app)}
        className={cn(
          'group relative p-4 rounded-2xl bg-card border border-border/80 hover:border-primary/50 transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer shadow-xs hover:shadow-md',
          className
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <AppIconBadge
            icon={app.icon}
            name={app.name}
            category={app.category}
            verified={app.verified}
            size="sm"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                {app.name}
              </h4>
              {app.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground">
              <span className="flex items-center text-amber-400 font-bold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                {app.rating}
              </span>
              <span>•</span>
              <span className="truncate">{app.category}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-2.5 text-xs font-semibold hover:bg-primary/10 hover:text-primary hover:border-primary/40"
          >
            Details
          </Button>
        </div>
      </div>
    );
  }

  // Render Featured Card
  if (isFeatured) {
    return (
      <div
        className={cn(
          'group relative rounded-3xl surface-card hover-lift p-6 md:p-7 border border-border/90 hover:border-primary/60 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden',
          className
        )}
      >
        {/* Ambient background glow */}
        <div className="absolute -top-28 -right-28 w-56 h-56 bg-primary/15 rounded-full blur-3xl group-hover:bg-primary/25 transition-all duration-500 pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/15 transition-all duration-500 pointer-events-none" />

        <div>
          {/* Top meta ribbon */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={`${getAppCategoryColor(app.category)} font-bold text-xs px-2.5 py-0.5 shadow-xs`}>
                {app.category}
              </Badge>
              {app.earningPotential && (
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{app.earningPotential}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-slate-950" />
                Featured
              </span>

              {onToggleBookmark && (
                <button
                  type="button"
                  onClick={(e) => onToggleBookmark(app.id, e)}
                  className={cn(
                    'p-1.5 rounded-xl border transition-all duration-200 active:scale-95',
                    isBookmarked
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : 'bg-muted/50 border-border/70 text-muted-foreground hover:text-foreground hover:border-primary/40'
                  )}
                  title={isBookmarked ? 'Remove Bookmark' : 'Bookmark App'}
                >
                  <Bookmark className={cn('w-4 h-4', isBookmarked && 'fill-amber-400')} />
                </button>
              )}
            </div>
          </div>

          {/* App Brand Header */}
          <div className="flex items-start gap-4 mb-4">
            <div
              onClick={() => onSelect(app)}
              className="cursor-pointer shrink-0 transition-transform duration-300 group-hover:scale-105"
            >
              <AppIconBadge
                icon={app.icon}
                name={app.name}
                category={app.category}
                verified={app.verified}
                size="lg"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3
                onClick={() => onSelect(app)}
                className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span className="truncate">{app.name}</span>
                {app.verified && (
                  <span title="Audited & Verified" className="inline-flex shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </span>
                )}
              </h3>

              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                  {app.rating}
                </span>
                <span>•</span>
                <span>{app.reviewsCount} users</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {app.securityScore}% Trust Score
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {app.description}
          </p>

          {/* Welcome Bonus Notice */}
          {app.welcomeBonus && (
            <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-2.5 text-xs text-amber-300 font-medium">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                <Gift className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-bold text-amber-200 block text-[11px] uppercase tracking-wider">Welcome Reward</span>
                <span className="text-amber-300 font-semibold">{app.welcomeBonus}</span>
              </div>
            </div>
          )}

          {/* Highlights List */}
          {app.highlights && app.highlights.length > 0 && (
            <div className="mb-4 space-y-1.5 bg-secondary/30 p-3 rounded-2xl border border-border/50">
              {app.highlights.slice(0, 3).map((hl, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{hl}</span>
                </div>
              ))}
            </div>
          )}

          {/* Referral Code Box */}
          {app.referralCode && (
            <div className="mb-4">
              <ReferralCodeBox
                code={app.referralCode}
                appName={app.name}
                label="Exclusive Referral Code"
              />
            </div>
          )}

          {/* Official Verification Links Quick Bar */}
          <div className="mb-4 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mr-1">
              Official:
            </span>
            {app.officialWebsiteUrl && (
              <a
                href={app.officialWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Official Website"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/80 hover:bg-primary/20 text-muted-foreground hover:text-primary text-[11px] font-medium border border-border/60 transition-colors"
              >
                <Globe className="w-3 h-3 text-primary" />
                <span>Website</span>
              </a>
            )}
            {app.playStoreUrl && (
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Google Play Store"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/80 hover:bg-emerald-500/20 text-muted-foreground hover:text-emerald-400 text-[11px] font-medium border border-border/60 transition-colors"
              >
                <Play className="w-3 h-3 text-emerald-400" />
                <span>Play Store</span>
              </a>
            )}
            {app.appStoreUrl && (
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Apple App Store"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/80 hover:bg-sky-500/20 text-muted-foreground hover:text-sky-400 text-[11px] font-medium border border-border/60 transition-colors"
              >
                <Apple className="w-3 h-3 text-sky-400" />
                <span>App Store</span>
              </a>
            )}
            {app.telegramUrl && (
              <a
                href={app.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Official Telegram"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/80 hover:bg-sky-500/20 text-muted-foreground hover:text-sky-400 text-[11px] font-medium border border-border/60 transition-colors"
              >
                <Send className="w-3 h-3 text-sky-400" />
                <span>Telegram</span>
              </a>
            )}
          </div>

          {/* Tag Chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {(app.tags || []).slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-secondary/80 text-muted-foreground border border-border/60 font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="pt-3 border-t border-border/60">
          {app.telegramUrl ? (
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelect(app)}
                className="gap-1.5 text-xs font-semibold rounded-xl h-10 hover:bg-primary/10 hover:border-primary/40 hover:text-primary"
              >
                <Info className="w-3.5 h-3.5 text-primary" /> Guide & Steps
              </Button>
              <a href={app.telegramUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full gap-1.5 text-xs bg-sky-500 hover:bg-sky-600 text-white font-bold shadow-md h-10 rounded-xl">
                  <Send className="w-3.5 h-3.5" /> Launch Bot
                </Button>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelect(app)}
                className="gap-1.5 text-xs font-semibold rounded-xl h-10 hover:bg-primary/10 hover:border-primary/40 hover:text-primary"
              >
                <Info className="w-3.5 h-3.5 text-primary" /> Guide & Steps
              </Button>
              <a href={app.downloadUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full gap-1.5 text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md h-10 rounded-xl">
                  <Download className="w-3.5 h-3.5" /> Download
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render Standard Card
  return (
    <div
      className={cn(
        'group relative rounded-3xl surface-card hover-lift p-5 md:p-6 border border-border/80 hover:border-primary/50 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden',
        className
      )}
    >
      {/* Background soft ambient highlight */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/15 transition-all duration-500 pointer-events-none" />

      <div>
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="outline" className={`${getAppCategoryColor(app.category)} font-bold text-[11px] px-2 py-0.5 shadow-xs`}>
            {app.category}
          </Badge>

          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{app.rating}</span>
            </div>

            {onToggleBookmark && (
              <button
                type="button"
                onClick={(e) => onToggleBookmark(app.id, e)}
                className={cn(
                  'p-1.5 rounded-lg border transition-all duration-200 active:scale-95',
                  isBookmarked
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                    : 'bg-muted/40 border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40'
                )}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark App'}
              >
                <Bookmark className={cn('w-3.5 h-3.5', isBookmarked && 'fill-amber-400')} />
              </button>
            )}
          </div>
        </div>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            onClick={() => onSelect(app)}
            className="cursor-pointer shrink-0 transition-transform group-hover:scale-105"
          >
            <AppIconBadge
              icon={app.icon}
              name={app.name}
              category={app.category}
              verified={app.verified}
              size="md"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3
              onClick={() => onSelect(app)}
              className="font-display font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="truncate">{app.name}</span>
              {app.verified && (
                <span title="Audited & Verified" className="inline-flex shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </span>
              )}
            </h3>
            <span className="text-[11px] text-muted-foreground block truncate">
              {app.reviewsCount} users • {app.securityScore}% Security
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {app.description}
        </p>

        {/* Welcome Bonus Notice */}
        {app.welcomeBonus && (
          <div className="mb-3 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-xs text-amber-300 font-medium">
            <Gift className="w-3.5 h-3.5 shrink-0 text-amber-400" />
            <span className="truncate">{app.welcomeBonus}</span>
          </div>
        )}

        {/* Key Highlights */}
        {app.highlights && app.highlights.length > 0 && (
          <ul className="space-y-1 mb-3 text-[11px] text-muted-foreground">
            {app.highlights.slice(0, 2).map((item, i) => (
              <li key={i} className="flex items-center gap-1.5 truncate">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Referral Code (compact if present) */}
        {app.referralCode && (
          <div className="mb-3">
            <ReferralCodeBox
              code={app.referralCode}
              appName={app.name}
              label="Referral Code"
            />
          </div>
        )}

        {/* Official Links Quick Row */}
        {(app.officialWebsiteUrl || app.playStoreUrl || app.appStoreUrl || app.telegramUrl) && (
          <div className="mb-3 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mr-0.5">
              Official:
            </span>
            {app.officialWebsiteUrl && (
              <a
                href={app.officialWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Official Website"
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary/80 hover:bg-primary/20 text-muted-foreground hover:text-primary text-[10px] font-medium border border-border/50 transition-colors"
              >
                <Globe className="w-2.5 h-2.5 text-primary" />
                <span>Web</span>
              </a>
            )}
            {app.playStoreUrl && (
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Google Play Store"
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary/80 hover:bg-emerald-500/20 text-muted-foreground hover:text-emerald-400 text-[10px] font-medium border border-border/50 transition-colors"
              >
                <Play className="w-2.5 h-2.5 text-emerald-400" />
                <span>Play</span>
              </a>
            )}
            {app.appStoreUrl && (
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Apple App Store"
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary/80 hover:bg-sky-500/20 text-muted-foreground hover:text-sky-400 text-[10px] font-medium border border-border/50 transition-colors"
              >
                <Apple className="w-2.5 h-2.5 text-sky-400" />
                <span>iOS</span>
              </a>
            )}
            {app.telegramUrl && (
              <a
                href={app.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Official Telegram"
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary/80 hover:bg-sky-500/20 text-muted-foreground hover:text-sky-400 text-[10px] font-medium border border-border/50 transition-colors"
              >
                <Send className="w-2.5 h-2.5 text-sky-400" />
                <span>Telegram</span>
              </a>
            )}
          </div>
        )}

        {/* Tag chips */}
        <div className="flex flex-wrap gap-1 mb-4">
          {(app.tags || []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/80 text-muted-foreground border border-border/50 font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-border/50 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelect(app)}
          className="flex-1 text-xs font-semibold rounded-xl h-9 hover:bg-primary/10 hover:border-primary/40 hover:text-primary"
        >
          <Info className="w-3.5 h-3.5 mr-1 text-primary" /> Details
        </Button>

        {app.telegramUrl ? (
          <a href={app.telegramUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button size="sm" className="w-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl h-9">
              <Send className="w-3.5 h-3.5 mr-1" /> Bot
            </Button>
          </a>
        ) : (
          <a href={app.downloadUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-xl h-9">
              <Download className="w-3.5 h-3.5 mr-1" /> Get
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};
