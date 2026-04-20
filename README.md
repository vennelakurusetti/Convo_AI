# AI Assistant - Single Query AI Application

A minimalist, single-query AI assistant web application that integrates Groq API for high-performance responses and MongoDB Atlas for query persistence.

## Features
- Single question input, single AI response.
- Independent request lifecycle (no chat memory).
- High-speed inference using `llama-3.1-8b-instant`.
- Query and response logging in MongoDB.
- Separate frontend and backend deployment.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Axios.
- **Backend:** Node.js, Express, Mongoose, Groq SDK.
- **Database:** MongoDB Atlas.
- **Inference:** Groq API.

## Setup Instructions

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file with the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_uri
   GROQ_API_KEY=your_groq_api_key
   ```
4. `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. Create a `.env` file with:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. `npm run dev`

## Deployment
- **Frontend:** Deploy the `frontend/` directory to Vercel.
- **Backend:** Deploy the `backend/` directory to Vercel (using Serverless Functions) or any Node.js hosting.
