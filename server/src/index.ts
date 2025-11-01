import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import aiRouter from './ai/aiRouter.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors({
  origin: [
    /^https:\/\/.*\.app\.github\.dev$/,
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/ai', aiRouter)

// Basic route
app.get('/', (_req, res) => {
  res.json({ 
    message: 'AI Solutions Hub API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      user: '/api/user',
      ai: '/api/ai',
      health: '/health'
    }
  })
})

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start server
app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📡 API available at http://0.0.0.0:${PORT}`)
  console.log('💾 Using MongoDB for data storage')
  console.log("🔑 OPENAI key detected:", process.env.OPENAI_API_KEY ? "YES ✅" : "NO ❌");
  console.log("🔑 GROQ key detected:", process.env.GROQ_API_KEY ? "YES ✅" : "NO ❌");
  console.log("🔑 DEEPSEEK key detected:", process.env.DEEPSEEK_API_KEY ? "YES ✅" : "NO ❌");
})