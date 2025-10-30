import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { SystemSetupView } from './components/SystemSetupView';
import { LocalAiView } from './components/LocalAiView';
import { OptimizationsView } from './components/OptimizationsView';
import { MigrationView } from './components/MigrationView';
import { SecurityView } from './components/SecurityView';
import type { ViewMode } from './types';
import { Header } from './components/Header';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewMode>('migration');

  const renderActiveView = () => {
    switch (activeView) {
      case 'migration':
        return <MigrationView />;
      case 'setup':
        return <SystemSetupView />;
      case 'localAi':
        return <LocalAiView />;
      case 'optimizations':
        return <OptimizationsView />;
      case 'security':
        return <SecurityView />;
      default:
        return <MigrationView />;
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
