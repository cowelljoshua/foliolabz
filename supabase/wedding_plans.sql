-- Separate wedding workspace. Authorization uses trusted, verified auth email.
create table public.wedding_plans (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 partner_email text not null check (partner_email = lower(partner_email)),
 data jsonb not null default '{}'::jsonb,
 revision integer not null default 0,
 created_at timestamptz not null default now(),
 unique(owner_id)
);
alter table public.wedding_plans enable row level security;
create policy wedding_read on public.wedding_plans for select to authenticated using ((select auth.uid())=owner_id or lower((select auth.jwt())->>'email')=partner_email);
create policy wedding_create on public.wedding_plans for insert to authenticated with check ((select auth.uid())=owner_id);
create policy wedding_update on public.wedding_plans for update to authenticated using ((select auth.uid())=owner_id or lower((select auth.jwt())->>'email')=partner_email) with check ((select auth.uid())=owner_id or lower((select auth.jwt())->>'email')=partner_email);
revoke all on public.wedding_plans from anon, authenticated;
grant select, insert on public.wedding_plans to authenticated;
grant update(data,revision) on public.wedding_plans to authenticated;
create index wedding_partner_email_idx on public.wedding_plans(partner_email);
