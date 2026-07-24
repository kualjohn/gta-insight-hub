import { useState } from "react";
import { Facebook, Linkedin, Twitter, Mail, Link as LinkIcon, MessageCircle, Instagram, Store, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  url: string;
  excerpt?: string;
}

export function ShareButtons({ title, url, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(excerpt ? `${title}\n\n${excerpt}\n\n${url}` : `${title}\n\n${url}`);

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

  const shareToGoogleBusiness = async () => {
    const postText = excerpt ? `${title}\n\n${excerpt}\n\nRead more: ${url}` : `${title}\n\n${url}`;
    await copyToClipboard(postText, "Post text");
    window.open("https://business.google.com/posts", "_blank", "noopener,noreferrer");
    toast.info("Paste into the 'Add update' box on your Google Business Profile", { duration: 5000 });
  };

  const shareToInstagram = async () => {
    await copyToClipboard(`${title}\n\n${excerpt || ""}\n\nLink in bio: ${url}`, "Caption");
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    toast.info("Caption copied — paste it into your Instagram post", { duration: 5000 });
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
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <LinkIcon className="h-4 w-4" />}
          <span className="ml-2 hidden sm:inline">{copied ? "Copied" : "Copy link"}</span>
        </Button>

        <div className="w-full sm:w-auto sm:ml-auto flex flex-wrap gap-3">
          <Button variant="default" size="sm" onClick={shareToGoogleBusiness} className="bg-primary">
            <Store className="h-4 w-4" />
            <span className="ml-2">Post to Google Business</span>
          </Button>

          <Button variant="outline" size="sm" onClick={shareToInstagram}>
            <Instagram className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Instagram</span>
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Tip: "Post to Google Business" copies the text to your clipboard and opens your Business Profile — just paste and publish.
      </p>
    </div>
  );
}