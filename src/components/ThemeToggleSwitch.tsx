import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ThemeToggleSwitchProps {
  variant?: 'switch' | 'icon' | 'segmented';
  className?: string;
  showLabels?: boolean;
}

export const ThemeToggleSwitch: React.FC<ThemeToggleSwitchProps> = ({
  variant = 'switch',
  className,
  showLabels = false,
}) => {
  const { theme, toggleTheme, setTheme, isDark } = useTheme();

  // 1. SEGMENTED PILL VARIANT (Ideal for mobile menus & settings panels)
  if (variant === 'segmented') {
    return (
      <div
        className={cn(
          'relative inline-flex items-center p-1 rounded-xl bg-secondary/80 border border-border shadow-xs',
          className
        )}
        role="group"
        aria-label="Theme mode selector"
      >
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={cn(
            'relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
            !isDark
              ? 'bg-card text-foreground shadow-sm font-bold scale-[1.02]'
              : 'text-muted-foreground hover:text-foreground hover:bg-card/40'
          )}
          aria-pressed={!isDark}
        >
          <Sun className={cn('w-3.5 h-3.5 transition-transform duration-200', !isDark ? 'text-amber-500 fill-amber-500/20 scale-110' : 'text-muted-foreground')} />
          <span>Light</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={cn(
            'relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
            isDark
              ? 'bg-card text-foreground shadow-sm font-bold scale-[1.02]'
              : 'text-muted-foreground hover:text-foreground hover:bg-card/40'
          )}
          aria-pressed={isDark}
        >
          <Moon className={cn('w-3.5 h-3.5 transition-transform duration-200', isDark ? 'text-emerald-400 fill-emerald-400/20 scale-110' : 'text-muted-foreground')} />
          <span>Dark</span>
        </button>
      </div>
    );
  }

  // 2. ICON BUTTON VARIANT (Compact round button)
  if (variant === 'icon') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={toggleTheme}
            className={cn(
              'relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-transparent hover:border-border/60 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              className
            )}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Sun
                className={cn(
                  'w-5 h-5 text-amber-500 transition-all duration-300 absolute',
                  isDark
                    ? 'rotate-90 scale-0 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                )}
              />
              <Moon
                className={cn(
                  'w-5 h-5 text-emerald-400 transition-all duration-300 absolute',
                  isDark
                    ? 'rotate-0 scale-100 opacity-100'
                    : '-rotate-90 scale-0 opacity-0'
                )}
              />
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {isDark ? 'Switch to Light theme' : 'Switch to Dark theme'}
        </TooltipContent>
      </Tooltip>
    );
  }

  // 3. TACTILE SLIDING SWITCH VARIANT (Default)
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          aria-label={`Current theme: ${theme}. Click to switch to ${isDark ? 'light' : 'dark'} theme`}
          onClick={toggleTheme}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              toggleTheme();
            }
          }}
          className={cn(
            'group relative inline-flex h-8 w-15 shrink-0 cursor-pointer items-center rounded-full p-1 transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background border shadow-inner',
            isDark
              ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300 hover:border-emerald-400/60'
              : 'bg-amber-100/90 border-amber-300/80 text-amber-600 hover:border-amber-400',
            className
          )}
        >
          {/* Background Track Icons */}
          <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] pointer-events-none">
            <Sun
              className={cn(
                'w-3.5 h-3.5 transition-opacity duration-300',
                isDark ? 'opacity-30 text-muted-foreground' : 'opacity-0 text-amber-500'
              )}
            />
            <Moon
              className={cn(
                'w-3.5 h-3.5 transition-opacity duration-300',
                isDark ? 'opacity-0 text-emerald-400' : 'opacity-35 text-slate-400'
              )}
            />
          </div>

          {/* Sliding Knob */}
          <span
            className={cn(
              'pointer-events-none relative flex h-6 w-6 transform items-center justify-center rounded-full shadow-md transition-all duration-300 ease-out',
              isDark
                ? 'translate-x-7 bg-emerald-500 text-slate-950 shadow-emerald-500/40'
                : 'translate-x-0 bg-amber-400 text-slate-950 shadow-amber-400/50'
            )}
          >
            {isDark ? (
              <Moon className="w-3.5 h-3.5 text-slate-950 fill-slate-950 transition-transform duration-300 scale-100" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-slate-950 fill-slate-950 transition-transform duration-300 scale-100 group-hover:rotate-45" />
            )}
          </span>

          {showLabels && (
            <span className="sr-only">
              {isDark ? 'Dark Theme' : 'Light Theme'}
            </span>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs font-medium">
        {isDark ? '🌙 Switch to Light Theme' : '☀️ Switch to Dark Theme'}
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeToggleSwitch;
