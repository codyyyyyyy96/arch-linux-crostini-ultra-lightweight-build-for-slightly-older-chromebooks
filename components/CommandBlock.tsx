
import React, { useState, useEffect } from 'react';
import { ClipboardIcon, CheckIcon } from './icons/Icons';

interface CommandBlockProps {
  content: string;
}

export const CommandBlock: React.FC<CommandBlockProps> = ({ content }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg my-4 relative group">
      <pre className="p-4 text-gray-300 text-sm overflow-x-auto font-mono">
        <code>{content}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-gray-700 rounded-md text-gray-400 hover:bg-gray-600 hover:text-white transition-opacity duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Copy to clipboard"
      >
        {isCopied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
      </button>
    </div>
  );
};
