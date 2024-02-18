/* eslint-disable @typescript-eslint/no-shadow */
import { AxiosResponse } from 'axios';
import ISeller from '@interfaces/Seller';
import api from './api';
import ISupervisor from '@interfaces/Supervisor';

export default class SupervisorServices {
  //Pega todos os Vendedores de um supervisor pelo ID do Supervisor
  static async getAllSellerInSupervisorById(id: string): Promise<ISeller[]> {
    try {
      const sellerResponse: AxiosResponse<ISeller[]> = await api.get(
        `/seller/getAllFromASupervisor/${id}`
      );

      return sellerResponse.data;
    } catch (error) {
      console.error('Erro ao obter vendedores do supervisor:', error);
      throw error;
    }
  }

  //Pega um supervisor pelo ID
  static async getSupervisorById(
    supervisorId: string,
    companyId: string
  ): Promise<ISupervisor | null> {
    try {
      const response = await api.get<ISupervisor[]>(
        `supervisor/getAllFromACompany/${companyId}`
      );
      const supervisor = response.data.find(
        (supervisor) => supervisor.id === supervisorId
      );

      return supervisor || null;
    } catch (error) {
      console.error('Erro ao buscar Supervisor:', error);
      throw error;
    }
  }
}
