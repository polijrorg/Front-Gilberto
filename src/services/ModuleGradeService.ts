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

  static async getModuleGradesByIdSeller(
    idSeller: string
  ): Promise<IModuleGrade[]> {
    const moduleGradeSellerResponse: AxiosResponse<IModuleGrade[]> =
      await api.get(`/moduleGrades/getAll/${idSeller}`);
    return moduleGradeSellerResponse.data;
  }
}
