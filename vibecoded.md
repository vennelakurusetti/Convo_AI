# Convo AI - Vibecoded Documentation

## Project Overview
Convo AI is a minimalist, high-performance AI assistant built with a modern React frontend and a Node.js/Express backend. It leverages the Groq API for lightning-fast inference and MongoDB Atlas for query persistence.

## Core Tech Stack
- **Frontend:** React (Vite), Tailwind CSS v4, Lucide Icons
- **Backend:** Node.js, Express, Mongoose, Groq SDK
- **Database:** MongoDB Atlas (Cloud)
- **Hosting:** Vercel (Independent Frontend & Backend Projects)

## Key Achievements & Fixes

### 1. UI & UX Refinement
- **Tailwind v4 Migration:** Upgraded the styling system to Tailwind CSS v4 for improved build speeds and modern CSS features.
- **Code Indentation Fix:** Resolved issues with unformatted code blocks in AI responses by implementing `whitespace-pre-wrap` and the Tailwind Typography (`prose`) plugin.
- **Interactive Features:** 
    - Added "Copy to Clipboard" functionality with visual success feedback for easy message sharing.
    - Improved "New Chat" logic to automatically clear history and focus the input field for a seamless user experience.
- **Premium Aesthetic:** Implemented a clean, dark-themed UI with subtle gradients, glassmorphism, and smooth animations.

### 2. Backend & Serverless Optimization
- **Independent Vercel Deployment:** Configured the project roots and added a backend-specific `vercel.json` to allow deploying the frontend and backend as two distinct Vercel projects from a single repository.
- **Serverless Database Connectivity:** Optimized the MongoDB connection logic in `db.js` to reuse existing connections and prevent timeouts in a serverless environment.
- **Strict Environment Management:** Updated the frontend to strictly use `import.meta.env.VITE_API_BASE_URL` without fallbacks, ensuring reliable production configurations.
- **API Reliability:** Added `connectDB()` directly into the controller to ensure database availability during serverless execution.

### 3. Documentation & Repository Standards
- **MIT License:** Added an official license to the project.
- **JSDoc Documentation:** Implemented comprehensive JSDoc comments across all backend controllers, services, and models for better code maintainability.
- **Deployment Guide:** Created a detailed step-by-step guide for setting up environment variables and project roots on Vercel.

### 4. Critical Troubleshooting
- **MongoDB Atlas Connectivity:** Diagnosed and resolved a connection timeout by identifying the need to whitelist Vercel's dynamic IPs (`0.0.0.0/0`) in MongoDB Atlas Network Access.
- **CORS & Routing:** Verified and secured API routes and CORS policies for seamless frontend-backend communication.

## Deployment Status
- **Backend:** [https://convo-ai-be.vercel.app/](https://convo-ai-be.vercel.app/)
- **Frontend:** [https://convo-ai-eight.vercel.app/](https://convo-ai-eight.vercel.app/) (or your final Vercel URL)

---
*Documentation updated on Monday, 20 April 2026.*
