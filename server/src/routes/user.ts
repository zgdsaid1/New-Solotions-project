import express, { Response } from 'express'
import { authenticateToken, AuthRequest } from '../middleware/auth.js'
import { User } from '../models/User.js'

const router = express.Router()

// Get user profile (protected)
router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' })
      return
    }

    const user = await User.findById(req.user.userId)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    console.error('Profile error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Update user profile (protected)
router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' })
      return
    }

    const { name } = req.body
    
    if (!name) {
      res.status(400).json({ message: 'Name is required' })
      return
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name },
      { new: true }
    )

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error) {
    console.error('Profile update error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router