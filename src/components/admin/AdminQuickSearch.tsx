import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Sparkles,
  Zap,
  ShieldCheck,
  FileText,
  Tag,
  Settings,
  Users,
  ExternalLink,
  Plus,
  ArrowRight,
  LayoutDashboard,
  BarChart3,
  Download
} from 'lucide-react';
import { EarningAppItem } from './EarningAppModal';
import { Airdrop } from '@/data/airdropData';
import { ProofItem } from './ProofModal';

interface AdminQuickSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apps: EarningAppItem[];
  airdrops: Airdrop[];
  proofs: ProofItem[];
  blogs: any[];
  onSelectTab: (tab: any) => void;
  onEditApp: (app: EarningAppItem) => void;
  onEditAirdrop: (airdrop: Airdrop) => void;
  onEditProof: (proof: ProofItem) => void;
  onAddNew: (type: 'app' | 'airdrop' | 'proof' | 'post') => void;
}

export const AdminQuickSearch: React.FC<AdminQuickSearchProps> = ({
  open,
  onOpenChange,
  apps,
  airdrops,
  proofs,
  blogs,
  onSelectTab,
  onEditApp,
  onEditAirdrop,
  onEditProof,
  onAddNew,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const q = query.toLowerCase().trim();

  // Matched Apps
  const matchedApps = q
    ? (apps || []).filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          (a.referralCode && a.referralCode.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  // Matched Airdrops
  const matchedAirdrops = q
    ? (airdrops || []).filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.ticker.toLowerCase().includes(q) ||
          a.blockchain.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  // Matched Proofs
  const matchedProofs = q
    ? (proofs || []).filter(
        (p) =>
          p.appName.toLowerCase().includes(q) ||
          p.payoutMethod.toLowerCase().includes(q) ||
          p.userHandle.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  // Matched Posts
  const matchedPosts = q
    ? (blogs || []).filter((b) => b.title?.toLowerCase().includes(q)).slice(0, 4)
    : [];

  // Quick Nav options
  const navShortcuts = [
    { label: 'Overview Dashboard', tab: 'overview', icon: LayoutDashboard },
    { label: 'Earning Apps Manager', tab: 'apps', icon: Sparkles },
    { label: 'Airdrops & Testnets', tab: 'airdrops', icon: Zap },
    { label: 'Payout Proofs', tab: 'proofs', icon: ShieldCheck },
    { label: 'Submissions & Leads', tab: 'submissions', icon: Users },
    { label: 'Articles & Content', tab: 'posts', icon: FileText },
    { label: 'Categories Manager', tab: 'categories', icon: Tag },
    { label: 'SEO Metadata Generator', tab: 'seo', icon: Sparkles },
    { label: 'Analytics & Traffic', tab: 'analytics', icon: BarChart3 },
    { label: 'Data Backup & Restore', tab: 'backup', icon: Download },
    { label: 'System Settings', tab: 'settings', icon: Settings },
  ].filter((item) => !q || item.label.toLowerCase().includes(q));

  const hasResults =
    matchedApps.length > 0 ||
    matchedAirdrops.length > 0 ||
    matchedProofs.length > 0 ||
    matchedPosts.length > 0 ||
    navShortcuts.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border border-border p-0 gap-0 overflow-hidden shadow-2xl rounded-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Admin Command Center</DialogTitle>
        </DialogHeader>

        {/* Search Input Bar */}
        <div className="p-4 border-b border-border/80 flex items-center gap-3 bg-secondary/30">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search apps, airdrops, proofs, articles, or jump to tab..."
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-sm placeholder:text-muted-foreground/70"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/60 hidden sm:inline-block">
            ESC
          </span>
        </div>

        {/* Quick Actions Row */}
        {!query && (
          <div className="p-3 bg-secondary/40 border-b border-border/40 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-1">
              Quick Actions:
            </span>
            <button
              onClick={() => {
                onOpenChange(false);
                onAddNew('app');
              }}
              className="px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> New App
            </button>
            <button
              onClick={() => {
                onOpenChange(false);
                onAddNew('airdrop');
              }}
              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> New Airdrop
            </button>
            <button
              onClick={() => {
                onOpenChange(false);
                onAddNew('proof');
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> New Proof
            </button>
            <button
              onClick={() => {
                onOpenChange(false);
                onAddNew('post');
              }}
              className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Draft Post
            </button>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Earning Apps Results */}
          {matchedApps.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Earning Apps ({matchedApps.length})
              </div>
              <div className="space-y-1">
                {matchedApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      onOpenChange(false);
                      onSelectTab('apps');
                      onEditApp(app);
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-secondary/70 flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl p-1.5 rounded-lg bg-secondary">{app.icon}</span>
                      <div>
                        <div className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                          {app.name}
                          {app.referralCode && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-primary/10 text-primary">
                              Code: {app.referralCode}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate max-w-sm">
                          {app.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                        {app.category}
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Airdrops Results */}
          {matchedAirdrops.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-1.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Airdrops & Testnets ({matchedAirdrops.length})
              </div>
              <div className="space-y-1">
                {matchedAirdrops.map((airdrop) => (
                  <button
                    key={airdrop.id}
                    onClick={() => {
                      onOpenChange(false);
                      onSelectTab('airdrops');
                      onEditAirdrop(airdrop);
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-secondary/70 flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                        {airdrop.icon}
                      </span>
                      <div>
                        <div className="font-semibold text-xs text-foreground group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                          {airdrop.name}
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-secondary text-muted-foreground">
                            ${airdrop.ticker}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate max-w-sm">
                          {airdrop.blockchain} • Reward: {airdrop.estimatedReward}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-400 border-amber-500/20">
                      {airdrop.status}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Payout Proofs Results */}
          {matchedProofs.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Payout Proofs ({matchedProofs.length})
              </div>
              <div className="space-y-1">
                {matchedProofs.map((proof) => (
                  <button
                    key={proof.id}
                    onClick={() => {
                      onOpenChange(false);
                      onSelectTab('proofs');
                      onEditProof(proof);
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-secondary/70 flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={proof.proofImage}
                        alt={proof.appName}
                        className="w-8 h-8 rounded-lg object-cover border border-border shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-xs text-foreground group-hover:text-emerald-400 transition-colors">
                          {proof.appName} - {proof.usdEquivalent} ({proof.amount} {proof.currency})
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate max-w-sm">
                          {proof.payoutMethod} • by {proof.userHandle}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                      {proof.status}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Articles Results */}
          {matchedPosts.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" /> Articles & Posts ({matchedPosts.length})
              </div>
              <div className="space-y-1">
                {matchedPosts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => {
                      onOpenChange(false);
                      onSelectTab('posts');
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-secondary/70 flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors truncate max-w-sm">
                          {post.title}
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {post.status} • {post.views || 0} views
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Shortcuts */}
          {navShortcuts.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-1.5">
                Dashboard Modules & Pages
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {navShortcuts.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => {
                        onOpenChange(false);
                        onSelectTab(item.tab);
                      }}
                      className="p-2.5 rounded-xl bg-secondary/30 hover:bg-secondary/80 flex items-center gap-2.5 text-left text-xs font-semibold text-foreground transition-colors group"
                    >
                      <Icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {!hasResults && (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs">No matching results found for "{query}"</p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3 bg-secondary/50 border-t border-border/80 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-card border border-border text-foreground font-mono">⌘K</kbd> anytime to open</span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary font-medium"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
