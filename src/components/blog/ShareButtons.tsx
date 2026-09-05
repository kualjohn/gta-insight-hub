import { useState } from "react";
import { Facebook, Linkedin, Twitter, Mail, Link as LinkIcon, MessageCircle, Instagram, Store, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ShareButtonsProps {
  title: string;
  url: string;
  excerpt?: string;
}

export function ShareButtons({ title, url, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [gmbOpen, setGmbOpen] = useState(false);
  const [igOpen, setIgOpen] = useState(false);
  const [textCopied, setTextCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(excerpt ? `${title}\n\n${excerpt}\n\n${url}` : `${title}\n\n${url}`);

  const gmbText = excerpt ? `${title}\n\n${excerpt}\n\nRead more: ${url}` : `${title}\n\n${url}`;
  const igText = `${title}\n\n${excerpt || ""}\n\nLink in bio 🔗`;

  const openShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard`);
    } catch {
      toast.error("Unable to copy");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Unable to copy link");
    }
  };

  const copyAndConfirm = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setTextCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setTextCopied(false), 2500);
    } catch {
      toast.error("Unable to copy — please select the text and copy manually");
    }
  };

  return (
    <div className="border-y py-6 my-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground mr-2">Share this post:</span>

        <Button variant="outline" size="sm" onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)}>
          <Facebook className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Facebook</span>
        </Button>

        <Button variant="outline" size="sm" onClick={() => openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)}>
          <Linkedin className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">LinkedIn</span>
        </Button>

        <Button variant="outline" size="sm" onClick={() => openShare(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`)}>
          <Twitter className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">X</span>
        </Button>

        <Button variant="outline" size="sm" onClick={() => openShare(`https://wa.me/?text=${encodedText}`)}>
          <MessageCircle className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">WhatsApp</span>
        </Button>

        <Button variant="outline" size="sm" onClick={() => openShare(`mailto:?subject=${encodedTitle}&body=${encodedText}`)}>
          <Mail className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Email</span>
        </Button>

        <Button variant="outline" size="sm" onClick={copyLink}>
          {copied ? <Check className="h-4 w-4 text-accent" /> : <LinkIcon className="h-4 w-4" />}
          <span className="ml-2 hidden sm:inline">{copied ? "Copied" : "Copy link"}</span>
        </Button>

        <div className="w-full sm:w-auto sm:ml-auto flex flex-wrap gap-3">
          <Button variant="default" size="sm" onClick={() => { setTextCopied(false); setGmbOpen(true); }} className="bg-primary">
            <Store className="h-4 w-4" />
            <span className="ml-2">Post to Google Business</span>
          </Button>

          <Button variant="outline" size="sm" onClick={() => { setTextCopied(false); setIgOpen(true); }}>
            <Instagram className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Instagram</span>
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Tip: "Post to Google Business" copies the text to your clipboard and opens your Business Profile — just paste and publish.
      </p>

      {/* Google Business dialog */}
      <Dialog open={gmbOpen} onOpenChange={setGmbOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Post to Google Business Profile</DialogTitle>
            <DialogDescription>
              Google doesn't allow direct posting from other sites. Follow these 3 steps:
            </DialogDescription>
          </DialogHeader>
          <ol className="text-sm space-y-2 list-decimal pl-5 text-muted-foreground">
            <li>Click <strong>Copy text</strong> below</li>
            <li>Click <strong>Open Google Business</strong> — a new tab opens</li>
            <li>Click <strong>"Add update"</strong> on your profile and paste (Ctrl/Cmd + V)</li>
          </ol>
          <Textarea value={gmbText} readOnly rows={8} className="font-mono text-xs" onFocus={(e) => e.currentTarget.select()} />
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => copyAndConfirm(gmbText)} className="w-full sm:w-auto">
              {textCopied ? <><Check className="h-4 w-4 mr-2 text-accent" /> Copied</> : "Copy text"}
            </Button>
            <Button
              onClick={() => window.open("https://business.google.com/posts", "_blank", "noopener,noreferrer")}
              className="w-full sm:w-auto"
            >
              Open Google Business →
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Instagram dialog */}
      <Dialog open={igOpen} onOpenChange={setIgOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Share on Instagram</DialogTitle>
            <DialogDescription>
              Instagram doesn't accept posts from other websites. Copy the caption, then post from the Instagram app.
            </DialogDescription>
          </DialogHeader>
          <Textarea value={igText} readOnly rows={6} className="font-mono text-xs" onFocus={(e) => e.currentTarget.select()} />
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => copyAndConfirm(igText)} className="w-full sm:w-auto">
              {textCopied ? <><Check className="h-4 w-4 mr-2 text-accent" /> Copied</> : "Copy caption"}
            </Button>
            <Button
              onClick={() => window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer")}
              className="w-full sm:w-auto"
            >
              Open Instagram →
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}