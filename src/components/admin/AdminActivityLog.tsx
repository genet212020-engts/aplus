import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  History,
  Sparkles,
  Zap,
  ShieldCheck,
  FileText,
  Trash2,
  CheckCircle2,
  Clock
} from 'lucide-react';

export interface ActivityEntry {
  id: string;
  type: 'app' | 'airdrop' | 'proof' | 'post' | 'system';
  action: string;
  target: string;
  timestamp: string;
  user: string;
}

const defaultActivities: ActivityEntry[] = [
  {
    id: 'act-1',
    type: 'app',
    action: 'Updated Reward Payout',
    target: 'ME PASS (1 MEC ≈ $6)',
    timestamp: '10 minutes ago',
    user: 'Administrator',
  },
  {
    id: 'act-2',
    type: 'proof',
    action: 'Verified Payout Proof',
    target: '$15.00 Ethio Airtime on mPaisa',
    timestamp: '1 hour ago',
    user: 'Administrator',
  },
  {
    id: 'act-3',
    type: 'airdrop',
    action: 'Refreshed Guide',
    target: 'Sonic SVM Testnet ($12M Funding)',
    timestamp: '3 hours ago',
    user: 'Administrator',
  },
  {
    id: 'act-4',
    type: 'post',
    action: 'Published Guide',
    target: 'How to Cash Out MEC Token via P2P',
    timestamp: 'Yesterday',
    user: 'Administrator',
  },
  {
    id: 'act-5',
    type: 'system',
    action: 'Cloud Data Sync',
    target: 'Local storage cache synchronized',
    timestamp: 'Yesterday',
    user: 'System Bot',
  },
];

export const AdminActivityLog: React.FC = () => {
  const [activities, setActivities] = useState<ActivityEntry[]>(() => {
    try {
      const saved = localStorage.getItem('admin_activity_log');
      return saved ? JSON.parse(saved) : defaultActivities;
    } catch {
      return defaultActivities;
    }
  });

  const handleClearLog = () => {
    setActivities([]);
    localStorage.removeItem('admin_activity_log');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'app':
        return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
      case 'airdrop':
        return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'proof':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />;
      case 'post':
        return <FileText className="w-3.5 h-3.5 text-blue-400" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-primary" />;
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-display font-bold text-base text-foreground">Recent Management Activity</h3>
            <p className="text-xs text-muted-foreground">Audit trail of recent app updates, payout verifications, and system events</p>
          </div>
        </div>

        {activities.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearLog}
            className="text-[11px] h-7 text-muted-foreground hover:text-destructive"
          >
            Clear Log
          </Button>
        )}
      </div>

      {activities.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-6">No recent activities logged</p>
      ) : (
        <div className="divide-y divide-border/50">
          {activities.map((act) => (
            <div key={act.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-secondary/80 flex items-center justify-center shrink-0">
                  {getIcon(act.type)}
                </div>
                <div className="min-w-0 truncate">
                  <span className="font-semibold text-foreground mr-1.5">{act.action}:</span>
                  <span className="text-muted-foreground truncate">{act.target}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 text-[11px] text-muted-foreground font-mono">
                <span className="hidden sm:inline-block">{act.user}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-muted-foreground/60" />
                  {act.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
