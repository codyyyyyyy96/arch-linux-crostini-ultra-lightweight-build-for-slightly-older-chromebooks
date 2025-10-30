import React from 'react';
import { CommandBlock } from './CommandBlock';

export const SystemSetupView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Step 1: Update Your System</h2>
        <p className="text-gray-400 mb-4">
          Before installing anything new, it is crucial to synchronize your package databases and upgrade all installed packages. This ensures you have the latest security patches and dependencies.
        </p>
        <CommandBlock content="sudo pacman -Syu" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Step 2: Install Core Developer Tools</h2>
        <p className="text-gray-400 mb-4">
          This single command bundles all the essential tools you requested for a productive command-line development workflow.
        </p>
        <ul className="list-disc list-inside text-gray-400 mb-4 pl-4 space-y-1">
          <li><strong className="text-gray-200">git:</strong> The standard for version control.</li>
          <li><strong className="text-gray-200">neovim:</strong> A modern, powerful, and highly extensible terminal-based text editor.</li>
          <li><strong className="text-gray-200">tmux:</strong> A terminal multiplexer. It lets you create and manage multiple terminal sessions within a single window.</li>
          <li><strong className="text-gray-200">python & python-pip:</strong> The Python programming language and its package installer, essential for many development tools and scripts.</li>
        </ul>
        <CommandBlock content="sudo pacman -S git neovim tmux python python-pip" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Step 3: Install Compilation & Build Tools</h2>
        <p className="text-gray-400 mb-4">
          To build software from source code—a common task on Arch Linux—you need a set of compilation tools. The following command will provide everything you need.
        </p>
        <ul className="list-disc list-inside text-gray-400 mb-4 pl-4 space-y-1">
          <li><strong className="text-gray-200">base-devel:</strong> A group of packages including the GCC compiler, make, autoconf, and other essentials. This is the Arch Linux equivalent of `build-essential` on Debian-based systems.</li>
          <li><strong className="text-gray-200">cmake:</strong> A modern and widely-used cross-platform tool that helps manage the build process for software projects.</li>
        </ul>
        <p className="text-gray-400 mb-4">
          The <code className="bg-gray-700 px-1 rounded">--needed</code> flag prevents pacman from reinstalling packages that are already up to date.
        </p>
        <CommandBlock content="sudo pacman -S --needed base-devel cmake" />
      </div>
    </div>
  );
};