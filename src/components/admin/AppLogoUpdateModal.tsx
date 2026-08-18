import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  Link2,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Zap,
  Globe,
  Smile,
  ShieldCheck,
  Type
} from 'lucide-react';
import { toast } from 'sonner';
import { AppIconBadge } from '@/components/AppIconBadge';
import { EarningAppItem } from '@/components/admin/EarningAppModal';

interface AppLogoUpdateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  app: EarningAppItem | null;
  onSaveLogo: (appId: string, newIcon: string) => void;
}

// Curated high-res official app & web3 presets
export const POPULAR_APP_LOGOS = [
  {
    name: 'ME PASS (MEC)',
    icon: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=200&auto=format&fit=crop&q=80',
    type: 'url',
    symbol: '🛡️',
    label: 'ME PASS'
  },
  {
    name: 'mPaisa (Gaming & Airtime)',
    icon: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&auto=format&fit=crop&q=80',
    type: 'url',
    symbol: '🎮',
    label: 'mPaisa'
  },
  {
    name: 'HiFami (Cash Rewards)',
    icon: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&auto=format&fit=crop&q=80',
    type: 'url',
    symbol: '💵',
    label: 'HiFami'
  },
  {
    name: 'Jolly Cash',
    icon: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=200&auto=format&fit=crop&q=80',
    type: 'url',
    symbol: '🎁',
    label: 'Jolly Cash'
  },
  {
    name: 'JumpTask & Honeygain',
    icon: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=200&auto=format&fit=crop&q=80',
    type: 'url',
    symbol: '🐝',
    label: 'JumpTask'
  },
  {
    name: 'Grass DePIN Node',
    icon: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&auto=format&fit=crop&q=80',
    type: 'url',
    symbol: '🌱',
    label: 'Grass'
  },
  {
    name: 'Binance',
    icon: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=200&auto=format&fit=crop&q=80',
    type: 'url',
    symbol: '🔶',
    label: 'Binance'
  },
  {
    name: 'Tonkeeper / Telegram',
    icon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    type: 'url',
    symbol: '✈️',
    label: 'TON / Telegram'
  },
  {
    name: 'Phantom Solana',
    icon: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&auto=format&fit=crop&q=80',
    type: 'url',
    symbol: '👻',
    label: 'Phantom'
  },
  {
    name: 'MetaMask EVM',
    icon: 'https://images.unsplash.com/photo-1634704784915-aacf363b021f?w=200&auto=format&fit=crop&q=80',
    type: 'url',
    symbol: '🦊',
    label: 'MetaMask'
  }
];

export const EMOJI_CATEGORIES = [
  {
    category: 'Money & Rewards',
    emojis: ['💵', '💰', '💸', '🤑', '🪙', '💎', '🎁', '🏆', '🔥', '⭐']
  },
  {
    category: 'Wallets & Security',
    emojis: ['🛡️', '👛', '🔒', '🔑', '🏦', '💳', '🧿', '⚡', '🌟', '✨']
  },
  {
    category: 'Gaming, Tasks & Tech',
    emojis: ['🎮', '🕹️', '🎯', '🎲', '👾', '📱', '💻', '🤖', '🐝', '🚀']
  },
  {
    category: 'DePIN, Nodes & Mining',
    emojis: ['🌱', '⛏️', '🌐', '📡', '⚡', '🔋', '⚙️', '📈', '🛰️', '🌲']
  },
  {
    category: 'Crypto & Networks',
    emojis: ['🔶', '✈️', '👻', '🦊', '🐱', '🐶', '🦄', '🟣', '🟢', '🔵']
  }
];

