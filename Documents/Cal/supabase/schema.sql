-- CalendarHub schema
-- NextAuth is the identity source. These tables are written only by trusted
-- Next.js route handlers using SUPABASE_SERVICE_ROLE_KEY. Do not expose the
-- service role key to browser code.

create table if not exists public.calendar_events (
  id text primary key,
  user_id text not null,
  google_event_id text,
  google_status text,
  title text not null check (char_length(title) > 0 and char_length(title) <= 200),
  description text,
  location text,
  start_at timestamptz not null,
  end_at timestamptz not null,
  all_day boolean not null default false,
  color text not null default 'blue' check (color in ('blue', 'green', 'purple', 'orange', 'red', 'pink', 'teal')),
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint calendar_events_end_after_start check (end_at > start_at)
);

create table if not exists public.calendar_sync_state (
  user_id text not null,
  calendar_id text not null default 'primary',
  next_sync_token text,
  last_synced_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, calendar_id)
);

create unique index if not exists calendar_events_user_google_event_id_idx
  on public.calendar_events (user_id, google_event_id)
  where google_event_id is not null;

create index if not exists calendar_events_user_start_idx
  on public.calendar_events (user_id, start_at);

create index if not exists calendar_events_user_deleted_idx
  on public.calendar_events (user_id, deleted_at);

create index if not exists calendar_sync_state_lookup_idx
  on public.calendar_sync_state (user_id, calendar_id);

alter table public.calendar_events enable row level security;
alter table public.calendar_sync_state enable row level security;

-- No anon/authenticated policies are created because this starter uses NextAuth,
-- not Supabase Auth. Service role access bypasses RLS and route handlers enforce
-- ownership with user_id filters.
revoke all on public.calendar_events from anon, authenticated;
revoke all on public.calendar_sync_state from anon, authenticated;
