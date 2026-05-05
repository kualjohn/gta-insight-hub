import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import {
  adminGetBlogPost,
  adminCreateBlogPost,
  adminUpdateBlogPost,
  adminCheckBlogSlug,
  adminUploadImage,
  toSlug,
} from '@/lib/adminApi';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';

const CATEGORIES = ['Market Update', 'Buying', 'Selling', 'Neighbourhood', 'Investing', 'News', 'Guide'];

export default function AdminBlogForm() {
  const { token, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Market Update',
    excerpt: '',
    featured_image: '',
    content_html: '',
    published_at: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (!isAuthenticated) { navigate('/admin/login'); return; }
    if (isEdit && token) {
      adminGetBlogPost(token, id!).then(p => {
        setForm({
          title: p.title || '',
          slug: p.slug || '',
          category: p.category || 'Market Update',
          excerpt: p.excerpt || '',
          featured_image: p.featured_image || '',
          content_html: p.content_html || '',
          published_at: p.published_at ? p.published_at.slice(0, 10) : '',
        });
        setLoading(false);
      }).catch(e => { setError(e.message); setLoading(false); });
    }
  }, [isAuthenticated, isEdit, id, token]);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleTitleBlur = () => {
    if (!form.slug && form.title) update('slug', toSlug(form.title));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setUploading(true);
    try {
      const url = await adminUploadImage(token, file, 'blog');
      update('featured_image', url);
    } catch (err: any) { setError(err.message); }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError('');
    setSaving(true);
    try {
      if (!form.title || !form.slug) throw new Error('Title and slug are required');
      const exists = await adminCheckBlogSlug(token, form.slug, isEdit ? id : undefined);
      if (exists) throw new Error('Slug is already in use — pick a different one');

      const payload: any = {
        title: form.title,
        slug: form.slug,
        category: form.category || null,
        excerpt: form.excerpt || null,
        featured_image: form.featured_image || null,
        content_html: form.content_html || null,
        published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
      };

      if (isEdit) {
        await adminUpdateBlogPost(token, id!, payload);
      } else {
        await adminCreateBlogPost(token, payload);
      }
      navigate('/admin/blog');
    } catch (err: any) { setError(err.message); }
    setSaving(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>;

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <div className="min-h-screen bg-background">
        <header className="border-b border-border px-6 md:px-12 lg:px-20 xl:px-28 py-4 flex items-center gap-4">
          <Link to="/admin/blog" className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="font-display text-xl text-foreground">{isEdit ? 'Edit Post' : 'New Post'}</h1>
        </header>
        <form onSubmit={handleSubmit} className="px-6 md:px-12 lg:px-20 xl:px-28 py-8 max-w-3xl space-y-6">
          {error && <div className="bg-destructive/10 border border-destructive/30 text-destructive p-4 font-body text-sm">{error}</div>}

          <Field label="Title">
            <input required value={form.title} onChange={e => update('title', e.target.value)} onBlur={handleTitleBlur} className="input" />
          </Field>

          <Field label="Slug (URL)">
            <input required value={form.slug} onChange={e => update('slug', toSlug(e.target.value))} className="input" />
            <p className="text-xs text-muted-foreground mt-1">/blog/{form.slug || 'your-slug'}</p>
          </Field>

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Category">
              <select value={form.category} onChange={e => update('category', e.target.value)} className="input">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Published Date">
              <input type="date" value={form.published_at} onChange={e => update('published_at', e.target.value)} className="input" />
            </Field>
          </div>

          <Field label="Excerpt (short summary)">
            <textarea value={form.excerpt} onChange={e => update('excerpt', e.target.value)} rows={3} className="input" />
          </Field>

          <Field label="Featured Image">
            {form.featured_image && <img src={form.featured_image} alt="" className="w-full max-w-md aspect-video object-cover mb-3" />}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 bg-secondary px-4 py-2 font-body text-xs tracking-[0.15em] uppercase cursor-pointer hover:bg-secondary/80 transition-colors">
                <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
              </label>
              {form.featured_image && (
                <button type="button" onClick={() => update('featured_image', '')} className="font-body text-xs text-muted-foreground hover:text-destructive">Remove</button>
              )}
            </div>
            <input value={form.featured_image} onChange={e => update('featured_image', e.target.value)} placeholder="...or paste image URL" className="input mt-3" />
          </Field>

          <Field label="Content (HTML)">
            <textarea
              value={form.content_html}
              onChange={e => update('content_html', e.target.value)}
              rows={20}
              placeholder="<p>Your article HTML. Use &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;a&gt; tags. To embed a YouTube video, paste its iframe.</p>"
              className="input font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground mt-1">Tip: To embed YouTube, paste an iframe like <code>&lt;iframe src="https://www.youtube.com/embed/VIDEO_ID" ...&gt;&lt;/iframe&gt;</code></p>
          </Field>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
            <Link to="/admin/blog" className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground">Cancel</Link>
            <button type="submit" disabled={saving} className="bg-accent text-accent-foreground px-6 py-3 font-body text-xs tracking-[0.15em] uppercase hover:bg-accent/90 transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
      <style>{`.input { width: 100%; background: transparent; border-bottom: 1px solid hsl(var(--border)); padding: 0.5rem 0; font-family: var(--font-body, inherit); font-size: 0.875rem; color: hsl(var(--foreground)); outline: none; transition: border-color 0.2s; } .input:focus { border-color: hsl(var(--accent)); } textarea.input { border: 1px solid hsl(var(--border)); padding: 0.75rem; }`}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">{label}</label>
      {children}
    </div>
  );
}