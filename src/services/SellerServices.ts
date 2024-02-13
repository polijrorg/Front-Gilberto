/* eslint-disable @typescript-eslint/no-shadow */
import ISeller from '@interfaces/Seller';

import api from './api';

export default class SellerService {
  //Pega o vendedor pelo ID
  static async getSellerById(
    supervisorId: string,
    sellerId: string
  ): Promise<ISeller | null> {
    try {
      const response = await api.get<ISeller[]>(
        `/seller/getAll/${supervisorId}`
      );
      const seller = response.data.find((seller) => seller.id === sellerId);

      return seller || null;
    } catch (error) {
      console.error('Erro ao buscar vendedor:', error);
      throw error;
    }
  }
}
