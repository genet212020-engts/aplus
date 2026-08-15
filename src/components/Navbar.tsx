import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import SearchModal from './SearchModal';
import { useTheme } from '@/hooks/useTheme';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/apps', label: '💵 Earning Apps' },
  { to: '/proof', label: '💳 Proofs' },
  { to: '/airdrops', label: '🔥 Airdrops' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [announcement, setAnnouncement] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('admin_site_announcement');
      if (saved) {
        setAnnouncement(JSON.parse(saved));
      } else {
        setAnnouncement({
          enabled: true,
          badgeText: '🔥 VERIFIED PAYOUT',
          messageText: 'Claim 1 MEC Token (≈ $6 USD) on ME PASS Wallet with instant P2P withdrawal!',
          buttonText: 'Claim $6 Free Now',
          buttonUrl: 'https://i.mec.me/en-US?c=x4ccdp3m',
          backgroundColor: 'bg-gradient-to-r from-amber-500 via-emerald-600 to-sky-600',
        });
      }
    } catch {
      // ignore
    }
  }, []);

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

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        {announcement && announcement.enabled && (
          <div className={`px-4 py-1.5 text-white text-xs font-medium flex items-center justify-between gap-2 shadow-sm ${announcement.backgroundColor || 'bg-gradient-to-r from-amber-500 to-emerald-600'}`}>
            <div className="container mx-auto flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 truncate">
                <span className="px-1.5 py-0.5 rounded bg-black/30 border border-white/20 text-[10px] font-bold uppercase tracking-wider shrink-0">
                  {announcement.badgeText}
                </span>
                <span className="truncate text-[11px] sm:text-xs">{announcement.messageText}</span>
              </div>
              <a href={announcement.buttonUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                <button className="bg-white text-slate-900 hover:bg-slate-100 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full transition-colors">
                  {announcement.buttonText}
                </button>
              </a>
            </div>
          </div>
        )}

        <nav
          className={cn(
            'transition-all duration-300',
            scrolled
              ? 'bg-background/90 backdrop-blur-xl border-b border-border/80 shadow-md'
              : 'bg-background/40 backdrop-blur-md border-b border-transparent'
          )}
        >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative h-10 w-10 rounded-xl overflow-hidden border border-amber-500/40 shadow-md group-hover:scale-105 transition-transform duration-300 bg-slate-900 shrink-0">
                <img
                  src="/logo.jpg"
                  alt="A+ Hustler Official Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold tracking-tight text-foreground text-base leading-none group-hover:text-primary transition-colors">
                  A+ HUSTLER
                </span>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mt-0.5 hidden sm:block">
                  Verified Earning Hub
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1 rounded-full border border-border/60 bg-card/40 p-1 backdrop-blur-md">
              {navItems.map((item) => {
                const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300',
                      active
                        ? 'bg-primary/15 text-primary font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Search Capsule Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary border border-border/80 text-muted-foreground hover:text-foreground text-xs font-medium transition-all shadow-sm group hover:border-primary/50"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="truncate max-w-[140px] lg:max-w-[180px]">Search apps, articles, airdrops...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-card border border-border text-[10px] font-mono text-muted-foreground shadow-xs">
                <span>⌘</span>K
              </kbd>
            </button>

            {/* Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Mobile Search Icon Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Theme Toggle Button */}
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary transition-all duration-200"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 hover:rotate-45" />
                ) : (
                  <Moon className="w-5 h-5 text-foreground/80 transition-transform duration-300 hover:-rotate-12" />
                )}
              </Button>

              <a
                href="https://t.me/Aplus_info"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:block"
              >
                <Button variant="gold" size="sm">
                  Join Telegram
                </Button>
              </a>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/60 animate-fade-in">
              <div className="flex flex-col gap-1">
                {/* Mobile Search Input Trigger */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-secondary/80 border border-border/80 text-foreground font-medium text-sm mb-2"
                >
                  <Search className="w-4 h-4 text-primary" />
                  <span>Search apps, airdrops, articles...</span>
                </button>

                {navItems.map((item) => {
                  const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        active ? 'bg-primary/15 text-primary font-bold' : 'text-foreground hover:bg-secondary/60'
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <div className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-muted-foreground border-t border-border/40 mt-2 pt-3">
                  <span className="flex items-center gap-2 text-foreground font-semibold">
                    {theme === 'dark' ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                    <span>Theme ({theme === 'dark' ? 'Dark' : 'Light'})</span>
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="text-xs font-semibold gap-1.5 h-8 px-3 border-border/80"
                  >
                    {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </Button>
                </div>

                <a
                  href="https://t.me/Aplus_info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2"
                >
                  <Button variant="gold" className="w-full">Join Telegram</Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
