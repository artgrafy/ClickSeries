-- Create recipes table
create table public.recipes (
  recipe_id uuid not null default gen_random_uuid(),
  title text not null,
  tags text[] null,
  ingredients jsonb null,
  steps jsonb null,
  source text null,
  created_at timestamp with time zone not null default now(),
  image_url text null,
  cooking_time text null,
  difficulty text null,
  constraint recipes_pkey primary key (recipe_id)
);

-- Set up Row Level Security (RLS)
alter table public.recipes enable row level security;

-- Create policy to allow everyone to read
create policy "Allow public read access"
on public.recipes for select
to public
using ( true );

-- Create policy to allow everyone to insert (for demo purposes, restrict in production)
create policy "Allow public insert access"
on public.recipes for insert
to public
with check ( true );
