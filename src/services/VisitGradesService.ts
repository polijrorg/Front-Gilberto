import { AxiosResponse } from 'axios';
import IQuestions from '@interfaces/Visit/Questions';
import IQuestionGrade from '@interfaces/Visit/QuestionGrade';

import api from './api';

interface QuestionsGradeCreate {
  grade: number;
  sellerId: string;
  questionsId: string;
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

  static async create({
    grade,
    sellerId,
    questionsId,
  }: QuestionsGradeCreate): Promise<IQuestionGrade> {
    const gradeResponse = await api.post(`/questionsGrades/create`, {
      grade,
      sellerId,
      questionsId,
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
