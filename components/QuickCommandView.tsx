
import React, { useState, useCallback } from 'react';
import { generateWithLowLatency } from '../services/geminiService';
import { CommandBlock } from './CommandBlock';

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center gap-2 p-4 text-gray-400">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-200"></div>
        <span>Loading...</span>
    </div>
);

export const QuickCommandView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setOutput('');
    const result = await generateWithLowLatency(`Provide a concise command or answer for: "${prompt}"`);
    setOutput(result);
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
          placeholder="e.g., How to install neofetch on Arch?"
          className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="bg-cyan-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? '...' : 'Ask'}
        </button>
      </form>

      <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg min-h-[200px]">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          output && <CommandBlock content={output} />
        )}
      </div>
    </div>
  );
};
