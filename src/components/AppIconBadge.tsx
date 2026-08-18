import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Flame,
  Smartphone,
  Wallet,
  Coins,
  Bot,
  Gamepad2,
  DollarSign,
  TrendingUp,
  Cpu,
  Globe,
  Radio,
  CheckCircle2,
  Sparkles,
  Gift,
  Award,
  CircleDot,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AppIconBadgeProps {
  icon?: string;
  name?: string;
  category?: string;
  blockchain?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  verified?: boolean;
  className?: string;
  interactive?: boolean;
  showGlow?: boolean;
  fallbackIcon?: React.ReactNode;
}

// Category-based high-contrast gradient & chromatic styling
const getCategoryStyle = (category?: string, name?: string) => {
  const lowerName = (name || '').toLowerCase();
  const lowerCat = (category || '').toLowerCase();

  // 1. Specific App Custom Theming
  if (lowerName.includes('me pass') || lowerName.includes('mec')) {
    return {
      gradient: 'from-amber-400/30 via-yellow-500/20 to-emerald-500/30',
      border: 'border-amber-400/50 group-hover:border-amber-300',
      glow: 'shadow-amber-500/30 group-hover:shadow-amber-400/50',
      iconColor: 'text-amber-300',
      bgBase: 'bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-900',
      accentRing: 'ring-amber-500/20',
      symbol: '🛡️',
      brandBadge: 'MEC',
    };
  }

  if (lowerName.includes('mpaisa')) {
    return {
      gradient: 'from-emerald-400/35 via-teal-500/20 to-cyan-500/25',
      border: 'border-emerald-400/50 group-hover:border-emerald-300',
      glow: 'shadow-emerald-500/30 group-hover:shadow-emerald-400/50',
      iconColor: 'text-emerald-300',
      bgBase: 'bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900',
      accentRing: 'ring-emerald-500/20',
      symbol: '🎮',
      brandBadge: 'PAISA',
    };
  }

  if (lowerName.includes('hifami')) {
    return {
      gradient: 'from-emerald-400/35 via-green-500/20 to-teal-500/30',
      border: 'border-emerald-400/55 group-hover:border-emerald-300',
      glow: 'shadow-emerald-500/30 group-hover:shadow-emerald-400/50',
      iconColor: 'text-emerald-300',
      bgBase: 'bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900',
      accentRing: 'ring-emerald-500/25',
      symbol: '💵',
      brandBadge: '$0.10',
    };
  }

  if (lowerName.includes('jolly cash') || lowerName.includes('jollycash')) {
    return {
      gradient: 'from-pink-500/30 via-purple-500/20 to-amber-500/25',
      border: 'border-pink-400/50 group-hover:border-pink-300',
      glow: 'shadow-pink-500/30 group-hover:shadow-pink-400/50',
      iconColor: 'text-pink-300',
      bgBase: 'bg-gradient-to-br from-slate-900 via-pink-950/40 to-slate-900',
      accentRing: 'ring-pink-500/20',
      symbol: '🎁',
      brandBadge: '6K PTS',
    };
  }

  if (lowerName.includes('grass') || lowerName.includes('depin') || lowerName.includes('nodepay') || lowerName.includes('gradient')) {
    return {
      gradient: 'from-lime-400/35 via-emerald-500/25 to-teal-500/20',
      border: 'border-emerald-400/50 group-hover:border-emerald-300',
      glow: 'shadow-emerald-400/30 group-hover:shadow-emerald-400/50',
      iconColor: 'text-emerald-300',
      bgBase: 'bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900',
      accentRing: 'ring-emerald-500/25',
      symbol: '🌱',
      brandBadge: 'DePIN',
    };
  }

  if (lowerName.includes('binance') || lowerName.includes('bnb')) {
    return {
      gradient: 'from-amber-400/40 via-yellow-500/25 to-amber-600/30',
      border: 'border-amber-400/60 group-hover:border-amber-300',
      glow: 'shadow-amber-500/35 group-hover:shadow-amber-400/60',
      iconColor: 'text-amber-400',
      bgBase: 'bg-gradient-to-br from-slate-950 via-amber-950/50 to-slate-900',
      accentRing: 'ring-amber-500/30',
      symbol: '🔶',
      brandBadge: 'BNB',
    };
  }

  if (lowerName.includes('telegram') || lowerName.includes('blum') || lowerName.includes('ton') || lowerName.includes('tapswap') || lowerName.includes('major')) {
    return {
      gradient: 'from-sky-400/40 via-blue-500/25 to-indigo-600/30',
      border: 'border-sky-400/55 group-hover:border-sky-300',
      glow: 'shadow-sky-500/30 group-hover:shadow-sky-400/50',
      iconColor: 'text-sky-300',
      bgBase: 'bg-gradient-to-br from-slate-950 via-sky-950/50 to-slate-900',
      accentRing: 'ring-sky-500/25',
      symbol: '✈️',
      brandBadge: 'TON',
    };
  }

  // 2. Fallbacks based on category
  if (lowerCat.includes('exchange')) {
    return {
      gradient: 'from-amber-400/25 via-orange-500/15 to-yellow-500/20',
      border: 'border-amber-500/40 group-hover:border-amber-400',
      glow: 'shadow-amber-500/20 group-hover:shadow-amber-500/40',
      iconColor: 'text-amber-300',
      bgBase: 'bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900',
      accentRing: 'ring-amber-500/20',
      symbol: '📊',
      brandBadge: 'EXCHANGE',
    };
  }

  if (lowerCat.includes('wallet')) {
    return {
      gradient: 'from-cyan-400/30 via-sky-500/20 to-blue-500/20',
      border: 'border-cyan-400/45 group-hover:border-cyan-300',
      glow: 'shadow-cyan-500/25 group-hover:shadow-cyan-400/45',
      iconColor: 'text-cyan-300',
      bgBase: 'bg-gradient-to-br from-slate-900 via-cyan-950/30 to-slate-900',
      accentRing: 'ring-cyan-500/20',
      symbol: '👛',
      brandBadge: 'WALLET',
    };
  }

  if (lowerCat.includes('telegram') || lowerCat.includes('bot')) {
    return {
      gradient: 'from-sky-400/30 via-blue-500/20 to-indigo-500/20',
      border: 'border-sky-400/45 group-hover:border-sky-300',
      glow: 'shadow-sky-500/25 group-hover:shadow-sky-400/45',
      iconColor: 'text-sky-300',
      bgBase: 'bg-gradient-to-br from-slate-900 via-sky-950/30 to-slate-900',
      accentRing: 'ring-sky-500/20',
      symbol: '🤖',
      brandBadge: 'BOT',
    };
  }

  if (lowerCat.includes('depin') || lowerCat.includes('mining') || lowerCat.includes('node')) {
    return {
      gradient: 'from-emerald-400/30 via-teal-500/20 to-green-500/20',
      border: 'border-emerald-400/45 group-hover:border-emerald-300',
      glow: 'shadow-emerald-500/25 group-hover:shadow-emerald-400/45',
      iconColor: 'text-emerald-300',
      bgBase: 'bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900',
      accentRing: 'ring-emerald-500/20',
      symbol: '⛏️',
      brandBadge: 'DePIN',
    };
  }

  if (lowerCat.includes('task') || lowerCat.includes('earning')) {
    return {
      gradient: 'from-amber-400/30 via-emerald-500/20 to-teal-500/25',
      border: 'border-amber-400/45 group-hover:border-amber-300',
      glow: 'shadow-amber-500/25 group-hover:shadow-amber-400/45',
      iconColor: 'text-amber-300',
      bgBase: 'bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900',
      accentRing: 'ring-amber-500/20',
      symbol: '💵',
      brandBadge: 'REWARDS',
    };
  }

  return {
    gradient: 'from-primary/30 via-amber-500/15 to-primary/20',
    border: 'border-primary/40 group-hover:border-primary/60',
    glow: 'shadow-primary/20 group-hover:shadow-primary/40',
    iconColor: 'text-primary',
    bgBase: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    accentRing: 'ring-primary/20',
    symbol: '💎',
    brandBadge: 'APP',
  };
};

