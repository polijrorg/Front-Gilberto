/* eslint-disable @typescript-eslint/no-shadow */
import api from './api';
import ISupervisor from '@interfaces/Supervisor';

export default class SupervisorServices {
  // Pega um supervisor pelo ID do Manager
  static async getSupervisorById(
    supervisorId: string,
    managerId: string
  ): Promise<ISupervisor | null> {
    const response = await api.get<ISupervisor[]>(
      `/supervisor/getAllFromAManager/${managerId}`
    );
    const supervisor = response.data.find(
      (supervisor) => supervisor.id === supervisorId
    );

    return supervisor || null;
  }

  static async getAllSupervisorsFromManager(
    managerId: string
  ): Promise<ISupervisor[]> {
    const response = await api.get<ISupervisor[]>(
      `/supervisor/getAllFromAManager/${managerId}`
    );

    return response.data;
  }

  static async getSupervisorByIdCompany(
    companyId: string,
    supervisorId: string
  ): Promise<ISupervisor> {
    const responseCompany = await this.getAllSupervisorFromCompany(companyId);
    const supervisor = responseCompany.find(
      (supervisor) => supervisor.id === supervisorId
    );
    return supervisor;
  }

  static async getAllSupervisorFromCompany(
    companyId: string
  ): Promise<ISupervisor[]> {
    const respose = await api.get<ISupervisor[]>(
      `/supervisor/getAllFromACompany/${companyId}`
    );
    return respose.data;
  }

  static async delete(supervisorId: string): Promise<void> {
    await api.delete(`/supervisor/delete/${supervisorId}`);
  }
}
