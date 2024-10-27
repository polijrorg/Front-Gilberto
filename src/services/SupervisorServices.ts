import api from './api';
import ISupervisor from '@interfaces/Supervisor';

interface ICreateSupervisorResponse {
  email: string;
  image: string;
  password: string;
  name: string;
  companyId: string;
  managerId: string;
}
export default class SupervisorServices {
  static async create({
    email,
    companyId,
    image,
    managerId,
    name,
    password,
  }: ICreateSupervisorResponse): Promise<ISupervisor> {
    const supervisorResponse = await api.post('/supervisor/create', {
      email,
      companyId,
      image,
      managerId,
      name,
      password,
    });
    return supervisorResponse.data;
  }
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

  static async findByID(supervisorId: string): Promise<ISupervisor> {
    const response = await api.get<ISupervisor>(`/supervisor/${supervisorId}`);

    return response.data;
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
  ): Promise<ISupervisor | undefined> {
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
