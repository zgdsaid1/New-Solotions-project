import express from 'express';
import { generateResponse } from '../ai/aiRouter.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  
  // Validate prompt
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    return res.status(400).json({ error: 'Valid prompt is required' });
  }

  try {
    console.log(`[AI Route] Received prompt: "${prompt.substring(0, 50)}..."`);
    const text = await generateResponse(prompt);
    console.log(`[AI Route] Successfully generated response: ${text.length} characters`);
    
    res.json({ 
      success: true,
      response: text,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[AI Route] Error:', errorMsg);
    res.status(500).json({ 
      error: 'AI processing failed',
      message: errorMsg
    });
  }
});

export default router;