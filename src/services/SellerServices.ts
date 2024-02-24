/* eslint-disable @typescript-eslint/no-shadow */
import ISeller from '@interfaces/Seller';
import { AxiosResponse } from 'axios';
import api from './api';

export default class SellerService {
  //Pega o vendedor pelo ID e ID Supervisor
  static async getSellerById(
    supervisorId: string,
    sellerId: string
  ): Promise<ISeller | null> {
    const response = await api.get<ISeller[]>(
      `/seller/getAllFromASupervisor/${supervisorId}`
    );
    const seller = response.data.find((seller) => seller.id === sellerId);

    return seller || null;
  }

  static async getAllSellerFromManager(
    managerId: string
  ): Promise<ISeller[] | null> {
    const response = await api.get<ISeller[]>(
      `/seller/getAllFromAManager/${managerId}`
    );
    return response.data;
  }

  // Pega todos os Vendedores de um supervisor
  static async getAllSellerFromSupervisor(id: string): Promise<ISeller[]> {
    const sellerResponse: AxiosResponse<ISeller[]> = await api.get(
      `/seller/getAllFromASupervisor/${id}`
    );

    return sellerResponse.data;
  }

  // Função para criar um novo vendedor
  static async createSeller(newSeller: Partial<ISeller>): Promise<void> {
    await api.post('/seller/create', newSeller);
  }
}
