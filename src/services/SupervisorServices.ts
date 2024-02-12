import { AxiosResponse } from 'axios';
import ISeller from '@interfaces/Seller';
import api from './api';

interface ISellerResponse {
  sellers?: ISeller[];
}

export default class SupervisorServices {
  static async getAllSellerInSupervisorById(
    id: string
  ): Promise<ISellerResponse> {
    try {
      const sellerResponse: AxiosResponse<ISellerResponse> = await api.get(
        `/seller/getAll/${id}`
      );

      return sellerResponse.data;
    } catch (error) {
      console.error('Erro ao obter vendedores do supervisor:', error);
      throw error;
    }
  }
}
