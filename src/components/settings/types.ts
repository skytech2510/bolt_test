export interface Voice {
  id: string;
  name: string;
  description: string;
  accent?: string;
  gender?: 'Male' | 'Female' | 'Non-binary';
}

export type VoiceFilter = {
  accent: string;
  gender: string;
  onlyRecommended: boolean;
  search: string;
};
