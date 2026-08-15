import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Bell, Sparkles, Send, Twitter, Youtube, CheckCircle2, RefreshCw, Download, Upload, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export interface AnnouncementConfig {
  enabled: boolean;
  badgeText: string;
  messageText: string;
  buttonText: string;
  buttonUrl: string;
  backgroundColor: string;
}

export interface SocialLinksConfig {
  telegramUrl: string;
  telegramHandle: string;
  telegramMembers: string;
  twitterUrl: string;
  twitterHandle: string;
  twitterFollowers: string;
  youtubeUrl: string;
  youtubeHandle: string;
  youtubeSubscribers: string;
}

export const SiteConfigManager: React.FC = () => {
  // Top Announcement Banner State
  const [announcement, setAnnouncement] = useState<AnnouncementConfig>(() => {
    try {
      const saved = localStorage.getItem('admin_site_announcement');
      return saved ? JSON.parse(saved) : {
        enabled: true,
        badgeText: '🔥 VERIFIED PAYOUT',
        messageText: 'Claim 1 MEC Token (≈ $6 USD) on ME PASS Wallet with instant P2P withdrawal!',
        buttonText: 'Claim $6 Free Now',
        buttonUrl: 'https://i.mec.me/en-US?c=x4ccdp3m',
        backgroundColor: 'bg-gradient-to-r from-amber-500 via-emerald-600 to-sky-600',
      };
    } catch {
      return {
        enabled: true,
        badgeText: '🔥 VERIFIED PAYOUT',
        messageText: 'Claim 1 MEC Token (≈ $6 USD) on ME PASS Wallet with instant P2P withdrawal!',
        buttonText: 'Claim $6 Free Now',
        buttonUrl: 'https://i.mec.me/en-US?c=x4ccdp3m',
        backgroundColor: 'bg-gradient-to-r from-amber-500 via-emerald-600 to-sky-600',
      };
    }
  });

  // Social Channels Config
  const [socials, setSocials] = useState<SocialLinksConfig>(() => {
    try {
      const saved = localStorage.getItem('admin_social_config');
      return saved ? JSON.parse(saved) : {
        telegramUrl: 'https://t.me/Aplus_info',
        telegramHandle: '@Aplus_info',
        telegramMembers: '25,000+ Members',
        twitterUrl: 'https://twitter.com/AplusHustler',
        twitterHandle: '@AplusHustler',
        twitterFollowers: '18,500+ Followers',
        youtubeUrl: 'https://youtube.com/@AplusHustler',
        youtubeHandle: '@AplusHustler',
        youtubeSubscribers: '12,000+ Subscribers',
      };
    } catch {
      return {
        telegramUrl: 'https://t.me/Aplus_info',
        telegramHandle: '@Aplus_info',
        telegramMembers: '25,000+ Members',
        twitterUrl: 'https://twitter.com/AplusHustler',
        twitterHandle: '@AplusHustler',
        twitterFollowers: '18,500+ Followers',
        youtubeUrl: 'https://youtube.com/@AplusHustler',
        youtubeHandle: '@AplusHustler',
        youtubeSubscribers: '12,000+ Subscribers',
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('admin_site_announcement', JSON.stringify(announcement));
  }, [announcement]);

  useEffect(() => {
    localStorage.setItem('admin_social_config', JSON.stringify(socials));
  }, [socials]);

  const handleSaveAnnouncement = () => {
    localStorage.setItem('admin_site_announcement', JSON.stringify(announcement));
    toast.success('Site top announcement bar updated live!');
  };

  const handleSaveSocials = () => {
    localStorage.setItem('admin_social_config', JSON.stringify(socials));
    toast.success('Social channels & community links updated live!');
  };

  // Full System Export / Restore JSON
  const handleExportFullData = () => {
    const fullBackup = {
      timestamp: new Date().toISOString(),
      announcement,
      socials,
      earningApps: JSON.parse(localStorage.getItem('admin_earning_apps') || '[]'),
      payoutProofs: JSON.parse(localStorage.getItem('admin_payout_proofs') || '[]'),
      airdrops: JSON.parse(localStorage.getItem('admin_airdrops') || '[]'),
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `aplushustler_full_backup_${Date.now()}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    toast.success('Downloaded full JSON database backup!');
  };

  const handleImportFullData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.announcement) localStorage.setItem('admin_site_announcement', JSON.stringify(parsed.announcement));
          if (parsed.socials) localStorage.setItem('admin_social_config', JSON.stringify(parsed.socials));
          if (parsed.earningApps) localStorage.setItem('admin_earning_apps', JSON.stringify(parsed.earningApps));
          if (parsed.payoutProofs) localStorage.setItem('admin_payout_proofs', JSON.stringify(parsed.payoutProofs));
          if (parsed.airdrops) localStorage.setItem('admin_airdrops', JSON.stringify(parsed.airdrops));
          
          toast.success('Full platform database restored successfully! Reloading...');
          setTimeout(() => window.location.reload(), 1000);
        } catch {
          toast.error('Invalid JSON backup file!');
        }
      };
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Announcement Bar Settings */}
      <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-400" />
              Live Site Top Announcement Banner
            </h3>
            <p className="text-xs text-muted-foreground">Customize the top notification banner displayed to all visitors.</p>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={announcement.enabled}
              onCheckedChange={checked => setAnnouncement({ ...announcement, enabled: checked })}
            />
            <span className="text-xs font-semibold">{announcement.enabled ? 'Banner Active 🟢' : 'Disabled 🔴'}</span>
          </div>
        </div>

        {/* Live Banner Preview */}
        {announcement.enabled && (
          <div className={`p-3 rounded-xl text-white text-xs font-medium flex flex-col sm:flex-row items-center justify-between gap-2 shadow-md ${announcement.backgroundColor}`}>
            <div className="flex items-center gap-2 text-center sm:text-left">
              <Badge className="bg-black/30 text-white border-white/20 text-[10px] uppercase font-bold shrink-0">
                {announcement.badgeText}
              </Badge>
              <span>{announcement.messageText}</span>
            </div>
            <a href={announcement.buttonUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold h-7 px-3">
                {announcement.buttonText}
              </Button>
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div>
            <Label className="text-xs">Badge Tag Text</Label>
            <Input
              value={announcement.badgeText}
              onChange={e => setAnnouncement({ ...announcement, badgeText: e.target.value })}
              className="text-xs mt-1"
            />
          </div>

          <div>
            <Label className="text-xs">Button CTA Text</Label>
            <Input
              value={announcement.buttonText}
              onChange={e => setAnnouncement({ ...announcement, buttonText: e.target.value })}
              className="text-xs mt-1"
            />
          </div>

          <div className="md:col-span-2">
            <Label className="text-xs">Announcement Message</Label>
            <Input
              value={announcement.messageText}
              onChange={e => setAnnouncement({ ...announcement, messageText: e.target.value })}
              className="text-xs mt-1"
            />
          </div>

          <div className="md:col-span-2">
            <Label className="text-xs">Target Referral Link URL</Label>
            <Input
              value={announcement.buttonUrl}
              onChange={e => setAnnouncement({ ...announcement, buttonUrl: e.target.value })}
              className="text-xs mt-1 font-mono"
            />
          </div>
        </div>

        <Button onClick={handleSaveAnnouncement} className="bg-primary text-primary-foreground font-semibold text-xs gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> Save Banner Config
        </Button>
      </div>

      {/* Social Links & Handles Manager */}
      <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
        <div>
          <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            Official Social Media Links & Handles
          </h3>
          <p className="text-xs text-muted-foreground">Configure links and subscriber numbers displayed in Navbar and Footer.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Telegram */}
          <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-bold">
              <Send className="w-4 h-4" /> Telegram Channel
            </div>
            <div>
              <Label className="text-[11px]">URL</Label>
              <Input
                value={socials.telegramUrl}
                onChange={e => setSocials({ ...socials, telegramUrl: e.target.value })}
                className="text-xs font-mono mt-1"
              />
            </div>
            <div>
              <Label className="text-[11px]">Handle</Label>
              <Input
                value={socials.telegramHandle}
                onChange={e => setSocials({ ...socials, telegramHandle: e.target.value })}
                className="text-xs mt-1"
              />
            </div>
            <div>
              <Label className="text-[11px]">Stats Label</Label>
              <Input
                value={socials.telegramMembers}
                onChange={e => setSocials({ ...socials, telegramMembers: e.target.value })}
                className="text-xs mt-1"
              />
            </div>
          </div>

          {/* Twitter */}
          <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold">
              <Twitter className="w-4 h-4" /> Twitter (X)
            </div>
            <div>
              <Label className="text-[11px]">URL</Label>
              <Input
                value={socials.twitterUrl}
                onChange={e => setSocials({ ...socials, twitterUrl: e.target.value })}
                className="text-xs font-mono mt-1"
              />
            </div>
            <div>
              <Label className="text-[11px]">Handle</Label>
              <Input
                value={socials.twitterHandle}
                onChange={e => setSocials({ ...socials, twitterHandle: e.target.value })}
                className="text-xs mt-1"
              />
            </div>
            <div>
              <Label className="text-[11px]">Stats Label</Label>
              <Input
                value={socials.twitterFollowers}
                onChange={e => setSocials({ ...socials, twitterFollowers: e.target.value })}
                className="text-xs mt-1"
              />
            </div>
          </div>

          {/* YouTube */}
          <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold">
              <Youtube className="w-4 h-4" /> YouTube Channel
            </div>
            <div>
              <Label className="text-[11px]">URL</Label>
              <Input
                value={socials.youtubeUrl}
                onChange={e => setSocials({ ...socials, youtubeUrl: e.target.value })}
                className="text-xs font-mono mt-1"
              />
            </div>
            <div>
              <Label className="text-[11px]">Handle</Label>
              <Input
                value={socials.youtubeHandle}
                onChange={e => setSocials({ ...socials, youtubeHandle: e.target.value })}
                className="text-xs mt-1"
              />
            </div>
            <div>
              <Label className="text-[11px]">Stats Label</Label>
              <Input
                value={socials.youtubeSubscribers}
                onChange={e => setSocials({ ...socials, youtubeSubscribers: e.target.value })}
                className="text-xs mt-1"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSaveSocials} className="bg-primary text-primary-foreground font-semibold text-xs gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> Save Social Channels
        </Button>
      </div>

      {/* Database Backup & Restore */}
      <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
        <div>
          <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Full Platform Backup & Restore (JSON)
          </h3>
          <p className="text-xs text-muted-foreground">Export or restore all earning apps, payout proofs, airdrops, and configurations.</p>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <Button onClick={handleExportFullData} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs gap-1.5">
            <Download className="w-4 h-4" /> Export Complete Backup (JSON)
          </Button>

          <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-foreground text-xs font-semibold">
            <Upload className="w-4 h-4 text-primary" />
            Restore From JSON File
            <input type="file" accept=".json" onChange={handleImportFullData} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
};
