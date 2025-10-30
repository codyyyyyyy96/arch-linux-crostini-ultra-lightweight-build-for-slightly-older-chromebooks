
export type ViewMode = 'optimizer' | 'quick' | 'chat' | 'search';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  sources?: GroundingSource[];
}

export interface GroundingSource {
  title: string;
  uri: string;
}
