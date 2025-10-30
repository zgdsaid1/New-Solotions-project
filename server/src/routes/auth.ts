import express, { Request, Response } from 'express'
import { User } from '../models/User.js'
import { generateToken } from '../utils/jwt.js'

const router = express.Router()

// Register new user
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, password } = req.body

    // Validate input
    if (!email || !name || !password) {
      res.status(400).json({ message: 'Email, name, and password are required' })
      return
    }

    if (password.length < 6) {
      res.status(400).json({ message: 'Password must be at least 6 characters' })
      return
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email' })
      return
    }

    // Create new user
    const user = new User({ email, name, password })
    await user.save()

    // Generate token
    const token = generateToken({ 
      userId: user._id.toString(), 
      email: user.email 
    })

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Login user
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' })
      return
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' })
      return
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' })
      return
    }

    // Generate token
    const token = generateToken({ 
      userId: user._id.toString(), 
      email: user.email 
    })

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get current user (protected route)
router.get('/me', async (_req: Request, res: Response): Promise<void> => {
  try {
    // This would need auth middleware in real implementation
    res.json({ message: 'This endpoint requires authentication middleware' })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router