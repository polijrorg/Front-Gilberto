import { AxiosResponse } from 'axios';
import IModuleGrade from '@interfaces/ModuleGrade';

interface ModuleGradeCreate {
  implementationScore: number;
  knowledgeScore: number;
  supervisorComment: string;
  moduleId: string;
  sellerId: string;
}

interface ModuleGradeUpdate {
  id: string;
  implementationScore: number;
  knowledgeScore: number;
  supervisorComment: string;
  moduleId: string;
  sellerId: string;
}

import api from './api';
import { ScatterPlotProps } from '@components/Scratter';

export default class ModuleGradeServices {
  static async create({
    supervisorComment,
    moduleId,
    sellerId,
    implementationScore,
    knowledgeScore,
  }: ModuleGradeCreate): Promise<void> {
    await api.post('/moduleGrades/create', {
      supervisorComment,
      moduleId,
      sellerId,
      implementationScore,
      knowledgeScore,
    });
  }

  static async getGradeModuleAll(): Promise<
    { moduleId: string; average: number }[]
  > {
    const moduleGradeSellerResponse: AxiosResponse<
      { moduleId: string; average: number }[]
    > = await api.get(`/moduleGrades/getModuleAverages`);
    return moduleGradeSellerResponse.data;
  }

  static async updateModuleGrade({
    id,
    supervisorComment,
    implementationScore,
    knowledgeScore,
  }: ModuleGradeUpdate): Promise<void> {
    await api.patch(`/moduleGrades/update/${id}`, {
      supervisorComment,
      implementationScore,
      knowledgeScore,
    });
  }

  static async getAllModulesInfo(
    supervisorID: string
  ): Promise<ScatterPlotProps[]> {
    const moduleGradeSellerResponse: AxiosResponse<ScatterPlotProps[]> =
      await api.get(`/module/getAllModuleInfo/${supervisorID}`);

    return moduleGradeSellerResponse.data;
  }

  static async getModulesAvailabreGradesBySellerID(
    sellerId: string,
    teplateId: string
  ): Promise<
    { categoryId: string; categoryName: string; averageGrade: number }[]
  > {
    const response: AxiosResponse<
      { categoryId: string; categoryName: string; averageGrade: number }[]
    > = await api.get(
      `/questionsGrades/averageGradeByQuestions/seller/${sellerId}/${teplateId}`
    );
    return response.data;
  }

  static async getModuleGradesByIdSeller(
    idSeller: string
  ): Promise<IModuleGrade[]> {
    const moduleGradeSellerResponse: AxiosResponse<IModuleGrade[]> =
      await api.get(`/moduleGrades/getAll/${idSeller}`);
    return moduleGradeSellerResponse.data;
  }
}
