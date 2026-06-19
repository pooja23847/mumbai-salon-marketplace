
CREATE TABLE public.salons (
  id text PRIMARY KEY,
  owner_id uuid NOT NULL,
  name text NOT NULL,
  city text NOT NULL DEFAULT 'Mumbai',
  address text NOT NULL,
  phone text NOT NULL,
  category text NOT NULL DEFAULT 'unisex',
  description text,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.salons TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.salons TO authenticated;
GRANT ALL ON public.salons TO service_role;

ALTER TABLE public.salons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view salons"
  ON public.salons FOR SELECT
  USING (true);

CREATE POLICY "Owners insert their salon"
  ON public.salons FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners update their salon"
  ON public.salons FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners delete their salon"
  ON public.salons FOR DELETE TO authenticated
  USING (auth.uid() = owner_id);

CREATE TRIGGER update_salons_updated_at
  BEFORE UPDATE ON public.salons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Let salon owners see bookings made at salons they own
CREATE POLICY "Salon owners view bookings for their salons"
  ON public.bookings FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.salons s
      WHERE s.id = bookings.salon_id
        AND s.owner_id = auth.uid()
    )
  );
