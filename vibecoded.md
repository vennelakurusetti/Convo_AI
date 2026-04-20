# Vibecoded Documentation

## AI Tools & Configurations
- **Gemini CLI:** Used for project scaffolding, backend logic implementation, and frontend UI design.
- **Groq API:** Model `llama-3.1-8b-instant` used for lightning-fast responses.
- **Tailwind CSS:** Migrated to Tailwind v4 for modern performance and configuration efficiency.

## Methodology
The project follows a modular architecture to ensure separation of concerns and ease of deployment. Each request to the backend is treated as an independent transaction, ensuring clean state management on both sides.

## Deployment Guide (Independent Vercel Projects)
This project is structured to be deployed as two separate Vercel projects from a single GitHub repository.

### 1. Backend Deployment
- **Project Name:** `convo-ai-backend`
- **Root Directory:** `backend`
- **Framework Preset:** `Node.js`
- **Environment Variables:**
    - `MONGO_URI`: Your MongoDB Atlas connection string.
    - `GROQ_API_KEY`: Your Groq API key.
    - `NODE_ENV`: `production`

### 2. Frontend Deployment
- **Project Name:** `convo-ai-frontend`
- **Root Directory:** `frontend`
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:**
    - `VITE_API_BASE_URL`: The URL of your deployed backend (e.g., `https://convo-ai-beta.vercel.app/api`).

## Recent Updates
- **Frontend Refactor:** Migrated to Tailwind CSS v4 syntax (`@import "tailwindcss"`) and renamed configuration to `tailwind.config.mjs` for ESM compatibility.
- **UI Enhancements:** Fixed code indentation, added "Copy to Clipboard", and improved "New Chat" focus.
- **Serverless Optimization:**
    - Modified `backend/server.js` and `backend/config/db.js` for Vercel Serverless Function compatibility.
    - Added `backend/vercel.json` for independent routing.
    - Removed root `vercel.json` to support separate project roots.
