
import React, { useState, useCallback } from 'react';
import { generateWithThinkingMode } from '../services/geminiService';
import { CommandBlock } from './CommandBlock';
import { SparklesIcon } from './icons/Icons';

const OPTIMIZATION_TOPICS = [
  {
    id: 'zram',
    title: 'ZRAM Setup',
    prompt: "Acting as an expert Linux admin for a 4GB RAM Crostini environment, generate the precise shell commands and a brief explanation to set up zram-generator on Arch Linux for optimal performance. Include instructions to verify it's working."
  },
  {
    id: 'pacman',
    title: 'Pacman Configuration',
    prompt: "Acting as an expert Linux admin, provide an optimized '/etc/pacman.conf' file for Arch Linux on a low-spec machine. Enable parallel downloads, color, and add the 'multilib' repository. Explain each change."
  },
  {
    id: 'i3wm',
    title: 'Minimal i3wm Config',
    prompt: "As an expert Linux admin, generate a minimal, memory-efficient '/.config/i3/config' file for a new user on Arch Linux. Include basic keybindings for terminal, application launcher (dmenu), and window management. Add comments explaining the key sections."
  },
  {
    id: 'kernel',
    title: 'Kernel Parameters',
    prompt: "As a Linux performance expert, recommend and explain kernel parameters for '/etc/default/grub' to improve responsiveness and reduce I/O on a 4GB RAM system running Arch Linux in Crostini. Focus on swappiness and I/O schedulers. Explain that Crostini might limit what can be changed."
  }
];

const ThinkingSpinner: React.FC = () => (
    <div className="flex items-center justify-center gap-3 p-4 bg-gray-800 border border-cyan-500/30 rounded-lg my-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
        <div>
            <p className="text-cyan-300 font-semibold">Gemini is thinking deeply...</p>
            <p className="text-gray-400 text-sm">This may take a moment for complex tasks.</p>
        </div>
    </div>
);


export const OptimizerView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<string>('Select a topic and click "Generate" to get started.');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const handleGenerate = useCallback(async (prompt: string, topicId: string) => {
    setActiveTopic(topicId);
    setIsLoading(true);
    setOutput('');
    const result = await generateWithThinkingMode(prompt);
    setOutput(result);
    setIsLoading(false);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {OPTIMIZATION_TOPICS.map(topic => (
          <button
            key={topic.id}
            disabled={isLoading}
            onClick={() => handleGenerate(topic.prompt, topic.id)}
            className={`p-4 rounded-lg text-left transition-all duration-200 border-2 ${
              activeTopic === topic.id ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-700 bg-gray-800 hover:border-cyan-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <h3 className="font-bold text-white">{topic.title}</h3>
          </button>
        ))}
      </div>
      
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 min-h-[300px]">
        {isLoading ? (
          <ThinkingSpinner />
        ) : (
          output && (output.startsWith('Select a topic') ? <p className="text-gray-400 p-4">{output}</p> : <CommandBlock content={output} />)
        )}
      </div>
    </div>
  );
};
