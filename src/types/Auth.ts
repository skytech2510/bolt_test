export interface AuthState {
  user: boolean;
  showAuthModal: boolean;
  authType: 'login' | 'signup';
}