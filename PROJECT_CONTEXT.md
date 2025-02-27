# Project Context: AI Voice Agent Platform

## Overview
This is a modern web application for managing AI voice agents, built specifically for tattoo shops and similar businesses. The platform allows users to create, customize, and manage AI voice assistants that can handle customer calls, appointments, and inquiries.

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom glass-morphism effects
- **Animation**: Framer Motion for smooth transitions and interactions
- **Icons**: Lucide React
- **Charts/Visualization**: D3.js
- **State Management**: React hooks and context
- **Routing**: React Router v6

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with:
  - Email/Password authentication
  - Google OAuth integration
- **API**: Supabase client for real-time data

## Core Features

### Authentication & User Management
- Email/password signup and login
- Google OAuth integration
- Persistent sessions
- Profile management

### Voice Agent Management
- Create and customize voice agents
- Configure voice settings:
  - Voice type selection
  - Stability controls
  - Style customization
  - Latency optimization
- Call handling preferences
- Performance monitoring

### Dashboard & Analytics
- Real-time performance metrics
- Call statistics
- Success rate tracking
- Interactive charts and visualizations
- Agent level progression system

### Settings & Configuration
- Business information management
- Operating hours configuration
- Voice agent customization
- Call handling preferences
- Notification settings

## Database Schema

### Key Tables
1. `profiles`
   - User profile information
   - Business details
   - Onboarding status

2. `voice_agents`
   - Agent configurations
   - Voice settings
   - Performance metrics
   - Call handling preferences

3. `form_voice_agent`
   - Onboarding form responses
   - Initial configuration data

4. `modify_voice_agent_dashboard`
   - Dashboard-specific settings
   - Real-time configuration changes

## Architecture

### Component Structure
- Modular component design
- Separation of concerns:
  - UI components
  - Business logic
  - Data management
  - Animation effects

### State Management
- React Context for global state
- Local state with useState
- Custom hooks for reusable logic

### Security
- Row Level Security (RLS) in Supabase
- Protected routes
- Type-safe database operations
- Secure authentication flow

## UI/UX Features

### Design System
- Glass-morphism aesthetic
- Dark theme with purple accents
- Responsive design
- Animated transitions
- Interactive elements

### Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast compliance

### Performance Optimizations
- Code splitting
- Lazy loading
- Optimized animations
- Efficient re-renders

## Custom Features

### Mouse Trail Effect
- Interactive canvas-based effect
- Smooth particle animation
- Performance-optimized rendering

### Interactive Charts
- Custom D3.js implementations
- Real-time data updates
- Animated transitions
- Responsive layouts

### Form Handling
- Multi-step forms
- Validation
- Error handling
- Progress tracking

## Development Practices

### Code Organization
- Feature-based structure
- Shared components
- Type definitions
- Utility functions

### Type Safety
- TypeScript throughout
- Strict type checking
- Interface definitions
- Type guards

### Error Handling
- Global error boundaries
- Try-catch patterns
- User-friendly error messages
- Error logging

### Testing
- Component testing setup
- Integration test structure
- Error scenario coverage
- Performance monitoring

## Deployment
- Vite build configuration
- Environment variable management
- Production optimizations
- Deployment scripts

## Future Considerations
- Voice synthesis integration
- Advanced call analytics
- Machine learning features
- Calendar integrations
- Payment processing
- Multi-language support

## File Structure
```
src/
├── components/
│   ├── analytics/
│   ├── auth/
│   ├── charts/
│   ├── forms/
│   ├── help/
│   ├── history/
│   └── settings/
├── lib/
│   ├── supabase.ts
│   └── google.ts
├── types/
├── hooks/
├── constants/
└── utils/
```

## Environment Variables
Required environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Getting Started
1. Clone repository
2. Install dependencies
3. Set up environment variables
4. Connect to Supabase
5. Start development server

## Maintenance Notes
- Regular dependency updates
- Database migrations
- Type definition maintenance
- Performance monitoring
- Security updates