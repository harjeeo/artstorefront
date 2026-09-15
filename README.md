# Artisan — Next.js Storefront

A handmade & original goods marketplace frontend, built with Next.js (App Router), TypeScript, Tailwind CSS v4, and HugeIcons.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run typecheck` — TypeScript check
- `npm run lint` — oxlint

## Project structure

- `app/` — Next.js App Router routes (route segments, layouts, metadata)
- `src/views/` — page-level components rendered by `app/**/page.tsx`
- `src/components/` — shared UI components
- `src/context/` — React Context providers (cart, wishlist, orders, reviews)
- `src/data/` — mock/placeholder data (a real backend is being built separately)
