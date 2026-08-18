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
  ArrowUpRight,
  CopyCheck,
  Star,
  Layers,
  LayoutGrid,
  List,
  Download,
  Upload,
  HardDrive,
  SlidersHorizontal,
  ChevronRight,
  Image as ImageIcon
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
import { AppLogoUpdateModal } from '@/components/admin/AppLogoUpdateModal';
import { ProofModal, ProofItem } from '@/components/admin/ProofModal';
import { AirdropModal } from '@/components/admin/AirdropModal';
import { SubmissionsManager } from '@/components/admin/SubmissionsManager';
import { SiteConfigManager } from '@/components/admin/SiteConfigManager';
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts';
import { ReferralCodeBox } from '@/components/ReferralCodeBox';
import { airdrops as initialAirdrops, Airdrop } from '@/data/airdropData';
import { AdminQuickSearch } from '@/components/admin/AdminQuickSearch';
import { DataBackupRestore } from '@/components/admin/DataBackupRestore';
import { AdminActivityLog } from '@/components/admin/AdminActivityLog';
import { SeoMetadataGenerator } from '@/components/admin/SeoMetadataGenerator';
import { AppIconBadge } from '@/components/AppIconBadge';

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

type AdminTab =
  | 'overview'
  | 'apps'
  | 'airdrops'
  | 'proofs'
  | 'submissions'
  | 'banner'
  | 'socials'
  | 'posts'
  | 'categories'
  | 'seo'
  | 'analytics'
  | 'backup'
  | 'settings';

