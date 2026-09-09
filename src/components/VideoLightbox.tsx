import { useState } from 'react';
import { Play, X, ExternalLink, Youtube } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '@/lib/utils';

interface VideoLightboxProps {
  videoId: string;
  thumbnailUrl: string;
  channelUrl: string;
  className?: string;
}

export function VideoLightbox({ videoId, thumbnailUrl, channelUrl, className }: VideoLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Play Button Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "group relative flex flex-col items-center justify-center gap-4 cursor-pointer focus:outline-none",
          className
        )}
        aria-label="Play featured video"
      >
        {/* Play Button */}
        <div className="relative">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-youtube/90 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-youtube transition-all duration-300 ring-4 ring-white/20">
            <Play className="w-8 h-8 lg:w-10 lg:h-10 text-youtube-foreground fill-current ml-1" />
          </div>
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-youtube/50 animate-ping" style={{ animationDuration: '2s' }} />
        </div>
        
        {/* Label */}
        <span className="text-foreground font-semibold text-sm lg:text-base tracking-wide uppercase drop-shadow-lg">
          Watch This First
        </span>
      </button>

      {/* Video Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-background border-none overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>Featured Video</DialogTitle>
          </VisuallyHidden>
          
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close video"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>

          {/* Video */}
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="Featured Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Footer Links */}
          <div className="flex items-center justify-center gap-6 py-4 bg-background/90">
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Watch on YouTube
            </a>
            <span className="text-muted-foreground/50">•</span>
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Youtube className="w-4 h-4" />
              Subscribe
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
