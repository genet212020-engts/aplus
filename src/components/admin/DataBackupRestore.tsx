import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  Upload,
  RefreshCw,
  FileSpreadsheet,
  Database,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  HardDrive
} from 'lucide-react';
import { toast } from 'sonner';
import { EarningAppItem } from './EarningAppModal';
import { Airdrop } from '@/data/airdropData';
import { ProofItem } from './ProofModal';

interface DataBackupRestoreProps {
  earningApps: EarningAppItem[];
  airdrops: Airdrop[];
  payoutProofs: ProofItem[];
  onRestoreData: (backup: {
    earningApps?: EarningAppItem[];
    airdrops?: Airdrop[];
    payoutProofs?: ProofItem[];
    siteAnnouncement?: any;
    socialConfig?: any;
  }) => void;
  onResetFactoryData: () => void;
}

export const DataBackupRestore: React.FC<DataBackupRestoreProps> = ({
  earningApps,
  airdrops,
  payoutProofs,
  onRestoreData,
  onResetFactoryData,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 1. Export Everything as Full JSON
  const handleExportFullJSON = () => {
    setIsExporting(true);
    try {
      const siteAnnouncement = localStorage.getItem('admin_site_announcement');
      const socialConfig = localStorage.getItem('admin_social_config');
      const newsletterSubscribers = localStorage.getItem('newsletter_subscribers');
      const userAppSubmissions = localStorage.getItem('user_app_submissions');
      const userProofSubmissions = localStorage.getItem('user_proof_submissions');

      const fullBackup = {
        exportedAt: new Date().toISOString(),
        version: '2.0.0',
        platform: 'AplusHustler',
        data: {
          earningApps,
          airdrops,
          payoutProofs,
          siteAnnouncement: siteAnnouncement ? JSON.parse(siteAnnouncement) : null,
          socialConfig: socialConfig ? JSON.parse(socialConfig) : null,
          newsletterSubscribers: newsletterSubscribers ? JSON.parse(newsletterSubscribers) : [],
          userAppSubmissions: userAppSubmissions ? JSON.parse(userAppSubmissions) : [],
          userProofSubmissions: userProofSubmissions ? JSON.parse(userProofSubmissions) : [],
        },
      };

      const jsonStr = JSON.stringify(fullBackup, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `aplushustler-full-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Full JSON Backup downloaded successfully!');
    } catch (err) {
      toast.error('Failed to generate backup JSON');
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  // 2. Export Earning Apps to CSV
  const handleExportAppsCSV = () => {
    if (earningApps.length === 0) {
      toast.error('No earning apps to export');
      return;
    }

    const headers = ['ID', 'Name', 'Category', 'Rating', 'Download URL', 'Referral Code', 'Welcome Bonus', 'Earning Potential', 'Security Score'];
    const rows = earningApps.map((app) => [
      `"${app.id}"`,
      `"${app.name.replace(/"/g, '""')}"`,
      `"${app.category}"`,
      app.rating,
      `"${app.downloadUrl}"`,
      `"${app.referralCode || ''}"`,
      `"${(app.welcomeBonus || '').replace(/"/g, '""')}"`,
      `"${(app.earningPotential || '').replace(/"/g, '""')}"`,
      app.securityScore,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aplushustler-earning-apps-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Exported ${earningApps.length} earning apps to CSV!`);
  };

  // 3. Export Payout Proofs to CSV
  const handleExportProofsCSV = () => {
    if (payoutProofs.length === 0) {
      toast.error('No payout proofs to export');
      return;
    }

    const headers = ['ID', 'App Name', 'Amount', 'Currency', 'USD Equivalent', 'Payout Method', 'TX Hash', 'User Handle', 'Date', 'Status'];
    const rows = payoutProofs.map((p) => [
      `"${p.id}"`,
      `"${p.appName.replace(/"/g, '""')}"`,
      `"${p.amount}"`,
      `"${p.currency}"`,
      `"${p.usdEquivalent}"`,
      `"${p.payoutMethod.replace(/"/g, '""')}"`,
      `"${p.txHash}"`,
      `"${p.userHandle}"`,
      `"${p.date}"`,
      `"${p.status}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aplushustler-payout-proofs-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Exported ${payoutProofs.length} payout proofs to CSV!`);
  };

  // 4. Handle JSON Restore Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        // Validate structure
        const data = parsed.data || parsed;
        if (!data || (!data.earningApps && !data.airdrops && !data.payoutProofs)) {
          toast.error('Invalid backup format. Missing core application data.');
          return;
        }

        if (
          window.confirm(
            `Found backup from ${parsed.exportedAt || 'previous session'}. Do you want to restore and overwrite current local data?`
          )
        ) {
          onRestoreData(data);
          toast.success('System data successfully restored from backup!');
        }
      } catch (err) {
        toast.error('Failed to parse JSON backup file. Please verify file integrity.');
        console.error(err);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Compute local storage usage
  const getStorageSize = () => {
    let total = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += (localStorage[key].length + key.length) * 2;
      }
    }
    return (total / 1024).toFixed(1) + ' KB';
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HardDrive className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-lg text-foreground">
              Data Management & Backup Engine
            </h3>
            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
              Offline-Safe
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Export full system snapshots, download CSV spreadsheets for auditing, or restore previous data effortlessly.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-secondary/50 p-2.5 rounded-xl border border-border">
          <Database className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Local Cache:</span>
          <strong className="text-foreground">{getStorageSize()}</strong>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Backup & Export */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
              <Download className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-foreground mb-1">Full System Backup (JSON)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Packages all Earning Apps, Airdrops, Payout Proofs, Announcements, Social Links, and Lead Submissions into a single portable backup file.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground font-mono mb-2">
              <span className="px-2 py-0.5 rounded bg-secondary">Apps: {earningApps.length}</span>
              <span className="px-2 py-0.5 rounded bg-secondary">Airdrops: {airdrops.length}</span>
              <span className="px-2 py-0.5 rounded bg-secondary">Proofs: {payoutProofs.length}</span>
            </div>
          </div>

          <Button
            onClick={handleExportFullJSON}
            disabled={isExporting}
            className="w-full bg-primary text-primary-foreground font-semibold text-xs shadow-md gap-2"
          >
            <Download className="w-4 h-4" /> Download Complete JSON Backup
          </Button>
        </div>

        {/* Restore from File */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <Upload className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-foreground mb-1">Restore from Backup File</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Upload a previously exported JSON backup file to instantly restore your apps, proofs, airdrops, and configurations.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>

          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="w-full border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-semibold text-xs gap-2"
          >
            <Upload className="w-4 h-4" /> Choose JSON Backup File
          </Button>
        </div>

        {/* CSV Spreadsheets Exports */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-foreground mb-1">Export Data to CSV (Excel / Sheets)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Download clean CSV spreadsheets for bookkeeping, commission calculations, and affiliate reporting.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleExportAppsCSV}
              variant="secondary"
              size="sm"
              className="text-xs gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" /> Apps CSV
            </Button>
            <Button
              onClick={handleExportProofsCSV}
              variant="secondary"
              size="sm"
              className="text-xs gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Proofs CSV
            </Button>
          </div>
        </div>

        {/* Factory Reset & Sample Presets */}
        <div className="p-6 rounded-2xl bg-card border border-destructive/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-foreground mb-1">Reset to Factory Demo Presets</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Restores the default verified Earning Apps (ME PASS, mPaisa, HiFami, Jolly Cash, etc.) and sample payout proofs.
            </p>
          </div>

          <Button
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure you want to reset all data to default verified presets? Any unsaved custom entries will be replaced.'
                )
              ) {
                onResetFactoryData();
                toast.success('Successfully restored default verified presets!');
              }
            }}
            variant="destructive"
            className="w-full text-xs font-semibold gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Reset to Verified Sample Presets
          </Button>
        </div>
      </div>
    </div>
  );
};
