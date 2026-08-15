import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Trash2, Mail, Download, ExternalLink, ShieldCheck, Sparkles, UserCheck, Inbox } from 'lucide-react';
import { toast } from 'sonner';

export interface AppSubmission {
  id: string;
  appName: string;
  category: string;
  url: string;
  notes: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface ProofSubmission {
  id: string;
  appName: string;
  amount: string;
  currency: string;
  proofImage: string;
  notes: string;
  userHandle: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const SubmissionsManager: React.FC<{
  onAppApprove?: (app: AppSubmission) => void;
  onProofApprove?: (proof: ProofSubmission) => void;
}> = ({ onAppApprove, onProofApprove }) => {
  const [appSubmissions, setAppSubmissions] = useState<AppSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('user_app_submissions');
      return saved ? JSON.parse(saved) : [
        {
          id: 'sub-app-1',
          appName: 'MecPay Telegram Bot',
          category: 'Telegram Bot',
          url: 'https://t.me/MecPayBot',
          notes: 'Instant daily $MEC claim bot. Tap to earn 0.05 MEC every 4 hours.',
          submittedAt: '2025-02-10',
          status: 'Pending'
        }
      ];
    } catch {
      return [];
    }
  });

  const [proofSubmissions, setProofSubmissions] = useState<ProofSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('user_proof_submissions');
      return saved ? JSON.parse(saved) : [
        {
          id: 'sub-proof-1',
          appName: 'mPaisa App',
          amount: '10.00',
          currency: 'Ethio Airtime',
          proofImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80',
          notes: 'Received Ethio Telecom airtime topup in 2 mins after task completion.',
          userHandle: '@ethio_hustler',
          submittedAt: '2025-02-11',
          status: 'Pending'
        }
      ];
    } catch {
      return [];
    }
  });

  const [subscribers, setSubscribers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('newsletter_subscribers');
      return saved ? JSON.parse(saved) : ['genet212020@gmail.com', 'hustler_alpha@gmail.com', 'crypto_earner99@gmail.com'];
    } catch {
      return ['genet212020@gmail.com'];
    }
  });

  useEffect(() => {
    localStorage.setItem('user_app_submissions', JSON.stringify(appSubmissions));
  }, [appSubmissions]);

  useEffect(() => {
    localStorage.setItem('user_proof_submissions', JSON.stringify(proofSubmissions));
  }, [proofSubmissions]);

  const handleApproveApp = (sub: AppSubmission) => {
    setAppSubmissions(prev => prev.map(s => s.id === sub.id ? { ...s, status: 'Approved' } : s));
    if (onAppApprove) {
      onAppApprove(sub);
    }
    toast.success(`Approved "${sub.appName}" & published to Earning Apps!`);
  };

  const handleRejectApp = (id: string) => {
    setAppSubmissions(prev => prev.filter(s => s.id !== id));
    toast.success('App submission removed');
  };

  const handleApproveProof = (sub: ProofSubmission) => {
    setProofSubmissions(prev => prev.map(s => s.id === sub.id ? { ...s, status: 'Approved' } : s));
    if (onProofApprove) {
      onProofApprove(sub);
    }
    toast.success(`Approved payout proof for "${sub.appName}"!`);
  };

  const handleRejectProof = (id: string) => {
    setProofSubmissions(prev => prev.filter(s => s.id !== id));
    toast.success('Proof submission removed');
  };

  const exportSubscribersCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,Email,SubscribedAt\n' + subscribers.map(email => `${email},${new Date().toLocaleDateString()}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aplushustler_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Exported subscribers CSV file!');
  };

  return (
    <div className="space-y-8">
      {/* Community Earning App Submissions */}
      <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              User Submitted Earning Apps ({appSubmissions.length})
            </h3>
            <p className="text-xs text-muted-foreground">App proposals submitted by website visitors for review.</p>
          </div>
          <Badge className="bg-amber-500/10 text-amber-300 border-amber-500/20">
            {appSubmissions.filter(s => s.status === 'Pending').length} Pending Review
          </Badge>
        </div>

        {appSubmissions.length === 0 ? (
          <div className="p-8 text-center text-xs text-muted-foreground bg-secondary/30 rounded-xl">
            <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
            No pending app submissions from visitors.
          </div>
        ) : (
          <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
            {appSubmissions.map((sub) => (
              <div key={sub.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card/60 hover:bg-secondary/30">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-foreground">{sub.appName}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-primary/20 text-primary">
                      {sub.category}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${sub.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{sub.notes}</p>
                  <a href={sub.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-mono hover:underline inline-flex items-center gap-1 mt-1">
                    {sub.url} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {sub.status === 'Pending' && (
                    <Button
                      size="sm"
                      onClick={() => handleApproveApp(sub)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold h-8 gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Add
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRejectApp(sub.id)}
                    className="text-destructive hover:bg-destructive/10 h-8 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Community Payout Proof Screenshots */}
      <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Submitted Withdrawal Screenshots ({proofSubmissions.length})
            </h3>
            <p className="text-xs text-muted-foreground">User-uploaded withdrawal receipts awaiting admin audit.</p>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            {proofSubmissions.filter(s => s.status === 'Pending').length} Pending Audit
          </Badge>
        </div>

        {proofSubmissions.length === 0 ? (
          <div className="p-8 text-center text-xs text-muted-foreground bg-secondary/30 rounded-xl">
            No screenshot receipts submitted yet.
          </div>
        ) : (
          <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
            {proofSubmissions.map((sub) => (
              <div key={sub.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card/60 hover:bg-secondary/30">
                <div className="flex items-center gap-4">
                  <img src={sub.proofImage} alt={sub.appName} className="w-14 h-14 rounded-xl object-cover border border-border shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-foreground">{sub.appName}</h4>
                      <span className="text-xs font-bold text-emerald-400">{sub.amount} {sub.currency}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${sub.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {sub.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{sub.notes}</p>
                    <span className="text-[11px] text-muted-foreground font-mono">By: {sub.userHandle} • {sub.submittedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {sub.status === 'Pending' && (
                    <Button
                      size="sm"
                      onClick={() => handleApproveProof(sub)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold h-8 gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve Proof
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRejectProof(sub.id)}
                    className="text-destructive hover:bg-destructive/10 h-8 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Email Leads */}
      <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              Newsletter & Airdrop Alert Leads ({subscribers.length})
            </h3>
            <p className="text-xs text-muted-foreground">Emails captured from the home page & blog airdrop alerts.</p>
          </div>
          <Button size="sm" onClick={exportSubscribersCSV} className="bg-primary text-primary-foreground text-xs font-semibold gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export Leads (CSV)
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {subscribers.map((email, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-secondary/50 border border-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 truncate">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium truncate text-foreground">{email}</span>
              </div>
              <Badge variant="outline" className="text-[10px] text-muted-foreground border-border shrink-0">Subscribed</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
