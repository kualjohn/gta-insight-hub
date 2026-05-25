import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import {
  adminListYouTubeDrafts,
  adminDeleteYouTubeDraft,
  adminPublishYouTubeDraft,
  adminRegenerateYouTubeDraft,
  adminSyncYouTubeNow,
} from '@/lib/adminApi';
import { ArrowLeft, RefreshCw, Trash2, Eye, Send, RotateCw, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminBlogDrafts() {
  const { token, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [previewDraft, setPreviewDraft] = useState<any | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) { navigate('/admin/login'); return; }
    load();
  }, [isAuthenticated]);

  const load = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await adminListYouTubeDrafts(token);
      setDrafts(data || []);
    } catch (e: any) {
      toast.error(e.message);
    }
    setLoading(false);
  };

  const handleSync = async () => {
    if (!token) return;
    setSyncing(true);
    try {
      const res = await adminSyncYouTubeNow(token);
      const created = (res.results || []).filter((r: any) => r.created).length;
      toast.success(created > 0 ? `${created} new draft(s) created` : 'Synced — no new videos');
      await load();
    } catch (e: any) {
      toast.error(e.message);
    }
    setSyncing(false);
  };

  const handlePublish = async (id: string) => {
    if (!token) return;
    setBusyId(id);
    try {
      await adminPublishYouTubeDraft(token, id);
      toast.success('Published to blog');
      await load();
    } catch (e: any) {
      toast.error(e.message);
    }
    setBusyId(null);
  };

  const handleRegenerate = async (id: string) => {
    if (!token) return;
    setBusyId(id);
    try {
      await adminRegenerateYouTubeDraft(token, id);
      toast.success('Regenerated');
      await load();
    } catch (e: any) {
      toast.error(e.message);
    }
    setBusyId(null);
  };

  const handleDelete = async () => {
    if (!token || !confirmDelete) return;
    try {
      await adminDeleteYouTubeDraft(token, confirmDelete);
      setDrafts(p => p.filter(d => d.id !== confirmDelete));
      toast.success('Deleted');
    } catch (e: any) {
      toast.error(e.message);
    }
    setConfirmDelete(null);
  };

  const draftCount = drafts.filter(d => d.status === 'draft').length;

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <div className="min-h-screen bg-background">
        <header className="border-b border-border px-6 md:px-12 lg:px-20 xl:px-28 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="font-display text-xl text-foreground">YouTube Blog Drafts</h1>
            {draftCount > 0 && (
              <span className="bg-accent text-accent-foreground px-2 py-0.5 text-[10px] font-body tracking-[0.15em] uppercase">
                {draftCount} pending
              </span>
            )}
          </div>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 bg-foreground text-background px-5 py-2 font-body text-xs tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing…' : 'Sync Now'}
          </button>
        </header>

        <div className="px-6 md:px-12 lg:px-20 xl:px-28 py-8">
          {loading ? (
            <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" /></div>
          ) : drafts.length === 0 ? (
            <p className="text-center py-20 font-body text-muted-foreground">No drafts yet. Click "Sync Now" to pull recent YouTube videos.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drafts.map(d => (
                <div key={d.id} className="border border-border bg-card flex flex-col">
                  <div className="relative aspect-video bg-secondary overflow-hidden">
                    {d.thumbnail_url && (
                      <img src={d.thumbnail_url} alt={d.blog_title} className="w-full h-full object-cover" loading="lazy" />
                    )}
                    <span className={`absolute top-2 left-2 px-2 py-1 text-[10px] font-body tracking-[0.15em] uppercase ${d.status === 'published' ? 'bg-foreground text-background' : 'bg-accent text-accent-foreground'}`}>
                      {d.status}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-display text-lg text-foreground mb-2 line-clamp-2">{d.blog_title}</h3>
                    {d.category && <p className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">{d.category}</p>}
                    <p className="font-body text-sm text-muted-foreground line-clamp-3 mb-4">{d.meta_description}</p>
                    {d.transcript_source && (
                      <p className="font-body text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-4">
                        Source:{' '}
                        <span className={d.transcript_source === 'fallback_metadata' ? 'text-destructive' : 'text-accent'}>
                          {d.transcript_source === 'fallback_metadata' ? 'Title + description (no transcript)' : 'Transcript'}
                        </span>
                      </p>
                    )}
                    <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-border">
                      <button
                        onClick={() => setPreviewDraft(d)}
                        className="flex items-center gap-1 px-3 py-1.5 border border-border text-foreground font-body text-[10px] tracking-[0.15em] uppercase hover:bg-secondary transition-colors"
                      >
                        <Eye className="w-3 h-3" /> Preview
                      </button>
                      {d.status === 'draft' && (
                        <>
                          <button
                            onClick={() => handlePublish(d.id)}
                            disabled={busyId === d.id}
                            className="flex items-center gap-1 px-3 py-1.5 bg-accent text-accent-foreground font-body text-[10px] tracking-[0.15em] uppercase hover:bg-accent/90 transition-colors disabled:opacity-50"
                          >
                            <Send className="w-3 h-3" /> Publish
                          </button>
                          <button
                            onClick={() => handleRegenerate(d.id)}
                            disabled={busyId === d.id}
                            className="flex items-center gap-1 px-3 py-1.5 border border-border text-foreground font-body text-[10px] tracking-[0.15em] uppercase hover:bg-secondary transition-colors disabled:opacity-50"
                          >
                            <RotateCw className={`w-3 h-3 ${busyId === d.id ? 'animate-spin' : ''}`} /> Regenerate
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setConfirmDelete(d.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-destructive font-body text-[10px] tracking-[0.15em] uppercase hover:bg-destructive/10 transition-colors ml-auto"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {previewDraft && (
          <div className="fixed inset-0 z-50 bg-charcoal/80 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setPreviewDraft(null)}>
            <div className="bg-background max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between z-10">
                <h3 className="font-display text-lg text-foreground">Preview</h3>
                <button onClick={() => setPreviewDraft(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6">
                {previewDraft.thumbnail_url && (
                  <img src={previewDraft.thumbnail_url} alt="" className="w-full aspect-video object-cover mb-6" />
                )}
                <div className="aspect-video mb-6">
                  <iframe
                    src={`https://www.youtube.com/embed/${previewDraft.youtube_video_id}`}
                    title={previewDraft.blog_title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h1 className="font-display text-3xl text-foreground mb-3">{previewDraft.blog_title}</h1>
                <p className="font-body text-sm text-muted-foreground italic mb-2">{previewDraft.meta_description}</p>
                {previewDraft.focus_keyword && (
                  <p className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-6">Focus keyword: {previewDraft.focus_keyword}</p>
                )}
                <div
                  className="prose prose-neutral max-w-none font-body text-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-accent"
                  dangerouslySetInnerHTML={{ __html: previewDraft.content || '' }}
                />
              </div>
            </div>
          </div>
        )}

        {confirmDelete && (
          <div className="fixed inset-0 z-50 bg-charcoal/60 flex items-center justify-center" onClick={() => setConfirmDelete(null)}>
            <div className="bg-background p-8 max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
              <h3 className="font-display text-xl text-foreground mb-4">Delete Draft</h3>
              <p className="font-body text-sm text-muted-foreground mb-8">This will remove the draft. The YouTube video can be re-processed later.</p>
              <div className="flex justify-end gap-4">
                <button onClick={() => setConfirmDelete(null)} className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
                <button onClick={handleDelete} className="bg-destructive text-destructive-foreground px-6 py-2 font-body text-xs tracking-[0.15em] uppercase hover:bg-destructive/90 transition-colors">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}