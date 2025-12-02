
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Loader2, Bot } from 'lucide-react';
import { generateCameraAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

export const GeminiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Xin chào! Tôi là trợ lý AI chuyên về nhiếp ảnh. Bạn cần tư vấn chọn máy ảnh hay ống kính nào hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateCameraAdvice(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white dark:bg-[#15151A] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-fade-in-up origin-bottom-right">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-[#15151A]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Pro Assistant</h3>
                <span className="flex items-center gap-1.5 text-[10px] text-green-500 font-medium">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 bg-gray-50/50 dark:bg-[#0A0A0F]/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start items-end gap-2'}`}>
                {msg.role === 'model' && (
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3 h-3 text-red-600 dark:text-orange-400" />
                  </div>
                )}
                <div className={`max-w-[85%] p-3.5 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-red-600 text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-white dark:bg-[#1E1E24] text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-sm border border-gray-100 dark:border-gray-800'
                }`}>
                  <div className="whitespace-pre-line">{msg.text}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-end gap-2">
                 <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                    <Loader2 className="w-3 h-3 text-red-600 dark:text-orange-400 animate-spin" />
                  </div>
                 <div className="bg-white dark:bg-[#1E1E24] px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-[#15151A] border-t border-gray-100 dark:border-gray-800">
            <div className="relative flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 bg-gray-100 dark:bg-black/20 border-0 text-gray-900 dark:text-white text-sm rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all placeholder-gray-500"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-black pl-5 pr-2 py-2 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <span className="text-sm font-bold tracking-wide">Hỏi AI Tư Vấn</span>
          <div className="bg-red-600 text-white p-2.5 rounded-full shadow-md group-hover:rotate-12 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
        </button>
      )}
    </div>
  );
};
