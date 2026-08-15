import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Zap, Sparkles, Layers } from 'lucide-react';
import { Airdrop, AirdropStep } from '@/data/airdropData';
import { toast } from 'sonner';

interface AirdropModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  airdropToEdit?: Airdrop | null;
  onSave: (airdrop: Airdrop) => void;
}

export const AirdropModal: React.FC<AirdropModalProps> = ({
  open,
  onOpenChange,
  airdropToEdit,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Airdrop>>({
    name: '',
    ticker: '',
    category: 'Testnet',
    blockchain: 'Ethereum EVM',
    estimatedReward: '$500 - $2,000',
    investmentRequired: '$0 (100% Free)',
    difficulty: 'Easy',
    status: 'Active',
    funding: '$10M+',
    icon: '⚡',
    banner: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    shortDescription: '',
    fullDescription: '',
    airdropUrl: '',
    twitterUrl: '',
    telegramUrl: '',
    discordUrl: '',
    requirements: ['Connect Web3 Wallet (MetaMask / Phantom)', 'Complete testnet dApp swaps', 'Claim faucet tokens'],
    steps: [
      { stepNumber: 1, title: 'Visit Official Testnet Portal', description: 'Connect your wallet and switch to the testnet network.' },
      { stepNumber: 2, title: 'Claim Free Faucet Tokens', description: 'Request testnet gas tokens from the official faucet.' },
      { stepNumber: 3, title: 'Interact with Ecosystem dApps', description: 'Perform swaps, stake tokens, or bridge assets weekly.' }
    ],
    featured: true,
    isHot: true,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2025-12-31',
  });

  const [reqInput, setReqInput] = useState('');

  useEffect(() => {
    if (airdropToEdit) {
      setFormData(airdropToEdit);
    } else {
      setFormData({
        id: `airdrop-${Date.now()}`,
        name: '',
        ticker: '',
        category: 'Testnet',
        blockchain: 'Ethereum EVM',
        estimatedReward: '$500 - $2,000',
        investmentRequired: '$0 (100% Free)',
        difficulty: 'Easy',
        status: 'Active',
        funding: '$10M+',
        icon: '⚡',
        banner: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
        shortDescription: '',
        fullDescription: '',
        airdropUrl: '',
        twitterUrl: '',
        telegramUrl: '',
        discordUrl: '',
        requirements: ['Connect Web3 Wallet', 'Complete testnet tasks', 'Claim faucet tokens'],
        steps: [
          { stepNumber: 1, title: 'Connect Wallet', description: 'Open official portal and connect wallet.' },
          { stepNumber: 2, title: 'Perform Tasks', description: 'Execute swaps or node setup.' }
        ],
        featured: true,
        isHot: true,
        startDate: new Date().toISOString().split('T')[0],
        endDate: '2025-12-31',
      });
    }
  }, [airdropToEdit, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.airdropUrl) {
      toast.error('Airdrop name and link are required!');
      return;
    }

    const savedAirdrop: Airdrop = {
      id: formData.id || `airdrop-${Date.now()}`,
      name: formData.name || 'Unnamed Airdrop',
      ticker: formData.ticker || 'TOKEN',
      category: (formData.category as any) || 'Testnet',
      blockchain: formData.blockchain || 'Multi-chain',
      estimatedReward: formData.estimatedReward || '$100+',
      investmentRequired: formData.investmentRequired || '$0 (Free)',
      difficulty: (formData.difficulty as any) || 'Easy',
      status: (formData.status as any) || 'Active',
      funding: formData.funding || 'Community Funded',
      icon: formData.icon || '⚡',
      banner: formData.banner || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
      shortDescription: formData.shortDescription || 'Zero investment crypto airdrop opportunity.',
      fullDescription: formData.fullDescription || formData.shortDescription || 'Detailed step-by-step testnet guide.',
      airdropUrl: formData.airdropUrl || '#',
      twitterUrl: formData.twitterUrl,
      telegramUrl: formData.telegramUrl,
      discordUrl: formData.discordUrl,
      requirements: formData.requirements || ['Connect Wallet'],
      steps: formData.steps || [],
      featured: formData.featured ?? true,
      isHot: formData.isHot ?? true,
      startDate: formData.startDate || new Date().toISOString().split('T')[0],
      endDate: formData.endDate || '2025-12-31',
    };

    onSave(savedAirdrop);
    toast.success(airdropToEdit ? `Updated "${savedAirdrop.name}"` : `Created "${savedAirdrop.name}"`);
    onOpenChange(false);
  };

  const addRequirement = () => {
    if (!reqInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      requirements: [...(prev.requirements || []), reqInput.trim()]
    }));
    setReqInput('');
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: (prev.requirements || []).filter((_, i) => i !== index)
    }));
  };

  const addStep = () => {
    setFormData(prev => {
      const currentSteps = prev.steps || [];
      return {
        ...prev,
        steps: [
          ...currentSteps,
          {
            stepNumber: currentSteps.length + 1,
            title: `Step ${currentSteps.length + 1}`,
            description: 'Step instruction details...'
          }
        ]
      };
    });
  };

  const updateStep = (index: number, field: 'title' | 'description' | 'link', value: string) => {
    setFormData(prev => {
      const steps = [...(prev.steps || [])];
      steps[index] = { ...steps[index], [field]: value };
      return { ...prev, steps };
    });
  };

  const removeStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      steps: (prev.steps || []).filter((_, i) => i !== index).map((s, idx) => ({ ...s, stepNumber: idx + 1 }))
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-display flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            {airdropToEdit ? 'Edit Airdrop / Testnet' : 'Create New Airdrop / Testnet'}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Configure zero-investment airdrops, testnet guides, DePIN nodes, and referral links.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Airdrop Name *</Label>
              <Input
                required
                placeholder="e.g. Monad Testnet"
                value={formData.name || ''}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="text-xs mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Token Ticker</Label>
              <Input
                placeholder="e.g. MON, BERA, GRASS"
                value={formData.ticker || ''}
                onChange={e => setFormData({ ...formData, ticker: e.target.value })}
                className="text-xs mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label className="text-xs">Category</Label>
              <Select
                value={formData.category}
                onValueChange={val => setFormData({ ...formData, category: val as any })}
              >
                <SelectTrigger className="text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Testnet">Testnet (100% Free)</SelectItem>
                  <SelectItem value="Telegram & Mini-App">Telegram & Mini-App</SelectItem>
                  <SelectItem value="Node & Mining">Node & DePIN Mining</SelectItem>
                  <SelectItem value="Retroactive">Retroactive</SelectItem>
                  <SelectItem value="Staking">Staking & Yield</SelectItem>
                  <SelectItem value="DeFi">DeFi Protocols</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">Blockchain Network</Label>
              <Input
                placeholder="e.g. Monad EVM, Berachain, Solana"
                value={formData.blockchain || ''}
                onChange={e => setFormData({ ...formData, blockchain: e.target.value })}
                className="text-xs mt-1"
              />
            </div>

            <div>
              <Label className="text-xs">Status</Label>
              <Select
                value={formData.status}
                onValueChange={val => setFormData({ ...formData, status: val as any })}
              >
                <SelectTrigger className="text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active 🟢</SelectItem>
                  <SelectItem value="Ending Soon">Ending Soon ⏳</SelectItem>
                  <SelectItem value="Confirmed">Confirmed 💎</SelectItem>
                  <SelectItem value="Upcoming">Upcoming 🚀</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label className="text-xs">Estimated Reward</Label>
              <Input
                placeholder="e.g. $1,000 - $5,000"
                value={formData.estimatedReward || ''}
                onChange={e => setFormData({ ...formData, estimatedReward: e.target.value })}
                className="text-xs mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Investment Required</Label>
              <Input
                placeholder="e.g. $0 (100% Free)"
                value={formData.investmentRequired || ''}
                onChange={e => setFormData({ ...formData, investmentRequired: e.target.value })}
                className="text-xs mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Funding Backed</Label>
              <Input
                placeholder="e.g. $225M (Paradigm)"
                value={formData.funding || ''}
                onChange={e => setFormData({ ...formData, funding: e.target.value })}
                className="text-xs mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">Airdrop Claim / Faucet Target URL *</Label>
            <Input
              required
              placeholder="https://monad.xyz or referral link"
              value={formData.airdropUrl || ''}
              onChange={e => setFormData({ ...formData, airdropUrl: e.target.value })}
              className="text-xs mt-1 font-mono"
            />
          </div>

          <div>
            <Label className="text-xs">Short Summary Description</Label>
            <Textarea
              rows={2}
              placeholder="Brief summary shown on airdrop card grid..."
              value={formData.shortDescription || ''}
              onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
              className="text-xs mt-1"
            />
          </div>

          <div>
            <Label className="text-xs">Full Strategy Guide Overview</Label>
            <Textarea
              rows={3}
              placeholder="Detailed description of project and eligibility criteria..."
              value={formData.fullDescription || ''}
              onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
              className="text-xs mt-1"
            />
          </div>

          {/* Requirements list */}
          <div className="p-3 rounded-xl bg-secondary/50 border border-border space-y-2">
            <Label className="text-xs font-bold">Requirements Checklist</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add requirement (e.g. Connect Phantom Wallet)..."
                value={reqInput}
                onChange={e => setReqInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addRequirement(); } }}
                className="text-xs"
              />
              <Button type="button" size="sm" onClick={addRequirement} className="text-xs">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {formData.requirements?.map((req, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 bg-card border border-border px-2 py-0.5 rounded text-[11px]">
                  {req}
                  <button type="button" onClick={() => removeRequirement(idx)} className="text-destructive hover:font-bold ml-1">×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Guide Steps */}
          <div className="p-3 rounded-xl bg-secondary/50 border border-border space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold">Step-by-Step Claim Instructions</Label>
              <Button type="button" size="sm" variant="ghost" onClick={addStep} className="h-6 text-xs text-primary gap-1">
                <Plus className="w-3 h-3" /> Add Step
              </Button>
            </div>
            <div className="space-y-2">
              {formData.steps?.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-card border border-border space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[11px] text-amber-400">Step {idx + 1}</span>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeStep(idx)} className="h-6 w-6 text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Step Title (e.g. Visit Testnet Faucet)"
                    value={step.title}
                    onChange={e => updateStep(idx, 'title', e.target.value)}
                    className="text-xs h-8"
                  />
                  <Textarea
                    rows={2}
                    placeholder="Step details..."
                    value={step.description}
                    onChange={e => updateStep(idx, 'description', e.target.value)}
                    className="text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.featured}
                  onCheckedChange={checked => setFormData({ ...formData, featured: checked })}
                />
                <span className="text-xs font-semibold">Featured</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isHot}
                  onCheckedChange={checked => setFormData({ ...formData, isHot: checked })}
                />
                <span className="text-xs font-semibold text-amber-400">🔥 Hot Airdrop</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
                Save Airdrop
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
