import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface ReferralCodeBoxProps {
  code: string;
  label?: string;
  appName?: string;
  className?: string;
  compact?: boolean;
}

export const ReferralCodeBox: React.FC<ReferralCodeBoxProps> = ({
  code,
  label = 'Referral Code',
  appName,
  className = '',
  compact = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      navigator.clipboard.writeText(code);
      setCopied(true);
      
      const toastLabel = appName ? `${appName} ${label}` : label;
      toast.success(`📋 ${toastLabel} "${code}" copied to clipboard!`, {
        description: 'Paste it during registration or checkout to claim your bonus.',
        duration: 3000,
      });

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error('Failed to copy to clipboard.');
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleCopy}
        type="button"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 transition-all text-xs font-mono font-bold text-primary cursor-pointer active:scale-95 ${className}`}
        title="Click to copy referral code"
      >
        <span className="text-[10px] uppercase text-muted-foreground font-sans font-normal">{label}:</span>
        <span>{code}</span>
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        ) : (
          <Copy className="w-3.5 h-3.5 shrink-0 opacity-80" />
        )}
      </button>
    );
  }

  return (
    <div
      onClick={handleCopy}
      className={`group p-2.5 rounded-xl bg-primary/10 hover:bg-primary/15 border border-primary/30 transition-all duration-200 flex items-center justify-between gap-2 cursor-pointer active:scale-[0.99] ${className}`}
      title="Click anywhere to copy referral code"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-muted-foreground text-[10px] uppercase font-sans font-medium shrink-0">
          {label}:
        </span>
        <span className="bg-background/90 text-primary font-mono font-bold text-xs px-2 py-0.5 rounded border border-primary/20 truncate">
          {code}
        </span>
      </div>

      <Button
        size="sm"
        variant="ghost"
        onClick={handleCopy}
        className={`h-7 px-2.5 text-xs font-semibold gap-1.5 transition-all shrink-0 ${
          copied
            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
            : 'text-primary hover:bg-primary/20'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </>
        )}
      </Button>
    </div>
  );
};
