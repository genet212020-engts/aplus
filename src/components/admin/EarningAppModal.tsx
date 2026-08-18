import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash, Sparkles, Image as ImageIcon, CheckCircle2, Star, ShieldCheck, Zap, Upload, Globe, Smile, Type } from 'lucide-react';
import { toast } from 'sonner';
import { AppIconBadge } from '@/components/AppIconBadge';
import { Badge } from '@/components/ui/badge';
import { POPULAR_APP_LOGOS, EMOJI_CATEGORIES } from '@/components/admin/AppLogoUpdateModal';

export interface EarningAppItem {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: 'Exchange' | 'Wallet' | 'Telegram Bot' | 'DePIN & Mining' | 'Tasks & Micro-Earning';
  downloadUrl: string;
  referralCode?: string;
  welcomeBonus?: string;
  earningPotential?: string;
  rating: number;
  reviewsCount: string;
  securityScore: number;
  icon: string;
  featured?: boolean;
  verified?: boolean;
  highlights: string[];
  stepsToEarn: string[];
}

interface EarningAppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appToEdit?: EarningAppItem | null;
  onSave: (app: EarningAppItem) => void;
}

const PRESET_ICONS = [
  { label: 'Shield & Wallet', icon: '🛡️', cat: 'Wallet' },
  { label: 'Gaming & Tasks', icon: '🎮', cat: 'Tasks & Micro-Earning' },
  { label: 'Direct Cash', icon: '💵', cat: 'Tasks & Micro-Earning' },
  { label: 'Gift & Points', icon: '🎁', cat: 'Tasks & Micro-Earning' },
  { label: 'DePIN Node', icon: '🌱', cat: 'DePIN & Mining' },
  { label: 'Telegram Bot', icon: '🤖', cat: 'Telegram Bot' },
  { label: 'Exchange & Trading', icon: '📈', cat: 'Exchange' },
  { label: 'Mobile Airtime', icon: '📱', cat: 'Tasks & Micro-Earning' },
  { label: 'Crypto Diamond', icon: '💎', cat: 'Wallet' },
  { label: 'Coin / Token', icon: '🪙', cat: 'Exchange' },
  { label: 'Fast Boost', icon: '⚡', cat: 'Telegram Bot' },
  { label: 'Fire Hot', icon: '🔥', cat: 'Tasks & Micro-Earning' },
];

