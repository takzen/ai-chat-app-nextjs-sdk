// app/contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Definiujemy trzy możliwe stany logowania dla maksymalnej niezawodności
type AuthState = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Stan początkowy to 'loading', bo na starcie nie wiemy, czy użytkownik jest zalogowany
  const [authState, setAuthState] = useState<AuthState>('loading');

  useEffect(() => {
    // Przy pierwszym załadowaniu aplikacji, sprawdzamy pamięć przeglądarki
    const loggedInStatus = sessionStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setAuthState('authenticated'); // Znaleziono informację - użytkownik jest zalogowany
    } else {
      setAuthState('unauthenticated'); // Brak informacji - użytkownik nie jest zalogowany
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === 'test@example.com' && password === 'password123') {
      sessionStorage.setItem('isLoggedIn', 'true'); // Zapisz informację w pamięci
      setAuthState('authenticated');
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('isLoggedIn'); // Usuń informację z pamięci
    setAuthState('unauthenticated');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};