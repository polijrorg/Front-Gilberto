import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import User from '@interfaces/User';

import api from './api';

interface ILoginResponse {
  token: string;
  user: User;
}

interface ILoginRequest {
  email: string;
  password: string;
}
export default class UserService {
  static async login(data: ILoginRequest): Promise<ILoginResponse> {
    try {
      console.log('Aqui passou', data);
      const response: AxiosResponse<ILoginResponse> = await api.post(
        '/supervisor/login',
        data
      );

      await AsyncStorage.setItem('@app:token', response.data.token);
      await AsyncStorage.setItem('@app:useId', response.data.user.id);

      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }
}
