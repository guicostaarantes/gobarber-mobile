import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import { Alert } from 'react-native';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface UserData {
  fullName: string;
  email: string;
  avatar?: string;
}

interface UserContextData {
  token: string;
  user: UserData | null;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  getUser(token: string): Promise<void>;
  signOut(): void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    setToken(response.data.token);
  }, []);

  const getUser = useCallback(async (token_) => {
    const response = await api.get('users/me', {
      headers: { Authorization: `Bearer ${token_}` },
    });
    setUser(response.data);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('token');
    setToken('');
    setUser(null);
  }, []);

  useEffect(() => {
    const getSetTokenAndUserData = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
        try {
          await getUser(token);
        } catch (err) {
          signOut();
          Alert.alert(
            'Sessão expirada',
            'Insira suas credenciais para entrar novamente.',
          );
        }
      }
      setLoading(false);
    };

    getSetTokenAndUserData();
  });

  return (
    <UserContext.Provider
      value={{ user, token, loading, signIn, signOut, getUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser hook must be used inside a UserProvider.');
  }

  return context;
}
