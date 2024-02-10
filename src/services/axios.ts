import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const getApi = () => {
  const token = AsyncStorage.getItem('@gil:token');

  const api = axios.create({
    baseURL: 'https://gilberto.polijrinternal.com',
  });

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return api;
};

export default getApi;
