import React, { useState } from 'react';
import {
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  Send,
  Share2,
  MessageCircle,
  Check,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export interface SocialShareProps {
  title: string;
  description?: string;
  url?: string;
  variant?: 'inline' | 'compact' | 'card' | 'bar';
  showLabel?: boolean;
  className?: string;
  buttonSize?: 'sm' | 'default' | 'icon';
}

export const SocialShare: React.FC<SocialShareProps> = ({
  title,
  description = '',
  url,
  variant = 'inline',
  showLabel = true,
  className,
  buttonSize = 'sm',
}) => {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic share URL (fallback to current window location)
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  // Web Share API check
  const hasWebShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const handleNativeShare = async () => {
    if (hasWebShare) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: shareUrl,
        });
        toast.success('Shared successfully!');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          // Fallback to modal if native share fails
          setIsModalOpen(true);
        }
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard! 📋');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const sharePlatforms = [
    {
      name: 'X (Twitter)',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=AplusHustler`,
      bg: 'bg-black hover:bg-slate-900 text-white border-slate-800',
      hoverColor: 'hover:border-sky-500 hover:text-sky-400',
    },
    {
      name: 'Telegram',
      icon: Send,
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      bg: 'bg-[#229ED9]/15 hover:bg-[#229ED9]/25 text-[#229ED9] border-[#229ED9]/30',
      hoverColor: 'hover:border-[#229ED9] hover:text-[#229ED9]',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      bg: 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border-emerald-500/30',
      hoverColor: 'hover:border-emerald-400 hover:text-emerald-400',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      bg: 'bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 text-[#0A66C2] border-[#0A66C2]/30',
      hoverColor: 'hover:border-[#0A66C2] hover:text-[#0A66C2]',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bg: 'bg-[#1877F2]/15 hover:bg-[#1877F2]/25 text-[#1877F2] border-[#1877F2]/30',
      hoverColor: 'hover:border-[#1877F2] hover:text-[#1877F2]',
    },
  ];

  // Helper to open share window popup
  const openShareWindow = (shareLink: string, platformName: string) => {
    const width = 600;
    const height = 450;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open(
      shareLink,
      `Share on ${platformName}`,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  };

  // 1. Compact trigger button (Opens Modal or triggers Web Share)
  if (variant === 'compact') {
    return (
      <>
        <Button
          onClick={handleNativeShare}
          variant="outline"
          size={buttonSize}
          className={cn(
            'gap-1.5 border-border hover:border-primary/50 hover:bg-primary/10 transition-all font-semibold',
            className
          )}
          title="Share on Social Media"
        >
          <Share2 className="w-4 h-4 text-primary" />
          <span>Share</span>
        </Button>

        {/* Modal Fallback */}
        <ShareModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={title}
          description={description}
          shareUrl={shareUrl}
          copied={copied}
          onCopy={copyToClipboard}
          platforms={sharePlatforms}
          onPlatformClick={openShareWindow}
          onNativeShare={hasWebShare ? handleNativeShare : undefined}
        />
      </>
    );
  }

  // 2. Bar Variant (Card-like toolbar with quick actions)
  if (variant === 'bar') {
    return (
      <>
        <div
          className={cn(
            'flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-card border border-border/80 shadow-sm',
            className
          )}
        >
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Share2 className="w-4 h-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground">Share this Guide</span>
              <span className="text-[10px] text-muted-foreground">Spread verified financial alpha</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {sharePlatforms.slice(0, 4).map((p) => (
              <Tooltip key={p.name}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => openShareWindow(p.url, p.name)}
                    className={cn(
                      'p-2 rounded-xl border transition-all duration-200 active:scale-95',
                      p.bg,
                      p.hoverColor
                    )}
                    aria-label={`Share on ${p.name}`}
                  >
                    <p.icon className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  Share on {p.name}
                </TooltipContent>
              </Tooltip>
            ))}

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className={cn(
                    'p-2 rounded-xl border transition-all duration-200 active:scale-95 bg-secondary text-secondary-foreground border-border hover:border-primary/40',
                    copied && 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  )}
                  aria-label="Copy link"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {copied ? 'Copied!' : 'Copy Link'}
              </TooltipContent>
            </Tooltip>

            {hasWebShare && (
              <Button
                onClick={handleNativeShare}
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs font-bold bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>More</span>
              </Button>
            )}
          </div>
        </div>

        <ShareModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={title}
          description={description}
          shareUrl={shareUrl}
          copied={copied}
          onCopy={copyToClipboard}
          platforms={sharePlatforms}
          onPlatformClick={openShareWindow}
          onNativeShare={hasWebShare ? handleNativeShare : undefined}
        />
      </>
    );
  }

  // 3. Card Variant (Full promo box with QR, URL, and platform pills)
  if (variant === 'card') {
    return (
      <>
        <div
          className={cn(
            'p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-md space-y-4',
            className
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-foreground">Share with Friends & Hustlers</h4>
                <p className="text-xs text-muted-foreground">Help others discover verified earning opportunities</p>
              </div>
            </div>

            {hasWebShare && (
              <Button
                onClick={handleNativeShare}
                size="sm"
                variant="outline"
                className="gap-1.5 text-xs font-semibold border-primary/40 hover:bg-primary/10 text-primary"
              >
                <Share2 className="w-3.5 h-3.5" /> Web Share
              </Button>
            )}
          </div>

          {/* Social Platform Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {sharePlatforms.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => openShareWindow(p.url, p.name)}
                className={cn(
                  'flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all active:scale-95 shadow-xs',
                  p.bg,
                  p.hoverColor
                )}
              >
                <p.icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{p.name}</span>
              </button>
            ))}
          </div>

          {/* Direct Copy Bar */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-secondary/60 border border-border/80">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent px-3 text-xs text-muted-foreground font-mono focus:outline-none truncate"
            />
            <Button
              onClick={copyToClipboard}
              size="sm"
              className={cn(
                'gap-1.5 text-xs font-bold transition-all shadow-xs',
                copied
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
              )}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copied!
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5" /> Copy Link
                </>
              )}
            </Button>
          </div>
        </div>

        <ShareModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={title}
          description={description}
          shareUrl={shareUrl}
          copied={copied}
          onCopy={copyToClipboard}
          platforms={sharePlatforms}
          onPlatformClick={openShareWindow}
          onNativeShare={hasWebShare ? handleNativeShare : undefined}
        />
      </>
    );
  }

  // 4. Inline Variant (Default: Clean row of circular icons)
  return (
    <>
      <div className={cn('flex items-center gap-2 flex-wrap', className)}>
        {showLabel && (
          <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-primary" />
            <span>Share:</span>
          </span>
        )}

        {/* Native Web Share Button (if supported) */}
        {hasWebShare && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleNativeShare}
                className="p-2 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all duration-200 active:scale-95 shadow-xs"
                aria-label="Share via device menu"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Device Share Menu
            </TooltipContent>
          </Tooltip>
        )}

        {/* Social Platforms */}
        {sharePlatforms.map((link) => (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => openShareWindow(link.url, link.name)}
                className={cn(
                  'p-2 rounded-xl border transition-all duration-200 active:scale-95 shadow-xs',
                  link.bg,
                  link.hoverColor
                )}
                aria-label={`Share on ${link.name}`}
              >
                <link.icon className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Share on {link.name}
            </TooltipContent>
          </Tooltip>
        ))}

        {/* Copy Link Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={copyToClipboard}
              className={cn(
                'p-2 rounded-xl border transition-all duration-200 active:scale-95 shadow-xs',
                copied
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-secondary text-secondary-foreground border-border hover:border-primary/40 hover:text-foreground'
              )}
              aria-label="Copy link to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            {copied ? 'Link Copied!' : 'Copy Link'}
          </TooltipContent>
        </Tooltip>
      </div>

      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        shareUrl={shareUrl}
        copied={copied}
        onCopy={copyToClipboard}
        platforms={sharePlatforms}
        onPlatformClick={openShareWindow}
        onNativeShare={hasWebShare ? handleNativeShare : undefined}
      />
    </>
  );
};

// Reusable Share Dialog / Modal for Deep Dialog Sharing
interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  shareUrl: string;
  copied: boolean;
  onCopy: () => void;
  platforms: Array<{
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    url: string;
    bg: string;
    hoverColor: string;
  }>;
  onPlatformClick: (url: string, name: string) => void;
  onNativeShare?: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  shareUrl,
  copied,
  onCopy,
  platforms,
  onPlatformClick,
  onNativeShare,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border p-6 rounded-2xl">
        <DialogHeader className="text-left space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="font-display text-xl font-bold text-foreground">
                Share this Guide
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground truncate max-w-[280px]">
                {title}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Social buttons grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {platforms.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  onPlatformClick(p.url, p.name);
                  onClose();
                }}
                className={cn(
                  'flex items-center gap-2.5 p-3 rounded-xl border text-xs font-bold transition-all duration-200 active:scale-95 shadow-xs',
                  p.bg,
                  p.hoverColor
                )}
              >
                <p.icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{p.name}</span>
              </button>
            ))}
          </div>

          {/* Web Share Device Button (if available) */}
          {onNativeShare && (
            <Button
              onClick={() => {
                onClose();
                onNativeShare();
              }}
              variant="outline"
              className="w-full gap-2 text-xs font-bold border-primary/30 text-primary hover:bg-primary/10"
            >
              <Share2 className="w-4 h-4" /> Open Native System Share
            </Button>
          )}

          {/* Copy link input bar */}
          <div className="pt-2 border-t border-border">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
              Direct Link
            </label>
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-secondary/80 border border-border">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-transparent px-2.5 text-xs text-foreground font-mono focus:outline-none truncate"
              />
              <Button
                onClick={onCopy}
                size="sm"
                className={cn(
                  'gap-1.5 text-xs font-bold shrink-0 shadow-xs transition-all',
                  copied
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                )}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShare;
