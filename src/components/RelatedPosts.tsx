import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  thumbnail: string | null;
  excerpt: string | null;
}

interface RelatedPostsProps {
  currentPostId: string;
  categoryId: string | null;
}

const RelatedPosts = ({ currentPostId, categoryId }: RelatedPostsProps) => {
  const [posts, setPosts] = useState<RelatedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      let query = supabase
        .from('blogs')
        .select('id, title, slug, thumbnail, excerpt')
        .eq('status', 'published')
        .neq('id', currentPostId)
        .limit(3);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data } = await query.order('created_at', { ascending: false });
      setPosts(data || []);
      setIsLoading(false);
    };

    fetchRelated();
  }, [currentPostId, categoryId]);

  if (isLoading || posts.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-border">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        Related <span className="text-gradient-gold">Articles</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={post.thumbnail || '/placeholder.svg'}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
