-- Run once in Supabase SQL Editor before deploying the project-tracker code.
-- Public/client-safe progress stays on client_profiles. Private owner operations stay in project_operations.

alter table public.client_profiles
  add column if not exists next_step text not null default 'I am reviewing your brief and will share the next update soon.',
  add column if not exists target_launch_date date,
  add column if not exists preview_url text not null default '',
  add column if not exists client_progress jsonb not null default '[]'::jsonb;

create table if not exists public.project_operations (
  email text primary key references public.client_profiles(email) on update cascade on delete cascade,
  owner_notes text not null default '',
  blocked_by text not null default '',
  next_owner_action text not null default '',
  tracker jsonb not null default '{"tasks": []}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.project_operations enable row level security;

-- No browser role can read or modify the private operations table.
revoke all on public.project_operations from anon, authenticated;

-- Ensure every existing client has a matching private operations row.
insert into public.project_operations (email)
select email from public.client_profiles
on conflict (email) do nothing;
