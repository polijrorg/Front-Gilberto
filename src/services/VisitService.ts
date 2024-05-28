/* eslint-disable @typescript-eslint/no-shadow */
import { AxiosResponse } from 'axios';
import ITemplateVisit from '@interfaces/Visit/TemplateVisit';
import ICategories from '@interfaces/Visit/Categories';
import IQuestions from '@interfaces/Visit/Questions';
import IQuestionGrade from '@interfaces/Visit/QuestionGrade';
import IVisit from '@interfaces/Visit/Visit';

import api from './api';

interface VisitCreate{
  sellerId: string;
  visitTemplateId: string;
  storeVisited: string;
  dateVisited: string
}

export default class VisitService {
  static async createQuestionsGrade(
    questionGrade: IQuestionGrade
  ): Promise<void> {
    await api.post(`/questionsGrades/create`, questionGrade);
  }

  static async createVisit(
    {visitTemplateId, sellerId, dateVisited,storeVisited}: VisitCreate
  ): Promise<void> {
    await api.post(`/visit/create`, {visitTemplateId, sellerId, dateVisited,storeVisited});
  }

  static async getAll(): Promise<IVisit[]> {
    const visits: AxiosResponse<IVisit[]> = await api.get('visit/getAll');
    return visits.data;
  }

  static async getVisitByIdSeller(sellerId: string): Promise<IVisit[]> {
    const visits: AxiosResponse<IVisit[]> = await api.get(`/visit/getAll/${sellerId}`);
    return visits.data;
  }

  static async getTemplateByCompanyId(
    idCompany: string
  ): Promise<ITemplateVisit[]> {
    const templateResponse: AxiosResponse<ITemplateVisit[]> = await api.get(
      `/visitTemplate/getByCompany/${idCompany}`
    );

    return templateResponse.data;
  }

  static async getCategoriesByIdTemplate(
    idTemplate: string
  ): Promise<ICategories[]> {
    const categoriesResponse: AxiosResponse<ICategories[]> = await api.get(
      `/categories/getAll/${idTemplate}`
    );

    return categoriesResponse.data;
  }

  static async getQuestionsByIdCategory(
    idCategory: string
  ): Promise<IQuestions[]> {
    const questionsResponse: AxiosResponse<IQuestions[]> = await api.get(
      `/questions/getAll/${idCategory}`
    );

    return questionsResponse.data;
  }
}
