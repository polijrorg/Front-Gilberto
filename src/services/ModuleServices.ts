import { AxiosResponse } from 'axios';
import IModule from '@interfaces/Module';
import IModuleGrade from '@interfaces/ModuleGrade';

import api from './api';

export default class ModulesServices {
  static async getAllModules(): Promise<IModule[]> {
    const moduleResponse: AxiosResponse<IModule[]> =
      await api.get(`/module/getAll`);

    return moduleResponse.data;
  }

  static async getModuleById(idModule: string): Promise<IModule> {
    const moduleResponse: AxiosResponse<IModule[]> =
      await api.get('/module/getAll');
    const module = moduleResponse.data.find((module) => module.id === idModule);

    return module;
  }

  static async getModuleGradesByIdSeller(
    idSeller: string
  ): Promise<IModuleGrade[]> {
    const moduleGradeSellerResponse: AxiosResponse<IModuleGrade[]> =
      await api.get(`/moduleGrades/getAll/${idSeller}`);
    return moduleGradeSellerResponse.data;
  }
}
