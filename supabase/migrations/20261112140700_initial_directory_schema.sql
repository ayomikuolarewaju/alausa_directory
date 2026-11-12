create table public.entities (
  id text primary key,
  name text not null,
  category text not null check (category in ('ministry', 'agency', 'parastatal')),
  description text not null,
  location text not null,
  address text not null,
  phone text not null default '',
  additional_phones text[] not null default '{}',
  email text not null default '',
  additional_emails text[] not null default '{}',
  website text,
  block text,
  verified boolean not null default false,
  needs_verification boolean not null default true,
  last_updated date not null,
  last_reviewed_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.entity_officers (
  id bigint generated always as identity primary key,
  entity_id text not null references public.entities(id) on delete cascade,
  sort_order integer not null,
  name text not null,
  title text not null,
  phone text,
  email text,
  verified boolean not null default false,
  unique (entity_id, sort_order)
);

create table public.sources (
  id bigint generated always as identity primary key,
  entity_id text not null references public.entities(id) on delete cascade,
  sort_order integer not null,
  label text not null,
  url text not null,
  checked_at date not null,
  supports text not null,
  unique (entity_id, sort_order)
);

create table public.lgas (
  id text primary key,
  name text not null,
  chairman text not null,
  vice_chairman text,
  address text not null,
  phone text not null,
  email text,
  zone text not null check (zone in ('Island', 'Mainland', 'Suburban')),
  wards integer not null,
  population text not null,
  headquarters text not null,
  area text not null,
  coordinates jsonb not null,
  established text not null,
  bio text not null,
  history text not null,
  landmarks jsonb not null default '[]'::jsonb,
  known_for jsonb not null default '[]'::jsonb,
  local_council_development_areas jsonb not null default '[]'::jsonb,
  postal_code text
);

create table public.lga_officers (
  id bigint generated always as identity primary key,
  lga_id text not null references public.lgas(id) on delete cascade,
  sort_order integer not null,
  name text not null,
  title text not null,
  unique (lga_id, sort_order)
);

create table public.lcdas (
  id text primary key,
  name text not null,
  parent_lga_id text not null references public.lgas(id),
  parent_lga_name text not null,
  chairman text not null,
  vice_chairman text,
  address text not null,
  phone text not null,
  email text,
  zone text not null check (zone in ('Island', 'Mainland', 'Suburban')),
  established text not null,
  headquarters text not null,
  population text,
  area text,
  coordinates jsonb not null,
  bio text not null,
  known_for jsonb not null default '[]'::jsonb
);

create table public.wards (
  id text primary key,
  lcda_id text not null references public.lcdas(id) on delete cascade,
  sort_order integer not null,
  name text not null,
  description text,
  unique (lcda_id, sort_order)
);

create table public.transport_datasets (
  id text primary key check (id in ('blue-line', 'red-line', 'brt', 'ferry')),
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table public.service_notices (
  id text primary key,
  type text not null check (type in ('info', 'warning', 'disruption', 'success')),
  title text not null,
  body text not null,
  affected_lines text[] not null default '{}',
  date text not null,
  active boolean not null default true,
  source_url text,
  source_label text
);

create table public.admin_allowlist (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_allowlist
    where user_id = (select auth.uid())
  );
$$;

create or replace function public.save_entity_record(
  p_entity jsonb,
  p_officers jsonb,
  p_sources jsonb
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.entities (
    id, name, category, description, location, address, phone,
    additional_phones, email, additional_emails, website, block,
    verified, needs_verification, last_updated, last_reviewed_at
  ) values (
    p_entity->>'id',
    p_entity->>'name',
    p_entity->>'category',
    p_entity->>'description',
    p_entity->>'location',
    p_entity->>'address',
    coalesce(p_entity->>'phone', ''),
    coalesce(array(select jsonb_array_elements_text(coalesce(p_entity->'additional_phones', '[]'::jsonb))), '{}'),
    coalesce(p_entity->>'email', ''),
    coalesce(array(select jsonb_array_elements_text(coalesce(p_entity->'additional_emails', '[]'::jsonb))), '{}'),
    nullif(p_entity->>'website', ''),
    nullif(p_entity->>'block', ''),
    coalesce((p_entity->>'verified')::boolean, false),
    coalesce((p_entity->>'needs_verification')::boolean, true),
    (p_entity->>'last_updated')::date,
    nullif(p_entity->>'last_reviewed_at', '')::date
  )
  on conflict (id) do update set
    name = excluded.name,
    category = excluded.category,
    description = excluded.description,
    location = excluded.location,
    address = excluded.address,
    phone = excluded.phone,
    additional_phones = excluded.additional_phones,
    email = excluded.email,
    additional_emails = excluded.additional_emails,
    website = excluded.website,
    block = excluded.block,
    verified = excluded.verified,
    needs_verification = excluded.needs_verification,
    last_updated = excluded.last_updated,
    last_reviewed_at = excluded.last_reviewed_at,
    updated_at = now();

  delete from public.entity_officers where entity_id = p_entity->>'id';
  insert into public.entity_officers (entity_id, sort_order, name, title, phone, email, verified)
  select p_entity->>'id', (item.ordinality - 1)::integer,
    item.value->>'name', item.value->>'title',
    nullif(item.value->>'phone', ''), nullif(item.value->>'email', ''),
    coalesce((item.value->>'verified')::boolean, false)
  from jsonb_array_elements(coalesce(p_officers, '[]'::jsonb))
    with ordinality as item(value, ordinality);

  delete from public.sources where entity_id = p_entity->>'id';
  insert into public.sources (entity_id, sort_order, label, url, checked_at, supports)
  select p_entity->>'id', (item.ordinality - 1)::integer,
    item.value->>'label', item.value->>'url',
    (item.value->>'checked_at')::date, item.value->>'supports'
  from jsonb_array_elements(coalesce(p_sources, '[]'::jsonb))
    with ordinality as item(value, ordinality);
end;
$$;

create or replace function public.save_lga_record(p_lga jsonb, p_officers jsonb)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.lgas (
    id, name, chairman, vice_chairman, address, phone, email, zone, wards,
    population, headquarters, area, coordinates, established, bio, history,
    landmarks, known_for, local_council_development_areas, postal_code
  ) values (
    p_lga->>'id', p_lga->>'name', p_lga->>'chairman',
    nullif(p_lga->>'vice_chairman', ''), p_lga->>'address', p_lga->>'phone',
    nullif(p_lga->>'email', ''), p_lga->>'zone', (p_lga->>'wards')::integer,
    p_lga->>'population', p_lga->>'headquarters', p_lga->>'area',
    p_lga->'coordinates', p_lga->>'established', p_lga->>'bio', p_lga->>'history',
    coalesce(p_lga->'landmarks', '[]'::jsonb),
    coalesce(p_lga->'known_for', '[]'::jsonb),
    coalesce(p_lga->'local_council_development_areas', '[]'::jsonb),
    nullif(p_lga->>'postal_code', '')
  )
  on conflict (id) do update set
    name = excluded.name, chairman = excluded.chairman,
    vice_chairman = excluded.vice_chairman, address = excluded.address,
    phone = excluded.phone, email = excluded.email, zone = excluded.zone,
    wards = excluded.wards, population = excluded.population,
    headquarters = excluded.headquarters, area = excluded.area,
    coordinates = excluded.coordinates, established = excluded.established,
    bio = excluded.bio, history = excluded.history, landmarks = excluded.landmarks,
    known_for = excluded.known_for,
    local_council_development_areas = excluded.local_council_development_areas,
    postal_code = excluded.postal_code;

  delete from public.lga_officers where lga_id = p_lga->>'id';
  insert into public.lga_officers (lga_id, sort_order, name, title)
  select p_lga->>'id', (item.ordinality - 1)::integer,
    item.value->>'name', item.value->>'title'
  from jsonb_array_elements(coalesce(p_officers, '[]'::jsonb))
    with ordinality as item(value, ordinality);
end;
$$;

create or replace function public.save_lcda_record(p_lcda jsonb, p_wards jsonb)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.lcdas (
    id, name, parent_lga_id, parent_lga_name, chairman, vice_chairman,
    address, phone, email, zone, established, headquarters, population,
    area, coordinates, bio, known_for
  ) values (
    p_lcda->>'id', p_lcda->>'name', p_lcda->>'parent_lga_id',
    p_lcda->>'parent_lga_name', p_lcda->>'chairman',
    nullif(p_lcda->>'vice_chairman', ''), p_lcda->>'address',
    p_lcda->>'phone', nullif(p_lcda->>'email', ''), p_lcda->>'zone',
    p_lcda->>'established', p_lcda->>'headquarters',
    nullif(p_lcda->>'population', ''), nullif(p_lcda->>'area', ''),
    p_lcda->'coordinates', p_lcda->>'bio',
    coalesce(p_lcda->'known_for', '[]'::jsonb)
  )
  on conflict (id) do update set
    name = excluded.name, parent_lga_id = excluded.parent_lga_id,
    parent_lga_name = excluded.parent_lga_name, chairman = excluded.chairman,
    vice_chairman = excluded.vice_chairman, address = excluded.address,
    phone = excluded.phone, email = excluded.email, zone = excluded.zone,
    established = excluded.established, headquarters = excluded.headquarters,
    population = excluded.population, area = excluded.area,
    coordinates = excluded.coordinates, bio = excluded.bio,
    known_for = excluded.known_for;

  delete from public.wards where lcda_id = p_lcda->>'id';
  insert into public.wards (id, lcda_id, sort_order, name, description)
  select item.value->>'id', p_lcda->>'id', (item.ordinality - 1)::integer,
    item.value->>'name', nullif(item.value->>'description', '')
  from jsonb_array_elements(coalesce(p_wards, '[]'::jsonb))
    with ordinality as item(value, ordinality);
end;
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;
revoke all on function public.save_entity_record(jsonb, jsonb, jsonb) from public, anon;
grant execute on function public.save_entity_record(jsonb, jsonb, jsonb) to authenticated, service_role;
revoke all on function public.save_lga_record(jsonb, jsonb) from public, anon;
grant execute on function public.save_lga_record(jsonb, jsonb) to authenticated, service_role;
revoke all on function public.save_lcda_record(jsonb, jsonb) from public, anon;
grant execute on function public.save_lcda_record(jsonb, jsonb) to authenticated, service_role;

alter table public.admin_allowlist enable row level security;
revoke all on public.admin_allowlist from anon, authenticated;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'entities', 'entity_officers', 'sources', 'lgas', 'lga_officers',
    'lcdas', 'wards', 'transport_datasets', 'service_notices'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all on public.%I from anon, authenticated', table_name);
    execute format('grant select on public.%I to anon, authenticated', table_name);
    execute format('grant insert, update, delete on public.%I to authenticated', table_name);
    execute format(
      'create policy %I on public.%I for select to anon, authenticated using (true)',
      table_name || '_public_read', table_name
    );
    execute format(
      'create policy %I on public.%I for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))',
      table_name || '_admin_manage', table_name
    );
  end loop;
end;
$$;

grant all on public.entities, public.entity_officers, public.sources, public.lgas,
  public.lga_officers, public.lcdas, public.wards, public.transport_datasets,
  public.service_notices to service_role;
grant usage, select on all sequences in schema public to service_role;
