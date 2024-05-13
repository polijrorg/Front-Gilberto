/* eslint-disable @typescript-eslint/no-shadow */
import { AxiosResponse } from 'axios';
import ITemplateVisit from '@interfaces/Visit/TemplateVisit';
import ICategories from '@interfaces/Visit/Categories';
import IQuestions from '@interfaces/Visit/Questions';
import IQuestionGrade from '@interfaces/Visit/QuestionGrade';
import IVisit from '@interfaces/Visit/Visit';

import api from './api';

export default class VisitGradeService {
  static async getQuestionsByIdCategory(
    idSeller: string
  ): Promise<IQuestions[]> {
    const questionsResponse: AxiosResponse<IQuestions[]> = await api.get(
      `questionsGrades/getAllBySeller/${idSeller}`
    );

    return questionsResponse.data;
  }
}
