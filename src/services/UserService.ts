/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
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
      // Tentar fazer login como supervisor
      const supervisorResponse: AxiosResponse<ILoginResponse> = await api.post(
        '/supervisor/login',
        data
      );
      // Se o login como supervisor for bem-sucedido, armazenar tokens e retornar resposta
      await AsyncStorage.setItem('@app:token', supervisorResponse.data.token);
      await AsyncStorage.setItem('@app:useId', supervisorResponse.data.user.id);

      return supervisorResponse.data;
    } catch (error) {
      try {
        // Tentar fazer login como gerente
        const managerResponse: AxiosResponse<ILoginResponse> = await api.post(
          '/manager/login',
          data
        );

        // Se o login como gerente for bem-sucedido, armazenar tokens e retornar resposta
        await AsyncStorage.setItem('@app:token', managerResponse.data.token);
        await AsyncStorage.setItem('@app:useId', managerResponse.data.user.id);
        return managerResponse.data;
      } catch (error) {}
    }
  }
}
