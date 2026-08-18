import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Save, Eye, Clock, Sparkles, Search, Check, Copy, RefreshCw, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ImageUpload from '@/components/ImageUpload';
import RichTextEditor from '@/components/RichTextEditor';

interface Category {
  id: string;
  name: string;
  slug: string;
}

const AdminEditor = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const [publishAt, setPublishAt] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSeoPanelOpen, setIsSeoPanelOpen] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    fetchCategories();
    if (isEditing && id) {
      fetchBlog(id);
    }
  }, [id, isEditing]);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('name');
    setCategories(data || []);
  };

  const fetchBlog = async (blogId: string) => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', blogId)
      .single();

    if (error || !data) {
      toast.error('Blog not found');
      navigate('/admin');
      return;
    }

    setTitle(data.title);
    setSlug(data.slug);
    setExcerpt(data.excerpt || '');
    setContent(data.content);
    setCategoryId(data.category_id || '');
    setThumbnail(data.thumbnail || '');
    setStatus(data.status as 'draft' | 'published' | 'scheduled');
    if (data.publish_at) {
      // Format for datetime-local input
      const date = new Date(data.publish_at);
      setPublishAt(date.toISOString().slice(0, 16));
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing && !slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleStatusChange = (newStatus: 'draft' | 'published' | 'scheduled') => {
    setStatus(newStatus);
    if (newStatus !== 'scheduled') {
      setPublishAt('');
    }
  };

  // Algorithmic SEO Suggestions based on Title & Content
  const seoSuggestions = useMemo(() => {
    const rawTitle = title.trim() || 'New Earning Guide';
    const cleanText = content.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
    const cleanKw = rawTitle.split(' ').slice(0, 3).join(' ');
    const brand = ' | AplusHustler';
    const year = 2026;

    const titles = [
      {
        label: 'High CTR / Guide',
        value: `${rawTitle.replace(/\s*\|.*$/, '')} (${year} Complete Guide)${brand}`,
      },
      {
        label: 'How-To Action',
        value: `How to Earn with ${cleanKw}: Step-by-Step Proof (${year})${brand}`,
      },
      {
        label: 'Review & Proof',
        value: `${cleanKw} Review: Verified Withdrawal Proof & Bonus Code${brand}`,
      },
    ];

    const shortBody = cleanText.slice(0, 110);
    const descriptions = [
      {
        label: 'Action-Oriented',
        value: `Step-by-step ${year} guide to ${cleanKw}. Learn tested strategies, claim sign-up bonuses, and get 100% verified withdrawal proof on AplusHustler.`,
      },
      {
        label: 'Content Summary',
        value: `${shortBody || 'Discover how to maximize daily earnings with our verified walkthrough'}. Read our complete payout breakdown and tips now!`,
      },
      {
        label: 'Urgency / Bonus',
        value: `Looking to make money with ${cleanKw}? Check out live payment proofs, withdrawal steps, and exclusive bonus promo codes here!`,
      },
    ];

    return {
      titles,
      descriptions,
      suggestedSlug: generateSlug(cleanKw || rawTitle),
    };
  }, [title, content]);

  const handleApplySeoTitle = (newTitle: string) => {
    setTitle(newTitle);
    toast.success('Applied SEO Title!');
  };

  const handleApplySeoExcerpt = (newExcerpt: string) => {
    setExcerpt(newExcerpt);
    toast.success('Applied SEO Meta Description!');
  };

  const handleApplyAllSeo = () => {
    if (seoSuggestions.titles[0]) setTitle(seoSuggestions.titles[0].value);
    if (seoSuggestions.descriptions[0]) setExcerpt(seoSuggestions.descriptions[0].value);
    if (!slug) setSlug(seoSuggestions.suggestedSlug);
    toast.success('Auto-applied recommended SEO Title & Description!');
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    if (status === 'scheduled' && !publishAt) {
      toast.error('Please set a publish date for scheduled posts');
      return;
    }

    setIsSaving(true);

    const blogData = {
      title: title.trim(),
      slug: slug.trim() || generateSlug(title),
      excerpt: excerpt.trim() || null,
      content: content.trim(),
      category_id: categoryId || null,
      thumbnail: thumbnail.trim() || null,
      status,
      author_id: user?.id,
      publish_at: status === 'scheduled' && publishAt ? new Date(publishAt).toISOString() : null,
    };

    try {
      if (isEditing && id) {
        const { error } = await supabase
          .from('blogs')
          .update({
            title: blogData.title,
            slug: blogData.slug,
            excerpt: blogData.excerpt,
            content: blogData.content,
            category_id: blogData.category_id,
            thumbnail: blogData.thumbnail,
            status: blogData.status,
            author_id: blogData.author_id,
            publish_at: blogData.publish_at,
          })
          .eq('id', id);

        if (error) throw error;
        toast.success('Blog updated!');
      } else {
        const { error } = await supabase.from('blogs').insert({
          title: blogData.title,
          slug: blogData.slug,
          excerpt: blogData.excerpt,
          content: blogData.content,
          category_id: blogData.category_id,
          thumbnail: blogData.thumbnail,
          status: blogData.status,
          author_id: blogData.author_id,
          publish_at: blogData.publish_at,
        });
        if (error) throw error;
        toast.success('Blog created!');
        navigate('/admin');
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      if (err.message?.includes('duplicate')) {
        toast.error('A blog with this slug already exists');
      } else {
        toast.error('Failed to save blog');
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isEditing ? 'Edit Post' : 'New Post'} - AplusHustler Admin</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <span className="font-medium text-foreground">
                {isEditing ? 'Edit Post' : 'New Post'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {isEditing && slug && (
                <Link to={`/blog/${slug}`} target="_blank">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" /> Preview
                  </Button>
                </Link>
              )}
              <Button variant="gold" size="sm" onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="title">Title *</Label>
                  <span className={`text-[11px] font-mono ${title.length >= 50 && title.length <= 60 ? 'text-emerald-400 font-bold' : title.length > 60 ? 'text-amber-400' : 'text-muted-foreground'}`}>
                    {title.length}/60 chars
                  </span>
                </div>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter blog title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="auto-generated-slug"
                  className="mt-1 font-mono text-xs"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label>Category</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={status} onValueChange={(v) => handleStatusChange(v as 'draft' | 'published' | 'scheduled')}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Scheduled
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {status === 'scheduled' && (
                <div>
                  <Label htmlFor="publishAt">Publish At</Label>
                  <Input
                    id="publishAt"
                    type="datetime-local"
                    value={publishAt}
                    onChange={(e) => setPublishAt(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="mt-1"
                  />
                </div>
              )}
            </div>

            {/* AUTOMATED SEO METADATA & SERP PREVIEW BOX */}
            <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                      Automated SEO Metadata & SERP Generator
                    </h3>
                    <p className="text-[11px] text-muted-foreground">
                      Smart titles, meta descriptions, and Google Search preview
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleApplyAllSeo}
                    className="text-xs h-8 gap-1.5 border-primary/30 text-primary hover:bg-primary/10"
                  >
                    <Zap className="w-3.5 h-3.5" /> Auto-Apply Recommendations
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSeoPanelOpen(!isSeoPanelOpen)}
                    className="h-8 w-8 text-muted-foreground"
                  >
                    {isSeoPanelOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {isSeoPanelOpen && (
                <div className="space-y-4 pt-2 border-t border-border/60">
                  {/* Google Live Search Result Card */}
                  <div className="p-3.5 rounded-xl bg-background border border-border/80 shadow-inner">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-1">
                      <span className="font-semibold text-foreground">AplusHustler</span>
                      <span>›</span>
                      <span>blog</span>
                      <span>›</span>
                      <span className="text-primary font-mono">{slug || 'post-slug'}</span>
                    </div>
                    <div className="text-base font-medium text-sky-400 leading-snug mb-1 truncate">
                      {title || 'Your Post Title Here'}
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      <span className="text-foreground/70 font-mono text-[10px] mr-1">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} —
                      </span>
                      {excerpt || 'Add an excerpt below or select a suggested description to improve search click-through rates.'}
                    </div>
                  </div>

                  {/* Suggested Titles */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                      Suggested Page Titles (Click to Apply):
                    </label>
                    <div className="space-y-1.5">
                      {seoSuggestions.titles.map((t, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleApplySeoTitle(t.value)}
                          className="p-2 rounded-xl bg-secondary/40 hover:bg-primary/10 border border-border/60 hover:border-primary/40 cursor-pointer flex items-center justify-between gap-2 transition-all group"
                        >
                          <div className="min-w-0">
                            <Badge variant="outline" className="text-[9px] py-0 mr-2 bg-secondary border-border">
                              {t.label}
                            </Badge>
                            <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                              {t.value}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                            {t.value.length}c
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Excerpts / Descriptions */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                      Suggested Meta Descriptions (Click to Apply):
                    </label>
                    <div className="space-y-1.5">
                      {seoSuggestions.descriptions.map((d, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleApplySeoExcerpt(d.value)}
                          className="p-2 rounded-xl bg-secondary/40 hover:bg-emerald-500/10 border border-border/60 hover:border-emerald-500/40 cursor-pointer flex items-start justify-between gap-2 transition-all group"
                        >
                          <div className="min-w-0">
                            <Badge variant="outline" className="text-[9px] py-0 mr-2 bg-secondary border-border">
                              {d.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                              {d.value}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-muted-foreground shrink-0 mt-0.5">
                            {d.value.length}c
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label>Thumbnail</Label>
              <div className="mt-1">
                <ImageUpload value={thumbnail} onChange={setThumbnail} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="excerpt">Excerpt / Meta Description</Label>
                <span className={`text-[11px] font-mono ${excerpt.length >= 140 && excerpt.length <= 160 ? 'text-emerald-400 font-bold' : excerpt.length > 160 ? 'text-amber-400' : 'text-muted-foreground'}`}>
                  {excerpt.length}/160 chars
                </span>
              </div>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of the blog post for Google and social previews"
                className="mt-1"
                rows={2}
              />
            </div>

            <div>
              <Label>Content *</Label>
              <div className="mt-1">
                <RichTextEditor value={content} onChange={setContent} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminEditor;
