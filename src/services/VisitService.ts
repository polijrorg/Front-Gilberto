/* eslint-disable @typescript-eslint/no-shadow */
import { AxiosResponse } from 'axios';
import ITemplateVisit from '@interfaces/Visit/TemplateVisit';
import ICategories from '@interfaces/Visit/Categories';
import IQuestions from '@interfaces/Visit/Questions';
import IQuestionGrade from '@interfaces/Visit/QuestionGrade';


import api from './api';

export default class VisitService {

  static async createQuestionsGrade(questionGrade: IQuestionGrade): Promise<void>{
    await api.post(
      `/questionsGrades/create`,
      questionGrade
    );
  }

  static async updateQuestionGrade(
    questionGrade: IQuestionGrade
  ): Promise<void> {
    await api.patch(`/questionsGrades/update/`, {
      questionGrade
    });
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
