"use client";

import { useState, useEffect, useRef } from "react";
import { Send, FileText, Copy, Download, RefreshCw, Languages, Globe } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getBackendApiUrl } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];

export default function TextGeneratorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("fr");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLanguageSelector) {
        setShowLanguageSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageSelector]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const backendUrl = getBackendApiUrl();
      const response = await fetch(`${backendUrl}/api/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "Désolé, je n'ai pas pu générer de réponse.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "❌ Erreur lors de la génération du texte. Veuillez réessayer.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const translateMessage = async (messageId: string, content: string) => {
    if (translating) return; // Éviter les requêtes multiples
    
    setTranslating(true);
    try {
      const selectedLang = languages.find(lang => lang.code === targetLanguage);
      const prompt = `Translate the following text to ${selectedLang?.name} (${targetLanguage}). Only return the translation, no additional text or explanations:\n\n${content}`;
      
      console.log('Sending translation request:', { prompt, targetLanguage }); // Debug
      
      const backendUrl = getBackendApiUrl();
      const response = await fetch(`${backendUrl}/api/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Translation response:', data); // Debug
      
      const translationMessage: Message = {
        id: `translation-${Date.now()}-${Math.random()}`,
        role: "assistant",
        content: `🌍 **Traduction en ${selectedLang?.name} ${selectedLang?.flag}:**\n\n${data.response || data.message || 'Traduction non disponible'}`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, translationMessage]);
    } catch (error) {
      console.error('Translation error:', error); // Debug
      const errorMessage: Message = {
        id: `error-${Date.now()}-${Math.random()}`,
        role: "assistant",
        content: "❌ Erreur lors de la traduction. Veuillez réessayer.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setTranslating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const exportToPDF = () => {
    const content = messages
      .filter(m => m.role === "assistant")
      .map(m => m.content)
      .join("\n\n");
    
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToWord = () => {
    const content = messages
      .filter(m => m.role === "assistant")
      .map(m => m.content)
      .join("\n\n");
    
    const blob = new Blob([content], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-text.doc";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col bg-gray-900">
        {/* Header */}
        <div className="border-b border-gray-700 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-white">Text Generator</h1>
            </div>
            <div className="flex gap-2">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors"
                >
                  <Languages className="w-4 h-4" />
                  {languages.find(lang => lang.code === targetLanguage)?.flag}
                  {languages.find(lang => lang.code === targetLanguage)?.name}
                </button>
                
                {showLanguageSelector && (
                  <div className="absolute top-full mt-1 right-0 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 w-48 max-h-60 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setTargetLanguage(lang.code);
                          setShowLanguageSelector(false);
                        }}
                        className={`w-full text-left px-3 py-2 hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                          targetLanguage === lang.code ? 'bg-gray-700 text-purple-400' : 'text-white'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                disabled={messages.length === 0}
              >
                <Download className="w-4 h-4" />
                PDF
              </button>
              <button
                onClick={exportToWord}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                disabled={messages.length === 0}
              >
                <Download className="w-4 h-4" />
                Word
              </button>
              <button
                onClick={clearChat}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                disabled={messages.length === 0}
              >
                <RefreshCw className="w-4 h-4" />
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full max-w-4xl mx-auto">
            <div className="h-full overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-20">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h2 className="text-2xl font-semibold mb-2">Commencez à générer du texte</h2>
                  <p className="text-lg">Tapez votre prompt ci-dessous pour commencer</p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${message.role === "user" ? "bg-blue-600" : "bg-gray-800"} rounded-lg p-4 relative group`}>
                    <div className="text-white whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                    {message.role === "assistant" && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <button
                          onClick={() => {
                            console.log('Translation button clicked for message:', message.id);
                            console.log('Content to translate:', message.content);
                            console.log('Target language:', targetLanguage);
                            translateMessage(message.id, message.content);
                          }}
                          className="p-1 hover:bg-gray-700 rounded"
                          title={`Traduire vers ${languages.find(lang => lang.code === targetLanguage)?.name}`}
                          disabled={translating}
                        >
                          {translating ? (
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-purple-500 rounded-full animate-spin"></div>
                          ) : (
                            <Globe className="w-4 h-4 text-gray-400 hover:text-purple-400" />
                          )}
                        </button>
                        <button
                          onClick={() => copyToClipboard(message.content)}
                          className="p-1 hover:bg-gray-700 rounded"
                          title="Copier"
                        >
                          <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                        </button>
                      </div>
                    )}
                    <div className="text-xs text-gray-400 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {(loading || translating) && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {translating ? 'Traduction en cours...' : 'Génération en cours...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-700 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Décrivez le texte que vous voulez générer..."
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg px-6 py-3 transition-colors flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Générer</span>
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Appuyez sur Entrée pour envoyer, Shift+Entrée pour nouvelle ligne
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}