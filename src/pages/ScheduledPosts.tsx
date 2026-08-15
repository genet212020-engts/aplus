import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, ArrowLeft, Edit, Eye, Calendar, AlertCircle, CheckCircle2, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatDistanceToNow, format, isPast, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';

interface ScheduledPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  publish_at: string;
  created_at: string;
  thumbnail: string | null;
  categories: { name: string } | null;
}

const ScheduledPosts = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchScheduledPosts();
      // Refresh every minute to update countdowns
      const interval = setInterval(fetchScheduledPosts, 60000);
      return () => clearInterval(interval);
    }
  }, [user, isAdmin]);

  const fetchScheduledPosts = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, slug, status, publish_at, created_at, thumbnail, categories(name)')
      .eq('status', 'scheduled')
      .not('publish_at', 'is', null)
      .order('publish_at', { ascending: true });

    if (error) {
      toast.error('Failed to fetch scheduled posts');
    } else {
      setPosts(data || []);
    }
    setIsFetching(false);
  };

  const getTimeRemaining = (publishAt: string) => {
    const publishDate = new Date(publishAt);
    const now = new Date();
    
    if (isPast(publishDate)) {
      return { text: 'Publishing soon...', urgent: true, overdue: true };
    }
    
    const minutes = differenceInMinutes(publishDate, now);
    const hours = differenceInHours(publishDate, now);
    const days = differenceInDays(publishDate, now);
    
    if (minutes < 60) {
      return { text: `${minutes} min`, urgent: true, overdue: false };
    } else if (hours < 24) {
      return { text: `${hours}h ${minutes % 60}m`, urgent: hours < 2, overdue: false };
    } else {
      return { text: `${days}d ${hours % 24}h`, urgent: false, overdue: false };
    }
  };

  const getStatusIcon = (publishAt: string) => {
    const publishDate = new Date(publishAt);
    if (isPast(publishDate)) {
      return <AlertCircle className="w-5 h-5 text-yellow-500 animate-pulse" />;
    }
    const hours = differenceInHours(publishDate, new Date());
    if (hours < 2) {
      return <Timer className="w-5 h-5 text-primary" />;
    }
    return <Clock className="w-5 h-5 text-purple-500" />;
  };

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20"></div>
          <div className="text-muted-foreground">Loading scheduled posts...</div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You don't have admin privileges.</p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Scheduled Posts - AplusHustler Admin</title>
        <meta name="description" content="View and manage scheduled blog posts" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                <span className="text-lg font-semibold text-foreground">Scheduled Posts</span>
              </div>
            </div>
            <Link to="/admin">
              <Button variant="outline" size="sm">Back to Dashboard</Button>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-foreground">{posts.length}</p>
                  <p className="text-sm text-muted-foreground">Total Scheduled</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {posts.filter(p => differenceInHours(new Date(p.publish_at), new Date()) < 24 && !isPast(new Date(p.publish_at))).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Next 24 Hours</p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Timer className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/20 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {posts.filter(p => isPast(new Date(p.publish_at))).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending Publish</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Scheduled Queue</h2>
              <p className="text-sm text-muted-foreground">Posts will be auto-published when their scheduled time arrives</p>
            </div>

            {posts.length === 0 ? (
              <div className="p-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">No scheduled posts</p>
                <p className="text-sm text-muted-foreground/70 mb-4">Schedule posts from the editor to see them here</p>
                <Link to="/admin/editor">
                  <Button variant="gold">Create New Post</Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {posts.map((post) => {
                  const timeInfo = getTimeRemaining(post.publish_at);
                  return (
                    <div 
                      key={post.id} 
                      className={`p-4 flex items-center gap-4 hover:bg-secondary/50 transition-colors ${timeInfo.overdue ? 'bg-yellow-500/5' : ''}`}
                    >
                      {/* Status Icon */}
                      <div className="flex-shrink-0">
                        {getStatusIcon(post.publish_at)}
                      </div>

                      {/* Thumbnail */}
                      {post.thumbnail && (
                        <div className="flex-shrink-0 hidden sm:block">
                          <img 
                            src={post.thumbnail} 
                            alt={post.title}
                            className="w-16 h-10 object-cover rounded-md"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{post.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          {post.categories?.name && (
                            <span className="text-xs text-muted-foreground">{post.categories.name}</span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            Created {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>

                      {/* Publish Time */}
                      <div className="flex-shrink-0 text-right hidden md:block">
                        <p className="text-sm text-foreground font-medium">
                          {format(new Date(post.publish_at), 'MMM d, yyyy')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(post.publish_at), 'h:mm a')}
                        </p>
                      </div>

                      {/* Countdown */}
                      <div className="flex-shrink-0">
                        <span 
                          className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5 ${
                            timeInfo.overdue 
                              ? 'bg-yellow-500/20 text-yellow-400' 
                              : timeInfo.urgent 
                                ? 'bg-primary/20 text-primary' 
                                : 'bg-purple-500/20 text-purple-400'
                          }`}
                        >
                          {timeInfo.overdue ? (
                            <AlertCircle className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {timeInfo.text}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex-shrink-0 flex items-center gap-1">
                        <Link to={`/blog/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" title="Preview">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link to={`/admin/editor/${post.id}`}>
                          <Button variant="ghost" size="icon" title="Edit">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="mt-6 p-4 bg-secondary/30 border border-border rounded-xl">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground">Auto-Publishing Active</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The system checks for scheduled posts every 5 minutes. When a post's scheduled time arrives, 
                  it will be automatically published and you'll receive an email notification.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ScheduledPosts;
