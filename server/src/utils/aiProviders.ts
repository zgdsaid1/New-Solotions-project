import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import axios from 'axios';

export interface AIResponse {
  success: boolean;
  provider: string;
  response?: string;
  error?: string;
  fallbackAttempted?: boolean;
}

// Gemini Provider
export async function callGemini(prompt: string): Promise<AIResponse> {
  console.log('🔷 Attempting Gemini API call...');
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log('❌ Gemini failed: GEMINI_API_KEY not configured');
      return {
        success: false,
        provider: 'Gemini',
        error: 'GEMINI_API_KEY not configured'
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('✅ Gemini responded successfully');
    return {
      success: true,
      provider: 'Gemini',
      response: text
    };
  } catch (error: any) {
    console.log('❌ Gemini failed:', error.message);
    return {
      success: false,
      provider: 'Gemini',
      error: error.message
    };
  }
}

// DeepSeek Provider
export async function callDeepSeek(prompt: string): Promise<AIResponse> {
  console.log('🔶 Attempting DeepSeek API call...');
  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      console.log('❌ DeepSeek failed: DEEPSEEK_API_KEY not configured');
      return {
        success: false,
        provider: 'DeepSeek',
        error: 'DEEPSEEK_API_KEY not configured'
      };
    }

    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    const text = response.data.choices[0].message.content;
    console.log('✅ DeepSeek responded successfully');
    return {
      success: true,
      provider: 'DeepSeek',
      response: text
    };
  } catch (error: any) {
    console.log('❌ DeepSeek failed:', error.message);
    return {
      success: false,
      provider: 'DeepSeek',
      error: error.response?.data?.error?.message || error.message
    };
  }
}

// OpenAI Provider
export async function callOpenAI(prompt: string): Promise<AIResponse> {
  console.log('🔵 Attempting OpenAI API call...');
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.log('❌ OpenAI failed: OPENAI_API_KEY not configured');
      return {
        success: false,
        provider: 'OpenAI',
        error: 'OPENAI_API_KEY not configured'
      };
    }

    const openai = new OpenAI({ apiKey });
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500
    });

    const text = completion.choices[0].message.content || '';
    console.log('✅ OpenAI responded successfully');
    return {
      success: true,
      provider: 'OpenAI',
      response: text
    };
  } catch (error: any) {
    console.log('❌ OpenAI failed:', error.message);
    return {
      success: false,
      provider: 'OpenAI',
      error: error.message
    };
  }
}

// Main AI handler with fallback sequence
export async function getAIResponse(prompt: string): Promise<{
  success: boolean;
  provider: string;
  response: string;
  fallbackChain: string[];
  errors: { [key: string]: string };
}> {
  console.log('\n🚀 Starting AI request with fallback sequence: Gemini → DeepSeek → OpenAI');
  console.log(`📝 Prompt: "${prompt}"\n`);
  
  const fallbackChain: string[] = [];
  const errors: { [key: string]: string } = {};

  // Try Gemini first
  const geminiResult = await callGemini(prompt);
  fallbackChain.push('Gemini');
  if (geminiResult.success) {
    console.log('\n✨ Final result: Gemini succeeded (no fallback needed)\n');
    return {
      success: true,
      provider: 'Gemini',
      response: geminiResult.response!,
      fallbackChain,
      errors
    };
  }
  errors['Gemini'] = geminiResult.error!;
  console.log('⚠️  Falling back to DeepSeek...\n');

  // Try DeepSeek second
  const deepseekResult = await callDeepSeek(prompt);
  fallbackChain.push('DeepSeek');
  if (deepseekResult.success) {
    console.log('\n✨ Final result: DeepSeek succeeded (after Gemini fallback)\n');
    return {
      success: true,
      provider: 'DeepSeek',
      response: deepseekResult.response!,
      fallbackChain,
      errors
    };
  }
  errors['DeepSeek'] = deepseekResult.error!;
  console.log('⚠️  Falling back to OpenAI...\n');

  // Try OpenAI last
  const openaiResult = await callOpenAI(prompt);
  fallbackChain.push('OpenAI');
  if (openaiResult.success) {
    console.log('\n✨ Final result: OpenAI succeeded (after Gemini + DeepSeek fallback)\n');
    return {
      success: true,
      provider: 'OpenAI',
      response: openaiResult.response!,
      fallbackChain,
      errors
    };
  }
  errors['OpenAI'] = openaiResult.error!;

  console.log('\n❌ All providers failed\n');
  return {
    success: false,
    provider: 'None',
    response: 'All AI providers failed',
    fallbackChain,
    errors
  };
}