export const AppLogoUpdateModal: React.FC<AppLogoUpdateModalProps> = ({
  open,
  onOpenChange,
  app,
  onSaveLogo,
}) => {
  const [selectedIcon, setSelectedIcon] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [tickerInput, setTickerInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (app) {
      setSelectedIcon(app.icon || '💵');
      setUrlInput(app.icon && (app.icon.startsWith('http') || app.icon.startsWith('data:image')) ? app.icon : '');
      setTickerInput(app.icon && !app.icon.startsWith('http') && !app.icon.startsWith('data:') && app.icon.length <= 5 && !/\p{Extended_Pictographic}/u.test(app.icon) ? app.icon : '');
    }
  }, [app, open]);

  if (!app) return null;

  // Handle Local Image File Upload
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, SVG, or WebP)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setSelectedIcon(result);
        setUrlInput('');
        toast.success('Logo uploaded and ready to apply!');
      }
    };
    reader.onerror = () => {
      toast.error('Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSave = () => {
    if (!selectedIcon.trim()) {
      toast.error('Please choose or upload a logo first');
      return;
    }
    onSaveLogo(app.id, selectedIcon.trim());
    toast.success(`Logo updated for "${app.name}"`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold font-display">
            <ImageIcon className="w-5 h-5 text-primary" />
            Update App Logo & Brand Icon
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Update the official logo, custom image, or badge icon for <strong className="text-foreground">{app.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        {/* Live Responsive Logo Preview Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-card via-secondary/30 to-card border border-border/80 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <AppIconBadge
              icon={selectedIcon}
              name={app.name}
              category={app.category}
              verified={app.verified}
              size="lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">{app.name}</span>
                {app.verified && (
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/20 font-semibold flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground block mt-0.5">{app.category}</span>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] text-muted-foreground uppercase font-mono">Current format:</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  {selectedIcon.startsWith('data:image')
                    ? 'Uploaded File (Base64)'
                    : selectedIcon.startsWith('http')
                    ? 'Direct Web URL'
                    : /\p{Extended_Pictographic}/u.test(selectedIcon)
                    ? 'Emoji Symbol'
                    : 'Text Monogram'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Size Previews */}
            <div className="flex items-center gap-2 bg-secondary/60 p-2 rounded-xl border border-border/50">
              <AppIconBadge icon={selectedIcon} name={app.name} category={app.category} size="xs" />
              <AppIconBadge icon={selectedIcon} name={app.name} category={app.category} size="sm" />
              <AppIconBadge icon={selectedIcon} name={app.name} category={app.category} size="md" />
            </div>
          </div>
        </div>

        {/* Logo Selection Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-2">
          <TabsList className="grid grid-cols-4 w-full h-10">
            <TabsTrigger value="upload" className="text-xs flex items-center gap-1.5 font-medium">
              <Upload className="w-3.5 h-3.5" /> Upload File
            </TabsTrigger>
            <TabsTrigger value="presets" className="text-xs flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5" /> Curated Logos
            </TabsTrigger>
            <TabsTrigger value="url" className="text-xs flex items-center gap-1.5 font-medium">
              <Link2 className="w-3.5 h-3.5" /> Image Link
            </TabsTrigger>
            <TabsTrigger value="emoji" className="text-xs flex items-center gap-1.5 font-medium">
              <Smile className="w-3.5 h-3.5" /> Emoji / Symbols
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: FILE UPLOAD */}
          <TabsContent value="upload" className="space-y-4 pt-3">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-8 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                isDragging
                  ? 'border-primary bg-primary/10 scale-[1.01]'
                  : 'border-border/80 hover:border-primary/50 bg-secondary/20 hover:bg-secondary/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-foreground">Click to upload or drag and drop</h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                Supports PNG, JPG, SVG, WebP up to 2MB. Square 1:1 ratio with transparent or dark background looks best!
              </p>
            </div>
          </TabsContent>

          {/* TAB 2: CURATED LOGO PRESETS */}
          <TabsContent value="presets" className="space-y-3 pt-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
              {POPULAR_APP_LOGOS.map((preset) => {
                const isSelected = selectedIcon === preset.icon;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setSelectedIcon(preset.icon);
                      setUrlInput(preset.icon);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-primary/15 border-primary text-primary font-bold shadow-xs'
                        : 'bg-card border-border/70 hover:border-primary/40 hover:bg-secondary/50 text-foreground'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-border/50">
                      <img
                        src={preset.icon}
                        alt={preset.label}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold truncate">{preset.label}</div>
                      <span className="text-[10px] text-muted-foreground block">{preset.symbol} Official</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </TabsContent>

          {/* TAB 3: IMAGE URL */}
          <TabsContent value="url" className="space-y-3 pt-3">
            <div className="space-y-2">
              <Label htmlFor="logoUrlInput" className="text-xs font-semibold">
                Direct Image Link (HTTPS)
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="logoUrlInput"
                    placeholder="https://example.com/logo.png"
                    value={urlInput}
                    onChange={(e) => {
                      setUrlInput(e.target.value);
                      if (e.target.value.trim()) {
                        setSelectedIcon(e.target.value.trim());
                      }
                    }}
                    className="pl-9 font-mono text-xs"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (urlInput.trim()) {
                      setSelectedIcon(urlInput.trim());
                      toast.success('Applied image URL preview');
                    }
                  }}
                  className="text-xs"
                >
                  Apply
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Paste any publicly accessible image link from Unsplash, GitHub, CoinGecko, or official app websites.
              </p>
            </div>
          </TabsContent>

          {/* TAB 4: EMOJI & SYMBOL PICKER */}
          <TabsContent value="emoji" className="space-y-4 pt-3">
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {EMOJI_CATEGORIES.map((cat) => (
                <div key={cat.category} className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                    {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.emojis.map((emoji) => {
                      const isSelected = selectedIcon === emoji;
                      return (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setSelectedIcon(emoji)}
                          className={`w-10 h-10 text-xl rounded-xl border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-primary text-primary-foreground border-primary scale-110 shadow-sm'
                              : 'bg-card border-border/70 hover:border-primary/50 hover:bg-secondary/60'
                          }`}
                        >
                          {emoji}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Custom Monogram Text */}
              <div className="pt-2 border-t border-border/50">
                <Label htmlFor="tickerMonogram" className="text-xs font-semibold flex items-center gap-1.5 mb-1.5">
                  <Type className="w-3.5 h-3.5 text-primary" /> Or Use Custom Ticker Monogram (2 - 5 letters)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="tickerMonogram"
                    placeholder="e.g. MEC, TON, SOL, GRASS, BNB"
                    value={tickerInput}
                    maxLength={5}
                    onChange={(e) => {
                      const val = e.target.value.toUpperCase();
                      setTickerInput(val);
                      if (val) {
                        setSelectedIcon(val);
                      }
                    }}
                    className="font-mono uppercase font-bold text-xs"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (tickerInput.trim()) {
                        setSelectedIcon(tickerInput.trim().toUpperCase());
                      }
                    }}
                    className="text-xs"
                  >
                    Set Monogram
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedIcon('💵');
              setUrlInput('');
              setTickerInput('');
            }}
            className="text-xs text-muted-foreground hover:text-destructive gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Reset to Default
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-xs flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="bg-primary text-primary-foreground font-semibold text-xs flex-1 sm:flex-none gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" /> Save App Logo
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
