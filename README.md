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

### AI Services
- `POST /api/ai` - Get AI response with automatic fallback (Gemini → DeepSeek → OpenAI)
  - Request body: `{"prompt": "your question here"}`
  - Returns AI response with provider information and fallback metadata

### General
- `GET /` - API information
- `GET /health` - Health check

## Environment Variables

See `.env.example` for required environment variables:
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - Token expiration time (default: 7d)
- `PORT` - Server port (default: 4000)

### AI Provider API Keys (Optional)
- `GEMINI_API_KEY` - Google Gemini API key (primary provider)
- `DEEPSEEK_API_KEY` - DeepSeek API key (secondary fallback)
- `OPENAI_API_KEY` - OpenAI API key (final fallback)

## AI Provider Fallback System

The `/api/ai` endpoint implements a robust multi-provider fallback system:

1. **Gemini** (Primary): Attempts first
2. **DeepSeek** (Secondary): Falls back if Gemini fails
3. **OpenAI** (Final): Last resort if both Gemini and DeepSeek fail

### Example Usage
```bash
curl -X POST http://localhost:4000/api/ai \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello, how are you today?"}'
```

See `AI_PROVIDER_TEST_REPORT.md` for detailed test results and configuration.