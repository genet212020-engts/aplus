import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Eye, User, Sparkles } from 'lucide-react';
import { BlogPost, categories } from '@/data/blogData';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  const category = categories.find(c => c.id === post.category);
  const authorName = typeof post.author === 'object' ? post.author.name : post.author || 'A+ Editorial';
  const authorAvatar = typeof post.author === 'object' ? post.author.avatar : undefined;

  return (
    <Link 
      to={`/blog/${post.slug}`}
      className={cn(
        "group block bg-card/80 backdrop-blur-sm border border-border/80 hover:border-primary/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between",
        featured && "md:col-span-2 md:grid md:grid-cols-2"
      )}
    >
      {/* Thumbnail */}
      <div className={cn(
        "relative overflow-hidden bg-secondary/50",
        featured ? "h-64 md:h-full" : "h-52"
      )}>
        <img 
          src={post.thumbnail || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80'} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm flex items-center gap-1",
            post.category === 'crypto' && "bg-crypto/20 text-crypto border-crypto/30",
            post.category === 'finance' && "bg-finance/20 text-finance border-finance/30",
            post.category === 'investment' && "bg-investment/20 text-investment border-investment/30",
            !['crypto', 'finance', 'investment'].includes(post.category) && "bg-primary/20 text-primary border-primary/30"
          )}>
            {category?.icon || '📝'} {category?.name || post.category}
          </span>
          {featured && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Featured
            </span>
          )}
        </div>

        {/* Floating View count */}
        {post.views && post.views > 0 && (
          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-black/60 backdrop-blur-md text-white/90 border border-white/10 flex items-center gap-1">
            <Eye className="w-3 h-3 text-emerald-400" />
            {post.views.toLocaleString()} views
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-3 text-muted-foreground text-xs mb-3 font-medium">
            <span>{new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary" />
              {post.readTime || 5} min read
            </span>
          </div>

          <h3 className={cn(
            "font-display font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors leading-snug line-clamp-2",
            featured ? "text-xl md:text-2xl" : "text-lg"
          )}>
            {post.title}
          </h3>

          <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 leading-relaxed mb-4">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-secondary/80 text-muted-foreground border border-border/50 font-mono">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Author & Read link */}
        <div className="pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {authorAvatar ? (
              <img src={authorAvatar} alt={authorName} className="w-6 h-6 rounded-full object-cover border border-primary/30" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                <User className="w-3 h-3" />
              </div>
            )}
            <span className="text-xs font-semibold text-foreground/80 truncate max-w-[120px]">{authorName}</span>
          </div>

          <div className="flex items-center gap-1 text-primary font-bold text-xs group-hover:gap-2 transition-all">
            Read Article <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

