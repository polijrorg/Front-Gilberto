import { AxiosResponse } from 'axios';
import IModuleGrade from '@interfaces/ModuleGrade';

import api from './api';

export default class ModuleGradeServices {
  static async create(
    supervisorComment: string,
    moduleId: string,
    sellerId: string,
    implementationScore: number,
    knowledgeScore: number
  ): Promise<void> {
    await api.post('/moduleGrades/create', {
      supervisorComment,
      moduleId,
      sellerId,
      implementationScore,
      knowledgeScore,
    });
  }

  static async updateModuleGrade(
    moduleGradesId: string,
    supervisorComment: string,
    implementationScore: number,
    knowledgeScore: number
  ): Promise<void> {
    await api.patch(`/moduleGrades/update/${moduleGradesId}`, {
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
