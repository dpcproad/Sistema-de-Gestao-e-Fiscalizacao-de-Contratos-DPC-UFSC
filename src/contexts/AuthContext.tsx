
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já estava logado de forma segura
    try {
      const storedAuth = localStorage.getItem('isAuthenticated');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('localStorage não está disponível:', error);
      // Se localStorage não estiver disponível, continua com o estado inicial (false)
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    try {
      localStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
      console.log('Não foi possível salvar no localStorage:', error);
      // Continua com o login mesmo se não conseguir salvar no localStorage
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('isAuthenticated');
    } catch (error) {
      console.log('Não foi possível remover do localStorage:', error);
      // Continua com o logout mesmo se não conseguir remover do localStorage
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
