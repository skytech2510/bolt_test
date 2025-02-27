export const COLORS = {
  primary: '#904AF2',
  secondary: '#FF3366',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  background: {
    primary: '#080809',
    secondary: '#0c0d0e',
    tertiary: '#1a1b1e'
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#94A3B8',
    tertiary: '#64748B'
  }
} as const;

export const TRANSITIONS = {
  default: 'all 0.3s ease',
  fast: 'all 0.15s ease',
  slow: 'all 0.5s ease'
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;