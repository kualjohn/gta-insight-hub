-- 1. blog_posts: only published posts are publicly readable
DROP POLICY IF EXISTS "Anyone can read blog posts" ON public.blog_posts;
CREATE POLICY "Anyone can read published blog posts"
ON public.blog_posts
FOR SELECT
USING (published_at IS NOT NULL);

-- 2. Replace always-true INSERT checks with validating checks
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
CREATE POLICY "Anyone can submit leads"
ON public.leads
FOR INSERT
WITH CHECK (
  email ~* '^[A-Za-z0-9._%%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(email) <= 320
  AND (first_name IS NULL OR length(first_name) <= 100)
  AND (last_name IS NULL OR length(last_name) <= 100)
  AND (phone IS NULL OR length(phone) <= 40)
  AND (subject IS NULL OR length(subject) <= 200)
  AND (message IS NULL OR length(message) <= 5000)
  AND (source IS NULL OR length(source) <= 60)
);

DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (
  email ~* '^[A-Za-z0-9._%%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(email) <= 320
);

-- 3. Storage: public bucket keeps serving files via public URLs,
--    but remove the broad SELECT policy that allows listing every object.
DROP POLICY IF EXISTS "Public read access" ON storage.objects;