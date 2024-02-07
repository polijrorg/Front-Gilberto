import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const getApi = async () => {
  const token = await AsyncStorage.getItem('@letsapp:token');

  const api = axios.create({
    baseURL: 'https://gilberto.polijrinternal.com',
  });

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return api;
};

export default getApi;
