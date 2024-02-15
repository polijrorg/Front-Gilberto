import { AxiosResponse } from 'axios';
import IManager from '@interfaces/Manager';
import api from './api';

export default class ManagerServices {
  //Pega todos os Vendedores de um supervisor pelo ID do Vendedor
  static async getAllSupervisorInManagerById(id: string): Promise<IManager[]> {
    try {
      const managerResponse: AxiosResponse<IManager[]> = await api.get(
        `/manager/getAll/${id}`
      );

      return managerResponse.data;
    } catch (error) {
      console.error('Erro ao obter supervisores de um gerente:', error);
      throw error;
    }
  }
}
