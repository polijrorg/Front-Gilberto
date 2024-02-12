import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState, createContext } from 'react';

import api from '@services/api';

import UserService from '@services/UserService';

import User from '../interfaces/User';

interface ILoginRequest {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  login: (data: ILoginRequest) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{
  children?: React.ReactNode | undefined;
}> = ({ children }) => {
  const [user, setUser] = useState({} as User);
  console.log('Auth passou');

  const login = async (data: ILoginRequest) => {
    try {
      const response = await UserService.login(data);

      api.defaults.headers.common = {
        Authorization: `Bearer ${response.token}`,
      };

      setUser(response.user);
    } catch (error) {}
  };

  const logout = () => {
    setUser({} as User);
    AsyncStorage.removeItem('@app:token');
    AsyncStorage.removeItem('@app:useId');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default () => useContext(AuthContext);
