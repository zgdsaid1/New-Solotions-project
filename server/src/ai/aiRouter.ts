import express from "express";
import { AIModelProvider } from "./routing.js";
import { GeminiProvider } from "./providers/GeminiProvider.js";
import { DeepSeekProvider } from "./providers/DeepSeekProvider.js";
import { OpenAIProvider } from "./providers/OpenAIProvider.js";

const router = express.Router();

async function generateResponse(prompt: string): Promise<string> {
  // Initialize providers in fallback order
  const providers: AIModelProvider[] = [
    new DeepSeekProvider(),   // Primary (fast + free)
    new GeminiProvider(),     // Secondary fallback
    new OpenAIProvider(),     // Last fallback
  ];

  console.log(`[AI Router] Starting fallback sequence for prompt: "${prompt.substring(0, 50)}..."`);

  // Try each provider in order
  for (let i = 0; i < providers.length; i++) {
    const provider = providers[i];
    try {
      console.log(`[AI Router] Trying ${provider.name} (${i + 1}/${providers.length})...`);
      const result = await provider.generateText(prompt);
      
      if (result && result.trim().length > 0) {
        console.log(`[AI Router] ✅ ${provider.name} succeeded with ${result.length} characters`);
        return result;
      } else {
        throw new Error('Empty response received');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      console.warn(`[AI Router] ❌ ${provider.name} failed: ${errorMsg}`);
      
      // If this is the last provider, we'll throw the error
      if (i === providers.length - 1) {
        console.error(`[AI Router] All ${providers.length} providers exhausted`);
      } else {
        console.log(`[AI Router] Switching to next provider...`);
      }
    }
  }
  
  throw new Error("All AI providers failed - no response generated");
}

router.post("/", async (req, res) => {
      const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ error: "Missing prompt" });

          try {
                const response = await generateResponse(prompt);
                    return res.json({ response });
          } catch (err) {
                return res.status(500).json({ error: "AI processing failed", details: (err as Error).message });
          }
});

export default router;