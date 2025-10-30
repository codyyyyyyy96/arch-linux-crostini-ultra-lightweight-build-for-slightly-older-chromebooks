
import React, { useState, useCallback } from 'react';
import { generateWithSearchGrounding } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { LinkIcon } from './icons/Icons';

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center gap-2 p-4 text-gray-400">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-200"></div>
        <span>Searching the web...</span>
    </div>
);

export const SearchView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ChatMessage | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);
    const { text, sources } = await generateWithSearchGrounding(prompt);
    setResult({ id: 'search-result', role: 'model', text, sources });
    setIsLoading(false);
    setPrompt('');
  }, [prompt, isLoading]);

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., What is the latest stable Linux kernel?"
          className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="bg-cyan-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? '...' : 'Search'}
        </button>
      </form>

      <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg min-h-[200px]">
        {isLoading && <LoadingSpinner />}
        {result && (
          <div className="p-4">
            <p className="text-gray-200 whitespace-pre-wrap">{result.text}</p>
            {result.sources && result.sources.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Sources:</h4>
                <ul className="space-y-1">
                  {result.sources.map((source, index) => (
                    <li key={index}>
                      <a
                        href={source.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm hover:underline"
                      >
                        <LinkIcon className="w-4 h-4" />
                        <span>{source.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
