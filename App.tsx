
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { OptimizerView } from './components/OptimizerView';
import { QuickCommandView } from './components/QuickCommandView';
import { ChatView } from './components/ChatView';
import { SearchView } from './components/SearchView';
import type { ViewMode } from './types';
import { Header } from './components/Header';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewMode>('optimizer');

  const renderActiveView = () => {
    switch (activeView) {
      case 'optimizer':
        return <OptimizerView />;
      case 'quick':
        return <QuickCommandView />;
      case 'chat':
        return <ChatView />;
      case 'search':
        return <SearchView />;
      default:
        return <OptimizerView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header activeView={activeView} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default App;
