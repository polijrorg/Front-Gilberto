/* eslint-disable @typescript-eslint/no-shadow */
import { AxiosResponse } from 'axios';
import ISeller from '@interfaces/Seller';
import api from './api';
import ISupervisor from '@interfaces/Supervisor';

interface ISupervisorResponse {
  supervisors: ISupervisor[];
}

export default class SupervisorServices {
  static async getAllSellerInSupervisorById(id: string): Promise<ISeller[]> {
    try {
      const sellerResponse: AxiosResponse<ISeller[]> = await api.get(
        `/seller/getAll/${id}`
      );

      return sellerResponse.data;
    } catch (error) {
      console.error('Erro ao obter vendedores do supervisor:', error);
      throw error;
    }
  }

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
  static async getAllSupervisorInCompanyById(
    idCompany: string
  ): Promise<ISupervisorResponse[]> {
    try {
      console.log('aqui passou');
      const supervisorResponse: AxiosResponse<ISupervisorResponse[]> =
        await api.get(`/supervisor/getAll/${idCompany}`);
      return supervisorResponse.data;
    } catch (error) {
      console.error('Erro ao obter supervisores:', error);
      throw error;
    }
  }

  static async getSupervisorById(
    idSupervisor: string,
    idCompany: string
  ): Promise<ISupervisor | null> {
    try {
      console.log(idSupervisor, idCompany);
      const response: ISupervisorResponse[] =
        await this.getAllSupervisorInCompanyById(idCompany);

      let supervisorResponse;
      if (response && response.length > 0) {
        supervisorResponse = response.find((item) => {
          if (item.supervisors && item.supervisors.length > 0) {
            return item.supervisors.find(
              (supervisor) => supervisor.id === idSupervisor
            );
          }
          return false;
        });
      }

      if (supervisorResponse && supervisorResponse.supervisors) {
        // Se o supervisor foi encontrado
        const supervisor = supervisorResponse.supervisors.find(
          (supervisor) => supervisor.id === idSupervisor
        );
        if (supervisor) {
          // Se o supervisor for encontrado dentro da lista de supervisores
          return supervisor;
        }
      }

      // Se o supervisor não foi encontrado
      return null;
    } catch (error) {
      console.error('Erro ao obter o supervisor:', error);
      throw error;
    }
  }
}
