
import React from 'react';
import type { ViewMode } from '../types';
import { CpuChipIcon, BoltIcon, ChatBubbleLeftRightIcon, MagnifyingGlassIcon } from './icons/Icons';

interface HeaderProps {
    activeView: ViewMode;
}

export const Header: React.FC<HeaderProps> = ({ activeView }) => {
    const viewDetails = {
        optimizer: { title: 'System Optimizer', description: 'Generate detailed configurations for maximum performance.', icon: <CpuChipIcon /> },
        quick: { title: 'Quick Command', description: 'Get fast, low-latency answers for simple tasks.', icon: <BoltIcon /> },
        chat: { title: 'Expert Chat', description: 'Have a conversation with an Arch Linux expert.', icon: <ChatBubbleLeftRightIcon /> },
        search: { title: 'Web Search', description: 'Get up-to-date information from the web.', icon: <MagnifyingGlassIcon /> },
    };

    const currentView = viewDetails[activeView];

    return (
        <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 p-4 flex items-center gap-4">
           <div className="w-8 h-8 text-cyan-400">{currentView.icon}</div>
           <div>
            <h2 className="text-xl font-bold text-white">{currentView.title}</h2>
            <p className="text-sm text-gray-400">{currentView.description}</p>
           </div>
        </header>
    );
};