export const EarningAppModal: React.FC<EarningAppModalProps> = ({
  open,
  onOpenChange,
  appToEdit,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<EarningAppItem>>({
    name: '',
    description: '',
    longDescription: '',
    category: 'Tasks & Micro-Earning',
    downloadUrl: '',
    referralCode: '',
    welcomeBonus: '',
    earningPotential: '💵 $10 - $30 / Week',
    rating: 4.9,
    reviewsCount: '100K+',
    securityScore: 98,
    icon: '💵',
    featured: true,
    verified: true,
    highlights: ['100% Free registration', 'Instant withdrawal options'],
    stepsToEarn: ['Sign up using the referral link', 'Complete account setup and verification', 'Start performing tasks & claim payout'],
  });

  const [highlightInput, setHighlightInput] = useState('');
  const [stepInput, setStepInput] = useState('');

  useEffect(() => {
    if (appToEdit) {
      setFormData(appToEdit);
    } else {
      setFormData({
        id: 'app-' + Date.now(),
        name: '',
        description: '',
        longDescription: '',
        category: 'Tasks & Micro-Earning',
        downloadUrl: '',
        referralCode: '',
        welcomeBonus: '',
        earningPotential: '💵 $10 - $30 / Week',
        rating: 4.9,
        reviewsCount: '100K+',
        securityScore: 98,
        icon: '💵',
        featured: true,
        verified: true,
        highlights: ['100% Free registration', 'Instant withdrawal options'],
        stepsToEarn: ['Sign up using the referral link', 'Complete account setup and verification', 'Start performing tasks & claim payout'],
      });
    }
  }, [appToEdit, open]);

  const handleAddHighlight = () => {
    if (!highlightInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      highlights: [...(prev.highlights || []), highlightInput.trim()]
    }));
    setHighlightInput('');
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: (prev.highlights || []).filter((_, i) => i !== index)
    }));
  };

  const handleAddStep = () => {
    if (!stepInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      stepsToEarn: [...(prev.stepsToEarn || []), stepInput.trim()]
    }));
    setStepInput('');
  };

  const handleRemoveStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stepsToEarn: (prev.stepsToEarn || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.downloadUrl) {
      toast.error('App Name and Download URL are required');
      return;
    }

    const appItem: EarningAppItem = {
      id: formData.id || 'app-' + Date.now(),
      name: formData.name || '',
      description: formData.description || '',
      longDescription: formData.longDescription || formData.description || '',
      category: (formData.category as any) || 'Tasks & Micro-Earning',
      downloadUrl: formData.downloadUrl || '',
      referralCode: formData.referralCode || '',
      welcomeBonus: formData.welcomeBonus || '',
      earningPotential: formData.earningPotential || '💵 Good Rewards',
      rating: Number(formData.rating) || 4.9,
      reviewsCount: formData.reviewsCount || '100K+',
      securityScore: Number(formData.securityScore) || 98,
      icon: formData.icon || '💵',
      featured: Boolean(formData.featured),
      verified: Boolean(formData.verified),
      highlights: formData.highlights || [],
      stepsToEarn: formData.stepsToEarn || [],
    };

    onSave(appItem);
    toast.success(appToEdit ? `Updated "${appItem.name}"` : `Added "${appItem.name}"`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold font-display">
            <Sparkles className="w-5 h-5 text-primary" />
            {appToEdit ? 'Edit High-Yield Earning App' : 'Add New Earning App'}
          </DialogTitle>
        </DialogHeader>

        {/* Live Preview Card Ribbon */}
        <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <AppIconBadge
              icon={formData.icon}
              name={formData.name}
              category={formData.category}
              verified={formData.verified}
              size="lg"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs font-semibold">
                  {formData.category || 'Category'}
                </Badge>
                {formData.featured && (
                  <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <h4 className="font-display font-bold text-base text-foreground truncate mt-1">
                {formData.name || 'App Name Preview'}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span className="flex items-center text-amber-400 font-bold">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                  {formData.rating || 4.9}
                </span>
                <span>•</span>
                <span>{formData.reviewsCount || '100K+'} users</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">{formData.securityScore || 98}% Trust</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-border/50">
            <span className="text-[11px] text-muted-foreground block">Earning Potential</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 inline-block mt-0.5">
              {formData.earningPotential || '💵 High Potential'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* App Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="appName" className="text-xs font-semibold">App Name *</Label>
              <Input
                id="appName"
                placeholder="e.g. ME PASS, mPaisa, HiFami, Jolly Cash"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-xs font-semibold">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(val: any) => setFormData({ ...formData, category: val })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tasks & Micro-Earning">Tasks & Micro-Earning</SelectItem>
                  <SelectItem value="Wallet">Wallet & P2P</SelectItem>
                  <SelectItem value="Exchange">Exchange</SelectItem>
                  <SelectItem value="Telegram Bot">Telegram Bot</SelectItem>
                  <SelectItem value="DePIN & Mining">DePIN & Mining</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Links & Referral Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="downloadUrl" className="text-xs font-semibold">Download / Offer Link *</Label>
              <Input
                id="downloadUrl"
                placeholder="https://..."
                value={formData.downloadUrl}
                onChange={e => setFormData({ ...formData, downloadUrl: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="referralCode" className="text-xs font-semibold">Referral / Invite Code</Label>
              <Input
                id="referralCode"
                placeholder="e.g. x4ccdp3m or 1547719"
                value={formData.referralCode}
                onChange={e => setFormData({ ...formData, referralCode: e.target.value })}
                className="mt-1 font-mono"
              />
            </div>
          </div>

          {/* Icon & Thumbnail Customizer */}
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="iconInput" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-primary" /> App Logo / Icon (Image Upload, Web URL, or Emoji)
              </Label>
              <span className="text-[11px] text-muted-foreground">PNG, SVG, JPG, WebP, or Emoji</span>
            </div>

            {/* Input & Direct File Upload Trigger */}
            <div className="flex gap-2">
              <Input
                id="iconInput"
                placeholder="e.g. 💵 or https://... or paste image link"
                value={formData.icon}
                onChange={e => setFormData({ ...formData, icon: e.target.value })}
                className="font-mono text-xs"
              />
              <label className="cursor-pointer shrink-0">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 2 * 1024 * 1024) {
                        toast.error('Image must be under 2MB');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const result = ev.target?.result as string;
                        if (result) {
                          setFormData({ ...formData, icon: result });
                          toast.success('Logo uploaded from device!');
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <Button type="button" variant="outline" size="sm" className="gap-1.5 text-xs h-9 pointer-events-none">
                  <Upload className="w-3.5 h-3.5" /> Upload File
                </Button>
              </label>
            </div>

            {/* Popular Curated App Logos */}
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1.5">Popular Curated Logos:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {POPULAR_APP_LOGOS.map(p => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: p.icon })}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                      formData.icon === p.icon
                        ? 'bg-primary text-primary-foreground border-primary font-bold shadow-xs'
                        : 'bg-card border-border/70 hover:border-primary/50 text-foreground'
                    }`}
                  >
                    <img src={p.icon} alt={p.label} className="w-3.5 h-3.5 rounded object-cover" crossOrigin="anonymous" />
                    <span className="text-[11px]">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Presets & Emoji Quick Select */}
            <div className="pt-1 border-t border-border/50">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1.5">Preset Emojis & Symbols:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {PRESET_ICONS.map(p => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: p.icon })}
                    className={`text-xs px-2 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                      formData.icon === p.icon
                        ? 'bg-primary text-primary-foreground border-primary font-bold'
                        : 'bg-card border-border/60 hover:border-primary/50 text-foreground'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span className="text-[10px]">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <Label htmlFor="description" className="text-xs font-semibold">Short Summary / Teaser</Label>
            <Textarea
              id="description"
              placeholder="Short description of what users get by using this app..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="mt-1"
            />
          </div>

          {/* Bonus, Earning Potential & Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="welcomeBonus" className="text-xs font-semibold">Welcome Bonus Tag</Label>
              <Input
                id="welcomeBonus"
                placeholder="e.g. $0.10 Instant Bonus"
                value={formData.welcomeBonus}
                onChange={e => setFormData({ ...formData, welcomeBonus: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="earningPotential" className="text-xs font-semibold">Earning Potential</Label>
              <Input
                id="earningPotential"
                placeholder="e.g. $15+/Week or 1 MEC ≈ $6"
                value={formData.earningPotential}
                onChange={e => setFormData({ ...formData, earningPotential: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="rating" className="text-xs font-semibold">Rating (1 - 5)</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={e => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="reviewsCount" className="text-xs font-semibold">Reviews / User Base</Label>
              <Input
                id="reviewsCount"
                placeholder="e.g. 250K+"
                value={formData.reviewsCount}
                onChange={e => setFormData({ ...formData, reviewsCount: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="securityScore" className="text-xs font-semibold">Security Score (%)</Label>
              <Input
                id="securityScore"
                type="number"
                min="50"
                max="100"
                value={formData.securityScore}
                onChange={e => setFormData({ ...formData, securityScore: parseInt(e.target.value) })}
                className="mt-1"
              />
            </div>
          </div>

          {/* Highlights */}
          <div>
            <Label className="text-xs font-semibold">Key Features / Highlights</Label>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder="Add highlight point..."
                value={highlightInput}
                onChange={e => setHighlightInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHighlight();
                  }
                }}
              />
              <Button type="button" onClick={handleAddHighlight} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {(formData.highlights || []).map((h, i) => (
                <span key={i} className="text-xs bg-secondary border border-border px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  {h}
                  <button type="button" onClick={() => handleRemoveHighlight(i)} className="text-muted-foreground hover:text-destructive">
                    <Trash className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Steps To Earn */}
          <div>
            <Label className="text-xs font-semibold">Step-by-Step Earn Instructions</Label>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder="Add step instruction..."
                value={stepInput}
                onChange={e => setStepInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddStep();
                  }
                }}
              />
              <Button type="button" onClick={handleAddStep} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1 mt-2">
              {(formData.stepsToEarn || []).map((step, i) => (
                <div key={i} className="text-xs bg-secondary/60 border border-border/50 p-2 rounded flex items-center justify-between gap-2">
                  <span className="font-semibold text-primary">{i + 1}. {step}</span>
                  <button type="button" onClick={() => handleRemoveStep(i)} className="text-muted-foreground hover:text-destructive">
                    <Trash className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: Boolean(checked) })}
              />
              <Label htmlFor="featured" className="text-xs cursor-pointer font-medium">Featured App</Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="verified"
                checked={formData.verified}
                onCheckedChange={(checked) => setFormData({ ...formData, verified: Boolean(checked) })}
              />
              <Label htmlFor="verified" className="text-xs cursor-pointer font-medium">Verified & Audited</Label>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
              {appToEdit ? 'Save Changes' : 'Create Earning App'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
