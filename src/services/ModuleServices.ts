import { AxiosResponse } from 'axios';
import IModule from '@interfaces/Module';
import IModuleGrade from '@interfaces/ModuleGrade';

import api from './api';

export default class ModulesServices {
  static async getAllModules(): Promise<IModule[]> {
    const sellerResponse: AxiosResponse<IModule[]> =
      await api.get(`/module/getAll`);

    return sellerResponse.data;
  }

  static async getModuleGradesByIdSeller(
    idSeller: string
  ): Promise<IModuleGrade> {
    const moduleGradeSellerResponse: AxiosResponse<IModuleGrade> =
      await api.get(`/moduleGrades/getAll/${idSeller}`);
    return moduleGradeSellerResponse.data;
  }
}
