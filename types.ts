export type ViewMode = 'migration' | 'setup' | 'localAi' | 'optimizations' | 'security';

// Fix: Add GroundingSource interface for search results.
export interface GroundingSource {
  title: string;
  uri: string;
}

// Fix: Add ChatMessage interface for chat and search views.
export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  sources?: GroundingSource[];
}