const sizeConfig = {
  xs: {
    container: 'w-8 h-8 rounded-xl',
    textSize: 'text-sm',
    iconSize: 'w-4 h-4',
    badgeSize: 'w-3.5 h-3.5',
    badgeIcon: 'w-2 h-2',
    offset: '-bottom-0.5 -right-0.5',
    borderWidth: 'border',
  },
  sm: {
    container: 'w-11 h-11 rounded-2xl',
    textSize: 'text-xl',
    iconSize: 'w-5 h-5',
    badgeSize: 'w-4 h-4',
    badgeIcon: 'w-2.5 h-2.5',
    offset: '-bottom-1 -right-1',
    borderWidth: 'border-[1.5px]',
  },
  md: {
    container: 'w-14 h-14 rounded-2xl',
    textSize: 'text-2.5xl',
    iconSize: 'w-7 h-7',
    badgeSize: 'w-5 h-5',
    badgeIcon: 'w-3 h-3',
    offset: '-bottom-1 -right-1',
    borderWidth: 'border-[1.5px]',
  },
  lg: {
    container: 'w-16 h-16 rounded-2xl',
    textSize: 'text-3.5xl',
    iconSize: 'w-8 h-8',
    badgeSize: 'w-5.5 h-5.5',
    badgeIcon: 'w-3.5 h-3.5',
    offset: '-bottom-1.5 -right-1.5',
    borderWidth: 'border-2',
  },
  xl: {
    container: 'w-20 h-20 rounded-3xl',
    textSize: 'text-4.5xl',
    iconSize: 'w-10 h-10',
    badgeSize: 'w-6.5 h-6.5',
    badgeIcon: 'w-4 h-4',
    offset: '-bottom-2 -right-2',
    borderWidth: 'border-2',
  },
  '2xl': {
    container: 'w-24 h-24 rounded-3xl',
    textSize: 'text-5xl',
    iconSize: 'w-12 h-12',
    badgeSize: 'w-7.5 h-7.5',
    badgeIcon: 'w-4.5 h-4.5',
    offset: '-bottom-2 -right-2',
    borderWidth: 'border-2',
  },
  hero: {
    container: 'w-28 h-28 rounded-3xl',
    textSize: 'text-6xl',
    iconSize: 'w-14 h-14',
    badgeSize: 'w-8.5 h-8.5',
    badgeIcon: 'w-5 h-5',
    offset: '-bottom-2.5 -right-2.5',
    borderWidth: 'border-2',
  },
};

