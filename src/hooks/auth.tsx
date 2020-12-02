import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface IUser {
  id: number;
  name: string;
  email: string;
  permission: '0' | '1';
  avatar_url?: string;
  created_at: Date;
}

export interface IRequest {
  username: string;
  password: string;
}

interface IDataAuth {
  user: IUser;
  token: string;
}

interface IAuthContextData {
  user: IUser;
  isLoading: boolean;
  signIn(data: IRequest): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IDataAuth>(() => {
    const user = localStorage.getItem('@DashboardDreshoes:user');
    const token = localStorage.getItem('@DashboardDreshoes:token');

    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        user: JSON.parse(user),
        token,
      };
    }

    return {} as IDataAuth;
  });

  const [isLoading, setIsLoading] = useState(false);

  const signIn = useCallback(async (credentials: IRequest) => {
    setIsLoading(true);

    try {
      const response = await api.post('session', credentials);
      setData(response.data);
      localStorage.setItem(
        '@DashboardDreshoes:user',
        JSON.stringify(response.data.user),
      );
      localStorage.setItem('@DashboardDreshoes:token', response.data.token);

      api.defaults.headers.authorization = `Bearer ${response.data.token}`;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setData({} as IDataAuth);
    localStorage.removeItem('@DashboardDreshoes:user');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
