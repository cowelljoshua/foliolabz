-- Run this entire file in Supabase: SQL Editor > New query.
-- Add a client profile before their first portal visit. The portal creates their Auth user and emails their sign-in link automatically.

create table if not exists public.client_profiles (
  email text primary key check (email = lower(email)),
  name text not null,
  package text not null check (package in ('launch', 'pro')),
  rush boolean not null default false,
  balance_due integer not null default 0 check (balance_due >= 0),
  build_status text not null default 'brief' check (build_status in ('brief', 'building', 'review', 'polish', 'live')),
  pay_link text not null default '',
  domain text not null default '',
  domain_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.client_profiles
  add column if not exists intake jsonb not null default '{}'::jsonb;

alter table public.client_profiles enable row level security;

-- A signed-in client can read only the row that matches their verified email.
create policy "Clients can view their own portal"
on public.client_profiles
for select
to authenticated
using (email = lower((select auth.jwt() ->> 'email')));

-- Clients cannot create, edit, or delete profile records from the browser.
revoke insert, update, delete on public.client_profiles from anon, authenticated;
grant select on public.client_profiles to authenticated;

-- Add this profile before the client signs in for the first time.
-- Replace every placeholder before running this example:
-- insert into public.client_profiles (email, name, package, rush, balance_due, build_status, pay_link, domain, domain_active)
-- values ('client@example.com', 'Client Name', 'launch', false, 250, 'brief', '', '', false);