// Check if string is an image URL
const isImageUrl = (str?: string): boolean => {
  if (!str) return false;
  const trimmed = str.trim();
  return (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('data:image/') ||
    /\.(png|jpe?g|svg|webp|gif|avif)(\?.*)?$/i.test(trimmed)
  );
};

export const AppIconBadge: React.FC<AppIconBadgeProps> = ({
  icon,
  name = '',
  category,
  blockchain,
  size = 'md',
  verified = false,
  className,
  interactive = true,
  showGlow = true,
  fallbackIcon,
}) => {
  const [imageError, setImageError] = useState(false);
  const style = getCategoryStyle(category, name);
  const sizeStyles = sizeConfig[size] || sizeConfig.md;

  const isImg = isImageUrl(icon) && !imageError;
  const isEmoji = !isImg && icon && /\p{Extended_Pictographic}/u.test(icon);

  return (
    <div
      className={cn(
        'relative shrink-0 select-none inline-flex items-center justify-center',
        interactive && 'group-hover:scale-105 group-hover:-translate-y-0.5 transition-transform duration-300 ease-out',
        className
      )}
    >
      {/* Dynamic Ambient Background Aura Glow */}
      {showGlow && (
        <div
          className={cn(
            'absolute inset-0 rounded-[inherit] bg-gradient-to-br opacity-50 blur-lg transition-all duration-300 group-hover:opacity-100 group-hover:blur-xl',
            style.gradient
          )}
        />
      )}

      {/* Main Beveled App Container */}
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden shadow-lg transition-all duration-300 ring-1',
          sizeStyles.container,
          sizeStyles.borderWidth,
          style.bgBase,
          style.border,
          style.glow,
          style.accentRing
        )}
      >
        {/* Layer 1: Multi-stop Chromatic Gradient Fill */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br transition-opacity duration-300 opacity-80 group-hover:opacity-100',
            style.gradient
          )}
        />

        {/* Layer 2: Precision Micro-Pattern Grid Matrix */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none" />

        {/* Layer 3: Metallic Beveled Glass Sheen (Top Gloss Curve) */}
        <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none rounded-t-[inherit]" />

        {/* Layer 4: Inner Perimeter Shadow */}
        <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.6)] pointer-events-none rounded-[inherit]" />

        {/* Layer 5: Icon / Image / Vector Core Content */}
        <div className="relative z-10 flex items-center justify-center drop-shadow-md w-full h-full p-1.5">
          {isImg ? (
            <img
              src={icon}
              alt={name || 'App Icon'}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover rounded-[inherit] transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : icon ? (
            isEmoji ? (
              <span
                className={cn(
                  'leading-none filter contrast-125 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110 duration-200',
                  sizeStyles.textSize
                )}
              >
                {icon}
              </span>
            ) : (
              <span
                className={cn(
                  'font-display font-extrabold tracking-tight leading-none drop-shadow-sm',
                  sizeStyles.textSize,
                  style.iconColor
                )}
              >
                {icon}
              </span>
            )
          ) : fallbackIcon ? (
            fallbackIcon
          ) : (
            <Sparkles className={cn(sizeStyles.iconSize, style.iconColor, 'animate-pulse')} />
          )}
        </div>
      </div>

      {/* Verified Audited Trust Seal Pin */}
      {verified && (
        <div
          className={cn(
            'absolute z-20 rounded-full bg-slate-950 border-[1.5px] border-emerald-400 shadow-[0_2px_8px_rgba(16,185,129,0.5)] flex items-center justify-center text-emerald-400 animate-in fade-in zoom-in duration-300',
            sizeStyles.badgeSize,
            sizeStyles.offset
          )}
          title="100% Audited & Legit Verified"
        >
          <CheckCircle2 className={cn(sizeStyles.badgeIcon, 'text-emerald-400 fill-emerald-500/30')} />
        </div>
      )}
    </div>
  );
};

export default AppIconBadge;
