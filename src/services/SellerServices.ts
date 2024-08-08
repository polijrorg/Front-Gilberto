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

  static async getSupervisorByIdCompany(
    companyId: string,
    sellerId: string
  ): Promise<ISeller | undefined> {
    const responseCompany = await this.getAllSellerFromCompany(companyId);
    const seller = responseCompany.find((seller) => seller.id === sellerId);
    return seller;
  }

  static async getAllSellerFromCompany(companyId: string): Promise<ISeller[]> {
    const respose = await api.get<ISeller[]>(
      `/seller/getAllFromACompany/${companyId}`
    );
    return respose.data;
  }

  // Pega todos os Vendedores de um supervisor
  static async getAllSellerFromSupervisor(id: string): Promise<ISeller[]> {
    const sellerResponse: AxiosResponse<ISeller[]> = await api.get(
      `/seller/getAllFromASupervisor/${id}`
    );

    return sellerResponse.data;
  }

  static async delete(sellerId: string): Promise<void> {
    await api.delete(`/seller/delete/${sellerId}`);
  }

  static async createSeller(newSeller: Partial<ISeller>): Promise<ISeller> {
    const sellerResponse = await api.post('/seller/create', newSeller);
    return sellerResponse.data;
  }

  static async updateSeller(newSeller: Partial<ISeller>): Promise<ISeller> {
    const sellerResponse = await api.patch(
      `/seller/update/${newSeller.id}`,
      newSeller
    );
    return sellerResponse.data;
  }

  static async getAllSellerFrom(newSeller: Partial<ISeller>): Promise<ISeller> {
    const sellerResponse = await api.patch(
      `/seller/update/${newSeller.id}`,
      newSeller
    );
    return sellerResponse.data;
  }

  static async findSellerById(idSeller: string): Promise<ISeller> {
    const sellerResponse = await api.get(`/seller/${idSeller}`);
    return sellerResponse.data;
  }

  static async getManagerAndDirectorFromSeller(
    idSeller: string
  ): Promise<{ managerId: string | null; directorId: string | null } | null> {
    const response: AxiosResponse<{
      managerId: string | null;
      directorId: string | null;
    } | null> = await api.get(
      `/seller/getManagerAndDirectorFromSeller/${idSeller}`
    );
    return response.data;
  }
}
