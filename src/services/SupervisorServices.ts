import { AxiosResponse } from 'axios';
import ISeller from '@interfaces/Seller';
import api from './api';

interface ISellerResponse {
  sellers?: ISeller[];
}

export default class SupervisorServices {
  static async getAllSellerInSupervisor(): Promise<ISellerResponse> {
    try {
      const sellerResponse: AxiosResponse<ISellerResponse> =
        await api.get(`/seller/getAll`);

      if ('sellers' in sellerResponse.data) {
        return sellerResponse.data;
      } else {
        throw new Error('Propriedade "sellers" ausente na resposta da API');
      }
    } catch (error) {
      console.error('Erro ao obter vendedores do supervisor:', error);
      throw error;
    }
  }
}
