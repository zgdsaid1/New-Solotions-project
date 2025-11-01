import axios from 'axios';
import { AIModelProvider } from '../routing.js';

export class DeepSeekProvider implements AIModelProvider {
  public readonly name = 'DeepSeek';

  constructor() {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error('DEEPSEEK_API_KEY environment variable is required');
    }
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const apiKey = process.env.DEEPSEEK_API_KEY;
      
      const response = await axios.post(
        'https://api.deepseek.com/chat/completions',
        {
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data?.choices?.[0]?.message?.content || '';
    } catch (error) {
      console.error('DeepSeek API error:', error);
      throw new Error('Failed to generate text from DeepSeek');
    }
  }
}