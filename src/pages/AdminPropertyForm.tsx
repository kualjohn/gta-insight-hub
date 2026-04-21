import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { adminCreateProperty, adminUpdateProperty, adminGetProperty, adminCheckSlug, adminUploadImage, toSlug } from '@/lib/adminApi';
import { ArrowLeft, GripVertical, X, Plus, Upload, Loader2 } from 'lucide-react';

const emptyForm = {
  title: '', slug: '', status: 'for_sale', city: '', neighbourhood: '', property_type: '',
  price: '', beds: '', baths: '', sqft: '', lot_size: '', description: '', tagline: '',
  sold_tagline: '', thumbnail_image: '', hero_image: '', gallery_images: [] as string[],
  video_url: '', tour_3d_url: '', floorplan_url: '', brochure_url: '',
  is_featured: false, published: true, sort_order: '0',
};

function ImageUploadField({ label, value, onChange, token, folder }: {
  label: string; value: string; onChange: (url: string) => void; token: string; folder: string;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const url = await adminUploadImage(token, file, folder);
      onChange(url);
    } catch (e: any) {
      alert(e.message || 'Upload failed');
    }
    setUploading(false);
  };

  const labelClass = "font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1 block";

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className="mt-1 border-2 border-dashed border-border hover:border-accent rounded-sm p-4 cursor-pointer transition-colors text-center"
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 py-4">
            <Loader2 className="w-5 h-5 animate-spin text-accent" />
            <span className="font-body text-sm text-muted-foreground">Uploading...</span>
          </div>
        ) : value ? (
          <div className="relative group">
            <img src={value} alt="" className="w-full h-32 object-cover rounded-sm" />
            <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="font-body text-xs text-foreground">Click to replace</span>
            </div>
          </div>
        ) : (
          <div className="py-6 flex flex-col items-center gap-2">
            <Upload className="w-6 h-6 text-muted-foreground" />
            <span className="font-body text-xs text-muted-foreground">Click to upload</span>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
        e.target.value = '';
      }} />
    </div>
  );
}

