---
name: YouTube to Blog Automation
description: Cron-based YouTube polling -> Claude-generated SEO blog drafts -> admin review/publish workflow
type: feature
---
# YouTube → Blog Automation

- **Trigger:** `pg_cron` job `youtube-blog-sync-6h` runs every 6 hours and POSTs to edge function `youtube-blog-sync`.
- **Source:** YouTube RSS feed for channel `UCNiL5jVJ7uM89e2S69FrUxQ` (Fawad's channel).
- **Transcript:** Scrapes YouTube watch page for `captionTracks`, fetches the XML, strips tags. Falls back to title+description if unavailable.
- **AI:** Anthropic Claude `claude-sonnet-4-20250514`. Secret: `ANTHROPIC_API_KEY`. System prompt enforces SEO H1, meta desc, H2/H3 structure, Calendly CTA, returns strict JSON.
- **Storage:** `youtube_blog_posts` table (status: draft/published). Dedupe by `youtube_video_id` unique constraint.
- **Admin UI:** `/admin/blog-drafts` — grid of draft cards (thumbnail, title, meta desc) with Preview/Publish/Regenerate/Delete actions and a "Sync Now" button. Badge with pending draft count on `/admin` dashboard.
- **Publish flow:** copies draft into `blog_posts`, prepends YouTube `<iframe>` embed to `content_html`, auto-generates unique slug from blog title, sets `published_at`.
- **Backend actions** (in `admin-crud` function): `ybp-list`, `ybp-get`, `ybp-draft-count`, `ybp-update`, `ybp-delete`, `ybp-publish`, `ybp-regenerate`, `ybp-sync-now`.
- **Optional:** `YOUTUBE_API_KEY` env var enables richer metadata (tags); falls back to watch-page scraping if absent.