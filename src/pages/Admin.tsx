import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  FileText,
  FolderOpen,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Tag,
  Clock,
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  BarChart3,
  Settings,
  ExternalLink,
  Copy,
  CheckCircle2,
  DollarSign,
  Gift,
  Users,
  Menu,
  X,
  RefreshCw,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import YouTubeImporter from '@/components/YouTubeImporter';
import { EarningAppModal, EarningAppItem } from '@/components/admin/EarningAppModal';
import { ProofModal, ProofItem } from '@/components/admin/ProofModal';
import { AirdropModal } from '@/components/admin/AirdropModal';
import { SubmissionsManager } from '@/components/admin/SubmissionsManager';
import { SiteConfigManager } from '@/components/admin/SiteConfigManager';
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts';
import { ReferralCodeBox } from '@/components/ReferralCodeBox';
import { airdrops as initialAirdrops, Airdrop } from '@/data/airdropData';

interface Blog {
  id: string;
  title: string;
  slug: string;
  status: string;
  views: number;
  created_at: string;
  publish_at: string | null;
  youtube_video_id: string | null;
  categories: { name: string } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

// Initial default Earning Apps for Admin management
const defaultEarningApps: EarningAppItem[] = [
  {
    id: 'mepass',
    name: 'ME PASS (MEC Token)',
    description: 'Crypto wallet & P2P token exchange (1 MEC ≈ $6). Earn MEC via daily check-in, Face & National ID verification!',
    longDescription: 'ME PASS is a verified crypto wallet with a built-in P2P trading exchange. Earn MEC token through daily check-ins and referral invites. Complete initial Face verification, then complete Me ID verification via National ID or Passport after 2-3 hours to instantly receive 1 MEC stake + 0.1 MEC fast bonus. Market price is ~ $6/MEC and can be sold immediately on P2P!',
    category: 'Wallet',
    downloadUrl: 'https://i.mec.me/en-US?c=x4ccdp3m',
    referralCode: 'x4ccdp3m',
    welcomeBonus: '1 MEC Stake + 0.1 MEC Instant (1 MEC ≈ $6)',
    earningPotential: '💎 1 MEC ≈ $6 High Value',
    rating: 4.9,
    reviewsCount: '310K+',
    securityScore: 98,
    icon: '🛡️',
    featured: true,
    verified: true,
    highlights: ['1 MEC Token value ≈ $6 USD', 'Instant built-in P2P crypto selling', '0.1 MEC fast payout upon ID verification', 'Referral code: x4ccdp3m'],
    stepsToEarn: ['Download Me Pass app', 'Sign up with Email & Code: x4ccdp3m', 'Complete Face & National ID verification', 'Claim bonus and cash out via P2P'],
  },
  {
    id: 'mpaisa',
    name: 'mPaisa App',
    description: 'Play games & complete tasks to earn Ethio Telecom airtime, Safaricom airtime, USDT crypto, or PUBG UC!',
    longDescription: 'mPaisa offers direct local and international payout options. Earn coins by playing games, trying apps, and finishing task offers. Withdraw directly to Ethio Telecom balance, Safaricom airtime, USDT wallet, or PUBG Mobile UC.',
    category: 'Tasks & Micro-Earning',
    downloadUrl: 'https://mpaisa.b4a.app/?uid=y5W9FCq0sN',
    welcomeBonus: 'Free Bonus Coins on First Task',
    earningPotential: '📱 Airtime & Crypto',
    rating: 4.9,
    reviewsCount: '280K+',
    securityScore: 97,
    icon: '🎮',
    featured: true,
    verified: true,
    highlights: ['Direct Ethio Telecom & Safaricom airtime', 'USDT crypto withdrawal to any wallet', 'Instant PUBG Mobile UC top-ups', 'Multiple daily gaming tasks'],
    stepsToEarn: ['Download app via offer link', 'Complete initial gaming task', 'Request instant Ethio Telecom or USDT payout'],
  },
  {
    id: 'hifami',
    name: 'HiFami App',
    description: 'Ultra-fast earning app with $0.10 minimum withdrawal, $0.10 instant signup bonus & $0.15 per referral!',
    longDescription: 'HiFami is a fast and simple online earning app. Get an instant $0.10 welcome bonus as soon as you sign up and withdraw right away! Earn $0.15 for every friend who downloads using your link. Make $15+/week with minimal effort.',
    category: 'Tasks & Micro-Earning',
    downloadUrl: 'https://s.hifamiapp.com/1/QZcAmAUEj',
    welcomeBonus: '$0.10 Signup Bonus + $0.15/Referral',
    earningPotential: '🔥 $15+/Week Income',
    rating: 4.9,
    reviewsCount: '210K+',
    securityScore: 99,
    icon: '💵',
    featured: true,
    verified: true,
    highlights: ['Lowest minimum payout: $0.10 only!', '$0.10 instant signup bonus upon registration', '$0.15 bonus per referral app download', 'Earn $15+ per week easily'],
    stepsToEarn: ['Register account via link', 'Claim $0.10 instant welcome bonus', 'Invite friends to earn $0.15 per referral'],
  },
  {
    id: 'jollycash',
    name: 'Jolly Cash',
    description: 'Watch videos, complete offer tasks, answer quizzes & level up games. Claim 6,000 points with Code 1547719!',
    longDescription: 'Jolly Cash allows users to earn cash by watching videos, completing offerwall tasks, answering trivia, and reaching game levels. Enter referral code 1547719 upon joining to claim 6,000 bonus points immediately. Minimum payout is $5.00 with 100% verified withdrawal proof.',
    category: 'Tasks & Micro-Earning',
    downloadUrl: 'https://jollycash.co/?inviteCode=1547719&channelCode=h3UFVM',
    referralCode: '1547719',
    welcomeBonus: '6,000 Points Bonus with Code: 1547719',
    earningPotential: '💰 $5.00 Minimum Payout',
    rating: 4.9,
    reviewsCount: '240K+',
    securityScore: 97,
    icon: '🎁',
    featured: true,
    verified: true,
    highlights: ['Get FREE 6,000 points with code: 1547719', 'Watch videos & complete gaming offerwalls', 'Minimum withdrawal threshold: $5.00', '100% verified payout proof'],
    stepsToEarn: ['Install Jolly Cash', 'Enter code 1547719 for 6,000 points', 'Watch videos and cash out at $5'],
  },
  {
    id: 'jumptask',
    name: 'JumpTask & Honeygain',
    description: 'Complete micro-tasks like watching YouTube, Google keyword searches, and Binance/Discord tasks. $0.50 min payout!',
    longDescription: 'JumpTask provides flexible micro-task options: watching YouTube videos and clicking links, searching target keywords on Google, and completing Discord or Binance verification tasks. Cash out to your crypto wallet starting from just $0.50 within 6 hours.',
    category: 'Tasks & Micro-Earning',
    downloadUrl: 'https://join.honeygain.com/FITSU21037',
    welcomeBonus: 'Low $0.50 Withdrawal Minimum',
    earningPotential: '⚡ $0.50 Low Threshold',
    rating: 4.8,
    reviewsCount: '520K+',
    securityScore: 96,
    icon: '🐝',
    featured: true,
    verified: true,
    highlights: ['Watch YouTube videos & confirm view link', 'Google keyword search micro-tasks', 'Minimum payout $0.50 processed within 6 hrs', 'Binance & Discord tasks'],
    stepsToEarn: ['Register via link', 'Complete micro YouTube or Google search tasks', 'Withdraw to BSC wallet at $0.50'],
  },
  {
    id: 'buzzerfan',
    name: 'Buzzerfan',
    description: 'Post and watch TikTok-style short sports clips, invite friends with Code 5390F5, and earn cash rewards.',
    longDescription: 'Buzzerfan rewards sports enthusiasts for uploading and watching short viral sports videos, similar to TikTok. Earn rewards by engaging with clips and inviting friends with referral code 5390F5.',
    category: 'Tasks & Micro-Earning',
    downloadUrl: 'https://app.buzzerfan.com/referral-invite/rs1fa1a539b1944f67b4960f575e3face4',
    referralCode: '5390F5',
    welcomeBonus: 'Referral Rewards with Code: 5390F5',
    earningPotential: '💵 $10 - $25 / Week',
    rating: 4.8,
    reviewsCount: '150K+',
    securityScore: 95,
    icon: '⚽',
    featured: true,
    verified: true,
    highlights: ['TikTok-style viral sports video platform', 'Earn by watching and posting short clips', 'Referral code: 5390F5'],
    stepsToEarn: ['Download Buzzerfan app', 'Enter code 5390F5', 'Watch and share sports clips to earn'],
  }
];

// Initial default Payout Proofs for Admin management
const defaultPayoutProofs: ProofItem[] = [
  {
    id: 'proof-mepass-1',
    appName: 'ME PASS (MEC Token)',
    appCategory: 'Crypto Wallet',
    amount: '6.00',
    currency: 'MEC',
    usdEquivalent: '$36.00',
    payoutMethod: 'Me Pass P2P Exchange',
    txHash: 'MEC-TX-99812450',
    proofImage: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80',
    date: '2025-02-09',
    status: 'Verified',
    userHandle: '@mec_trader',
    notes: 'Earned 6 MEC (1 MEC ≈ $6) via daily check-in and KYC ID verification. Sold instantly via built-in P2P.',
    appUrl: 'https://i.mec.me/en-US?c=x4ccdp3m',
    featured: true,
  },
  {
    id: 'proof-mpaisa-1',
    appName: 'mPaisa App',
    appCategory: 'Tasks & Gaming',
    amount: '15.00',
    currency: 'USDT / Airtime',
    usdEquivalent: '$15.00',
    payoutMethod: 'Ethio Telecom / Safaricom / USDT',
    txHash: 'MPAISA-WD-77120',
    proofImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80',
    date: '2025-02-10',
    status: 'Instant',
    userHandle: '@ethio_earner',
    notes: 'Completed mobile gaming tasks and received instant Ethio Telecom airtime / USDT payout.',
    appUrl: 'https://mpaisa.b4a.app/?uid=y5W9FCq0sN',
    featured: true,
  },
  {
    id: 'proof-hifami-1',
    appName: 'HiFami App',
    appCategory: 'Micro Tasks',
    amount: '24.50',
    currency: 'USD',
    usdEquivalent: '$24.50',
    payoutMethod: 'Direct Wallet / Payout',
    txHash: 'HF-PAYOUT-33109',
    proofImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    date: '2025-02-10',
    status: 'Instant',
    userHandle: '@hifami_boss',
    notes: 'Cashed out minimum $0.10 threshold instantly + referral rewards ($0.15 per referral).',
    appUrl: 'https://s.hifamiapp.com/1/QZcAmAUEj',
    featured: true,
  },
  {
    id: 'proof-jollycash-1',
    appName: 'Jolly Cash',
    appCategory: 'Offerwall',
    amount: '50.00',
    currency: 'USD',
    usdEquivalent: '$50.00',
    payoutMethod: 'Crypto Wallet',
    txHash: 'JC-CLAIM-882194',
    proofImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    date: '2025-02-09',
    status: 'Completed',
    userHandle: '@jolly_hustler',
    notes: 'Used invite code 1547719 for 6,000 bonus points. Completed video & offerwall tasks for $50 withdrawal.',
    appUrl: 'https://jollycash.co/?inviteCode=1547719&channelCode=h3UFVM',
    featured: true,
  }
];

type AdminTab = 'overview' | 'apps' | 'airdrops' | 'proofs' | 'submissions' | 'banner' | 'socials' | 'posts' | 'categories' | 'analytics' | 'settings';

const Admin = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Posts State
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, scheduled: 0, views: 0 });
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());
  const [newCategoryName, setNewCategoryName] = useState('');

  // Earning Apps State
  const [earningApps, setEarningApps] = useState<EarningAppItem[]>(() => {
    const saved = localStorage.getItem('admin_earning_apps');
    return saved ? JSON.parse(saved) : defaultEarningApps;
  });
  const [appSearch, setAppSearch] = useState('');
  const [appCategoryFilter, setAppCategoryFilter] = useState('all');
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<EarningAppItem | null>(null);

  // Airdrops State
  const [airdrops, setAirdrops] = useState<Airdrop[]>(() => {
    const saved = localStorage.getItem('admin_airdrops');
    return saved ? JSON.parse(saved) : initialAirdrops;
  });
  const [airdropSearch, setAirdropSearch] = useState('');
  const [isAirdropModalOpen, setIsAirdropModalOpen] = useState(false);
  const [editingAirdrop, setEditingAirdrop] = useState<Airdrop | null>(null);

  // Payout Proofs State
  const [payoutProofs, setPayoutProofs] = useState<ProofItem[]>(() => {
    const saved = localStorage.getItem('admin_payout_proofs');
    return saved ? JSON.parse(saved) : defaultPayoutProofs;
  });
  const [proofSearch, setProofSearch] = useState('');
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [editingProof, setEditingProof] = useState<ProofItem | null>(null);

  // Persist Earning Apps to localStorage
  useEffect(() => {
    localStorage.setItem('admin_earning_apps', JSON.stringify(earningApps));
  }, [earningApps]);

  // Persist Airdrops to localStorage
  useEffect(() => {
    localStorage.setItem('admin_airdrops', JSON.stringify(airdrops));
  }, [airdrops]);

  // Persist Payout Proofs to localStorage
  useEffect(() => {
    localStorage.setItem('admin_payout_proofs', JSON.stringify(payoutProofs));
  }, [payoutProofs]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchBlogs();
      fetchCategories();
    }
  }, [user, isAdmin]);

  const fetchBlogs = async () => {
    setIsFetching(true);
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, slug, status, views, created_at, publish_at, youtube_video_id, categories(name)')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch blogs from database');
    } else {
      setBlogs(data || []);
      const totalViews = (data || []).reduce((sum, blog) => sum + (blog.views || 0), 0);
      setStats({
        total: data?.length || 0,
        published: data?.filter(b => b.status === 'published').length || 0,
        drafts: data?.filter(b => b.status === 'draft').length || 0,
        scheduled: data?.filter(b => b.status === 'scheduled').length || 0,
        views: totalViews,
      });
    }
    setIsFetching(false);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('name');
    setCategories(data || []);
  };

  // Earning Apps CRUD
  const handleSaveEarningApp = (savedApp: EarningAppItem) => {
    setEarningApps(prev => {
      const exists = prev.some(a => a.id === savedApp.id);
      if (exists) {
        return prev.map(a => a.id === savedApp.id ? savedApp : a);
      }
      return [savedApp, ...prev];
    });
  };

  const handleDeleteEarningApp = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete app "${name}"?`)) return;
    setEarningApps(prev => prev.filter(a => a.id !== id));
    toast.success(`Deleted "${name}"`);
  };

  // Airdrops CRUD
  const handleSaveAirdrop = (savedAirdrop: Airdrop) => {
    setAirdrops(prev => {
      const exists = prev.some(a => a.id === savedAirdrop.id);
      if (exists) {
        return prev.map(a => a.id === savedAirdrop.id ? savedAirdrop : a);
      }
      return [savedAirdrop, ...prev];
    });
  };

  const handleDeleteAirdrop = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete airdrop "${name}"?`)) return;
    setAirdrops(prev => prev.filter(a => a.id !== id));
    toast.success(`Deleted airdrop "${name}"`);
  };

  // Payout Proofs CRUD
  const handleSaveProof = (savedProof: ProofItem) => {
    setPayoutProofs(prev => {
      const exists = prev.some(p => p.id === savedProof.id);
      if (exists) {
        return prev.map(p => p.id === savedProof.id ? savedProof : p);
      }
      return [savedProof, ...prev];
    });
  };

  const handleDeleteProof = (id: string, appName: string) => {
    if (!confirm(`Delete payout proof for "${appName}"?`)) return;
    setPayoutProofs(prev => prev.filter(p => p.id !== id));
    toast.success(`Proof deleted for "${appName}"`);
  };

  // Blog CRUD
  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`Delete article "${title}"?`)) return;

    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete post');
    } else {
      toast.success('Post deleted successfully');
      setSelectedPosts(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      fetchBlogs();
    }
  };

  const handleBulkDelete = async () => {
    if (selectedPosts.size === 0) return;
    if (!confirm(`Delete ${selectedPosts.size} selected posts?`)) return;

    const { error } = await supabase
      .from('blogs')
      .delete()
      .in('id', Array.from(selectedPosts));

    if (error) {
      toast.error('Failed to delete posts');
    } else {
      toast.success(`${selectedPosts.size} posts deleted`);
      setSelectedPosts(new Set());
      fetchBlogs();
    }
  };

  const handleBulkPublish = async () => {
    if (selectedPosts.size === 0) return;

    const { error } = await supabase
      .from('blogs')
      .update({ status: 'published' })
      .in('id', Array.from(selectedPosts));

    if (error) {
      toast.error('Failed to publish posts');
    } else {
      toast.success(`${selectedPosts.size} posts published`);
      setSelectedPosts(new Set());
      fetchBlogs();
    }
  };

  const handleBulkUnpublish = async () => {
    if (selectedPosts.size === 0) return;

    const { error } = await supabase
      .from('blogs')
      .update({ status: 'draft' })
      .in('id', Array.from(selectedPosts));

    if (error) {
      toast.error('Failed to unpublish posts');
    } else {
      toast.success(`${selectedPosts.size} posts moved to draft`);
      setSelectedPosts(new Set());
      fetchBlogs();
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    const slug = newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const { error } = await supabase.from('categories').insert({ name: newCategoryName.trim(), slug });

    if (error) {
      toast.error('Failed to add category');
    } else {
      toast.success('Category added');
      setNewCategoryName('');
      fetchCategories();
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"?`)) return;

    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete category');
    } else {
      toast.success('Category deleted');
      fetchCategories();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const togglePostSelection = (id: string) => {
    setSelectedPosts(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedPosts.size === filteredBlogs.length) {
      setSelectedPosts(new Set());
    } else {
      setSelectedPosts(new Set(filteredBlogs.map(b => b.id)));
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredApps = earningApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.description.toLowerCase().includes(appSearch.toLowerCase()) ||
      (app.referralCode && app.referralCode.toLowerCase().includes(appSearch.toLowerCase()));
    const matchesCat = appCategoryFilter === 'all' || app.category === appCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredAirdrops = airdrops.filter(airdrop => {
    return airdrop.name.toLowerCase().includes(airdropSearch.toLowerCase()) ||
      airdrop.ticker.toLowerCase().includes(airdropSearch.toLowerCase()) ||
      airdrop.category.toLowerCase().includes(airdropSearch.toLowerCase()) ||
      airdrop.blockchain.toLowerCase().includes(airdropSearch.toLowerCase());
  });

  const filteredProofs = payoutProofs.filter(proof => {
    return proof.appName.toLowerCase().includes(proofSearch.toLowerCase()) ||
      proof.payoutMethod.toLowerCase().includes(proofSearch.toLowerCase()) ||
      proof.userHandle.toLowerCase().includes(proofSearch.toLowerCase());
  });

  const getStatusBadge = (status: string, publishAt: string | null) => {
    if (status === 'published') {
      return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-400">published</span>;
    } else if (status === 'scheduled' && publishAt) {
      return (
        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {new Date(publishAt).toLocaleDateString()}
        </span>
      );
    }
    return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-400">draft</span>;
  };

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <Sparkles className="w-6 h-6 animate-spin" />
          </div>
          <div className="text-muted-foreground font-display font-medium text-sm">Loading Professional Admin Console...</div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-card p-8 rounded-2xl border border-border shadow-lg">
          <div className="w-12 h-12 rounded-full bg-destructive/20 text-destructive flex items-center justify-center mx-auto mb-4">
            <X className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2 font-display">Access Restricted</h1>
          <p className="text-muted-foreground text-sm mb-6">Administrator privileges are required to access this dashboard.</p>
          <Button onClick={handleSignOut} className="w-full bg-primary text-primary-foreground">Sign Out</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Console | AplusHustler Platform</title>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
        {/* Mobile Header Navigation Toggle */}
        <div className="lg:hidden bg-card border-b border-border p-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary font-display">A+</div>
            <span className="font-display font-bold text-base text-foreground">Admin Console</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card/95 border-r border-border/80 backdrop-blur-md flex flex-col justify-between p-4 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div>
            {/* Admin Brand Logo */}
            <div className="flex items-center justify-between px-2 py-3 mb-6 border-b border-border/50">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-gold p-0.5 shadow-md flex items-center justify-center font-bold text-black font-display text-lg">
                  A+
                </div>
                <div>
                  <h1 className="font-display font-bold text-base leading-none text-foreground group-hover:text-primary transition-colors">
                    AplusHustler
                  </h1>
                  <span className="text-[10px] text-primary font-semibold uppercase tracking-wider block mt-0.5">Admin Console</span>
                </div>
              </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              <button
                onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-primary text-primary-foreground shadow-md font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Overview Dashboard
              </button>

              <button
                onClick={() => { setActiveTab('apps'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'apps'
                    ? 'bg-primary text-primary-foreground shadow-md font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Earning Apps
                </div>
                <Badge variant="secondary" className="text-[10px] bg-secondary border border-border px-1.5 py-0">
                  {earningApps.length}
                </Badge>
              </button>

              <button
                onClick={() => { setActiveTab('airdrops'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'airdrops'
                    ? 'bg-primary text-primary-foreground shadow-md font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-amber-400" /> Airdrops & Testnets
                </div>
                <Badge variant="secondary" className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0">
                  {airdrops.length}
                </Badge>
              </button>

              <button
                onClick={() => { setActiveTab('proofs'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'proofs'
                    ? 'bg-primary text-primary-foreground shadow-md font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Payout Proofs
                </div>
                <Badge variant="secondary" className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0">
                  {payoutProofs.length}
                </Badge>
              </button>

              <button
                onClick={() => { setActiveTab('submissions'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'submissions'
                    ? 'bg-primary text-primary-foreground shadow-md font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-sky-400" /> Submissions & Leads
                </div>
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              </button>

              <button
                onClick={() => { setActiveTab('banner'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'banner'
                    ? 'bg-primary text-primary-foreground shadow-md font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> Top Banner Config
              </button>

              <button
                onClick={() => { setActiveTab('socials'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'socials'
                    ? 'bg-primary text-primary-foreground shadow-md font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <ExternalLink className="w-4 h-4 text-sky-400" /> Social Channels
              </button>

              <button
                onClick={() => { setActiveTab('posts'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'posts'
                    ? 'bg-primary text-primary-foreground shadow-md font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" /> Articles & Posts
                </div>
                <Badge variant="secondary" className="text-[10px] bg-secondary border border-border px-1.5 py-0">
                  {blogs.length}
                </Badge>
              </button>

              <button
                onClick={() => { setActiveTab('categories'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'categories'
                    ? 'bg-primary text-primary-foreground shadow-md font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <Tag className="w-4 h-4" /> Categories
              </button>

              <button
                onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-primary text-primary-foreground shadow-md font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <BarChart3 className="w-4 h-4" /> Analytics & Traffic
              </button>

              <button
                onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'settings'
                    ? 'bg-primary text-primary-foreground shadow-md font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <Settings className="w-4 h-4" /> Settings & Backup
              </button>
            </nav>
          </div>

          {/* User Profile & Sign Out Footer */}
          <div className="pt-4 border-t border-border/60 space-y-2">
            <Link to="/" target="_blank">
              <Button variant="outline" size="sm" className="w-full text-xs justify-start gap-2 border-primary/30 text-primary hover:bg-primary/10">
                <ExternalLink className="w-3.5 h-3.5" /> View Live Website
              </Button>
            </Link>

            <div className="flex items-center justify-between p-2 rounded-xl bg-secondary/50 border border-border/40">
              <div className="min-w-0">
                <span className="text-[10px] text-muted-foreground block uppercase font-mono">Logged in as</span>
                <span className="text-xs font-semibold text-foreground truncate block">{user?.email || 'admin@aplushustler.com'}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign Out" className="text-muted-foreground hover:text-destructive">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content Dashboard Area */}
        <main className="flex-1 min-w-0 p-4 lg:p-8 overflow-y-auto">
          {/* Top Bar Quick Action Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/60">
            <div>
              <h1 className="font-display font-bold text-2xl lg:text-3xl text-foreground capitalize">
                {activeTab === 'overview' && 'Dashboard Overview 📊'}
                {activeTab === 'apps' && 'Earning Apps Manager 💵'}
                {activeTab === 'proofs' && 'Payout Proofs Manager 💳'}
                {activeTab === 'posts' && 'Articles & Content Manager 📝'}
                {activeTab === 'categories' && 'Categories Manager 🏷️'}
                {activeTab === 'analytics' && 'Analytics & Traffic Insights 📈'}
                {activeTab === 'settings' && 'System Settings & Controls ⚙️'}
              </h1>
              <p className="text-xs text-muted-foreground mt-1">
                Manage high-paying earning apps, payout proofs, blog content & platform conversion tools.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {user && <YouTubeImporter onImportComplete={fetchBlogs} userId={user.id} />}

              {activeTab === 'apps' && (
                <Button
                  onClick={() => { setEditingApp(null); setIsAppModalOpen(true); }}
                  className="bg-primary text-primary-foreground font-semibold text-xs shadow-md gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Earning App
                </Button>
              )}

              {activeTab === 'proofs' && (
                <Button
                  onClick={() => { setEditingProof(null); setIsProofModalOpen(true); }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Publish Payout Proof
                </Button>
              )}

              <Link to="/admin/editor">
                <Button variant="gold" size="sm" className="gap-1.5 text-xs font-semibold">
                  <Plus className="w-4 h-4" /> New Article
                </Button>
              </Link>
            </div>
          </div>

          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Metric Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground font-medium">Total Articles</span>
                    <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-display text-foreground">{stats.total}</div>
                  <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-3 h-3" /> {stats.published} published
                  </span>
                </div>

                <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm relative overflow-hidden group hover:border-amber-500/50 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground font-medium">Earning Apps</span>
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-display text-foreground">{earningApps.length}</div>
                  <span className="text-[11px] text-amber-300 font-medium flex items-center gap-1 mt-1">
                    <Zap className="w-3 h-3" /> 100% Verified Apps
                  </span>
                </div>

                <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground font-medium">Verified Proofs</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-display text-foreground">{payoutProofs.length}</div>
                  <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> Real cashouts
                  </span>
                </div>

                <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm relative overflow-hidden group hover:border-blue-500/50 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground font-medium">Total Views</span>
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-display text-foreground">{stats.views.toLocaleString()}</div>
                  <span className="text-[11px] text-blue-400 font-medium mt-1 block">
                    Organic Traffic
                  </span>
                </div>

                <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm relative overflow-hidden group hover:border-purple-500/50 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground font-medium">Scheduled</span>
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-display text-foreground">{stats.scheduled}</div>
                  <span className="text-[11px] text-purple-400 font-medium mt-1 block">
                    Auto-publishing
                  </span>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-card to-secondary/50 border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground">Quick Management Actions</h3>
                  <p className="text-xs text-muted-foreground">Add new high-paying apps, publish payout screenshots, or draft blog guides.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => { setEditingApp(null); setIsAppModalOpen(true); }} className="bg-primary text-primary-foreground font-semibold text-xs gap-1.5">
                    <Plus className="w-4 h-4" /> Add App
                  </Button>
                  <Button onClick={() => { setEditingProof(null); setIsProofModalOpen(true); }} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs gap-1.5">
                    <Plus className="w-4 h-4" /> Add Payout Proof
                  </Button>
                  <Link to="/admin/editor">
                    <Button variant="outline" className="border-border text-xs gap-1.5">
                      <FileText className="w-4 h-4" /> Draft Post
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Traffic & Analytics Preview */}
              <AnalyticsCharts />

              {/* Recent Earning Apps Preview List */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">Featured Earning Apps ({earningApps.length})</h3>
                    <p className="text-xs text-muted-foreground">Live offer apps currently listed on the website</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('apps')} className="text-xs text-primary font-semibold gap-1">
                    View All <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earningApps.slice(0, 3).map((app) => (
                    <div key={app.id} className="p-4 rounded-xl bg-secondary/40 border border-border/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl">{app.icon}</span>
                          <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                            {app.earningPotential}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-foreground mb-1">{app.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{app.description}</p>
                        {app.referralCode && (
                          <div className="mb-3">
                            <ReferralCodeBox code={app.referralCode} appName={app.name} label="Code" compact />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                        <span className="text-muted-foreground">{app.category}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => { setEditingApp(app); setIsAppModalOpen(true); }}
                          className="h-7 text-xs text-primary px-2"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EARNING APPS MANAGER */}
          {activeTab === 'apps' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-card p-4 rounded-xl border border-border">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search apps by name, description, referral code..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    className="pl-9 text-xs"
                  />
                </div>
                <Select value={appCategoryFilter} onValueChange={setAppCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-52 text-xs">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Tasks & Micro-Earning">Tasks & Micro-Earning</SelectItem>
                    <SelectItem value="Wallet">Wallet & P2P</SelectItem>
                    <SelectItem value="Exchange">Exchange</SelectItem>
                    <SelectItem value="Telegram Bot">Telegram Bot</SelectItem>
                    <SelectItem value="DePIN & Mining">DePIN & Mining</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => { setEditingApp(null); setIsAppModalOpen(true); }} className="bg-primary text-primary-foreground font-semibold text-xs whitespace-nowrap gap-1.5">
                  <Plus className="w-4 h-4" /> Add App
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApps.map((app) => (
                  <div key={app.id} className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm flex flex-col justify-between hover:border-primary/40 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl p-2 rounded-xl bg-secondary">{app.icon}</span>
                          <div>
                            <h3 className="font-bold text-base text-foreground">{app.name}</h3>
                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{app.category}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                          Verified
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{app.description}</p>

                      {app.welcomeBonus && (
                        <div className="mb-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 font-medium flex items-center gap-1.5">
                          <Gift className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{app.welcomeBonus}</span>
                        </div>
                      )}

                      {app.referralCode && (
                        <div className="mb-4">
                          <ReferralCodeBox code={app.referralCode} appName={app.name} label="Referral Code" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50 gap-2">
                      <a href={app.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                        Link <ExternalLink className="w-3 h-3" />
                      </a>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => { setEditingApp(app); setIsAppModalOpen(true); }}
                          className="h-8 text-xs gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteEarningApp(app.id, app.name)}
                          className="h-8 text-xs text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AIRDROPS & TESTNETS MANAGER */}
          {activeTab === 'airdrops' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-card p-4 rounded-xl border border-border">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search airdrops by name, ticker, category, chain..."
                    value={airdropSearch}
                    onChange={(e) => setAirdropSearch(e.target.value)}
                    className="pl-9 text-xs"
                  />
                </div>
                <Button onClick={() => { setEditingAirdrop(null); setIsAirdropModalOpen(true); }} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5">
                  <Plus className="w-4 h-4" /> Create Airdrop
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAirdrops.map((airdrop) => (
                  <div key={airdrop.id} className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm flex flex-col justify-between hover:border-amber-500/40 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">{airdrop.icon}</span>
                          <div>
                            <h3 className="font-bold text-base text-foreground flex items-center gap-1.5">
                              {airdrop.name}
                              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-secondary text-muted-foreground font-normal">
                                ${airdrop.ticker}
                              </span>
                            </h3>
                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{airdrop.category} • {airdrop.blockchain}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-400 bg-amber-500/10 font-bold">
                          {airdrop.status}
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{airdrop.shortDescription}</p>

                      <div className="space-y-2 mb-4 text-xs font-mono">
                        <div className="flex justify-between text-muted-foreground border-b border-border/40 pb-1">
                          <span>Est. Reward:</span>
                          <strong className="text-amber-400">{airdrop.estimatedReward}</strong>
                        </div>
                        <div className="flex justify-between text-muted-foreground border-b border-border/40 pb-1">
                          <span>Capital Req:</span>
                          <span className="text-emerald-400 font-semibold">{airdrop.investmentRequired}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground pb-1">
                          <span>Backing/Funding:</span>
                          <span className="text-foreground">{airdrop.funding}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50 gap-2">
                      <a href={airdrop.airdropUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                        Portal Link <ExternalLink className="w-3 h-3" />
                      </a>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => { setEditingAirdrop(airdrop); setIsAirdropModalOpen(true); }}
                          className="h-8 text-xs gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteAirdrop(airdrop.id, airdrop.name)}
                          className="h-8 text-xs text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PAYOUT PROOFS MANAGER */}
          {activeTab === 'proofs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-card p-4 rounded-xl border border-border">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search payout proofs by app, payout method, handle..."
                    value={proofSearch}
                    onChange={(e) => setProofSearch(e.target.value)}
                    className="pl-9 text-xs"
                  />
                </div>
                <Button onClick={() => { setEditingProof(null); setIsProofModalOpen(true); }} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs gap-1.5">
                  <Plus className="w-4 h-4" /> Publish Proof
                </Button>
              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="divide-y divide-border">
                  {filteredProofs.map((proof) => (
                    <div key={proof.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-secondary/40 transition-colors">
                      <div className="flex items-center gap-4">
                        <img
                          src={proof.proofImage}
                          alt={proof.appName}
                          className="w-16 h-16 rounded-xl object-cover border border-border shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base text-foreground">{proof.appName}</h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                              {proof.status}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{proof.notes}</p>
                          <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground font-mono">
                            <span>Amount: <strong className="text-emerald-400 font-bold">{proof.usdEquivalent} ({proof.amount} {proof.currency})</strong></span>
                            <span>Channel: {proof.payoutMethod}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => { setEditingProof(proof); setIsProofModalOpen(true); }}
                          className="h-8 text-xs gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteProof(proof.id, proof.appName)}
                          className="h-8 text-xs text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SUBMISSIONS & LEADS */}
          {activeTab === 'submissions' && (
            <SubmissionsManager
              onAppApprove={(sub) => {
                const newApp: EarningAppItem = {
                  id: sub.id,
                  name: sub.appName,
                  description: sub.notes,
                  longDescription: sub.notes,
                  category: (sub.category as any) || 'Tasks & Micro-Earning',
                  downloadUrl: sub.url,
                  welcomeBonus: 'Community Submitted',
                  earningPotential: '💎 Verified Community',
                  rating: 4.8,
                  reviewsCount: '50+',
                  securityScore: 95,
                  icon: '🌟',
                  featured: false,
                  verified: true,
                  highlights: ['User submitted app verified by Admin'],
                  stepsToEarn: ['Register via link', 'Complete offer tasks'],
                };
                handleSaveEarningApp(newApp);
              }}
              onProofApprove={(proof) => {
                const newProof: ProofItem = {
                  id: proof.id,
                  appName: proof.appName,
                  appCategory: 'Tasks',
                  amount: proof.amount,
                  currency: proof.currency,
                  usdEquivalent: `$${proof.amount}`,
                  payoutMethod: 'Crypto / Mobile Transfer',
                  txHash: `SUB-PROOF-${Date.now()}`,
                  proofImage: proof.proofImage,
                  date: proof.submittedAt,
                  status: 'Verified',
                  userHandle: proof.userHandle,
                  notes: proof.notes,
                  appUrl: '#',
                  featured: true,
                };
                handleSaveProof(newProof);
              }}
            />
          )}

          {/* TAB 6: BANNER & SOCIAL CONFIG */}
          {(activeTab === 'banner' || activeTab === 'socials') && (
            <SiteConfigManager />
          )}

          {/* TAB 7: ARTICLES & CONTENT MANAGER */}
          {activeTab === 'posts' && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search articles & blog posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 text-xs"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40 text-xs">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedPosts.size > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-secondary/80 rounded-xl border border-border text-xs">
                    <span className="text-muted-foreground mr-2 font-semibold">
                      {selectedPosts.size} selected
                    </span>
                    <Button variant="outline" size="sm" onClick={handleBulkPublish} className="h-7 text-xs gap-1">
                      <Eye className="w-3 h-3" /> Publish
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleBulkUnpublish} className="h-7 text-xs gap-1">
                      <FolderOpen className="w-3 h-3" /> Unpublish
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="h-7 text-xs gap-1">
                      <Trash2 className="w-3 h-3" /> Delete
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedPosts(new Set())} className="h-7 text-xs">
                      Clear
                    </Button>
                  </div>
                )}
              </div>

              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={filteredBlogs.length > 0 && selectedPosts.size === filteredBlogs.length}
                      onCheckedChange={toggleSelectAll}
                    />
                    <h2 className="font-bold text-foreground">All Articles & Guides</h2>
                  </div>
                  <span className="text-muted-foreground">{filteredBlogs.length} posts</span>
                </div>

                {filteredBlogs.length === 0 ? (
                  <div className="p-12 text-center">
                    <FileText className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">No articles found matching filters</p>
                    <Link to="/admin/editor">
                      <Button variant="gold" className="mt-4 text-xs font-semibold">
                        <Plus className="w-4 h-4 mr-2" /> Write Article
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {filteredBlogs.map((blog) => (
                      <div key={blog.id} className="p-4 flex items-center gap-3 hover:bg-secondary/40 transition-colors">
                        <Checkbox
                          checked={selectedPosts.has(blog.id)}
                          onCheckedChange={() => togglePostSelection(blog.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm text-foreground truncate">{blog.title}</h3>
                            {blog.youtube_video_id && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400">YT Video</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            {getStatusBadge(blog.status, blog.publish_at)}
                            <span className="flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {blog.categories?.name || 'Uncategorized'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {blog.views}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Link to={`/blog/${blog.slug}`} target="_blank">
                            <Button variant="ghost" size="icon" title="View Article" className="h-8 w-8">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link to={`/admin/editor/${blog.id}`}>
                            <Button variant="ghost" size="icon" title="Edit Article" className="h-8 w-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" onClick={() => handleDeletePost(blog.id, blog.title)} title="Delete Article" className="h-8 w-8 text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">Manage Article Categories</h2>
                <p className="text-xs text-muted-foreground mb-4">Create content topics for crypto, mobile earning, and tutorials.</p>
                <div className="flex gap-2 max-w-md">
                  <Input
                    placeholder="New category name (e.g. Crypto Apps)..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                    className="text-xs"
                  />
                  <Button onClick={handleAddCategory} disabled={!newCategoryName.trim()} className="bg-primary text-primary-foreground text-xs">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-xl bg-secondary/50 border border-border flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-foreground">{cat.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono">/category/{cat.slug}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(cat.id, cat.name)} className="text-destructive h-8 w-8">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ANALYTICS */}
          {activeTab === 'analytics' && (
            <AnalyticsCharts />
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
                <h3 className="font-bold text-lg text-foreground">Platform Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground block mb-1">Website Title</span>
                    <Input defaultValue="AplusHustler - Top Free Earning Apps & Airdrops" className="text-xs" />
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">Contact Email</span>
                    <Input defaultValue="genet212020@gmail.com" className="text-xs" />
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground block mb-1 text-xs">Telegram Community Channel</span>
                  <Input defaultValue="https://t.me/Aplus_info" className="text-xs font-mono" />
                </div>

                <div className="pt-2">
                  <Button onClick={() => toast.success('Platform configuration saved successfully!')} className="bg-primary text-primary-foreground font-semibold text-xs">
                    Save Platform Settings
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <EarningAppModal
        open={isAppModalOpen}
        onOpenChange={setIsAppModalOpen}
        appToEdit={editingApp}
        onSave={handleSaveEarningApp}
      />

      <AirdropModal
        open={isAirdropModalOpen}
        onOpenChange={setIsAirdropModalOpen}
        airdropToEdit={editingAirdrop}
        onSave={handleSaveAirdrop}
      />

      <ProofModal
        open={isProofModalOpen}
        onOpenChange={setIsProofModalOpen}
        proofToEdit={editingProof}
        onSave={handleSaveProof}
      />
    </>
  );
};

export default Admin;
