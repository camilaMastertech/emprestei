create table if not exists public.loans (
  id text primary key,
  slug text not null unique,
  owner_id text not null,
  owner_phone text not null,
  photo text not null,
  object_name text not null,
  category text not null check (category in ('livros', 'eletronicos', 'ferramentas', 'outros')),
  borrower_name text not null,
  borrower_phone text not null,
  created_at timestamptz not null,
  due_at timestamptz not null,
  status text not null check (status in ('active', 'returned'))
);

create index if not exists loans_owner_created_idx on public.loans (owner_id, created_at desc);
create index if not exists loans_slug_idx on public.loans (slug);

alter table public.loans enable row level security;

drop policy if exists "public read loans by slug" on public.loans;
create policy "public read loans by slug"
on public.loans
for select
using (true);

drop policy if exists "public write pilot loans" on public.loans;
create policy "public write pilot loans"
on public.loans
for all
using (owner_id = 'pilot-user')
with check (owner_id = 'pilot-user');
