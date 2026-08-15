import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export interface ProofItem {
  id: string;
  appName: string;
  appCategory: string;
  amount: string;
  currency: string;
  usdEquivalent: string;
  payoutMethod: string;
  txHash: string;
  proofImage: string;
  date: string;
  status: 'Verified' | 'Instant' | 'Completed' | 'Pending';
  userHandle: string;
  notes: string;
  appUrl: string;
  featured?: boolean;
}

interface ProofModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proofToEdit?: ProofItem | null;
  onSave: (proof: ProofItem) => void;
}

export const ProofModal: React.FC<ProofModalProps> = ({
  open,
  onOpenChange,
  proofToEdit,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<ProofItem>>({
    appName: '',
    appCategory: 'Crypto App',
    amount: '10.00',
    currency: 'USD',
    usdEquivalent: '$10.00',
    payoutMethod: 'Crypto Wallet / P2P',
    txHash: 'TX-PROOF-' + Math.floor(Math.random() * 899999 + 100000),
    proofImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    date: new Date().toISOString().split('T')[0],
    status: 'Verified',
    userHandle: '@crypto_earner',
    notes: 'Successfully cashed out earnings instantly.',
    appUrl: 'https://',
    featured: true,
  });

  useEffect(() => {
    if (proofToEdit) {
      setFormData(proofToEdit);
    } else {
      setFormData({
        id: 'proof-' + Date.now(),
        appName: '',
        appCategory: 'Crypto App',
        amount: '10.00',
        currency: 'USD',
        usdEquivalent: '$10.00',
        payoutMethod: 'Crypto Wallet / P2P',
        txHash: 'TX-PROOF-' + Math.floor(Math.random() * 899999 + 100000),
        proofImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
        date: new Date().toISOString().split('T')[0],
        status: 'Verified',
        userHandle: '@crypto_earner',
        notes: 'Successfully cashed out earnings instantly.',
        appUrl: 'https://',
        featured: true,
      });
    }
  }, [proofToEdit, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.appName || !formData.amount) {
      toast.error('App Name and Amount are required');
      return;
    }

    const proofItem: ProofItem = {
      id: formData.id || 'proof-' + Date.now(),
      appName: formData.appName || '',
      appCategory: formData.appCategory || 'Crypto App',
      amount: formData.amount || '10.00',
      currency: formData.currency || 'USD',
      usdEquivalent: formData.usdEquivalent || `$${formData.amount}`,
      payoutMethod: formData.payoutMethod || 'Wallet',
      txHash: formData.txHash || 'TX-' + Date.now(),
      proofImage: formData.proofImage || 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      date: formData.date || new Date().toISOString().split('T')[0],
      status: (formData.status as any) || 'Verified',
      userHandle: formData.userHandle || '@earner',
      notes: formData.notes || '',
      appUrl: formData.appUrl || '#',
      featured: Boolean(formData.featured),
    };

    onSave(proofItem);
    toast.success(proofToEdit ? `Updated proof for "${proofItem.appName}"` : `Added payout proof for "${proofItem.appName}"`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            {proofToEdit ? 'Edit Payout Proof' : 'Add New Payout Proof'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="proofAppName" className="text-xs font-semibold">App Name *</Label>
              <Input
                id="proofAppName"
                placeholder="e.g. ME PASS, mPaisa, HiFami"
                value={formData.appName}
                onChange={e => setFormData({ ...formData, appName: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="status" className="text-xs font-semibold">Verification Status</Label>
              <Select
                value={formData.status}
                onValueChange={(val: any) => setFormData({ ...formData, status: val })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Verified">Verified</SelectItem>
                  <SelectItem value="Instant">Instant</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="amount" className="text-xs font-semibold">Amount *</Label>
              <Input
                id="amount"
                placeholder="25.00"
                value={formData.amount}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="currency" className="text-xs font-semibold">Currency Token</Label>
              <Input
                id="currency"
                placeholder="USD, MEC, USDT"
                value={formData.currency}
                onChange={e => setFormData({ ...formData, currency: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="usdEq" className="text-xs font-semibold">USD Value ($)</Label>
              <Input
                id="usdEq"
                placeholder="$25.00"
                value={formData.usdEquivalent}
                onChange={e => setFormData({ ...formData, usdEquivalent: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="payoutMethod" className="text-xs font-semibold">Payout Channel / Method</Label>
              <Input
                id="payoutMethod"
                placeholder="e.g. Ethio Telecom Airtime / Safaricom / P2P"
                value={formData.payoutMethod}
                onChange={e => setFormData({ ...formData, payoutMethod: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="userHandle" className="text-xs font-semibold">User Handle / Username</Label>
              <Input
                id="userHandle"
                placeholder="@ethio_earner"
                value={formData.userHandle}
                onChange={e => setFormData({ ...formData, userHandle: e.target.value })}
                className="mt-1 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="txHash" className="text-xs font-semibold">TX Hash / Ref ID</Label>
              <Input
                id="txHash"
                placeholder="TX-1002934"
                value={formData.txHash}
                onChange={e => setFormData({ ...formData, txHash: e.target.value })}
                className="mt-1 font-mono"
              />
            </div>

            <div>
              <Label htmlFor="date" className="text-xs font-semibold">Proof Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="proofImage" className="text-xs font-semibold">Proof Screenshot Image URL</Label>
            <Input
              id="proofImage"
              placeholder="https://images.unsplash.com/..."
              value={formData.proofImage}
              onChange={e => setFormData({ ...formData, proofImage: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="appUrl" className="text-xs font-semibold">App Offer Link</Label>
            <Input
              id="appUrl"
              placeholder="https://..."
              value={formData.appUrl}
              onChange={e => setFormData({ ...formData, appUrl: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="notes" className="text-xs font-semibold">Notes / Verification Details</Label>
            <Textarea
              id="notes"
              placeholder="Description of how the task was completed and paid..."
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              className="mt-1"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Checkbox
              id="proofFeatured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: Boolean(checked) })}
            />
            <Label htmlFor="proofFeatured" className="text-xs cursor-pointer font-medium">Highlight as Top Proof</Label>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              {proofToEdit ? 'Save Changes' : 'Publish Payout Proof'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
