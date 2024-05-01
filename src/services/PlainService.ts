import { AxiosResponse } from 'axios';
import IPlain from '@interfaces/Plain';

import api from './api';

export default class PlainService {
  static async getAll(): Promise<IPlain[]> {
    const plainResponse: AxiosResponse<IPlain[]> =
      await api.get(`/actionPlans/getAll`);

    return plainResponse.data;
  }

  static async createPlain(newPlain: Partial<IPlain>): Promise<void> {
    await api.post('/actionPlans/create', newPlain);
  }
}
