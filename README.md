# StoneAura Studio

This repository contains the **StoneAura Studio** website built with **Vite + React** and a separate **admin dashboard** for managing products, collections, and orders.

## Features
- Premium UI with glassmorphism, gradient accents, and responsive design.
- Product browsing, filtering, and sorting on the Shop page.
- Admin panel with authentication via Supabase.
- Fallback dummy data for offline development.
- Optimized for mobile and desktop.

## Getting Started
```bash
# Install dependencies
npm install

# Run the storefront
npm run dev

# Run the admin dashboard (in a separate terminal)
cd admin-dashboard
npm run dev
```

## Deployment
- The site can be deployed to any static hosting (e.g., Vercel, Netlify) after running `npm run build`.
- Ensure Supabase environment variables are set in `.env`.

## License
MIT License.
