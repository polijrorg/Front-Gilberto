import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import User from '@interfaces/User';


import api from './api';

interface ILoginRequest {
    email: string;
    password: string;
}

interface ILoginResponse {
    token: string;
    user: User;
}

export default class UserService {
    static async login(data: ILoginRequest): Promise<ILoginResponse> {
        const response: AxiosResponse<ILoginResponse> = await api.post(
            '/session/login',
            data
        );

        await AsyncStorage.setItem('@app:token', response.data.token);
        await AsyncStorage.setItem('@app:useId', response.data.user.id);

        return response.data;
    }
}