const Admin = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);

  // View modes (Grid vs Table)
  const [appsViewMode, setAppsViewMode] = useState<'grid' | 'table'>('grid');
  const [airdropsViewMode, setAirdropsViewMode] = useState<'grid' | 'table'>('grid');
  const [proofsViewMode, setProofsViewMode] = useState<'grid' | 'table'>('table');

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
    try {
      const saved = localStorage.getItem('admin_earning_apps');
      return saved ? JSON.parse(saved) : defaultEarningApps;
    } catch {
      return defaultEarningApps;
    }
  });
  const [appSearch, setAppSearch] = useState('');
  const [appCategoryFilter, setAppCategoryFilter] = useState('all');
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<EarningAppItem | null>(null);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [appForLogoUpdate, setAppForLogoUpdate] = useState<EarningAppItem | null>(null);

  // Airdrops State
  const [airdrops, setAirdrops] = useState<Airdrop[]>(() => {
    try {
      const saved = localStorage.getItem('admin_airdrops');
      return saved ? JSON.parse(saved) : initialAirdrops;
    } catch {
      return initialAirdrops;
    }
  });
  const [airdropSearch, setAirdropSearch] = useState('');
  const [airdropChainFilter, setAirdropChainFilter] = useState('all');
  const [isAirdropModalOpen, setIsAirdropModalOpen] = useState(false);
  const [editingAirdrop, setEditingAirdrop] = useState<Airdrop | null>(null);

  // Payout Proofs State
  const [payoutProofs, setPayoutProofs] = useState<ProofItem[]>(() => {
    try {
      const saved = localStorage.getItem('admin_payout_proofs');
      return saved ? JSON.parse(saved) : defaultPayoutProofs;
    } catch {
      return defaultPayoutProofs;
    }
  });
  const [proofSearch, setProofSearch] = useState('');
  const [proofStatusFilter, setProofStatusFilter] = useState('all');
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
      console.warn('Could not fetch remote blogs, falling back:', error);
    } else {
      setBlogs(data || []);
      const totalViews = (data || []).reduce((sum, blog) => sum + (blog.views || 0), 0);
      setStats({
        total: data?.length || 0,
        published: data?.filter((b) => b.status === 'published').length || 0,
        drafts: data?.filter((b) => b.status === 'draft').length || 0,
        scheduled: data?.filter((b) => b.status === 'scheduled').length || 0,
        views: totalViews,
      });
    }
    setIsFetching(false);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('name');
    setCategories(data || []);
  };

  // Earning Apps CRUD & Quick In-line Actions
  const handleSaveEarningApp = (savedApp: EarningAppItem) => {
    setEarningApps((prev) => {
      const exists = prev.some((a) => a.id === savedApp.id);
      if (exists) {
        return prev.map((a) => (a.id === savedApp.id ? savedApp : a));
      }
      return [savedApp, ...prev];
    });
  };

  const handleDeleteEarningApp = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete app "${name}"?`)) return;
    setEarningApps((prev) => prev.filter((a) => a.id !== id));
    toast.success(`Deleted "${name}"`);
  };

  const handleDuplicateEarningApp = (app: EarningAppItem) => {
    const clonedApp: EarningAppItem = {
      ...app,
      id: 'app-' + Date.now(),
      name: `${app.name} (Copy)`,
    };
    setEarningApps((prev) => [clonedApp, ...prev]);
    toast.success(`Duplicated "${app.name}" into new draft!`);
  };

  const handleToggleAppFeatured = (id: string) => {
    setEarningApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, featured: !app.featured } : app))
    );
    toast.success('Updated featured status');
  };

  const handleToggleAppVerified = (id: string) => {
    setEarningApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, verified: !app.verified } : app))
    );
    toast.success('Updated verification status');
  };

  const handleUpdateAppLogo = (appId: string, newIcon: string) => {
    setEarningApps((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, icon: newIcon } : app))
    );
  };

  // Airdrops CRUD & Quick Actions
  const handleSaveAirdrop = (savedAirdrop: Airdrop) => {
    setAirdrops((prev) => {
      const exists = prev.some((a) => a.id === savedAirdrop.id);
      if (exists) {
        return prev.map((a) => (a.id === savedAirdrop.id ? savedAirdrop : a));
      }
      return [savedAirdrop, ...prev];
    });
  };

  const handleDeleteAirdrop = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete airdrop "${name}"?`)) return;
    setAirdrops((prev) => prev.filter((a) => a.id !== id));
    toast.success(`Deleted airdrop "${name}"`);
  };

  const handleDuplicateAirdrop = (airdrop: Airdrop) => {
    const cloned: Airdrop = {
      ...airdrop,
      id: 'airdrop-' + Date.now(),
      name: `${airdrop.name} (Copy)`,
    };
    setAirdrops((prev) => [cloned, ...prev]);
    toast.success(`Duplicated "${airdrop.name}"!`);
  };

  const handleToggleAirdropFeatured = (id: string) => {
    setAirdrops((prev) =>
      prev.map((a) => (a.id === id ? { ...a, featured: !a.featured } : a))
    );
    toast.success('Updated airdrop featured status');
  };

  // Payout Proofs CRUD & Quick Actions
  const handleSaveProof = (savedProof: ProofItem) => {
    setPayoutProofs((prev) => {
      const exists = prev.some((p) => p.id === savedProof.id);
      if (exists) {
        return prev.map((p) => (p.id === savedProof.id ? savedProof : p));
      }
      return [savedProof, ...prev];
    });
  };

  const handleDeleteProof = (id: string, appName: string) => {
    if (!confirm(`Delete payout proof for "${appName}"?`)) return;
    setPayoutProofs((prev) => prev.filter((p) => p.id !== id));
    toast.success(`Proof deleted for "${appName}"`);
  };

  const handleDuplicateProof = (proof: ProofItem) => {
    const cloned: ProofItem = {
      ...proof,
      id: 'proof-' + Date.now(),
      txHash: 'TX-' + Math.floor(Math.random() * 899999 + 100000),
      date: new Date().toISOString().split('T')[0],
    };
    setPayoutProofs((prev) => [cloned, ...prev]);
    toast.success(`Duplicated proof for "${proof.appName}"`);
  };

  // Blog CRUD
  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`Delete article "${title}"?`)) return;

    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete post');
    } else {
      toast.success('Post deleted successfully');
      setSelectedPosts((prev) => {
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
    setSelectedPosts((prev) => {
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
      setSelectedPosts(new Set(filteredBlogs.map((b) => b.id)));
    }
  };

  // Restore Backup
  const handleRestoreData = (backup: any) => {
    if (backup.earningApps) setEarningApps(backup.earningApps);
    if (backup.airdrops) setAirdrops(backup.airdrops);
    if (backup.payoutProofs) setPayoutProofs(backup.payoutProofs);
    if (backup.siteAnnouncement) {
      localStorage.setItem('admin_site_announcement', JSON.stringify(backup.siteAnnouncement));
    }
    if (backup.socialConfig) {
      localStorage.setItem('admin_social_config', JSON.stringify(backup.socialConfig));
    }
  };

  // Reset Factory
  const handleResetFactory = () => {
    setEarningApps(defaultEarningApps);
    setAirdrops(initialAirdrops);
    setPayoutProofs(defaultPayoutProofs);
  };

  // Filtered lists
  const filteredBlogs = (blogs || []).filter((blog) => {
    const matchesSearch = (blog.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredApps = (earningApps || []).filter((app) => {
    const matchesSearch =
      (app.name || '').toLowerCase().includes(appSearch.toLowerCase()) ||
      (app.description || '').toLowerCase().includes(appSearch.toLowerCase()) ||
      (app.referralCode && app.referralCode.toLowerCase().includes(appSearch.toLowerCase()));
    const matchesCat = appCategoryFilter === 'all' || app.category === appCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredAirdrops = (airdrops || []).filter((airdrop) => {
    const matchesSearch =
      (airdrop.name || '').toLowerCase().includes(airdropSearch.toLowerCase()) ||
      (airdrop.ticker || '').toLowerCase().includes(airdropSearch.toLowerCase()) ||
      (airdrop.category || '').toLowerCase().includes(airdropSearch.toLowerCase()) ||
      (airdrop.blockchain || '').toLowerCase().includes(airdropSearch.toLowerCase());
    const matchesChain =
      airdropChainFilter === 'all' || airdrop.blockchain.toLowerCase().includes(airdropChainFilter.toLowerCase());
    return matchesSearch && matchesChain;
  });

  const filteredProofs = (payoutProofs || []).filter((proof) => {
    const matchesSearch =
      (proof.appName || '').toLowerCase().includes(proofSearch.toLowerCase()) ||
      (proof.payoutMethod || '').toLowerCase().includes(proofSearch.toLowerCase()) ||
      (proof.userHandle || '').toLowerCase().includes(proofSearch.toLowerCase());
    const matchesStatus = proofStatusFilter === 'all' || proof.status === proofStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate total USD paid out across proofs
  const totalUsdPaidOut = (payoutProofs || []).reduce((sum, p) => {
    const num = parseFloat((p.usdEquivalent || '$0').replace(/[^0-9.]/g, '')) || 0;
    return sum + num;
  }, 0);

  const getStatusBadge = (status: string, publishAt: string | null) => {
    if (status === 'published') {
      return (
        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-400">
          published
        </span>
      );
    } else if (status === 'scheduled' && publishAt) {
      return (
        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {new Date(publishAt).toLocaleDateString()}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-400">
        draft
      </span>
    );
  };

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <Sparkles className="w-6 h-6 animate-spin" />
          </div>
          <div className="text-muted-foreground font-display font-medium text-sm">
            Loading Professional Admin Dashboard...
          </div>
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
          <p className="text-muted-foreground text-sm mb-6">
            Administrator privileges are required to access this dashboard.
          </p>
          <Button onClick={handleSignOut} className="w-full bg-primary text-primary-foreground">
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard & Command Center | AplusHustler</title>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
        {/* Mobile Header Bar */}
        <div className="lg:hidden bg-card border-b border-border p-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-gold p-0.5 flex items-center justify-center font-bold text-black font-display text-sm">
              A+
            </div>
            <span className="font-display font-bold text-base text-foreground">Admin Console</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsQuickSearchOpen(true)}
              className="text-xs gap-1.5 h-8 border-border"
            >
              <Search className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card/95 border-r border-border/80 backdrop-blur-md flex flex-col justify-between p-4 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        >
          <div>
            {/* Brand Header */}
            <div className="flex items-center justify-between px-2 py-3 mb-4 border-b border-border/50">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-gold p-0.5 shadow-md flex items-center justify-center font-bold text-black font-display text-lg">
                  A+
                </div>
                <div>
                  <h1 className="font-display font-bold text-base leading-none text-foreground group-hover:text-primary transition-colors">
                    AplusHustler
                  </h1>
                  <span className="text-[10px] text-primary font-semibold uppercase tracking-wider block mt-0.5">
                    Command Dashboard
                  </span>
                </div>
              </Link>
            </div>

            {/* Quick Search Launcher Button */}
            <button
              onClick={() => setIsQuickSearchOpen(true)}
              className="w-full mb-4 px-3 py-2 rounded-xl bg-secondary/60 hover:bg-secondary border border-border/60 text-muted-foreground hover:text-foreground text-xs flex items-center justify-between transition-colors shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-primary" />
                <span>Search everything...</span>
              </div>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-card border border-border text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            {/* Navigation Menu Categories */}
            <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
              {/* SECTION: CORE PLATFORM */}
              <div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground/80 tracking-wider px-3 mb-1.5 block">
                  Core Management
                </span>
                <nav className="space-y-0.5">
                  <button
                    onClick={() => {
                      setActiveTab('overview');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'overview'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" /> Overview Dashboard
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('apps');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'apps'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-amber-400" /> Earning Apps
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-[10px] bg-secondary border border-border px-1.5 py-0"
                    >
                      {earningApps.length}
                    </Badge>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('airdrops');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'airdrops'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-amber-400" /> Airdrops & Testnets
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0"
                    >
                      {airdrops.length}
                    </Badge>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('proofs');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'proofs'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> Payout Proofs
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0"
                    >
                      {payoutProofs.length}
                    </Badge>
                  </button>
                </nav>
              </div>

              {/* SECTION: CONTENT & GUIDES */}
              <div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground/80 tracking-wider px-3 mb-1.5 block">
                  Content & Guides
                </span>
                <nav className="space-y-0.5">
                  <button
                    onClick={() => {
                      setActiveTab('posts');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'posts'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-blue-400" /> Articles & Posts
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-[10px] bg-secondary border border-border px-1.5 py-0"
                    >
                      {blogs.length}
                    </Badge>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('categories');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'categories'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <Tag className="w-4 h-4 text-purple-400" /> Categories
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('seo');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'seo'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-amber-400" /> SEO Generator
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[9px] bg-primary/10 text-primary border-primary/30 px-1 py-0"
                    >
                      AI
                    </Badge>
                  </button>
                </nav>
              </div>

              {/* SECTION: LEADS & MARKETING */}
              <div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground/80 tracking-wider px-3 mb-1.5 block">
                  Growth & Community
                </span>
                <nav className="space-y-0.5">
                  <button
                    onClick={() => {
                      setActiveTab('submissions');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
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
                    onClick={() => {
                      setActiveTab('banner');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'banner'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" /> Promo Banner
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('socials');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'socials'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4 text-sky-400" /> Social Channels
                  </button>
                </nav>
              </div>

              {/* SECTION: SYSTEM & ANALYTICS */}
              <div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground/80 tracking-wider px-3 mb-1.5 block">
                  System & Insights
                </span>
                <nav className="space-y-0.5">
                  <button
                    onClick={() => {
                      setActiveTab('analytics');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'analytics'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 text-emerald-400" /> Analytics & Traffic
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('backup');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'backup'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <HardDrive className="w-4 h-4 text-primary" /> Backup & Data Engine
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === 'settings'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <Settings className="w-4 h-4 text-slate-400" /> Platform Settings
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Footer User Info */}
          <div className="pt-4 border-t border-border/60 space-y-2">
            <Link to="/" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs justify-start gap-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Live Website
              </Button>
            </Link>

            <div className="flex items-center justify-between p-2 rounded-xl bg-secondary/50 border border-border/40">
              <div className="min-w-0">
                <span className="text-[10px] text-muted-foreground block uppercase font-mono">
                  Administrator
                </span>
                <span className="text-xs font-semibold text-foreground truncate block">
                  {user?.email || 'admin@aplushustler.com'}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                title="Sign Out"
                className="text-muted-foreground hover:text-destructive h-7 w-7"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content Dashboard Area */}
        <main className="flex-1 min-w-0 p-4 lg:p-8 overflow-y-auto">
          {/* Top Bar Header with Breadcrumbs & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/60">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <span>Admin</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-foreground capitalize font-semibold">{activeTab}</span>
              </div>
              <h1 className="font-display font-bold text-2xl lg:text-3xl text-foreground capitalize flex items-center gap-2.5">
                {activeTab === 'overview' && 'Executive Overview Dashboard 📊'}
                {activeTab === 'apps' && 'High-Yield Earning Apps 💵'}
                {activeTab === 'airdrops' && 'Airdrops & Testnet Directory ⚡'}
                {activeTab === 'proofs' && 'Verified Payout Proofs 💳'}
                {activeTab === 'submissions' && 'Submissions & Leads CRM 👥'}
                {activeTab === 'banner' && 'Top Announcement Banner 📢'}
                {activeTab === 'socials' && 'Social Channels & Telegram 🌐'}
                {activeTab === 'posts' && 'Articles & Strategy Guides 📝'}
                {activeTab === 'categories' && 'Content Categories 🏷️'}
                {activeTab === 'analytics' && 'Analytics & Traffic Insights 📈'}
                {activeTab === 'backup' && 'Backup & Data Management Engine 💾'}
                {activeTab === 'settings' && 'Platform Settings & Controls ⚙️'}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsQuickSearchOpen(true)}
                className="text-xs gap-1.5 h-9 border-border bg-card shadow-sm hidden md:flex"
              >
                <Search className="w-3.5 h-3.5 text-primary" />
                <span>Quick Search (⌘K)</span>
              </Button>

              {user && <YouTubeImporter onImportComplete={fetchBlogs} userId={user.id} />}

              {activeTab === 'apps' && (
                <Button
                  onClick={() => {
                    setEditingApp(null);
                    setIsAppModalOpen(true);
                  }}
                  className="bg-primary text-primary-foreground font-semibold text-xs shadow-md gap-1.5 h-9"
                >
                  <Plus className="w-4 h-4" /> Add Earning App
                </Button>
              )}

              {activeTab === 'airdrops' && (
                <Button
                  onClick={() => {
                    setEditingAirdrop(null);
                    setIsAirdropModalOpen(true);
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md gap-1.5 h-9"
                >
                  <Plus className="w-4 h-4" /> Create Airdrop
                </Button>
              )}

              {activeTab === 'proofs' && (
                <Button
                  onClick={() => {
                    setEditingProof(null);
                    setIsProofModalOpen(true);
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md gap-1.5 h-9"
                >
                  <Plus className="w-4 h-4" /> Publish Proof
                </Button>
              )}

              {activeTab === 'posts' && (
                <Link to="/admin/editor">
                  <Button variant="gold" size="sm" className="gap-1.5 text-xs font-semibold h-9">
                    <Plus className="w-4 h-4" /> New Article
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Top High-Contrast Stat Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
                <div
                  onClick={() => setActiveTab('proofs')}
                  className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm hover:border-emerald-500/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-muted-foreground font-medium">Payouts Verified</span>
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-display text-emerald-400">
                    ${totalUsdPaidOut.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                    {payoutProofs.length} proof receipts
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('apps')}
                  className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm hover:border-amber-500/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-muted-foreground font-medium">Earning Apps</span>
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-display text-foreground">{earningApps.length}</div>
                  <span className="text-[10px] text-amber-400 mt-1 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> 100% active
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('airdrops')}
                  className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm hover:border-sky-500/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-muted-foreground font-medium">Airdrops</span>
                    <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-display text-foreground">{airdrops.length}</div>
                  <span className="text-[10px] text-sky-400 mt-1 flex items-center gap-1 font-medium">
                    $0 investment
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('posts')}
                  className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm hover:border-blue-500/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-muted-foreground font-medium">Articles & Guides</span>
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-display text-foreground">{stats.total}</div>
                  <span className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" /> {stats.published} live
                  </span>
                </div>

                <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm hover:border-purple-500/60 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-muted-foreground font-medium">Total Views</span>
                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-display text-foreground">
                    {stats.views.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-purple-400 mt-1 block">Organic views</span>
                </div>

                <div
                  onClick={() => setActiveTab('submissions')}
                  className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm hover:border-primary/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-muted-foreground font-medium">Leads & Subs</span>
                    <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-display text-primary">Active</div>
                  <span className="text-[10px] text-muted-foreground mt-1 block">Newsletter subscribers</span>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-card via-card to-secondary/50 border border-border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Admin Command Hub
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Launch quick creation tools, manage high-conversion apps, or export complete data backups.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => {
                      setEditingApp(null);
                      setIsAppModalOpen(true);
                    }}
                    className="bg-primary text-primary-foreground font-semibold text-xs gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Add App
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingAirdrop(null);
                      setIsAirdropModalOpen(true);
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Add Airdrop
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingProof(null);
                      setIsProofModalOpen(true);
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Add Proof
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('backup')}
                    className="border-border text-xs gap-1.5"
                  >
                    <HardDrive className="w-4 h-4" /> Backup Data
                  </Button>
                </div>
              </div>

              {/* Interactive Traffic & Conversion Analytics Charts */}
              <AnalyticsCharts />

              {/* Grid of Earning Apps Quick Access & Audit Trail */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Apps Quick List */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-display font-bold text-base text-foreground">
                        Featured Earning Apps ({earningApps.length})
                      </h3>
                      <p className="text-xs text-muted-foreground">Top active apps displaying on the public homepage</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab('apps')}
                      className="text-xs text-primary font-semibold gap-1"
                    >
                      Manage All <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {earningApps.slice(0, 4).map((app) => (
                      <div
                        key={app.id}
                        className="p-3.5 rounded-xl bg-secondary/40 border border-border/60 flex flex-col justify-between hover:border-primary/40 transition-all group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-2.5">
                              <div
                                onClick={() => {
                                  setAppForLogoUpdate(app);
                                  setIsLogoModalOpen(true);
                                }}
                                className="relative group/logo cursor-pointer shrink-0"
                                title="Click to update logo"
                              >
                                <AppIconBadge
                                  icon={app.icon}
                                  name={app.name}
                                  category={app.category}
                                  verified={app.verified}
                                  size="sm"
                                />
                                <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center text-white">
                                  <ImageIcon className="w-3 h-3" />
                                </div>
                              </div>
                              <div>
                                <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-1">{app.name}</h4>
                                <span className="text-[10px] text-muted-foreground font-mono">{app.category}</span>
                              </div>
                            </div>
                            {app.earningPotential && (
                              <Badge
                                variant="outline"
                                className="text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-1.5 py-0 shrink-0"
                              >
                                {app.earningPotential}
                              </Badge>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">
                            {app.description}
                          </p>
                          {app.referralCode && (
                            <div className="mb-2">
                              <ReferralCodeBox
                                code={app.referralCode}
                                appName={app.name}
                                label="Code"
                                compact
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <span>⭐ {app.rating || 4.9}</span>
                            <span>•</span>
                            <span className="text-emerald-400 font-medium">{app.securityScore || 98}% Safe</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setAppForLogoUpdate(app);
                                setIsLogoModalOpen(true);
                              }}
                              className="h-6 text-[11px] text-primary px-2 hover:bg-primary/10 gap-1"
                              title="Update App Logo"
                            >
                              <ImageIcon className="w-3 h-3" /> Logo
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingApp(app);
                                setIsAppModalOpen(true);
                              }}
                              className="h-6 text-[11px] text-muted-foreground hover:text-foreground px-2"
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit Trail & Activity Log */}
                <AdminActivityLog />
              </div>
            </div>
          )}

          {/* TAB 2: EARNING APPS MANAGER */}
          {activeTab === 'apps' && (
            <div className="space-y-6">
              {/* Header Filter Bar with View Mode Switcher */}
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-card p-4 rounded-xl border border-border shadow-sm">
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
                  <SelectTrigger className="w-full sm:w-48 text-xs">
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

                {/* Grid / Table View Mode Toggle */}
                <div className="flex items-center bg-secondary/80 p-0.5 rounded-lg border border-border">
                  <button
                    onClick={() => setAppsViewMode('grid')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      appsViewMode === 'grid'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setAppsViewMode('table')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      appsViewMode === 'table'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Table View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  onClick={() => {
                    setEditingApp(null);
                    setIsAppModalOpen(true);
                  }}
                  className="bg-primary text-primary-foreground font-semibold text-xs whitespace-nowrap gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add App
                </Button>
              </div>

              {/* Status summary banner */}
              <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                <span>
                  Showing <strong>{filteredApps.length}</strong> apps (out of {earningApps.length} total)
                </span>
                <span className="text-[11px] font-mono">Click ★ or ✓ to toggle status instantly</span>
              </div>

              {/* GRID VIEW */}
              {appsViewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredApps.map((app) => (
                    <div
                      key={app.id}
                      className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm flex flex-col justify-between hover:border-primary/40 transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              onClick={() => {
                                setAppForLogoUpdate(app);
                                setIsLogoModalOpen(true);
                              }}
                              className="relative group/logo cursor-pointer shrink-0"
                              title="Click to change / upload logo"
                            >
                              <AppIconBadge
                                icon={app.icon}
                                name={app.name}
                                category={app.category}
                                verified={app.verified}
                                size="md"
                              />
                              <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <ImageIcon className="w-4 h-4" />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-base text-foreground">{app.name}</h3>
                              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                {app.category}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {/* Instant Toggle Featured */}
                            <button
                              onClick={() => handleToggleAppFeatured(app.id)}
                              title={app.featured ? 'Featured on Home (click to unfeature)' : 'Mark as Featured'}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                app.featured
                                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                                  : 'bg-secondary border-border text-muted-foreground hover:text-amber-400'
                              }`}
                            >
                              <Star className={`w-3.5 h-3.5 ${app.featured ? 'fill-amber-400' : ''}`} />
                            </button>

                            {/* Instant Toggle Verified */}
                            <button
                              onClick={() => handleToggleAppVerified(app.id)}
                              title={app.verified ? 'Verified App (click to toggle)' : 'Unverified'}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                app.verified
                                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                                  : 'bg-secondary border-border text-muted-foreground'
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
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
                            <ReferralCodeBox
                              code={app.referralCode}
                              appName={app.name}
                              label="Referral Code"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border/50 gap-2">
                        <a
                          href={app.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          Link <ExternalLink className="w-3 h-3" />
                        </a>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setAppForLogoUpdate(app);
                              setIsLogoModalOpen(true);
                            }}
                            title="Update Logo / Icon"
                            className="h-8 text-xs gap-1 text-primary hover:bg-primary/10"
                          >
                            <ImageIcon className="w-3.5 h-3.5" /> Logo
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDuplicateEarningApp(app)}
                            title="Duplicate App"
                            className="h-8 text-xs text-muted-foreground hover:text-foreground"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingApp(app);
                              setIsAppModalOpen(true);
                            }}
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
              )}

              {/* TABLE VIEW */}
              {appsViewMode === 'table' && (
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-secondary/60 border-b border-border text-muted-foreground uppercase font-bold text-[10px]">
                        <tr>
                          <th className="p-3.5">App</th>
                          <th className="p-3.5">Category</th>
                          <th className="p-3.5">Referral Code</th>
                          <th className="p-3.5">Earning Potential</th>
                          <th className="p-3.5">Score</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredApps.map((app) => (
                          <tr key={app.id} className="hover:bg-secondary/30 transition-colors">
                            <td className="p-3.5">
                              <div className="flex items-center gap-2.5">
                                <div
                                  onClick={() => {
                                    setAppForLogoUpdate(app);
                                    setIsLogoModalOpen(true);
                                  }}
                                  className="relative group/logo cursor-pointer shrink-0"
                                  title="Click to change / upload logo"
                                >
                                  <AppIconBadge
                                    icon={app.icon}
                                    name={app.name}
                                    category={app.category}
                                    verified={app.verified}
                                    size="sm"
                                  />
                                  <div className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center text-white">
                                    <ImageIcon className="w-3 h-3" />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold text-foreground">{app.name}</div>
                                  <a
                                    href={app.downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] text-primary hover:underline flex items-center gap-1"
                                  >
                                    Visit Link <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5 text-muted-foreground">{app.category}</td>
                            <td className="p-3.5 font-mono">
                              {app.referralCode ? (
                                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                                  {app.referralCode}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </td>
                            <td className="p-3.5 font-semibold text-amber-400">{app.earningPotential}</td>
                            <td className="p-3.5 font-mono font-bold text-emerald-400">
                              {app.securityScore}/100
                            </td>
                            <td className="p-3.5">
                              <div className="flex items-center gap-1">
                                {app.featured && (
                                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-[10px]">
                                    Featured
                                  </Badge>
                                )}
                                {app.verified && (
                                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="p-3.5 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setAppForLogoUpdate(app);
                                    setIsLogoModalOpen(true);
                                  }}
                                  title="Update Logo"
                                  className="h-7 w-7 p-0 text-primary hover:bg-primary/10"
                                >
                                  <ImageIcon className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDuplicateEarningApp(app)}
                                  title="Duplicate"
                                  className="h-7 w-7 p-0"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setEditingApp(app);
                                    setIsAppModalOpen(true);
                                  }}
                                  title="Edit"
                                  className="h-7 w-7 p-0"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteEarningApp(app.id, app.name)}
                                  title="Delete"
                                  className="h-7 w-7 p-0 text-destructive"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AIRDROPS & TESTNETS MANAGER */}
          {activeTab === 'airdrops' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-card p-4 rounded-xl border border-border shadow-sm">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search airdrops by name, ticker, category, chain..."
                    value={airdropSearch}
                    onChange={(e) => setAirdropSearch(e.target.value)}
                    className="pl-9 text-xs"
                  />
                </div>
                <Select value={airdropChainFilter} onValueChange={setAirdropChainFilter}>
                  <SelectTrigger className="w-full sm:w-48 text-xs">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Blockchains" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Blockchains</SelectItem>
                    <SelectItem value="Ethereum">Ethereum EVM</SelectItem>
                    <SelectItem value="Solana">Solana</SelectItem>
                    <SelectItem value="Telegram">Telegram / TON</SelectItem>
                    <SelectItem value="Cosmos">Cosmos / IBC</SelectItem>
                    <SelectItem value="Bitcoin">Bitcoin Layer 2</SelectItem>
                  </SelectContent>
                </Select>

                {/* Grid / Table Toggle */}
                <div className="flex items-center bg-secondary/80 p-0.5 rounded-lg border border-border">
                  <button
                    onClick={() => setAirdropsViewMode('grid')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      airdropsViewMode === 'grid'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setAirdropsViewMode('table')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      airdropsViewMode === 'table'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Table View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  onClick={() => {
                    setEditingAirdrop(null);
                    setIsAirdropModalOpen(true);
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" /> Create Airdrop
                </Button>
              </div>

              {/* Summary */}
              <div className="text-xs text-muted-foreground px-1">
                Showing <strong>{filteredAirdrops.length}</strong> airdrop guides
              </div>

              {/* GRID VIEW */}
              {airdropsViewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAirdrops.map((airdrop) => (
                    <div
                      key={airdrop.id}
                      className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm flex flex-col justify-between hover:border-amber-500/40 transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                              {airdrop.icon}
                            </span>
                            <div>
                              <h3 className="font-bold text-base text-foreground flex items-center gap-1.5">
                                {airdrop.name}
                                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-secondary text-muted-foreground font-normal">
                                  ${airdrop.ticker}
                                </span>
                              </h3>
                              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                {airdrop.category} • {airdrop.blockchain}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleToggleAirdropFeatured(airdrop.id)}
                            title={airdrop.featured ? 'Featured (click to unfeature)' : 'Mark as Featured'}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              airdrop.featured
                                ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                                : 'bg-secondary border-border text-muted-foreground hover:text-amber-400'
                            }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${airdrop.featured ? 'fill-amber-400' : ''}`} />
                          </button>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                          {airdrop.shortDescription}
                        </p>

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
                        <a
                          href={airdrop.airdropUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          Portal Link <ExternalLink className="w-3 h-3" />
                        </a>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDuplicateAirdrop(airdrop)}
                            title="Duplicate"
                            className="h-8 text-xs text-muted-foreground hover:text-foreground"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingAirdrop(airdrop);
                              setIsAirdropModalOpen(true);
                            }}
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
              )}

              {/* TABLE VIEW */}
              {airdropsViewMode === 'table' && (
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-secondary/60 border-b border-border text-muted-foreground uppercase font-bold text-[10px]">
                        <tr>
                          <th className="p-3.5">Airdrop</th>
                          <th className="p-3.5">Blockchain</th>
                          <th className="p-3.5">Est. Reward</th>
                          <th className="p-3.5">Investment</th>
                          <th className="p-3.5">Backing</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredAirdrops.map((a) => (
                          <tr key={a.id} className="hover:bg-secondary/30 transition-colors">
                            <td className="p-3.5">
                              <div className="flex items-center gap-2.5">
                                <span className="text-xl p-1 rounded bg-amber-500/10">{a.icon}</span>
                                <div>
                                  <div className="font-bold text-foreground flex items-center gap-1.5">
                                    {a.name}
                                    <span className="text-[10px] font-mono px-1 rounded bg-secondary text-muted-foreground">
                                      ${a.ticker}
                                    </span>
                                  </div>
                                  <a
                                    href={a.airdropUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] text-primary hover:underline flex items-center gap-1"
                                  >
                                    Claim Portal <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5 text-muted-foreground">{a.blockchain}</td>
                            <td className="p-3.5 font-bold text-amber-400">{a.estimatedReward}</td>
                            <td className="p-3.5 text-emerald-400 font-medium">{a.investmentRequired}</td>
                            <td className="p-3.5 font-mono">{a.funding}</td>
                            <td className="p-3.5">
                              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-[10px]">
                                {a.status}
                              </Badge>
                            </td>
                            <td className="p-3.5 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDuplicateAirdrop(a)}
                                  title="Duplicate"
                                  className="h-7 w-7 p-0"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setEditingAirdrop(a);
                                    setIsAirdropModalOpen(true);
                                  }}
                                  title="Edit"
                                  className="h-7 w-7 p-0"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteAirdrop(a.id, a.name)}
                                  title="Delete"
                                  className="h-7 w-7 p-0 text-destructive"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PAYOUT PROOFS MANAGER */}
          {activeTab === 'proofs' && (
            <div className="space-y-6">
              {/* Filter and Mode Switcher */}
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-card p-4 rounded-xl border border-border shadow-sm">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search payout proofs by app, method, user handle..."
                    value={proofSearch}
                    onChange={(e) => setProofSearch(e.target.value)}
                    className="pl-9 text-xs"
                  />
                </div>
                <Select value={proofStatusFilter} onValueChange={setProofStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48 text-xs">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Verified">Verified</SelectItem>
                    <SelectItem value="Instant">Instant</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center bg-secondary/80 p-0.5 rounded-lg border border-border">
                  <button
                    onClick={() => setProofsViewMode('table')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      proofsViewMode === 'table'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Table View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setProofsViewMode('grid')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      proofsViewMode === 'grid'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  onClick={() => {
                    setEditingProof(null);
                    setIsProofModalOpen(true);
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs gap-1.5 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" /> Publish Proof
                </Button>
              </div>

              {/* Proofs Ribbon Stats */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-foreground">Verified Proof Registry</span>
                    <p className="text-[11px] text-muted-foreground">
                      Total proof payouts recorded:{' '}
                      <strong className="text-emerald-400 font-bold">${totalUsdPaidOut.toFixed(2)} USD</strong> across{' '}
                      {payoutProofs.length} transactions
                    </p>
                  </div>
                </div>
              </div>

              {/* TABLE VIEW */}
              {proofsViewMode === 'table' && (
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-secondary/60 border-b border-border text-muted-foreground uppercase font-bold text-[10px]">
                        <tr>
                          <th className="p-3.5">Receipt</th>
                          <th className="p-3.5">App / Platform</th>
                          <th className="p-3.5">Amount (USD)</th>
                          <th className="p-3.5">Channel / Method</th>
                          <th className="p-3.5">Referral Link</th>
                          <th className="p-3.5">Date</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredProofs.map((proof) => (
                          <tr key={proof.id} className="hover:bg-secondary/30 transition-colors">
                            <td className="p-3.5">
                              <img
                                src={proof.proofImage}
                                alt={proof.appName}
                                className="w-12 h-12 rounded-lg object-cover border border-border"
                              />
                            </td>
                            <td className="p-3.5">
                              <div className="font-bold text-foreground">{proof.appName}</div>
                              <span className="text-[11px] text-muted-foreground">{proof.appCategory}</span>
                            </td>
                            <td className="p-3.5">
                              <div className="font-bold text-emerald-400">{proof.usdEquivalent}</div>
                              <span className="text-[10px] text-muted-foreground font-mono">
                                ({proof.amount} {proof.currency})
                              </span>
                            </td>
                            <td className="p-3.5 text-muted-foreground">{proof.payoutMethod}</td>
                            <td className="p-3.5 font-mono text-muted-foreground">{proof.userHandle}</td>
                            <td className="p-3.5 text-muted-foreground font-mono">{proof.date}</td>
                            <td className="p-3.5">
                              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">
                                {proof.status}
                              </Badge>
                            </td>
                            <td className="p-3.5 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDuplicateProof(proof)}
                                  title="Duplicate"
                                  className="h-7 w-7 p-0"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setEditingProof(proof);
                                    setIsProofModalOpen(true);
                                  }}
                                  title="Edit"
                                  className="h-7 w-7 p-0"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteProof(proof.id, proof.appName)}
                                  title="Delete"
                                  className="h-7 w-7 p-0 text-destructive"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* GRID VIEW */}
              {proofsViewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProofs.map((proof) => (
                    <div
                      key={proof.id}
                      className="p-4 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all"
                    >
                      <div>
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-border">
                          <img
                            src={proof.proofImage}
                            alt={proof.appName}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-2 right-2 bg-emerald-500 text-white font-bold text-[10px]">
                            {proof.status}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-sm text-foreground">{proof.appName}</h3>
                          <span className="font-bold text-emerald-400">{proof.usdEquivalent}</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{proof.notes}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
                        <span className="text-[11px] text-muted-foreground">{proof.payoutMethod}</span>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingProof(proof);
                              setIsProofModalOpen(true);
                            }}
                            className="h-7 text-xs"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteProof(proof.id, proof.appName)}
                            className="h-7 text-xs text-destructive"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
          {(activeTab === 'banner' || activeTab === 'socials') && <SiteConfigManager />}

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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBulkPublish}
                      className="h-7 text-xs gap-1"
                    >
                      <Eye className="w-3 h-3" /> Publish
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBulkUnpublish}
                      className="h-7 text-xs gap-1"
                    >
                      <FolderOpen className="w-3 h-3" /> Unpublish
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleBulkDelete}
                      className="h-7 text-xs gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPosts(new Set())}
                      className="h-7 text-xs"
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </div>

              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={
                        filteredBlogs.length > 0 && selectedPosts.size === filteredBlogs.length
                      }
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
                      <div
                        key={blog.id}
                        className="p-4 flex items-center gap-3 hover:bg-secondary/40 transition-colors"
                      >
                        <Checkbox
                          checked={selectedPosts.has(blog.id)}
                          onCheckedChange={() => togglePostSelection(blog.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm text-foreground truncate">
                              {blog.title}
                            </h3>
                            {blog.youtube_video_id && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400">
                                YT Video
                              </span>
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
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Article"
                              className="h-8 w-8"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link to={`/admin/editor/${blog.id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Edit Article"
                              className="h-8 w-8"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeletePost(blog.id, blog.title)}
                            title="Delete Article"
                            className="h-8 w-8 text-destructive"
                          >
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

          {/* TAB 8: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">Manage Article Categories</h2>
                <p className="text-xs text-muted-foreground mb-4">
                  Create content taxonomy topics for crypto, mobile earning, and tutorials.
                </p>
                <div className="flex gap-2 max-w-md">
                  <Input
                    placeholder="New category name (e.g. Crypto Apps)..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                    className="text-xs"
                  />
                  <Button
                    onClick={handleAddCategory}
                    disabled={!newCategoryName.trim()}
                    className="bg-primary text-primary-foreground text-xs font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 rounded-xl bg-secondary/50 border border-border flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-bold text-sm text-foreground">{cat.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono">/category/{cat.slug}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCategory(cat.id, cat.name)}
                      className="text-destructive h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SEO METADATA GENERATOR */}
          {activeTab === 'seo' && (
            <SeoMetadataGenerator
              blogs={blogs}
              earningApps={earningApps}
              airdrops={airdrops}
              onApplyToBlog={async (blogId, seoData) => {
                try {
                  const { error } = await supabase
                    .from('blogs')
                    .update({
                      title: seoData.title,
                      excerpt: seoData.excerpt,
                      slug: seoData.slug,
                    })
                    .eq('id', blogId);
                  if (error) throw error;
                  fetchBlogs();
                  toast.success('Updated post SEO metadata in database!');
                } catch (e) {
                  toast.error('Failed to update blog SEO');
                }
              }}
              onApplyToApp={(appId, updated) => {
                setEarningApps((prev) =>
                  prev.map((app) => (app.id === appId ? { ...app, ...updated } : app))
                );
                toast.success('Updated earning app SEO metadata!');
              }}
            />
          )}

          {/* TAB 9: ANALYTICS */}
          {activeTab === 'analytics' && <AnalyticsCharts />}

          {/* TAB 10: BACKUP & DATA ENGINE */}
          {activeTab === 'backup' && (
            <DataBackupRestore
              earningApps={earningApps}
              airdrops={airdrops}
              payoutProofs={payoutProofs}
              onRestoreData={handleRestoreData}
              onResetFactoryData={handleResetFactory}
            />
          )}

          {/* TAB 11: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div className="p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm">
                <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-primary" /> Global Platform Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground block mb-1">Website Brand Title</span>
                    <Input defaultValue="AplusHustler - Top Free Earning Apps & Airdrops" className="text-xs" />
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">Official Contact Email</span>
                    <Input defaultValue="genet212020@gmail.com" className="text-xs" />
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground block mb-1 text-xs">Default Telegram Community Link</span>
                  <Input defaultValue="https://t.me/Aplus_info" className="text-xs font-mono" />
                </div>

                <div>
                  <span className="text-muted-foreground block mb-1 text-xs">Affiliate Disclaimer Text</span>
                  <Input
                    defaultValue="Disclaimer: Some links on this website are referral codes that earn us small bonuses at $0 extra cost to you."
                    className="text-xs"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => toast.success('Platform configuration saved successfully!')}
                    className="bg-primary text-primary-foreground font-semibold text-xs"
                  >
                    Save Platform Settings
                  </Button>
                </div>
              </div>

              {/* Data Backup Mini Card in Settings */}
              <DataBackupRestore
                earningApps={earningApps}
                airdrops={airdrops}
                payoutProofs={payoutProofs}
                onRestoreData={handleRestoreData}
                onResetFactoryData={handleResetFactory}
              />
            </div>
          )}
        </main>
      </div>

      {/* Modals & Quick Search */}
      <AdminQuickSearch
        open={isQuickSearchOpen}
        onOpenChange={setIsQuickSearchOpen}
        apps={earningApps}
        airdrops={airdrops}
        proofs={payoutProofs}
        blogs={blogs}
        onSelectTab={setActiveTab}
        onEditApp={(app) => {
          setEditingApp(app);
          setIsAppModalOpen(true);
        }}
        onEditAirdrop={(airdrop) => {
          setEditingAirdrop(airdrop);
          setIsAirdropModalOpen(true);
        }}
        onEditProof={(proof) => {
          setEditingProof(proof);
          setIsProofModalOpen(true);
        }}
        onAddNew={(type) => {
          if (type === 'app') {
            setEditingApp(null);
            setIsAppModalOpen(true);
          } else if (type === 'airdrop') {
            setEditingAirdrop(null);
            setIsAirdropModalOpen(true);
          } else if (type === 'proof') {
            setEditingProof(null);
            setIsProofModalOpen(true);
          } else if (type === 'post') {
            navigate('/admin/editor');
          }
        }}
      />

      <EarningAppModal
        open={isAppModalOpen}
        onOpenChange={setIsAppModalOpen}
        appToEdit={editingApp}
        onSave={handleSaveEarningApp}
      />

      <AppLogoUpdateModal
        open={isLogoModalOpen}
        onOpenChange={setIsLogoModalOpen}
        app={appForLogoUpdate}
        onSaveLogo={handleUpdateAppLogo}
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
