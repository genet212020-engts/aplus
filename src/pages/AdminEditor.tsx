import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Save, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const handleStatusChange = (newStatus: 'draft' | 'published' | 'scheduled') => {
    setStatus(newStatus);
    if (newStatus !== 'scheduled') {
      setPublishAt('');
    }
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
                <Label htmlFor="title">Title *</Label>
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
                  className="mt-1"
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

            <div>
              <Label>Thumbnail</Label>
              <div className="mt-1">
                <ImageUpload value={thumbnail} onChange={setThumbnail} />
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of the blog post"
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
