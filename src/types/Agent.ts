export interface Agent {
  name: string;
  status: 'active' | 'inactive' | 'training';
  performance: number;
  callsToday: number;
  successRate: number;
  level: number;
}

export interface AgentFormData {
  name: string;
  voice: 'natural' | 'synthetic';
  personality: 'professional' | 'friendly' | 'casual' | 'formal';
  language: string;
}
