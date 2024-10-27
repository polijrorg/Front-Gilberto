import { AxiosResponse } from 'axios';
import IQuestions from '@interfaces/Visit/Questions';
import IQuestionGrade from '@interfaces/Visit/QuestionGrade';

import api from './api';

interface QuestionsGradeCreate {
  grade: number;
  sellerId: string;
  questionsId: string;
  visitId: string;
  comments?: string;
}

export default class VisitGradeService {
  static async getQuestionsByIdCategory(
    idSeller: string
  ): Promise<IQuestions[]> {
    const questionsResponse: AxiosResponse<IQuestions[]> = await api.get(
      `questionsGrades/getAllBySeller/${idSeller}`
    );

    return questionsResponse.data;
  }

  static async getCommentsByVisitId(idVisit: string): Promise<string[]> {
    const commentsResponse: AxiosResponse<string[]> = await api.get(
      `questionsGrades/getCommentsFromVisit/${idVisit}`
    );

    return commentsResponse.data;
  }

  static async getAverageGradesSupervisor(
    idSupervisor: string,
    idTemplate: string
  ): Promise<
    { categoryId: string; categoryName: string; averageGrade: number }[]
  > {
    const response: AxiosResponse<
      { categoryId: string; categoryName: string; averageGrade: number }[]
    > = await api.get(
      `/questionsGrades/averageGradeByQuestions/supervisor/${idSupervisor}/${idTemplate}`
    );
    return response.data;
  }

  static async getAverageGradesManager(
    idManager: string,
    idTemplate: string
  ): Promise<
    { categoryId: string; categoryName: string; averageGrade: number }[]
  > {
    const response: AxiosResponse<
      { categoryId: string; categoryName: string; averageGrade: number }[]
    > = await api.get(
      `/questionsGrades/averageGradeByQuestions/manager/${idManager}/${idTemplate}`
    );
    return response.data;
  }

  static async create({
    grade,
    sellerId,
    questionsId,
    visitId,
    comments,
  }: QuestionsGradeCreate): Promise<IQuestionGrade> {
    const gradeResponse = await api.post(`/questionsGrades/create`, {
      grade,
      sellerId,
      questionsId,
      visitId,
      comments,
    });
    return gradeResponse.data;
  }

  static async getAllQuestionsBySeller(
    idSeller: string
  ): Promise<IQuestionGrade[]> {
    const questionsResponse: AxiosResponse<IQuestionGrade[]> = await api.get(
      `questionsGrades/getAllBySeller/${idSeller}`
    );

    return questionsResponse.data;
  }

  static async update(idQuestion: string, grade: number): Promise<void> {
    await api.patch(`/questionsGrades/update/${idQuestion}`, {
      grade,
    });
  }
}
