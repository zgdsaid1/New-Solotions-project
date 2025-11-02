"use client";

import { useState, useEffect, useRef } from "react";
import { callTextGenerationApi } from "./api-call";
import { Send, Bot, User, HelpCircle, Mail } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function HuBiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      text: `Hey there! 👋 I'm HuBi, your friendly AI assistant!

I'm here to help you with everything about our platform:

🤖 **What I can help with:**
• Platform features and how to use them
• Pricing plans (Starter $9, Pro $29, Business $99, Enterprise Custom)
• Getting started guides
• Technical support and troubleshooting
• Feature explanations and best practices

� **Pro tip:** Just ask me anything in natural language - I'm here to chat and help!

📧 **Need human support?** Contact our team at: **support@aisolutionshub.co**

What would you like to know about today? 😊`,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const aiPrompt = `You are HuBi, a friendly and helpful AI assistant for the AI Solutions Hub platform. You should respond in a conversational, warm, and professional tone.

Platform Details:
- **Pricing Plans:**
  • Starter ($9/month): 10,000 AI credits, basic tools, email support, 5 projects
  • Pro ($29/month): 50,000 AI credits, all tools, priority support, analytics, unlimited projects, API access
  • Business ($99/month): 200,000 AI credits, team management, advanced security, custom models, SLA guarantee
  • Enterprise (Custom): Unlimited credits, 24/7 support, custom deployment, dedicated account manager

- **Features:** AI Text Generation, Image Analysis, Voice-to-Text, Data Analytics, Custom AI Models, Content Optimization
- **Support:** Technical assistance, onboarding, best practices guidance
- **API Access:** Available for Pro+ plans for custom integrations

Guidelines:
- Be conversational and friendly
- Use emojis sparingly but effectively
- Provide specific, helpful information
- If asked about technical issues or complex licensing, direct to: support@aisolutionshub.co
- Always try to be helpful and solution-oriented

User's question: "${input}"

Respond naturally and helpfully:`;

      const result = await callTextGenerationApi({ prompt: aiPrompt });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.response || "I apologize, but I'm having trouble responding right now. Please contact support@aisolutionshub.co for assistance.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm experiencing technical difficulties. Please try again or contact support@aisolutionshub.co for immediate assistance.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = [
    "What's the difference between your pricing plans?",
    "How do I get started with your AI tools?",
    "Can you tell me about your platform features?",
    "What kind of support do you offer?",
    "Do you have an API for developers?",
    "How does the Pro plan work?"
  ];

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto py-8 px-4 h-screen flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              AI Assistant
            </h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          💬 Chat with your intelligent AI assistant about anything related to our platform, pricing, or get help with your questions!
        </p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-gray-900/50 rounded-lg border border-gray-700 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start gap-3 max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isUser 
                    ? "bg-blue-600" 
                    : "bg-gradient-to-br from-purple-500 to-blue-600"
                }`}>
                  {message.isUser ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.isUser
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-100 border border-gray-700"
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.text}
                  </div>
                  <div className={`text-xs mt-2 ${
                    message.isUser ? "text-blue-100" : "text-gray-500"
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="p-4 border-t border-gray-700 bg-gray-900/30">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">💡 Quick questions to get you started:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="text-sm px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-blue-900/20 hover:to-purple-900/20 text-gray-300 hover:text-white rounded-lg border border-gray-600 hover:border-blue-500/50 transition-all duration-300 text-left hover:shadow-lg hover:scale-105"
                >
                  <span className="text-blue-400 mr-2">•</span>
                  {question}
                </button>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Or type your own question below! 👇
              </p>
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask HuBi anything about AI Solutions Hub..."
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg px-4 py-3 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <Mail className="w-4 h-4" />
          <span>Need help? Contact us at</span>
          <a href="mailto:support@aisolutionshub.co" className="text-blue-400 hover:text-blue-300 underline">
            support@aisolutionshub.co
          </a>
        </div>
      </div>
      </div>
    </ProtectedRoute>
  );
}
