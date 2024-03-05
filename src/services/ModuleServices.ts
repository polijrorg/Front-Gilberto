import { AxiosResponse } from 'axios';
import IModule from '@interfaces/Module';

import api from './api';

export default class ModulesServices {
  static async getAllModules(): Promise<IModule[]> {
    const sellerResponse: AxiosResponse<IModule[]> =
      await api.get(`/module/getAll`);

    return sellerResponse.data;
  }
}
