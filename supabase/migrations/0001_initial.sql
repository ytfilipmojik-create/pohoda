-- Products are catalog only; we don't sync from code (lib/products.ts is source of truth).
-- This table exists mainly for FK joins in fulfillment/admin queries.

create table products (
  slug text primary key,
  title text not null,
  price_kc int,
  pdf_storage_path text,
  is_bundle boolean not null default false,
  is_bonus_only boolean not null default false,
  created_at timestamptz not null default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  stripe_payment_intent_id text unique not null,
  amount_total_kc int not null,
  product_slugs text[] not null,
  has_bonus boolean not null default false,
  status text not null check (status in ('pending', 'paid', 'failed', 'refunded')),
  fakturoid_invoice_id text,
  consent_immediate_fulfillment boolean not null default false,
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create index orders_email_idx on orders (email);
create index orders_status_idx on orders (status);
create index orders_paid_at_idx on orders (paid_at desc) where status = 'paid';

create table email_log (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders (id) on delete cascade,
  email_type text not null check (email_type in ('download', 'started_reading', 'upsell', 'review_request', 'refund')),
  resend_message_id text,
  sent_at timestamptz not null default now()
);

create index email_log_order_idx on email_log (order_id);
create unique index email_log_unique_per_order_type on email_log (order_id, email_type);

create table refunds (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders (id) on delete cascade,
  reason text,
  refunded_at timestamptz not null default now()
);

-- Storage bucket for PDFs (run separately in Supabase Storage UI):
-- Bucket name: 'pdfs', visibility: private (signed URLs only).

-- Seed products from catalog
insert into products (slug, title, price_kc, pdf_storage_path, is_bundle, is_bonus_only) values
  ('ai-ugc-reklamy', 'AI UGC reklamy', 399, 'pdfs/ai-ugc-reklamy.pdf', false, false),
  ('ai-grafika', 'AI grafika a vizuály', 399, 'pdfs/ai-grafika.pdf', false, false),
  ('ai-weby', 'AI weby pro malé firmy', 399, 'pdfs/ai-weby.pdf', false, false),
  ('bundle', 'Balíček všech 3 e-booků + bonus', 999, null, true, false),
  ('bonus-prvni-klient', 'Jak sehnat prvního klienta', null, 'pdfs/bonus-prvni-klient.pdf', false, true);
