import { AxiosResponse } from 'axios';
import IPlain from '@interfaces/Plain';

import api from './api';

export default class PlainService {
  static async getAll(): Promise<IPlain[]> {
    const plainResponse: AxiosResponse<IPlain[]> =
      await api.get(`/actionPlans/getAll`);

    return plainResponse.data;
  }

  static async getByIdSellerPlain(idSeller: string): Promise<IPlain[]> {
    const plainsArray: AxiosResponse<IPlain[]> = await api.get(
      `/actionPlans/getAll/${idSeller}`
    );
    return plainsArray.data;
  }

  static async createPlain(newPlain: Partial<IPlain>): Promise<IPlain> {
    const plainResponse = await api.post('/actionPlans/create', newPlain);
    return plainResponse.data;
  }

  static async markDone(idPlain: string): Promise<IPlain> {
    const responsePlain = await api.patch(`/actionPlans/markAsDone/${idPlain}`);
    return responsePlain.data;
  }
}
