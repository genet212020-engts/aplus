import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  Home,
  Smartphone,
  Flame,
  FileText,
  Info,
  Send,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Bookmark,
  Receipt,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import SearchModal from './SearchModal';
import { NavSearchBar } from './NavSearchBar';
import { useTheme } from '@/hooks/useTheme';
import { ThemeToggleSwitch } from '@/components/ThemeToggleSwitch';

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: 'hot' | 'new' | 'verified' | 'gold';
  description?: string;
}

const navItems: NavItem[] = [
  {
    to: '/',
    label: 'Home',
    icon: Home,
    description: 'Daily money guides & zero-risk strategies',
  },
  {
    to: '/apps',
    label: 'Earning Apps',
    icon: Smartphone,
    badge: 'NEW',
    badgeVariant: 'new',
    description: 'Instant payout mobile & task apps',
  },
  {
    to: '/airdrops',
    label: 'Airdrops',
    icon: Flame,
    badge: 'HOT',
    badgeVariant: 'hot',
    description: 'Testnet tasks & zero-cost token farming',
  },
  {
    to: '/proof',
    label: 'Payment Proofs',
    icon: Receipt,
    badge: '100% Legit',
    badgeVariant: 'verified',
    description: 'Real withdrawal receipts & tx hashes',
  },
  {
    to: '/blog',
    label: 'Guides & Tools',
    icon: FileText,
    badge: 'BLOG',
    badgeVariant: 'gold',
    description: 'Deep dives, strategy blueprints & curated web tools',
  },
  {
    to: '/about',
    label: 'About Us',
    icon: Info,
    description: 'Our mission, editorial ethics & leadership',
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const { pathname } = useLocation();
  const { theme } = useTheme();

  const [announcement, setAnnouncement] = useState<any>(null);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('announcement_dismissed');
      if (dismissed === 'true') {
        setIsBannerDismissed(true);
      }

      const saved = localStorage.getItem('admin_site_announcement');
      if (saved) {
        setAnnouncement(JSON.parse(saved));
      } else {
        setAnnouncement({
          enabled: true,
          badgeText: '🔥 VERIFIED PAYOUT',
          messageText: 'Claim 1 MEC Token (≈ $6 USD) on ME PASS Wallet with instant P2P withdrawal!',
          buttonText: 'Claim $6 Free',
          buttonUrl: 'https://i.mec.me/en-US?c=x4ccdp3m',
          backgroundColor: 'bg-gradient-to-r from-amber-500 via-emerald-600 to-sky-600',
        });
      }
    } catch {
      // ignore
    }
  }, []);

  const handleDismissBanner = () => {
    setIsBannerDismissed(true);
    try {
      sessionStorage.setItem('announcement_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const getBadgeClass = (variant?: string) => {
    switch (variant) {
      case 'hot':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse';
      case 'new':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'verified':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Top Dismissible Announcement Banner */}
        {announcement && announcement.enabled && !isBannerDismissed && (
          <div
            className={cn(
              'relative px-3 sm:px-4 py-1.5 text-white text-xs font-medium transition-all duration-300 shadow-xs',
              announcement.backgroundColor || 'bg-gradient-to-r from-amber-600 via-emerald-600 to-sky-600'
            )}
          >
            <div className="container mx-auto flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 truncate flex-1 min-w-0">
                <span className="px-1.5 py-0.5 rounded-full bg-black/40 border border-white/20 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  <span>{announcement.badgeText}</span>
                </span>
                <span className="truncate text-[11px] sm:text-xs text-white/95 font-medium">
                  {announcement.messageText}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={announcement.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  <button className="bg-white text-slate-950 hover:bg-white/90 text-[10px] sm:text-xs font-bold px-3 py-0.5 rounded-full transition-all shadow-xs active:scale-95 flex items-center gap-1">
                    <span>{announcement.buttonText}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </a>

                <button
                  type="button"
                  onClick={handleDismissBanner}
                  className="p-1 rounded-full text-white/70 hover:text-white hover:bg-black/20 transition-colors ml-1"
                  aria-label="Dismiss banner"
                  title="Dismiss banner"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Navbar */}
        <nav
          className={cn(
            'transition-all duration-300',
            scrolled
              ? 'bg-background/95 backdrop-blur-xl border-b border-border/80 shadow-md py-2.5'
              : 'bg-background/70 backdrop-blur-lg border-b border-border/40 py-3'
          )}
        >
          <div className="container mx-auto px-3 sm:px-4">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              
              {/* Brand Logo & Tagline */}
              <Link to="/" className="flex items-center gap-2.5 group shrink-0 select-none">
                <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden border border-amber-500/40 shadow-sm group-hover:border-amber-400 group-hover:scale-105 transition-all duration-300 bg-slate-950 shrink-0">
                  <img
                    src="/logo.jpg"
                    alt="A+ Hustler Official Logo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle corner badge */}
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950" title="System Online" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-extrabold tracking-tight text-foreground text-base sm:text-lg leading-none group-hover:text-primary transition-colors">
                      A+ HUSTLER
                    </span>
                    <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase">
                      PRO
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-semibold tracking-wider mt-0.5 hidden xs:block">
                    Zero Investment Guides
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links (Visible from lg: 1024px+) */}
              <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 rounded-full border border-border/70 bg-card/60 p-1 backdrop-blur-md shadow-xs">
                {navItems.map((item) => {
                  const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        'relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap',
                        active
                          ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/70'
                      )}
                    >
                      <Icon className={cn('w-3.5 h-3.5', active ? 'text-primary-foreground' : 'text-muted-foreground')} />
                      <span>{item.label}</span>
                      {item.badge && !active && (
                        <span
                          className={cn(
                            'text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border leading-tight uppercase',
                            getBadgeClass(item.badgeVariant)
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Live Global Search Bar */}
              <div className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-xs xl:max-w-sm mx-1 sm:mx-2">
                <NavSearchBar />
              </div>

              {/* Right Utility Actions */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Mobile Search Trigger Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9 text-muted-foreground hover:text-primary hover:bg-secondary/80 rounded-xl transition-colors"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search site"
                  title="Search site (⌘K)"
                >
                  <Search className="w-4 h-4" />
                </Button>

                {/* Theme Mode Switcher */}
                <div className="flex items-center">
                  <ThemeToggleSwitch variant="switch" />
                </div>

                {/* Join Official Telegram Community CTA */}
                <a
                  href="https://t.me/Aplus_info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex"
                >
                  <Button
                    variant="gold"
                    size="sm"
                    className="gap-1.5 shadow-sm font-bold text-xs h-9 px-3 rounded-xl hover:shadow-amber-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Join Telegram</span>
                    <span className="hidden xl:inline-block text-[10px] bg-slate-950/40 text-white px-1.5 py-0.2 rounded-full ml-0.5">
                      45K+
                    </span>
                  </Button>
                </a>

                {/* Mobile Drawer Toggle Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    'lg:hidden h-10 w-10 min-w-[40px] min-h-[40px] rounded-xl border-border hover:border-primary/50 transition-colors',
                    isMenuOpen && 'bg-primary/10 border-primary text-primary'
                  )}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle navigation menu"
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Drawer */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-border/80 bg-background/98 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto shadow-2xl">
              <div className="container mx-auto px-4 py-4 space-y-4">
                
                {/* Search Bar in Mobile Menu */}
                <div>
                  <NavSearchBar
                    isMobile
                    onSearchSubmitted={() => setIsMenuOpen(false)}
                  />
                </div>

                {/* Quick Navigation Cards */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2 block mb-1">
                    Main Navigation
                  </span>
                  
                  {navItems.map((item) => {
                    const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          'flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 group min-h-[48px]',
                          active
                            ? 'bg-primary/10 border-primary/40 shadow-xs'
                            : 'bg-card/60 border-border/60 hover:border-border hover:bg-secondary/60'
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={cn(
                              'p-2 rounded-xl border shrink-0 transition-colors',
                              active
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-muted/80 text-muted-foreground border-border/70 group-hover:text-primary group-hover:border-primary/30'
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={cn('text-sm font-bold truncate', active ? 'text-primary' : 'text-foreground')}>
                                {item.label}
                              </span>
                              {item.badge && (
                                <span
                                  className={cn(
                                    'text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border leading-tight uppercase',
                                    getBadgeClass(item.badgeVariant)
                                  )}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-muted-foreground truncate mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <ChevronRight className={cn('w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5', active ? 'text-primary' : 'text-muted-foreground')} />
                      </Link>
                    );
                  })}
                </div>

                {/* Quick Category Chips */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2 block mb-1">
                    Explore By Topic
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/category/crypto"
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2.5 rounded-xl bg-card/60 border border-border/60 hover:border-primary/40 text-xs font-semibold text-foreground flex items-center gap-2 transition-colors"
                    >
                      <span>🔐</span>
                      <span className="truncate">Crypto Guides</span>
                    </Link>
                    <Link
                      to="/category/finance"
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2.5 rounded-xl bg-card/60 border border-border/60 hover:border-primary/40 text-xs font-semibold text-foreground flex items-center gap-2 transition-colors"
                    >
                      <span>💵</span>
                      <span className="truncate">Instant Cashflow</span>
                    </Link>
                    <Link
                      to="/category/investment"
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2.5 rounded-xl bg-card/60 border border-border/60 hover:border-primary/40 text-xs font-semibold text-foreground flex items-center gap-2 transition-colors"
                    >
                      <span>🔍</span>
                      <span className="truncate">DePIN & Nodes</span>
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2.5 rounded-xl bg-card/60 border border-border/60 hover:border-primary/40 text-xs font-semibold text-foreground flex items-center gap-2 transition-colors"
                    >
                      <span>✉️</span>
                      <span className="truncate">Contact Us</span>
                    </Link>
                  </div>
                </div>

                {/* Appearance Settings Pill */}
                <div className="p-3.5 rounded-2xl bg-card/60 border border-border/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">Theme Mode</span>
                  </div>
                  <ThemeToggleSwitch variant="segmented" />
                </div>

                {/* Telegram Call-to-Action Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-emerald-500/10 to-sky-500/15 border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-foreground">Join A+ Hustler Community</h4>
                      <p className="text-xs text-muted-foreground">Get instant alerts for high-paying airdrops & proofs</p>
                    </div>
                  </div>

                  <a
                    href="https://t.me/Aplus_info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="gold" className="w-full gap-2 text-xs font-bold shadow-md rounded-xl py-2.5 min-h-[44px]">
                      <Send className="w-4 h-4" />
                      <span>Open Telegram Channel (@Aplus_info)</span>
                    </Button>
                  </a>
                </div>

              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Global Quick Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
