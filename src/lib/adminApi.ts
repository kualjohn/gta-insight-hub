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
