import express from 'express';
import { getAIResponse } from '../utils/aiProviders.js';

const router = express.Router();

// POST /api/ai - Get AI response with fallback
router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📨 Received AI request');
    console.log('═══════════════════════════════════════════════════════');

    const result = await getAIResponse(prompt);

    console.log('═══════════════════════════════════════════════════════');
    console.log('📤 Sending response to client');
    console.log('═══════════════════════════════════════════════════════\n');

    if (result.success) {
      return res.json({
        success: true,
        provider: result.provider,
        response: result.response,
        metadata: {
          fallbackChain: result.fallbackChain,
          fallbackOccurred: result.fallbackChain.length > 1,
          failedProviders: Object.keys(result.errors),
          errors: result.errors
        }
      });
    } else {
      return res.status(503).json({
        success: false,
        error: 'All AI providers failed',
        metadata: {
          fallbackChain: result.fallbackChain,
          errors: result.errors
        }
      });
    }
  } catch (error: any) {
    console.error('❌ Error in AI route:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
