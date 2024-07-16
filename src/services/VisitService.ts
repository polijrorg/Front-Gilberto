import { AxiosResponse } from 'axios';
import ITemplateVisit from '@interfaces/Visit/TemplateVisit';
import ICategories from '@interfaces/Visit/Categories';
import IQuestions from '@interfaces/Visit/Questions';
import IQuestionGrade from '@interfaces/Visit/QuestionGrade';
import IVisit from '@interfaces/Visit/Visit';

import api from './api';
import Visit from '@interfaces/Visit/Visit';

interface VisitCreate {
  sellerId: string;
  visitTemplateId: string;
  storeVisited: string;
  dateVisited: string;
}

interface UpdateCategories {
  id: string;
  name: string;
}

interface UpdateQuestions {
  id: string;
  question: string;
}

export default class VisitService {
  static async createQuestionsGrade(
    questionGrade: IQuestionGrade
  ): Promise<void> {
    await api.post(`/questionsGrades/create`, questionGrade);
  }

  static async createQuestions({
    categoriesId,
    question,
    number,
  }: IQuestions): Promise<IQuestions> {
    console.log(categoriesId, question);
    const newQuestion = await api.post(`/questions/create`, {
      categoriesId,
      question,
      number,
    });
    console.log(newQuestion);
    return newQuestion.data;
  }

  static async createVisit({
    visitTemplateId,
    sellerId,
    dateVisited,
    storeVisited,
  }: VisitCreate): Promise<Visit> {
    const visit = await api.post(`/visit/create`, {
      visitTemplateId,
      sellerId,
      dateVisited,
      storeVisited,
    });
    return visit.data;
  }

  static async deleteQuestion(id: string): Promise<IQuestions> {
    const question = await api.delete(`/questions/delete/${id}`);
    return question.data;
  }

  static async deleteCategories(id: string): Promise<ICategories> {
    const question = await api.delete(`/categories/delete/${id}`);
    return question.data;
  }

  static async updateCategory({ id, name }: UpdateCategories): Promise<void> {
    await api.put(`categories/${id}`, { name });
  }

  static async updateQuestion({
    id,
    question,
  }: UpdateQuestions): Promise<void> {
    await api.put(`questions/${id}`, { question });
  }

  static async getAll(): Promise<IVisit[]> {
    const visits: AxiosResponse<IVisit[]> = await api.get('visit/getAll');
    return visits.data;
  }

  static async getVisitByIdSeller(sellerId: string): Promise<IVisit[]> {
    const visits: AxiosResponse<IVisit[]> = await api.get(
      `/visit/getAll/${sellerId}`
    );
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

  static async getTemplateByManagerId(
    idManager: string
  ): Promise<ITemplateVisit[]> {
    const templateResponse: AxiosResponse<ITemplateVisit[]> = await api.get(
      `/visitTemplate/getByManager/${idManager}`
    );

    return templateResponse.data;
  }

  static async getTemplateByDirectorId(
    idDirector: string
  ): Promise<ITemplateVisit[]> {
    const templateResponse: AxiosResponse<ITemplateVisit[]> = await api.get(
      `/visitTemplate/getByDirector/${idDirector}`
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
