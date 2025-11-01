import express from 'express';
import { generateResponse } from '../ai/aiRouter.js';

const router = express.Router();

// AI text generation endpoint
router.post('/ai', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await generateResponse(prompt);
    res.json({ 
      success: true, 
      response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Route Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate AI response',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;