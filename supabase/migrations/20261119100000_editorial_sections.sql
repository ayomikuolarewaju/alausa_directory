create table public.editorial_sections (
  id text primary key check (id ~ '^[a-z0-9-]+$'),
  page_key text not null check (page_key ~ '^[a-z0-9-]+$'),
  title text not null,
  content jsonb not null check (jsonb_typeof(content) = 'array'),
  sort_order integer not null default 0,
  published boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.editorial_sections enable row level security;
revoke all on public.editorial_sections from anon, authenticated;
grant select on public.editorial_sections to anon, authenticated;
grant insert, update, delete on public.editorial_sections to authenticated;

create policy editorial_sections_public_read
  on public.editorial_sections
  for select
  to anon, authenticated
  using (published);

create policy editorial_sections_admin_manage
  on public.editorial_sections
  for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

grant all on public.editorial_sections to service_role;
