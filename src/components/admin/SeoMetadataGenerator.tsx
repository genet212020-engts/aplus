import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  Search,
  Globe,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  SlidersHorizontal,
  Smartphone,
  Monitor,
  Code,
  FileText,
  Zap,
  ArrowRight,
  TrendingUp,
  Tag,
  Share2,
  ExternalLink,
  Layers,
  Sparkle
} from 'lucide-react';
import { toast } from 'sonner';
import { EarningAppItem } from './EarningAppModal';
import { Airdrop } from '@/data/airdropData';

interface SeoMetadataGeneratorProps {
  blogs?: any[];
  earningApps?: EarningAppItem[];
  airdrops?: Airdrop[];
  onApplyToBlog?: (blogId: string, seoData: { title: string; excerpt: string; slug: string }) => void;
  onApplyToApp?: (appId: string, updated: Partial<EarningAppItem>) => void;
}

export interface GeneratedSeoResult {
  titleOptions: {
    type: 'High CTR' | 'How-To / Guide' | 'Listicle / Yield' | 'Keyword Focused' | 'Short & Punchy';
    title: string;
    charCount: number;
    score: number;
  }[];
  descriptionOptions: {
    type: 'Action-Oriented' | 'Benefit-Driven' | 'Comprehensive Summary' | 'Urgency / Bonus';
    description: string;
    charCount: number;
    score: number;
  }[];
  suggestedSlug: string;
  keywords: string[];
  longTailQueries: string[];
  schemaMarkup: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
  };
}

