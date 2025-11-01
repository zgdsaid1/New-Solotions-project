"use client";

import { useState, useEffect, useRef } from "react";
import { callTextGenerationApi } from "./api-call";
import { Send, Bot, User, HelpCircle, Mail } from "lucide-react";

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
      text: `Hello! I'm HuBi, your AI assistant for AI Solutions Hub. I'm here to help you with:

🔹 **Platform Information**: Learn about our comprehensive AI tools and services
🔹 **Pricing Plans**: Starter ($9/month), Pro ($29/month), Business ($99/month), Enterprise (Custom)
🔹 **Features**: AI Text Generation, Image Processing, Data Analytics, Custom AI Models
🔹 **Support**: Technical assistance and guidance
🔹 **Licensing**: Usage rights and commercial applications

For detailed support or licensing information, contact us at: **support@aisolutionshub.co**

What can I help you with today?`,
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
      const aiPrompt = `You are HuBi, an AI assistant for AI Solutions Hub platform. Respond professionally and helpfully to user questions about:

- Platform features and capabilities
- Pricing: Starter ($9/month, 10K credits), Pro ($29/month, 50K credits), Business ($99/month, 200K credits), Enterprise (Custom pricing)
- AI tools: Text Generation, Image Processing, Audio/Speech, Data Analytics, Custom Models
- Support and licensing information
- For detailed support/licensing, refer to: support@aisolutionshub.co

User question: "${input}"

Provide a concise, helpful response:`;

      const result = await callTextGenerationApi({ prompt: aiPrompt });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.response || "I apologize, but I'm having trouble responding right now. Please contact support@aisolutionshub.co for assistance.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch {
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
    "What AI tools do you offer?",
    "Tell me about your pricing plans",
    "How do I get started?",
    "What's included in the Pro plan?",
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 h-screen flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            HuBi AI Assistant
          </h1>
        </div>
        <p className="text-gray-400 text-lg">Your intelligent guide to AI Solutions Hub</p>
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
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-400">Suggested questions:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="text-xs px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full border border-gray-600 transition-colors"
                >
                  {question}
                </button>
              ))}
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
  );
}
