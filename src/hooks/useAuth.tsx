import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import api from '@services/api';
import UserService from '@services/UserService';
import User from '../interfaces/User';

interface ILoginRequest {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  login: (data: ILoginRequest) => Promise<string | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigation = useNavigation();

  const login = async (data: ILoginRequest): Promise<string | null> => {
    try {
      const response = await UserService.login(data);

      if (response) {
        const { token, user } = response;

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        await AsyncStorage.setItem('@app:token', token);
        await AsyncStorage.setItem('@app:user', JSON.stringify(user));

        setUser(user);
        navigation.navigate('Home' as never);

        return token;
      }

      return null;
    } catch (error) {
      console.error('Erro ao logar:', error);
      return null;
    }
  };

  const logout = async () => {
    try {
      // Remover token e usuário do armazenamento local
      await AsyncStorage.multiRemove(['@app:token', '@app:user']);
      setUser(null);
      navigation.navigate('Login' as never);
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default () => useContext(AuthContext);
