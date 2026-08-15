import { useState } from 'react';
import { Youtube, Plus, Loader2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface YouTubeImporterProps {
  onImportComplete: () => void;
  userId: string;
  categoryId?: string;
}

const YouTubeImporter = ({ onImportComplete, userId, categoryId }: YouTubeImporterProps) => {
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [channelUrl, setChannelUrl] = useState('');
  const [maxVideos, setMaxVideos] = useState([10]);
  const [isImporting, setIsImporting] = useState(false);

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleSingleImport = async () => {
    const videoId = extractVideoId(videoUrl.trim());
    
    if (!videoId) {
      toast.error('Invalid YouTube URL or video ID');
      return;
    }

    setIsImporting(true);

    try {
      const { data: existing } = await supabase
        .from('blogs')
        .select('id')
        .eq('youtube_video_id', videoId)
        .single();

      if (existing) {
        toast.error('This video has already been imported');
        setIsImporting(false);
        return;
      }

      const slug = `youtube-video-${videoId}`;
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

      const blogData = {
        title: `YouTube Video: ${videoId}`,
        slug,
        excerpt: 'Imported from YouTube. Edit this post to add more details.',
        content: `<p>Watch the video below:</p><div class="aspect-video"><iframe src="${embedUrl}" frameborder="0" allowfullscreen class="w-full aspect-video rounded-lg"></iframe></div><p>Add your own content and commentary here...</p>`,
        thumbnail: thumbnailUrl,
        youtube_video_id: videoId,
        status: 'draft',
        author_id: userId,
        category_id: categoryId || null,
      };

      const { error } = await supabase.from('blogs').insert(blogData);

      if (error) {
        if (error.message?.includes('duplicate')) {
          toast.error('A post with this slug already exists');
        } else {
          throw error;
        }
      } else {
        toast.success('YouTube video imported as draft!');
        setVideoUrl('');
        setOpen(false);
        onImportComplete();
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import video');
    } finally {
      setIsImporting(false);
    }
  };

  const handleChannelImport = async () => {
    if (!channelUrl.trim()) {
      toast.error('Please enter a YouTube channel URL');
      return;
    }

    setIsImporting(true);

    try {
      const { data, error } = await supabase.functions.invoke('youtube-channel-import', {
        body: {
          channelUrl: channelUrl.trim(),
          maxResults: maxVideos[0],
          userId,
          categoryId,
        },
      });

      if (error) {
        console.error('Channel import error:', error);
        toast.error('Failed to import channel videos');
        return;
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success(`Imported ${data.imported} videos from ${data.channelTitle}!`, {
        description: data.skipped > 0 ? `${data.skipped} videos were already imported` : undefined,
      });
      
      setChannelUrl('');
      setOpen(false);
      onImportComplete();
    } catch (error) {
      console.error('Channel import error:', error);
      toast.error('Failed to import channel videos');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Youtube className="w-4 h-4" /> Import YouTube
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-500" /> Import YouTube Videos
          </DialogTitle>
          <DialogDescription>
            Import a single video or multiple videos from a YouTube channel.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="single" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single" className="gap-2">
              <Plus className="w-4 h-4" /> Single Video
            </TabsTrigger>
            <TabsTrigger value="channel" className="gap-2">
              <Users className="w-4 h-4" /> Channel Import
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-4 pt-4">
            <div>
              <Label htmlFor="videoUrl">YouTube URL or Video ID</Label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or video ID"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Examples: youtube.com/watch?v=xxx, youtu.be/xxx, or just the video ID
              </p>
            </div>

            <Button
              onClick={handleSingleImport}
              disabled={!videoUrl.trim() || isImporting}
              className="w-full gap-2"
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Importing...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Import as Draft
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="channel" className="space-y-4 pt-4">
            <div>
              <Label htmlFor="channelUrl">YouTube Channel URL</Label>
              <Input
                id="channelUrl"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                placeholder="https://youtube.com/@channel or channel URL"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Supports: @handle, /channel/ID, /c/name, /user/name formats
              </p>
            </div>

            <div>
              <Label>Number of videos to import: {maxVideos[0]}</Label>
              <Slider
                value={maxVideos}
                onValueChange={setMaxVideos}
                min={1}
                max={50}
                step={1}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Import up to {maxVideos[0]} most recent videos from the channel
              </p>
            </div>

            <Button
              onClick={handleChannelImport}
              disabled={!channelUrl.trim() || isImporting}
              className="w-full gap-2"
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Importing Channel...
                </>
              ) : (
                <>
                  <Users className="w-4 h-4" /> Import {maxVideos[0]} Videos
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default YouTubeImporter;