export const SeoMetadataGenerator: React.FC<SeoMetadataGeneratorProps> = ({
  blogs = [],
  earningApps = [],
  airdrops = [],
  onApplyToBlog,
  onApplyToApp,
}) => {
  // Source selection state
  const [sourceType, setSourceType] = useState<'custom' | 'blog' | 'app' | 'airdrop'>('custom');
  const [selectedItemId, setSelectedItemId] = useState<string>('');

  // Content inputs
  const [contentTitle, setContentTitle] = useState('How to Make $20 Daily with ME PASS and mPaisa Crypto Apps');
  const [contentBody, setContentBody] = useState(
    'Step-by-step guide to earning money online in Ethiopia and worldwide. Learn how to verify your MEC Token wallet on ME PASS for instant rewards and withdraw cash via P2P. Also covers mPaisa gaming tasks with direct Ethio Telecom airtime, Safaricom balance, and USDT payouts with 100% verified withdrawal proof.'
  );
  const [targetKeyword, setTargetKeyword] = useState('earning apps');
  const [brandSuffix, setBrandSuffix] = useState('AplusHustler');
  const [tone, setTone] = useState<'high_ctr' | 'educational' | 'urgent' | 'seo_dense'>('high_ctr');

  // Preview & Active Selection
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);
  const [activeDescIndex, setActiveDescIndex] = useState(0);
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Active editable values for real-time fine-tuning
  const [customizedTitle, setCustomizedTitle] = useState('');
  const [customizedDesc, setCustomizedDesc] = useState('');
  const [customizedSlug, setCustomizedSlug] = useState('');

  // Handle source preset change
  const handleSourceChange = (type: 'custom' | 'blog' | 'app' | 'airdrop', id?: string) => {
    setSourceType(type);
    if (type === 'custom') {
      setSelectedItemId('');
      return;
    }

    if (type === 'blog' && blogs.length > 0) {
      const targetId = id || selectedItemId || blogs[0].id;
      setSelectedItemId(targetId);
      const blog = blogs.find((b) => b.id === targetId) || blogs[0];
      if (blog) {
        setContentTitle(blog.title || '');
        // Strip HTML if necessary
        const stripped = (blog.content || blog.excerpt || '').replace(/<[^>]*>?/gm, ' ');
        setContentBody(stripped.slice(0, 1200));
        setTargetKeyword(blog.title.split(' ').slice(0, 3).join(' '));
      }
    } else if (type === 'app' && earningApps.length > 0) {
      const targetId = id || selectedItemId || earningApps[0].id;
      setSelectedItemId(targetId);
      const app = earningApps.find((a) => a.id === targetId) || earningApps[0];
      if (app) {
        setContentTitle(`${app.name} Review & Earning Guide`);
        setContentBody(
          `${app.name} is a verified ${app.category} app. ${app.longDescription || app.description}. Welcome bonus: ${app.welcomeBonus || 'Instant rewards'}. Referral Code: ${app.referralCode || 'None'}. Earning potential: ${app.earningPotential || 'Daily cash'}. Highlights: ${app.highlights?.join(', ') || ''}`
        );
        setTargetKeyword(`${app.name} earning app`);
      }
    } else if (type === 'airdrop' && airdrops.length > 0) {
      const targetId = id || selectedItemId || airdrops[0].id;
      setSelectedItemId(targetId);
      const drop = airdrops.find((d) => d.id === targetId) || airdrops[0];
      if (drop) {
        setContentTitle(`${drop.name} ($${drop.ticker}) Airdrop & Testnet Guide`);
        setContentBody(
          `Comprehensive step-by-step farming guide for ${drop.name} on ${drop.blockchain}. Estimated reward: ${drop.estimatedReward}. Status: ${drop.status}. Difficulty: ${drop.difficulty}. Funding: ${drop.funding || '$5M+'}. Tasks: ${drop.steps?.map(s => s.title).join('. ') || drop.shortDescription || ''}`
        );
        setTargetKeyword(`${drop.name} airdrop guide`);
      }
    }
  };

  // Automated Algorithmic SEO Metadata Generation Engine
  const generatedSeo: GeneratedSeoResult = useMemo(() => {
    const rawTitle = contentTitle.trim() || 'Online Earning Guide';
    const rawBody = contentBody.trim() || 'Learn how to make money online with verified apps and airdrops.';
    const cleanKw = targetKeyword.trim() || rawTitle.split(' ').slice(0, 2).join(' ');
    const brand = brandSuffix.trim() ? ` | ${brandSuffix.trim()}` : '';
    const currentYear = 2026;

    // 1. Extract high value words
    const words = (rawTitle + ' ' + rawBody).toLowerCase().match(/\b[a-z0-9]{3,15}\b/g) || [];
    const stopWords = new Set(['the', 'and', 'with', 'for', 'this', 'that', 'from', 'your', 'have', 'what', 'when', 'where', 'which', 'also', 'will', 'with']);
    const frequency: Record<string, number> = {};
    words.forEach((w) => {
      if (!stopWords.has(w)) {
        frequency[w] = (frequency[w] || 0) + 1;
      }
    });

    const topWords = Object.keys(frequency)
      .sort((a, b) => frequency[b] - frequency[a])
      .slice(0, 8);

    // 2. Generate 5 distinct high-converting SEO Titles
    const titleCandidates = [
      {
        type: 'High CTR' as const,
        title: `${rawTitle.replace(/\s*\|.*$/, '')} (${currentYear} Guide)${brand}`,
      },
      {
        type: 'How-To / Guide' as const,
        title: `How to Earn with ${cleanKw.toUpperCase()}: Step-by-Step Proof (${currentYear})${brand}`,
      },
      {
        type: 'Listicle / Yield' as const,
        title: `Best ${cleanKw} Strategy & Payout Proof: 100% Tested${brand}`,
      },
      {
        type: 'Keyword Focused' as const,
        title: `${cleanKw} - Verified Withdrawal, Bonus Code & Full Review${brand}`,
      },
      {
        type: 'Short & Punchy' as const,
        title: `${rawTitle.slice(0, 42)}${brand}`,
      },
    ];

    const titleOptions = titleCandidates.map((t) => {
      const length = t.title.length;
      let score = 90;
      if (length >= 50 && length <= 60) score = 100;
      else if (length < 40) score = 75;
      else if (length > 65) score = 80;
      return {
        ...t,
        charCount: length,
        score,
      };
    });

    // 3. Generate 4 distinct High-Intent Meta Descriptions (Target: 145-158 characters)
    // Extract first two sentences or core summary
    const cleanSnippet = rawBody.replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim();
    const shortBody = cleanSnippet.slice(0, 115);

    const descCandidates = [
      {
        type: 'Action-Oriented' as const,
        description: `Looking to maximize ${cleanKw}? Discover verified payment proofs, fast withdrawal methods, and instant welcome bonuses. Start earning today with our guide!`,
      },
      {
        type: 'Benefit-Driven' as const,
        description: `Complete ${currentYear} breakdown for ${cleanKw}. Learn how to claim bonus codes, earn daily passive income, and withdraw directly to crypto or airtime safely.`,
      },
      {
        type: 'Comprehensive Summary' as const,
        description: `${shortBody.slice(0, 100)}... Get full walkthroughs, payout proofs, and promo codes on AplusHustler.`,
      },
      {
        type: 'Urgency / Bonus' as const,
        description: `Claim exclusive signup bonuses on ${cleanKw}! Read verified user payout proofs, withdrawal rules, and tips to boost your daily profits in ${currentYear}.`,
      },
    ];

    const descriptionOptions = descCandidates.map((d) => {
      // Normalize to 145-158 length if possible
      let desc = d.description;
      if (desc.length > 160) {
        desc = desc.slice(0, 157) + '...';
      }
      const len = desc.length;
      let score = 90;
      if (len >= 135 && len <= 160) score = 100;
      else if (len < 120) score = 78;
      else if (len > 160) score = 82;
      return {
        ...d,
        description: desc,
        charCount: desc.length,
        score,
      };
    });

    // 4. Generate clean URL slug
    const suggestedSlug = (cleanKw || rawTitle)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 50)
      .replace(/^-+|-+$/g, '');

    // 5. Generate Keywords & Search queries
    const keywords = [
      cleanKw,
      `${cleanKw} review`,
      `${cleanKw} payment proof`,
      `how to make money with ${cleanKw}`,
      `${cleanKw} withdrawal ${currentYear}`,
      ...topWords.slice(0, 4),
    ].filter((v, i, a) => a.indexOf(v) === i);

    const longTailQueries = [
      `is ${cleanKw} legit or scam?`,
      `how to withdraw from ${cleanKw} to ethio telecom or usdt`,
      `best referral code for ${cleanKw}`,
      `step by step earning guide for ${cleanKw}`,
    ];

    // 6. Schema.org JSON-LD structured data
    const schemaMarkup = JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: titleOptions[0]?.title || rawTitle,
        description: descriptionOptions[0]?.description || rawBody.slice(0, 150),
        author: {
          '@type': 'Organization',
          name: 'AplusHustler',
          url: 'https://aplushustler.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AplusHustler',
          logo: {
            '@type': 'ImageObject',
            url: 'https://aplushustler.com/logo.png',
          },
        },
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://aplushustler.com/blog/${suggestedSlug}`,
        },
      },
      null,
      2
    );

    return {
      titleOptions,
      descriptionOptions,
      suggestedSlug,
      keywords,
      longTailQueries,
      schemaMarkup,
      openGraph: {
        title: titleOptions[0]?.title || rawTitle,
        description: descriptionOptions[0]?.description || rawBody.slice(0, 150),
        type: 'article',
      },
    };
  }, [contentTitle, contentBody, targetKeyword, brandSuffix, tone]);

  // Synchronize active selections to customized states
  useEffect(() => {
    if (generatedSeo.titleOptions[activeTitleIndex]) {
      setCustomizedTitle(generatedSeo.titleOptions[activeTitleIndex].title);
    }
  }, [generatedSeo, activeTitleIndex]);

  useEffect(() => {
    if (generatedSeo.descriptionOptions[activeDescIndex]) {
      setCustomizedDesc(generatedSeo.descriptionOptions[activeDescIndex].description);
    }
  }, [generatedSeo, activeDescIndex]);

  useEffect(() => {
    setCustomizedSlug(generatedSeo.suggestedSlug);
  }, [generatedSeo.suggestedSlug]);

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    toast.success(`Copied ${fieldId} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyAllMetaTags = () => {
    const tags = `<!-- Primary Meta Tags -->
<title>${customizedTitle}</title>
<meta name="title" content="${customizedTitle}">
<meta name="description" content="${customizedDesc}">
<meta name="keywords" content="${generatedSeo.keywords.join(', ')}">
<link rel="canonical" href="https://aplushustler.com/blog/${customizedSlug}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="article">
<meta property="og:url" content="https://aplushustler.com/blog/${customizedSlug}">
<meta property="og:title" content="${customizedTitle}">
<meta property="og:description" content="${customizedDesc}">
<meta property="og:site_name" content="AplusHustler">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${customizedTitle}">
<meta property="twitter:description" content="${customizedDesc}">

<!-- JSON-LD Schema -->
<script type="application/ld+json">
${generatedSeo.schemaMarkup}
</script>`;

    navigator.clipboard.writeText(tags);
    setCopiedField('all_meta_tags');
    toast.success('Complete HTML & Social Meta Tags block copied!');
    setTimeout(() => setCopiedField(null), 2000);
  };

  // SEO Score calculation for custom edited metadata
  const seoHealthScore = useMemo(() => {
    let score = 0;
    const tLen = customizedTitle.length;
    const dLen = customizedDesc.length;

    // Title score (max 30)
    if (tLen >= 50 && tLen <= 60) score += 30;
    else if (tLen >= 40 && tLen <= 68) score += 20;
    else if (tLen > 0) score += 10;

    // Description score (max 30)
    if (dLen >= 140 && dLen <= 160) score += 30;
    else if (dLen >= 120 && dLen <= 170) score += 20;
    else if (dLen > 0) score += 10;

    // Keyword in title (max 15)
    if (targetKeyword && customizedTitle.toLowerCase().includes(targetKeyword.toLowerCase())) {
      score += 15;
    }

    // Keyword in description (max 15)
    if (targetKeyword && customizedDesc.toLowerCase().includes(targetKeyword.toLowerCase())) {
      score += 15;
    }

    // Slug optimization (max 10)
    if (customizedSlug && /^[a-z0-9-]+$/.test(customizedSlug)) {
      score += 10;
    }

    return score;
  }, [customizedTitle, customizedDesc, customizedSlug, targetKeyword]);

  const handleApplyMetadata = () => {
    if (sourceType === 'blog' && selectedItemId && onApplyToBlog) {
      onApplyToBlog(selectedItemId, {
        title: customizedTitle,
        excerpt: customizedDesc,
        slug: customizedSlug,
      });
      toast.success('SEO Metadata applied to blog post!');
    } else if (sourceType === 'app' && selectedItemId && onApplyToApp) {
      onApplyToApp(selectedItemId, {
        name: customizedTitle.split('|')[0].trim(),
        description: customizedDesc,
      });
      toast.success('SEO Metadata applied to earning app!');
    } else {
      handleCopyAllMetaTags();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-card via-card to-primary/5 border border-border shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold font-display text-foreground">
              Automated SEO Metadata Generator & Search Optimizer
            </h2>
            <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/30">
              AI & Search Engine Ready
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
            Instantly generate high-CTR Google search titles, perfectly-sized meta descriptions (150-160 chars),
            optimized URL slugs, search keywords, and Schema.org JSON-LD tags from any article, earning app, or testnet guide.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">SEO Visibility Score</span>
            <div className="flex items-center gap-1.5 justify-end">
              <span className={`text-xl font-display font-extrabold ${seoHealthScore >= 80 ? 'text-emerald-400' : seoHealthScore >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                {seoHealthScore}/100
              </span>
              <Badge variant="outline" className={`text-[10px] ${seoHealthScore >= 80 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                {seoHealthScore >= 80 ? 'Optimal' : seoHealthScore >= 60 ? 'Good' : 'Needs Work'}
              </Badge>
            </div>
          </div>

          <Button
            onClick={handleCopyAllMetaTags}
            className="bg-primary text-primary-foreground font-semibold text-xs shadow-md gap-2 h-9"
          >
            {copiedField === 'all_meta_tags' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy HTML & OpenGraph Tags
          </Button>
        </div>
      </div>

      {/* Main Grid: Content Source + Controls (Left) & Real-time Live SERP Preview & Suggestions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: SOURCE & INPUTS (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* 1. Source Selector Card */}
          <div className="p-4 rounded-2xl bg-card border border-border space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-primary" /> 1. Select Content Source
              </span>
              <span className="text-[11px] text-primary font-medium">Auto-Extracts Data</span>
            </div>

            {/* Source Tab Buttons */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-secondary/60 border border-border">
              <button
                onClick={() => handleSourceChange('custom')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  sourceType === 'custom'
                    ? 'bg-card text-foreground shadow-sm font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Custom
              </button>
              <button
                onClick={() => handleSourceChange('blog')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  sourceType === 'blog'
                    ? 'bg-card text-foreground shadow-sm font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Articles ({blogs.length})
              </button>
              <button
                onClick={() => handleSourceChange('app')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  sourceType === 'app'
                    ? 'bg-card text-foreground shadow-sm font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Apps ({earningApps.length})
              </button>
              <button
                onClick={() => handleSourceChange('airdrop')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  sourceType === 'airdrop'
                    ? 'bg-card text-foreground shadow-sm font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Airdrops ({airdrops.length})
              </button>
            </div>

            {/* Dropdown if selecting from existing content */}
            {sourceType === 'blog' && (
              <div>
                <label className="text-[11px] text-muted-foreground font-medium mb-1 block">
                  Select Article to Optimize:
                </label>
                <select
                  value={selectedItemId}
                  onChange={(e) => handleSourceChange('blog', e.target.value)}
                  className="w-full text-xs p-2 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {blogs.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title} ({b.status})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {sourceType === 'app' && (
              <div>
                <label className="text-[11px] text-muted-foreground font-medium mb-1 block">
                  Select Earning App to Optimize:
                </label>
                <select
                  value={selectedItemId}
                  onChange={(e) => handleSourceChange('app', e.target.value)}
                  className="w-full text-xs p-2 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {earningApps.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.icon} {a.name} ({a.category})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {sourceType === 'airdrop' && (
              <div>
                <label className="text-[11px] text-muted-foreground font-medium mb-1 block">
                  Select Airdrop to Optimize:
                </label>
                <select
                  value={selectedItemId}
                  onChange={(e) => handleSourceChange('airdrop', e.target.value)}
                  className="w-full text-xs p-2 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {airdrops.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.icon} {d.name} (${d.ticker}) - {d.blockchain}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* 2. Content & Keyword Fields */}
          <div className="p-4 rounded-2xl bg-card border border-border space-y-3.5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-primary" /> 2. Content Input & Parameters
            </span>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-foreground">Content Heading / Topic</label>
                <span className="text-[10px] text-muted-foreground">{contentTitle.length} chars</span>
              </div>
              <Input
                value={contentTitle}
                onChange={(e) => setContentTitle(e.target.value)}
                placeholder="e.g. ME PASS Wallet P2P Cashout Guide"
                className="text-xs bg-secondary/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Primary Keyword</label>
                <Input
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  placeholder="e.g. ME PASS app"
                  className="text-xs bg-secondary/50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Brand Suffix</label>
                <Input
                  value={brandSuffix}
                  onChange={(e) => setBrandSuffix(e.target.value)}
                  placeholder="e.g. AplusHustler"
                  className="text-xs bg-secondary/50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-foreground">Content Body / Summary</label>
                <span className="text-[10px] text-muted-foreground">{contentBody.length} chars</span>
              </div>
              <Textarea
                value={contentBody}
                onChange={(e) => setContentBody(e.target.value)}
                placeholder="Paste the article text, app description, or key features here..."
                rows={4}
                className="text-xs bg-secondary/50 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-border/50">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span>Real-time suggestions active</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast.success('Regenerated SEO options!');
                }}
                className="text-xs gap-1.5 h-7 border-border hover:border-primary/40"
              >
                <RefreshCw className="w-3 h-3 text-primary" /> Refresh AI Suggestions
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: GENERATED SUGGESTIONS & GOOGLE SERP SIMULATOR (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Google Search Live Result Simulator */}
          <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Google Search Live SERP Preview
                </span>
              </div>

              {/* Desktop / Mobile toggle */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary border border-border">
                <button
                  onClick={() => setDevicePreview('desktop')}
                  className={`p-1 rounded text-xs flex items-center gap-1 transition-all ${
                    devicePreview === 'desktop' ? 'bg-card text-foreground font-semibold shadow-sm' : 'text-muted-foreground'
                  }`}
                  title="Desktop Search Preview"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setDevicePreview('mobile')}
                  className={`p-1 rounded text-xs flex items-center gap-1 transition-all ${
                    devicePreview === 'mobile' ? 'bg-card text-foreground font-semibold shadow-sm' : 'text-muted-foreground'
                  }`}
                  title="Mobile Search Preview"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">Mobile</span>
                </button>
              </div>
            </div>

            {/* Google Search Result Box */}
            <div className={`p-4 rounded-xl border border-border/80 bg-background/90 shadow-inner ${devicePreview === 'mobile' ? 'max-w-md mx-auto' : 'w-full'}`}>
              {/* SERP URL / Breadcrumb */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-gradient-gold text-slate-950 flex items-center justify-center font-bold text-[10px] shadow-sm">
                  A+
                </div>
                <div className="text-[11px] leading-tight text-muted-foreground truncate">
                  <span className="font-semibold text-foreground">AplusHustler</span>
                  <span className="mx-1">›</span>
                  <span>blog</span>
                  <span className="mx-1">›</span>
                  <span className="text-primary font-mono">{customizedSlug || 'guide-preview'}</span>
                </div>
              </div>

              {/* SERP Title (Google Blue #1a0dab or Primary Golden Accent) */}
              <h3 className="text-base sm:text-lg font-medium text-sky-400 hover:underline cursor-pointer leading-snug mb-1">
                {customizedTitle || 'Enter Title...'}
              </h3>

              {/* SERP Snippet / Description */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-foreground/70 font-mono text-[10px] mr-1.5">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} —
                </span>
                {customizedDesc || 'Enter description to see preview snippet...'}
              </p>

              {/* SERP Rich Sitelinks / Badges preview */}
              <div className="mt-2.5 pt-2 border-t border-border/40 flex flex-wrap items-center gap-2 text-[10px]">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 py-0">
                  ✓ Verified Payout
                </Badge>
                <Badge variant="outline" className="bg-secondary text-muted-foreground border-border py-0">
                  ⭐ 4.9 Rating
                </Badge>
                <span className="text-muted-foreground font-mono">Mobile-Friendly</span>
              </div>
            </div>

            {/* Character Length Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Title Bar */}
              <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/60">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-medium text-foreground">Title Length</span>
                  <span className={`font-mono font-bold ${customizedTitle.length >= 50 && customizedTitle.length <= 60 ? 'text-emerald-400' : customizedTitle.length > 60 ? 'text-amber-400' : 'text-muted-foreground'}`}>
                    {customizedTitle.length} / 60 chars
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      customizedTitle.length >= 50 && customizedTitle.length <= 60
                        ? 'bg-emerald-400'
                        : customizedTitle.length > 60
                        ? 'bg-amber-400'
                        : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min(100, (customizedTitle.length / 60) * 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {customizedTitle.length > 60 ? '⚠️ May be truncated on mobile Google search' : '✓ Ideal for maximum visibility'}
                </p>
              </div>

              {/* Description Bar */}
              <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/60">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-medium text-foreground">Meta Snippet Length</span>
                  <span className={`font-mono font-bold ${customizedDesc.length >= 140 && customizedDesc.length <= 160 ? 'text-emerald-400' : customizedDesc.length > 160 ? 'text-amber-400' : 'text-muted-foreground'}`}>
                    {customizedDesc.length} / 160 chars
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      customizedDesc.length >= 140 && customizedDesc.length <= 160
                        ? 'bg-emerald-400'
                        : customizedDesc.length > 160
                        ? 'bg-amber-400'
                        : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min(100, (customizedDesc.length / 160) * 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {customizedDesc.length > 160 ? '⚠️ Exceeds 160 char limit' : '✓ Perfect snippet length'}
                </p>
              </div>
            </div>
          </div>

          {/* AI Generated Titles Selector */}
          <div className="p-4 rounded-2xl bg-card border border-border shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Suggested High-CTR Page Titles
              </span>
              <span className="text-[11px] text-muted-foreground">Click to select & apply</span>
            </div>

            <div className="space-y-1.5">
              {generatedSeo.titleOptions.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveTitleIndex(idx);
                    setCustomizedTitle(opt.title);
                  }}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                    activeTitleIndex === idx
                      ? 'bg-primary/10 border-primary text-foreground shadow-sm'
                      : 'bg-secondary/30 border-border/60 hover:bg-secondary/70 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Badge variant="outline" className="text-[9px] py-0 bg-secondary border-border font-medium">
                        {opt.type}
                      </Badge>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {opt.charCount} chars • Score: {opt.score}%
                      </span>
                    </div>
                    <p className={`text-xs font-medium truncate ${activeTitleIndex === idx ? 'text-primary font-semibold' : ''}`}>
                      {opt.title}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(opt.title, `title-${idx}`);
                      }}
                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    >
                      {copiedField === `title-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Generated Meta Descriptions Selector */}
          <div className="p-4 rounded-2xl bg-card border border-border shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Sparkle className="w-3.5 h-3.5 text-emerald-400" /> Suggested Meta Descriptions (150-160 chars)
              </span>
              <span className="text-[11px] text-muted-foreground">Click to select</span>
            </div>

            <div className="space-y-1.5">
              {generatedSeo.descriptionOptions.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveDescIndex(idx);
                    setCustomizedDesc(opt.description);
                  }}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 group ${
                    activeDescIndex === idx
                      ? 'bg-emerald-500/10 border-emerald-500/60 text-foreground shadow-sm'
                      : 'bg-secondary/30 border-border/60 hover:bg-secondary/70 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-[9px] py-0 bg-secondary border-border font-medium">
                        {opt.type}
                      </Badge>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {opt.charCount} chars • {opt.score}% Quality
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${activeDescIndex === idx ? 'text-foreground font-medium' : ''}`}>
                      {opt.description}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(opt.description, `desc-${idx}`);
                    }}
                    className="h-7 w-7 text-muted-foreground hover:text-foreground shrink-0 mt-1"
                  >
                    {copiedField === `desc-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords & Long Tail Search Terms */}
          <div className="p-4 rounded-2xl bg-card border border-border shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-primary" /> Target Keywords & Long-Tail Search Queries
            </span>

            <div>
              <label className="text-[11px] text-muted-foreground font-medium mb-1.5 block">Recommended Meta Keywords:</label>
              <div className="flex flex-wrap gap-1.5">
                {generatedSeo.keywords.map((kw, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    onClick={() => handleCopy(kw, `kw-${i}`)}
                    className="text-xs bg-secondary/80 hover:bg-primary/20 hover:text-primary cursor-pointer border border-border transition-colors gap-1"
                  >
                    #{kw}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-border/50">
              <label className="text-[11px] text-muted-foreground font-medium mb-1.5 block">
                Target Long-Tail Questions (People Also Ask):
              </label>
              <div className="space-y-1">
                {generatedSeo.longTailQueries.map((q, i) => (
                  <div
                    key={i}
                    onClick={() => handleCopy(q, `query-${i}`)}
                    className="text-xs p-2 rounded-lg bg-secondary/30 hover:bg-secondary/70 border border-border/50 flex items-center justify-between text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    <span>🔍 {q}</span>
                    <span className="text-[10px] text-primary font-mono">Copy query</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-4 rounded-2xl bg-card border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-foreground block">Ready to Apply?</span>
              <span className="text-[11px] text-muted-foreground">
                Apply selected metadata directly or copy structured schema markup.
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(generatedSeo.schemaMarkup, 'schema_json')}
                className="text-xs gap-1.5 h-9 border-border"
              >
                <Code className="w-3.5 h-3.5 text-primary" /> Copy JSON-LD Schema
              </Button>

              <Button
                onClick={handleApplyMetadata}
                className="bg-primary text-primary-foreground font-semibold text-xs shadow-md gap-1.5 h-9 flex-1 sm:flex-initial"
              >
                <Zap className="w-3.5 h-3.5" />
                {sourceType === 'blog'
                  ? 'Apply to Post'
                  : sourceType === 'app'
                  ? 'Apply to App'
                  : 'Apply / Copy All'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
