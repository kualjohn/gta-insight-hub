INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true);

CREATE POLICY "Public read access" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'property-images');

CREATE POLICY "Service role can manage files" ON storage.objects
FOR ALL TO service_role
USING (bucket_id = 'property-images')
WITH CHECK (bucket_id = 'property-images');