export default function AdminPropertyForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const { token, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthenticated) { navigate('/admin/login'); return; }
    if (isEdit && token) {
      setLoading(true);
      adminGetProperty(token, id!).then(data => {
        setForm({
          title: data.title || '', slug: data.slug || '', status: data.status || 'for_sale',
          city: data.city || '', neighbourhood: data.neighbourhood || '', property_type: data.property_type || '',
          price: data.price?.toString() || '', beds: data.beds?.toString() || '', baths: data.baths?.toString() || '',
          sqft: data.sqft?.toString() || '', lot_size: data.lot_size || '', description: data.description || '',
          tagline: data.tagline || '', sold_tagline: data.sold_tagline || '', thumbnail_image: data.thumbnail_image || '',
          hero_image: data.hero_image || '', gallery_images: data.gallery_images || [],
          video_url: data.video_url || '', tour_3d_url: data.tour_3d_url || '', floorplan_url: data.floorplan_url || '',
          brochure_url: data.brochure_url || '', is_featured: data.is_featured || false,
          published: data.published !== false, sort_order: data.sort_order?.toString() || '0',
        });
        setSlugManual(true);
        setLoading(false);
      }).catch(e => { setError(e.message); setLoading(false); });
    }
  }, [isAuthenticated, isEdit, token, id]);

  const set = (key: string, value: any) => {
    setForm(f => {
      const updated = { ...f, [key]: value };
      if (key === 'title' && !slugManual) updated.slug = toSlug(value);
      return updated;
    });
  };

  const handleGalleryUpload = async (files: FileList) => {
    if (!token) return;
    setGalleryUploading(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      try {
        const url = await adminUploadImage(token, file, `gallery/${form.slug || 'property'}`);
        newUrls.push(url);
      } catch (e: any) {
        console.error('Gallery upload failed:', e);
      }
    }
    setForm(f => ({ ...f, gallery_images: [...f.gallery_images, ...newUrls] }));
    setGalleryUploading(false);
  };

  const removeGalleryImage = (index: number) => setForm(f => ({ ...f, gallery_images: f.gallery_images.filter((_, i) => i !== index) }));

  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    setForm(f => {
      const imgs = [...f.gallery_images];
      const [moved] = imgs.splice(dragIndex, 1);
      imgs.splice(index, 0, moved);
      return { ...f, gallery_images: imgs };
    });
    setDragIndex(index);
  };
  const handleDragEnd = () => setDragIndex(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError('');
    try {
      const slugExists = await adminCheckSlug(token, form.slug, isEdit ? id : undefined);
      if (slugExists) { setError('This slug is already taken.'); setSaving(false); return; }
      const payload: Record<string, any> = {
        title: form.title, slug: form.slug, status: form.status,
        city: form.city || null, neighbourhood: form.neighbourhood || null,
        property_type: form.property_type || null, price: form.price ? parseFloat(form.price) : null,
        beds: form.beds || null, baths: form.baths ? parseInt(form.baths) : null,
        sqft: form.sqft ? parseInt(form.sqft) : null, lot_size: form.lot_size || null,
        description: form.description || null, tagline: form.tagline || null,
        sold_tagline: form.sold_tagline || null, thumbnail_image: form.thumbnail_image || null,
        hero_image: form.hero_image || null, gallery_images: form.gallery_images,
        video_url: form.video_url || null, tour_3d_url: form.tour_3d_url || null,
        floorplan_url: form.floorplan_url || null, brochure_url: form.brochure_url || null,
        is_featured: form.is_featured, published: form.published,
        sort_order: parseInt(form.sort_order) || 0,
      };
      if (isEdit) await adminUpdateProperty(token, id!, payload);
      else await adminCreateProperty(token, payload);
      navigate('/admin');
    } catch (e: any) { setError(e.message || 'Failed to save'); }
    setSaving(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" /></div>;
  }

  const inputClass = "w-full bg-transparent border-b border-border py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors";
  const labelClass = "font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1 block";

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <div className="min-h-screen bg-background">
        <header className="border-b border-border px-6 md:px-12 lg:px-20 xl:px-28 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="font-display text-xl text-foreground">{isEdit ? 'Edit Property' : 'New Property'}</h1>
          </div>
        </header>
        <form onSubmit={handleSubmit} className="px-6 md:px-12 lg:px-20 xl:px-28 py-8 max-w-4xl">
          {error && <div className="bg-destructive/10 border border-destructive/20 p-4 mb-8"><p className="font-body text-sm text-destructive">{error}</p></div>}

          <div className="mb-12">
            <h2 className="font-display text-lg text-foreground mb-6 border-b border-border pb-3">Basic Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div><label className={labelClass}>Title *</label><input type="text" required value={form.title} onChange={e => set('title', e.target.value)} className={inputClass} placeholder="808 Krosno Blvd" /></div>
              <div><label className={labelClass}>Slug *</label><input type="text" required value={form.slug} onChange={e => { setSlugManual(true); set('slug', e.target.value); }} className={inputClass} placeholder="808-krosno" /></div>
              <div><label className={labelClass}>Status</label><select value={form.status} onChange={e => set('status', e.target.value)} className={inputClass}><option value="for_sale">For Sale</option><option value="sold">Sold</option><option value="coming_soon">Coming Soon</option><option value="leased">Leased</option></select></div>
              <div><label className={labelClass}>Property Type</label><input type="text" value={form.property_type} onChange={e => set('property_type', e.target.value)} className={inputClass} placeholder="Detached" /></div>
              <div><label className={labelClass}>City</label><input type="text" value={form.city} onChange={e => set('city', e.target.value)} className={inputClass} placeholder="Toronto" /></div>
              <div><label className={labelClass}>Neighbourhood</label><input type="text" value={form.neighbourhood} onChange={e => set('neighbourhood', e.target.value)} className={inputClass} placeholder="Yorkville" /></div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-display text-lg text-foreground mb-6 border-b border-border pb-3">Specs & Pricing</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-6">
              <div><label className={labelClass}>Price</label><input type="number" value={form.price} onChange={e => set('price', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Beds</label><input type="number" value={form.beds} onChange={e => set('beds', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Baths</label><input type="number" value={form.baths} onChange={e => set('baths', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Sqft</label><input type="number" value={form.sqft} onChange={e => set('sqft', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Lot Size</label><input type="text" value={form.lot_size} onChange={e => set('lot_size', e.target.value)} className={inputClass} /></div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-display text-lg text-foreground mb-6 border-b border-border pb-3">Content</h2>
            <div className="space-y-6">
              <div><label className={labelClass}>Tagline</label><input type="text" value={form.tagline} onChange={e => set('tagline', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Sold Tagline</label><input type="text" value={form.sold_tagline} onChange={e => set('sold_tagline', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} rows={6} className={`${inputClass} resize-none`} /></div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-display text-lg text-foreground mb-6 border-b border-border pb-3">Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
              <ImageUploadField label="Thumbnail Image" value={form.thumbnail_image} onChange={url => set('thumbnail_image', url)} token={token!} folder={`thumbnails/${form.slug || 'property'}`} />
              <ImageUploadField label="Hero Image" value={form.hero_image} onChange={url => set('hero_image', url)} token={token!} folder={`heroes/${form.slug || 'property'}`} />
            </div>
            <div>
              <label className={labelClass}>Gallery Images (drag to reorder)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {form.gallery_images.map((img, i) => (
                  <div key={i} draggable onDragStart={() => handleDragStart(i)} onDragOver={e => handleDragOver(e, i)} onDragEnd={handleDragEnd} className={`relative group aspect-square overflow-hidden rounded-sm border ${dragIndex === i ? 'border-accent' : 'border-border/50'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <GripVertical className="w-5 h-5 text-foreground cursor-grab" />
                      <button type="button" onClick={() => removeGalleryImage(i)} className="text-destructive hover:text-destructive/80"><X className="w-5 h-5" /></button>
                    </div>
                    <span className="absolute top-1 left-1 bg-background/80 text-foreground font-body text-[10px] px-1.5 py-0.5 rounded-sm">{i + 1}</span>
                  </div>
                ))}
                <div
                  onClick={() => !galleryUploading && galleryInputRef.current?.click()}
                  className="aspect-square border-2 border-dashed border-border hover:border-accent rounded-sm flex flex-col items-center justify-center cursor-pointer transition-colors"
                >
                  {galleryUploading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-accent" />
                  ) : (
                    <>
                      <Plus className="w-6 h-6 text-muted-foreground mb-1" />
                      <span className="font-body text-[10px] text-muted-foreground">Upload Photos</span>
                    </>
                  )}
                </div>
              </div>
              <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => {
                if (e.target.files?.length) handleGalleryUpload(e.target.files);
                e.target.value = '';
              }} />
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-display text-lg text-foreground mb-6 border-b border-border pb-3">External Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div><label className={labelClass}>Video URL</label><input type="url" value={form.video_url} onChange={e => set('video_url', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>3D Tour URL</label><input type="url" value={form.tour_3d_url} onChange={e => set('tour_3d_url', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Floor Plan URL</label><input type="url" value={form.floorplan_url} onChange={e => set('floorplan_url', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Brochure URL</label><input type="url" value={form.brochure_url} onChange={e => set('brochure_url', e.target.value)} className={inputClass} /></div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-display text-lg text-foreground mb-6 border-b border-border pb-3">Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
              <div><label className={labelClass}>Sort Order</label><input type="number" value={form.sort_order} onChange={e => set('sort_order', e.target.value)} className={inputClass} /></div>
              <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} className="accent-accent w-4 h-4" /><span className="font-body text-sm text-foreground">Published</span></label>
              <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)} className="accent-accent w-4 h-4" /><span className="font-body text-sm text-foreground">Featured</span></label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" disabled={saving} className="bg-accent text-accent-foreground px-10 py-3 font-body text-xs tracking-[0.2em] uppercase hover:bg-accent/90 transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : isEdit ? 'Update Property' : 'Create Property'}
            </button>
            <Link to="/admin" className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </>
  );
}
