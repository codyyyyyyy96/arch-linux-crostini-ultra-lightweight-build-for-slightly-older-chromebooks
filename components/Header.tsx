import React from 'react';
import type { ViewMode } from '../types';
import { CpuChipIcon, TerminalIcon, SparklesIcon, SwitchHorizontalIcon, ShieldIcon } from './icons/Icons';

interface HeaderProps {
    activeView: ViewMode;
}

export const Header: React.FC<HeaderProps> = ({ activeView }) => {
    const viewDetails = {
        migration: { title: 'Lubuntu to Arch Linux Migration', description: 'Your first step: Replace the default container with Arch.', icon: <SwitchHorizontalIcon /> },
        setup: { title: 'Core System Setup', description: 'Install essential tools for your new Arch Linux environment.', icon: <TerminalIcon /> },
        optimizations: { title: 'System Optimizations', description: 'Fine-tune your Arch Linux for better performance.', icon: <SparklesIcon /> },
        security: { title: 'Security Hardening', description: 'Establish a strong security baseline for your new system.', icon: <ShieldIcon /> },
        localAi: { title: 'AI Assistant Setup (Sidekick)', description: 'Configure your powerful, local command-line AI assistant.', icon: <CpuChipIcon /> },
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
