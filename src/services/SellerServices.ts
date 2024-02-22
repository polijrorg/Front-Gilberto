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
        `/seller/getAllFromASupervisor/${supervisorId}`
      );
      const seller = response.data.find((seller) => seller.id === sellerId);

      return seller || null;
    } catch (error) {
      console.error('Erro ao buscar vendedor:', error);
      throw error;
    }
  }

  // Função para criar um novo vendedor
  static async createSeller(newSeller: Partial<ISeller>): Promise<void> {
    try {
      await api.post('/seller/create', newSeller);
    } catch (error) {
      console.error('Erro ao criar vendedor:', error);
      throw error;
    }
  }
}
