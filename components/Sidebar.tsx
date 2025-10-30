
import React from 'react';
import type { ViewMode } from '../types';
import { CpuChipIcon, BoltIcon, ChatBubbleLeftRightIcon, MagnifyingGlassIcon, TerminalIcon } from './icons/Icons';

interface SidebarProps {
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'optimizer', label: 'Optimizer', icon: <CpuChipIcon /> },
    { id: 'quick', label: 'Quick Command', icon: <BoltIcon /> },
    { id: 'chat', label: 'Expert Chat', icon: <ChatBubbleLeftRightIcon /> },
    { id: 'search', label: 'Web Search', icon: <MagnifyingGlassIcon /> },
  ];

  return (
    <nav className="bg-gray-900/70 backdrop-blur-sm border-r border-gray-700/50 p-2 md:p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center gap-2 p-2 mb-6 border-b border-gray-700/50">
          <TerminalIcon className="h-8 w-8 text-cyan-400" />
          <h1 className="hidden md:block text-xl font-bold text-gray-100">Crostini Arch</h1>
        </div>
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setActiveView(item.id as ViewMode)}
                className={`w-full flex items-center gap-3 p-3 my-1 rounded-lg transition-all duration-200 ${
                  activeView === item.id 
                  ? 'bg-cyan-500/20 text-cyan-300' 
                  : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                }`}
              >
                <div className="w-6 h-6">{item.icon}</div>
                <span className="hidden md:block font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
       <div className="p-2 border-t border-gray-700/50 text-center">
         <p className="hidden md:block text-xs text-gray-500">Powered by Gemini</p>
       </div>
    </nav>
  );
};
