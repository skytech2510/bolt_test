import { OperatingHours } from './FormData';

export interface OptionalPreferenceType {
  id: number;
  user_id: string;
  created_at: string;
  appointment_type: 'appointments' | 'walkins' | 'both';
  operating_hours: OperatingHours[]; // JSON type
  piercing_service: boolean;
  hourly_rate: number;
  specific_instructions: string;
}

export type OptionalPreferenceInput = Omit<
  OptionalPreferenceType,
  'id' | 'user_id' | 'created_at'
>;
