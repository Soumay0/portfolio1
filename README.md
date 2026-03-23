# Souma Portfolio (React + Tailwind + Node + MongoDB)

Modern, dynamic developer portfolio with a futuristic UI, API-driven content, and production-ready structure.

## Features

- React + Vite + Tailwind CSS v4 frontend
- Framer Motion animations and smooth transitions
- Dark-first experience with theme toggle
- Dynamic projects and certificates from backend API
- Project filtering by tech stack
- Certificate modal preview
- Contact form with Express endpoint
- GitHub API integration for automatic repo highlights

## Backend Endpoints

- GET `/projects`
- GET `/certificates`
- GET `/api/projects`
- GET `/api/certificates`
- POST `/api/contact`
- GET `/api/health`

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file inside `server/`:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=portfolio
PORT=5000
```

3. Run frontend + backend together:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

If MongoDB is unavailable, fallback data is used so the UI remains functional.

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Push repository to GitHub.
2. Import into Vercel.
3. Keep build command as `npm run build`.
4. Ensure environment variables are configured in Vercel:
   - `MONGODB_URI`
   - `MONGODB_DB_NAME`
5. Deploy.

`vercel.json` is already configured for static frontend + serverless API routing.
