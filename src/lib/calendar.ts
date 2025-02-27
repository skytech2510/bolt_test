import { GOOGLE_CONFIG } from '../config/oauth';

export async function connectGoogleCalendar() {
  // Generate a random state value for security
  const state = Math.random().toString(36).substring(7);

  // Store state in localStorage to verify when returning
  localStorage.setItem('googleCalendarState', state);

  // Construct OAuth URL with required scopes
  const authUrl = new URL(GOOGLE_CONFIG.authEndpoint);
  authUrl.searchParams.append('client_id',);
  authUrl.searchParams.append('redirect_uri', import.meta.env.VITE_CLIENTID);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('scope', GOOGLE_CONFIG.scopes.join(' '));
  authUrl.searchParams.append('state', state);
  authUrl.searchParams.append('access_type', 'offline');
  authUrl.searchParams.append('prompt', 'consent');

  // Open the auth URL in a new window
  const width = 600;
  const height = 700;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const authWindow = window.open(
    authUrl.toString(),
    'Connect Google Calendar',
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  );

  if (!authWindow) {
    throw new Error('Failed to open authentication window. Please allow popups for this site.');
  }

  return new Promise((resolve, reject) => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from our window origin
      if (event.origin !== window.location.origin) return;

      if (event.data.type === 'GOOGLE_CALENDAR_SUCCESS') {
        cleanup();
        resolve(event.data.code);
      }

      if (event.data.type === 'GOOGLE_CALENDAR_ERROR') {
        cleanup();
        reject(new Error(event.data.error));
      }
    };

    // Cleanup function to remove listeners
    const cleanup = () => {
      window.removeEventListener('message', handleMessage);
      if (checkClosedInterval) {
        clearInterval(checkClosedInterval);
      }
      // Close the auth window after a short delay to show success message
      setTimeout(() => {
        if (authWindow && !authWindow.closed) {
          authWindow.close();
        }
      }, 2000);
    };

    window.addEventListener('message', handleMessage);

    // Check if window was closed manually
    const checkClosedInterval = setInterval(() => {
      if (authWindow.closed) {
        cleanup();
        reject(new Error('Authentication window was closed'));
      }
    }, 1000);

    // Set a timeout to prevent hanging
    setTimeout(() => {
      cleanup();
      if (!authWindow.closed) {
        authWindow.close();
      }
      reject(new Error('Authentication timed out'));
    }, 5 * 60 * 1000); // 5 minutes timeout
  });
}