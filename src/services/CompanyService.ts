import { AxiosResponse } from 'axios';
import ICompany from '@interfaces/Company';

import api from './api';

export default class CompanyServices {
  static async getAll(): Promise<ICompany[]> {
    const companyResponse: AxiosResponse<ICompany[]> =
      await api.get(`/company/getAll`);

    return companyResponse.data;
  }

  static async getCompanyById(idCompany: string): Promise<ICompany> {
    const companyResponse: AxiosResponse<ICompany[]> =
      await api.get('/company/getAll');
    const company = companyResponse.data.find(
      (company) => company.id === idCompany
    );

    if (company === undefined) {
      throw new Error('Company not found');
    }

    return company;
  }
}
