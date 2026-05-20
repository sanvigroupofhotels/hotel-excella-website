create table if not exists public.users (
  id uuid primary key,
  full_name text,
  role text default 'agent',
  created_at timestamptz default now()
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  quote_reference text unique not null,
  guest_name text not null,
  phone text not null,
  email text,
  source text,
  checkin date not null,
  checkout date not null,
  nights int not null,
  guests int not null,
  room_type text not null,
  breakfast_included boolean default true,
  room_tariff numeric(10,2) default 0,
  taxes numeric(10,2) default 0,
  extra_adults int default 0,
  extra_adult_charge numeric(10,2) default 0,
  extra_bed numeric(10,2) default 0,
  early_checkin numeric(10,2) default 0,
  late_checkout numeric(10,2) default 0,
  pet_charges numeric(10,2) default 0,
  driver_charge numeric(10,2) default 0,
  extra_breakfast_count int default 0,
  extra_breakfast_charge numeric(10,2) default 0,
  discount numeric(10,2) default 0,
  total_amount numeric(10,2) default 0,
  notes text,
  followup_date date,
  status text not null default 'Pending',
  deleted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.followups (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  followup_date timestamptz not null,
  notes text,
  completed boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.quote_activities (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  user_id uuid,
  action text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
