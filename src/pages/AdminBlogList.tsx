import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { adminListBlogPosts, adminDeleteBlogPost } from '@/lib/adminApi';
import { Plus, ExternalLink, Pencil, Trash2, ArrowLeft, Search } from 'lucide-react';

export default function AdminBlogList() {
  const { token, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) { navigate('/admin/login'); return; }
    load();
  }, [isAuthenticated]);

  const load = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await adminListBlogPosts(token);
      setPosts(data || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!token || !deleteId) return;
    try {
      await adminDeleteBlogPost(token, deleteId);
      setPosts(p => p.filter(x => x.id !== deleteId));
    } catch (e) { console.error(e); }
    setDeleteId(null);
  };

  const filtered = posts.filter(p =>
    !search ||
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <div className="min-h-screen bg-background">
        <header className="border-b border-border px-6 md:px-12 lg:px-20 xl:px-28 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="font-display text-xl text-foreground">Blog Posts</h1>
          </div>
          <Link to="/admin/blog/new" className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2 font-body text-xs tracking-[0.15em] uppercase hover:bg-accent/90 transition-colors">
            <Plus className="w-4 h-4" /> New Post
          </Link>
        </header>
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 py-8">
          <div className="relative max-w-sm mb-8">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search title or category..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-6 bg-transparent border-b border-border py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors" />
          </div>
          {loading ? (
            <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {['', 'Title', 'Category', 'Published', 'Updated', 'Actions'].map(h => (
                      <th key={h} className="text-left py-3 px-2 font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-2">{p.featured_image && <img src={p.featured_image} alt="" className="w-12 h-8 object-cover" />}</td>
                      <td className="py-3 px-2 font-body text-sm text-foreground max-w-md">{p.title}</td>
                      <td className="py-3 px-2 font-body text-sm text-muted-foreground">{p.category || '—'}</td>
                      <td className="py-3 px-2 font-body text-xs text-muted-foreground">{p.published_at ? new Date(p.published_at).toLocaleDateString() : '—'}</td>
                      <td className="py-3 px-2 font-body text-xs text-muted-foreground">{p.updated_at ? new Date(p.updated_at).toLocaleDateString() : '—'}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <Link to={`/admin/blog/${p.id}/edit`} className="text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-4 h-4" /></Link>
                          <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><ExternalLink className="w-4 h-4" /></a>
                          <button onClick={() => setDeleteId(p.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && <p className="text-center py-12 font-body text-muted-foreground">No blog posts found.</p>}
            </div>
          )}
        </div>
        {deleteId && (
          <div className="fixed inset-0 z-50 bg-charcoal/60 flex items-center justify-center" onClick={() => setDeleteId(null)}>
            <div className="bg-background p-8 max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
              <h3 className="font-display text-xl text-foreground mb-4">Delete Blog Post</h3>
              <p className="font-body text-sm text-muted-foreground mb-8">This action cannot be undone.</p>
              <div className="flex justify-end gap-4">
                <button onClick={() => setDeleteId(null)} className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
                <button onClick={handleDelete} className="bg-destructive text-destructive-foreground px-6 py-2 font-body text-xs tracking-[0.15em] uppercase hover:bg-destructive/90 transition-colors">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}