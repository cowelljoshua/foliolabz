-- Run this once if you previously created client_profiles before the full-intake update.
alter table public.client_profiles
  add column if not exists intake jsonb not null default '{}'::jsonb;