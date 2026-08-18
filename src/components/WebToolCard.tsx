import { useState } from 'react';
import { ExternalLink, Star, Copy, Check, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WebToolItem } from '@/data/blogData';
import { toast } from 'sonner';

interface WebToolCardProps {
  tool: WebToolItem;
}

const getCategoryColor = (category: WebToolItem['category']) => {
  switch (category) {
    case 'Charts':
    case 'Trading':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'DeFi':
    case 'Portfolio':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'Research':
    case 'Analytics':
      return 'bg-primary/10 text-primary border-primary/30';
    case 'Explorer':
      return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
    case 'Sentiment':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    default:
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
  }
};

export const WebToolCard = ({ tool }: WebToolCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(tool.url);
    setCopied(true);
    toast.success(`Copied official link for ${tool.name}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={`web-tool-${tool.id}`}
      className={`group relative rounded-2xl bg-card border transition-all duration-300 flex flex-col justify-between p-5 hover:-translate-y-1 hover:shadow-xl ${
        tool.featured
          ? 'border-primary/40 shadow-md shadow-primary/5 ring-1 ring-primary/20'
          : 'border-border/80 hover:border-primary/30'
      }`}
    >
      <div>
        {/* Header with Icon, Name & Category */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-background border border-border/80 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform">
              {tool.icon}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                {tool.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-primary/15 text-primary border border-primary/20 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    {tool.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="outline" className={`text-[10px] font-semibold px-2 py-0.2 border ${getCategoryColor(tool.category)}`}>
                  {tool.category}
                </Badge>
                {tool.rating && (
                  <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {tool.rating}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Copy website URL"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-md bg-secondary/80 text-muted-foreground border border-border/50 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-3 border-t border-border/60">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button
            size="sm"
            className="w-full h-9 text-xs font-semibold gap-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/25 hover:border-primary transition-all group/btn shadow-xs"
          >
            Launch {tool.name}
            <ExternalLink className="w-3.5 h-3.5 ml-auto group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default WebToolCard;
