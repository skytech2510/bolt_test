
import { AlertCircle } from 'lucide-react';
import type { ErrorMessageProps } from './types';

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return (
    <div className="text-red-500 text-sm mt-1 flex items-center">
      <AlertCircle className="w-4 h-4 mr-1" />
      {message}
    </div>
  );
}