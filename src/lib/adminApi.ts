const PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;
const BASE = `https://${PROJECT_ID}.supabase.co/functions/v1/admin-crud`;

function getHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    'x-admin-token': token,
  };
}

export async function adminListProperties(token: string) {
  const res = await fetch(`${BASE}?action=list`, { headers: getHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch properties');
  return res.json();
}

export async function adminGetProperty(token: string, id: string) {
  const res = await fetch(`${BASE}?action=get&id=${id}`, { headers: getHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch property');
  return res.json();
}

export async function adminCreateProperty(token: string, data: Record<string, any>) {
  const res = await fetch(`${BASE}?action=create`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create property');
  }
  return res.json();
}

export async function adminUpdateProperty(token: string, id: string, data: Record<string, any>) {
  const res = await fetch(`${BASE}?action=update&id=${id}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to update property');
  }
  return res.json();
}

export async function adminDeleteProperty(token: string, id: string) {
  const res = await fetch(`${BASE}?action=delete&id=${id}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to delete property');
  return res.json();
}

export async function adminCheckSlug(token: string, slug: string, excludeId?: string) {
  const res = await fetch(`${BASE}?action=check-slug`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ slug, excludeId }),
  });
  if (!res.ok) throw new Error('Failed to check slug');
  const data = await res.json();
  return data.exists;
}

export async function adminUploadImage(token: string, file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  const res = await fetch(`${BASE}?action=upload`, {
    method: 'POST',
    headers: { 'x-admin-token': token },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to upload image');
  }
  const data = await res.json();
  return data.url;
}

export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ---- Blog posts ----
export async function adminListBlogPosts(token: string) {
  const res = await fetch(`${BASE}?action=blog-list`, { headers: getHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch blog posts');
  return res.json();
}

export async function adminGetBlogPost(token: string, id: string) {
  const res = await fetch(`${BASE}?action=blog-get&id=${id}`, { headers: getHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch blog post');
  return res.json();
}

export async function adminCreateBlogPost(token: string, data: Record<string, any>) {
  const res = await fetch(`${BASE}?action=blog-create`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create blog post');
  }
  return res.json();
}

export async function adminUpdateBlogPost(token: string, id: string, data: Record<string, any>) {
  const res = await fetch(`${BASE}?action=blog-update&id=${id}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to update blog post');
  }
  return res.json();
}

export async function adminDeleteBlogPost(token: string, id: string) {
  const res = await fetch(`${BASE}?action=blog-delete&id=${id}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to delete blog post');
  return res.json();
}

export async function adminCheckBlogSlug(token: string, slug: string, excludeId?: string) {
  const res = await fetch(`${BASE}?action=blog-check-slug`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ slug, excludeId }),
  });
  if (!res.ok) throw new Error('Failed to check slug');
  const data = await res.json();
  return data.exists;
}

// ---- YouTube blog drafts ----
export async function adminListYouTubeDrafts(token: string) {
  const res = await fetch(`${BASE}?action=ybp-list`, { headers: getHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch drafts');
  return res.json();
}

export async function adminGetYouTubeDraft(token: string, id: string) {
  const res = await fetch(`${BASE}?action=ybp-get&id=${id}`, { headers: getHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch draft');
  return res.json();
}

export async function adminGetYouTubeDraftCount(token: string): Promise<number> {
  const res = await fetch(`${BASE}?action=ybp-draft-count`, { headers: getHeaders(token) });
  if (!res.ok) return 0;
  const data = await res.json();
  return data.count || 0;
}

export async function adminUpdateYouTubeDraft(token: string, id: string, data: Record<string, any>) {
  const res = await fetch(`${BASE}?action=ybp-update&id=${id}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update draft');
  return res.json();
}

export async function adminDeleteYouTubeDraft(token: string, id: string) {
  const res = await fetch(`${BASE}?action=ybp-delete&id=${id}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to delete draft');
  return res.json();
}

export async function adminPublishYouTubeDraft(token: string, id: string) {
  const res = await fetch(`${BASE}?action=ybp-publish`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to publish');
  }
  return res.json();
}

export async function adminRegenerateYouTubeDraft(token: string, id: string) {
  const res = await fetch(`${BASE}?action=ybp-regenerate`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to regenerate');
  }
  return res.json();
}

export async function adminSyncYouTubeNow(token: string) {
  const res = await fetch(`${BASE}?action=ybp-sync-now`, {
    method: 'POST',
    headers: getHeaders(token),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Sync failed');
  }
  return res.json();
}
