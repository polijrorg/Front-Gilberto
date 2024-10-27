import api from './api';
import Manager from '@interfaces/Manager';

export default class ManagerServices {
  static async getAllManagersFromCmpany(companyId: string): Promise<Manager[]> {
    const response = await api.get<Manager[]>(`/manager/getAll/${companyId}`);

    return response.data;
  }
}
