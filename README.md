# SkyAlgo Inspired Full Source

This package includes:
- `skyalgo-inspired.html` — main frontend website file
- `backend/server.js` — Node.js Express starter backend for Razorpay order creation and signature verification
- `backend/package.json` — backend dependencies
- `backend/.env.example` — environment variable template

## Frontend
Open `skyalgo-inspired.html` directly in a browser, or host it on Netlify/Vercel/GitHub Pages.

## Backend setup
1. Go to `backend/`
2. Run `npm install`
3. Copy `.env.example` to `.env`
4. Fill in your Razorpay key ID and secret
5. Run `npm start`

## Notes
- Supabase auth is prepared in the frontend structure but you still need to add your actual project URL and publishable key.
- Razorpay orders should be created on the backend, and payment signatures must be verified server-side.
- TradingView is embedded using website widget style integration.
