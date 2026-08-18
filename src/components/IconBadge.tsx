import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type IconColorVariant = 'gold' | 'emerald' | 'cyan' | 'purple' | 'rose' | 'amber' | 'blue' | 'primary' | 'muted';

export interface IconBadgeProps {
  icon: LucideIcon;
  variant?: IconColorVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  glow?: boolean;
}

const variantStyles: Record<IconColorVariant, {
  gradient: string;
  border: string;
  iconColor: string;
  glowColor: string;
}> = {
  gold: {
    gradient: 'from-amber-500/25 via-yellow-500/15 to-amber-600/10',
    border: 'border-amber-500/40 group-hover:border-amber-400',
    iconColor: 'text-amber-400',
    glowColor: 'shadow-amber-500/20',
  },
  emerald: {
    gradient: 'from-emerald-500/25 via-teal-500/15 to-green-600/10',
    border: 'border-emerald-500/40 group-hover:border-emerald-400',
    iconColor: 'text-emerald-400',
    glowColor: 'shadow-emerald-500/20',
  },
  cyan: {
    gradient: 'from-cyan-500/25 via-sky-500/15 to-blue-600/10',
    border: 'border-cyan-500/40 group-hover:border-cyan-400',
    iconColor: 'text-cyan-400',
    glowColor: 'shadow-cyan-500/20',
  },
  purple: {
    gradient: 'from-purple-500/25 via-violet-500/15 to-indigo-600/10',
    border: 'border-purple-500/40 group-hover:border-purple-400',
    iconColor: 'text-purple-400',
    glowColor: 'shadow-purple-500/20',
  },
  rose: {
    gradient: 'from-rose-500/25 via-pink-500/15 to-red-600/10',
    border: 'border-rose-500/40 group-hover:border-rose-400',
    iconColor: 'text-rose-400',
    glowColor: 'shadow-rose-500/20',
  },
  amber: {
    gradient: 'from-orange-500/25 via-amber-500/15 to-yellow-600/10',
    border: 'border-orange-500/40 group-hover:border-orange-400',
    iconColor: 'text-orange-400',
    glowColor: 'shadow-orange-500/20',
  },
  blue: {
    gradient: 'from-blue-500/25 via-indigo-500/15 to-sky-600/10',
    border: 'border-blue-500/40 group-hover:border-blue-400',
    iconColor: 'text-blue-400',
    glowColor: 'shadow-blue-500/20',
  },
  primary: {
    gradient: 'from-primary/25 via-primary/15 to-primary/5',
    border: 'border-primary/40 group-hover:border-primary',
    iconColor: 'text-primary',
    glowColor: 'shadow-primary/20',
  },
  muted: {
    gradient: 'from-secondary via-muted/60 to-secondary',
    border: 'border-border/80 group-hover:border-border',
    iconColor: 'text-foreground',
    glowColor: 'shadow-black/10',
  },
};

const sizeStyles: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', {
  container: string;
  icon: string;
}> = {
  xs: {
    container: 'w-6 h-6 rounded-md',
    icon: 'w-3.5 h-3.5',
  },
  sm: {
    container: 'w-8 h-8 rounded-lg',
    icon: 'w-4 h-4',
  },
  md: {
    container: 'w-10 h-10 rounded-xl',
    icon: 'w-5 h-5',
  },
  lg: {
    container: 'w-12 h-12 rounded-2xl',
    icon: 'w-6 h-6',
  },
  xl: {
    container: 'w-16 h-16 rounded-2xl',
    icon: 'w-8 h-8',
  },
};

export const IconBadge: React.FC<IconBadgeProps> = ({
  icon: Icon,
  variant = 'primary',
  size = 'md',
  className,
  glow = true,
}) => {
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center shrink-0 border bg-card/90 transition-all duration-300',
        s.container,
        v.border,
        glow && `shadow-sm ${v.glowColor}`,
        className
      )}
    >
      {/* Gradient Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br rounded-[inherit] opacity-90 transition-opacity',
          v.gradient
        )}
      />

      {/* Top Glass Specular Sheen */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-t-[inherit]" />

      {/* Rendered Icon */}
      <Icon className={cn('relative z-10 transition-transform duration-300', s.icon, v.iconColor)} />
    </div>
  );
};

export default IconBadge;
