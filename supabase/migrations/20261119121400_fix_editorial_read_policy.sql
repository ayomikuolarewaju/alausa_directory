drop policy if exists editorial_sections_public_read
  on public.editorial_sections;

create policy editorial_sections_public_read
  on public.editorial_sections
  for select
  to anon, authenticated
  using (published);

grant execute on function public.is_admin() to authenticated;
