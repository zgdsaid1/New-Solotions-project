# AI Solutions Hub - Monorepo

A full-stack TypeScript monorepo with React frontend and Express backend.

## Project Structure

```
├── client/          # Vite + React + TypeScript + TailwindCSS
├── server/          # Node.js + Express + TypeScript + MongoDB
├── package.json     # Workspace configuration
├── .gitignore
└── .env.example     # Environment variables template
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `server/.env` and fill in your MongoDB URI and JWT secret:
```bash
cp .env.example server/.env
```

3. Start development servers:
```bash
npm run dev
```

This will start both client (port 5173) and server (port 4000) concurrently.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### User Management
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/profile` - Update user profile (protected)

### General
- `GET /` - API information
- `GET /health` - Health check

## Environment Variables

See `.env.example` for required environment variables:
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - Token expiration time (default: 7d)
- `PORT` - Server port (default: 4000)