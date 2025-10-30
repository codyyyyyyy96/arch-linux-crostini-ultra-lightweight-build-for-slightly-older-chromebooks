
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getChatInstance } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { UserIcon, TerminalIcon } from './icons/Icons';

export const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'start', role: 'system', text: "Hello! I'm your Arch Linux expert assistant. How can I help you optimize your Crostini setup?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chat = getChatInstance();

  useEffect(() => {
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [messages]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat.sendMessage({ message: input });
      const modelMessage: ChatMessage = { id: Date.now().toString() + 'm', role: 'model', text: result.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = { id: Date.now().toString() + 'e', role: 'system', text: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, chat]);

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-gray-800/50 border border-gray-700/50 rounded-lg overflow-hidden">
      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role !== 'user' && (
              <div className="w-8 h-8 flex-shrink-0 bg-gray-700 rounded-full flex items-center justify-center">
                <TerminalIcon className={`h-5 w-5 ${msg.role === 'system' ? 'text-cyan-400' : 'text-green-400'}`} />
              </div>
            )}
            <div className={`max-w-lg p-3 rounded-lg ${
              msg.role === 'user' ? 'bg-cyan-600 text-white rounded-br-none' :
              msg.role === 'model' ? 'bg-gray-700 text-gray-200 rounded-bl-none' :
              'bg-transparent text-gray-400 text-center w-full italic'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
             {msg.role === 'user' && (
              <div className="w-8 h-8 flex-shrink-0 bg-gray-700 rounded-full flex items-center justify-center">
                <UserIcon className="h-5 w-5 text-gray-300" />
              </div>
            )}
          </div>
        ))}
         {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex-shrink-0 bg-gray-700 rounded-full flex items-center justify-center">
                 <TerminalIcon className="h-5 w-5 text-green-400" />
              </div>
              <div className="max-w-lg p-3 rounded-lg bg-gray-700 text-gray-200 rounded-bl-none">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700/50 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about anything..."
          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-cyan-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
};
