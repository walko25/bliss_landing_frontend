import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signup = (userData) => {
    // In a real app, this would make an API call
    // For now, we'll just store the user data locally
    setUser(userData);
  };

  const login = (email, password) => {
    // In a real app, this would verify credentials with an API
    // For now, we'll just check if user exists (simplified)
    // This is just a placeholder - in production you'd never do this
    return false; // Will return true if credentials match
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
