import { AIModelProvider } from '../routing.js';

/**
 * Mock AI provider for testing purposes
 * This provider generates responses based on simple keyword matching
 */
export class MockProvider implements AIModelProvider {
  public readonly name = 'Mock (Test Mode)';

  async generateText(prompt: string): Promise<string> {
    console.log('[MockProvider] Generating mock response for testing...');
    
    const lowerPrompt = prompt.toLowerCase();
    
    // Welcome/Hello messages
    if (lowerPrompt.includes('hello') || /\bhi\b/.test(lowerPrompt)) {
      return "Hello! I'm HuBi, your AI assistant for AI Solutions Hub. I'm here to help you learn about our platform, features, pricing, and more. What would you like to know?";
    }
    
    // Pricing questions
    if (lowerPrompt.includes('pricing') || lowerPrompt.includes('price') || lowerPrompt.includes('cost') || lowerPrompt.includes('plan')) {
      return `We offer flexible pricing plans to suit different needs:

📦 **Starter Plan** - $9/month
   • 10,000 AI credits
   • Basic text generation
   • Email support

🚀 **Pro Plan** - $29/month
   • 50,000 AI credits
   • Advanced AI models
   • Priority support
   • Image processing

💼 **Business Plan** - $99/month
   • 200,000 AI credits
   • All premium features
   • Custom AI models
   • Dedicated support

🏢 **Enterprise Plan** - Custom pricing
   • Unlimited credits
   • White-label solutions
   • 24/7 support
   • Custom integrations

For more details, visit our pricing page or contact us at support@aisolutionshub.co`;
    }
    
    // Features/Tools questions
    if (lowerPrompt.includes('feature') || lowerPrompt.includes('tool') || lowerPrompt.includes('offer') || lowerPrompt.includes('capabilities')) {
      return `AI Solutions Hub offers a comprehensive suite of AI-powered tools:

🤖 **Text Generation**: Create high-quality content, articles, and marketing copy
🖼️ **Image Processing**: AI-powered image enhancement and manipulation
🎙️ **Audio & Speech**: Voice synthesis and speech recognition
📊 **Data Analytics**: Advanced data analysis and insights
🔧 **Custom AI Models**: Build and deploy your own AI solutions
💬 **Chat Assistants**: Like me! Intelligent conversational AI

All tools are accessible through our intuitive dashboard and powerful API. Would you like to know more about any specific feature?`;
    }
    
    // Getting started questions
    if (lowerPrompt.includes('start') || lowerPrompt.includes('begin') || lowerPrompt.includes('how to use')) {
      return `Getting started with AI Solutions Hub is easy:

1. **Sign Up**: Create your free account at our registration page
2. **Choose a Plan**: Select the pricing plan that fits your needs
3. **Explore Tools**: Access our suite of AI tools from your dashboard
4. **Generate Content**: Start creating with our AI-powered tools
5. **Monitor Usage**: Track your credits and usage in real-time

New users get bonus credits to try out all features. Need help getting started? Contact us at support@aisolutionshub.co`;
    }
    
    // Support/Help questions
    if (lowerPrompt.includes('support') || lowerPrompt.includes('help') || lowerPrompt.includes('contact') || lowerPrompt.includes('assistance')) {
      return `We're here to help! You can reach our support team through:

📧 **Email**: support@aisolutionshub.co
💬 **Live Chat**: Available in your dashboard (Pro and above)
📚 **Documentation**: Comprehensive guides and tutorials
🎓 **Video Tutorials**: Step-by-step video guides

**Support Hours**:
• Starter & Pro: Email support (24-48 hour response)
• Business: Priority support (12-hour response)
• Enterprise: 24/7 dedicated support

What specific issue can I help you with today?`;
    }
    
    // Licensing questions
    if (lowerPrompt.includes('licens') || lowerPrompt.includes('usage rights') || lowerPrompt.includes('commercial')) {
      return `Our licensing is straightforward and flexible:

✅ **Full Commercial Rights**: All content generated belongs to you
✅ **No Attribution Required**: Use generated content freely
✅ **API Access**: Integrate into your applications
✅ **White-Label Options**: Available for Enterprise plans

For detailed licensing information and custom arrangements, contact our legal team at support@aisolutionshub.co`;
    }
    
    // API/Integration questions
    if (lowerPrompt.includes('api') || lowerPrompt.includes('integration') || lowerPrompt.includes('integrate')) {
      return `Our API makes integration simple and powerful:

🔌 **RESTful API**: Easy-to-use REST endpoints
📖 **Comprehensive Documentation**: Complete API reference
🔑 **API Keys**: Secure authentication
⚡ **High Performance**: Fast response times
🔄 **Webhooks**: Real-time notifications

API access is available on Pro plans and above. Check our developer documentation for implementation guides and code examples.`;
    }
    
    // Default response for other questions
    return `Thank you for your question! I'm HuBi, your AI assistant for AI Solutions Hub.

I can help you with information about:
• Platform features and AI tools
• Pricing plans and subscription options
• Getting started guides
• Support and technical assistance
• Licensing and usage rights

For detailed support or specific inquiries, please contact us at support@aisolutionshub.co

Could you rephrase your question or let me know what specific aspect you'd like to learn about?`;
  }
}
