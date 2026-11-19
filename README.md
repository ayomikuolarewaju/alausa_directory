This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase setup

1. Create a Supabase project and copy its project URL and publishable key.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. Apply all SQL files in `supabase/migrations/` in filename order in the Supabase SQL Editor. This creates the directory, transport and editable editorial-content tables.
4. Create an administrator account in Supabase Auth, then add its user UUID to `public.admin_allowlist`:

   ```sql
   insert into public.admin_allowlist (user_id)
   values ('YOUR_AUTH_USER_UUID');
   ```

5. To seed from the Supabase SQL Editor, run `supabase/seed.sql`. It upserts the directory records and inserts transport datasets and initial editorial sections only when missing, preserving later administrator edits. Regenerate it after changing source data:

   ```bash
   npm run db:export-sql
   ```

   Alternatively, add the service-role key to `.env.local` as `SUPABASE_SERVICE_ROLE_KEY` and run `npm run db:seed`. Do not expose the service-role key to client-side code or commit `.env.local`.

The seed does not populate `admin_allowlist`: add each administrator's real Supabase Auth user UUID separately after creating that Auth user. Editorial sections and transport datasets can be edited in the authenticated `/admin` dashboard. New editorial sections use a page key already rendered by the site (`home`, `lgas`, `brt`, `ferry`, `transport`, or `min-science`).

Without Supabase URL/key configuration, public pages use the bundled `lib/` data. Once configured, page reads use Supabase and report query/schema errors instead of silently falling back. Admin writes require a verified Supabase session, membership in `admin_allowlist`, and database RLS authorization.

The admin sign-in and dashboard are available at `/admin/login` and `/admin`.
