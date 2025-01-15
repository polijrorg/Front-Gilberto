import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ScrollView, Text } from 'react-native';
import AccordionVisit from '@components/AccordionVisit';
import React, { useEffect, useState, useCallback } from 'react';

import ISeller from '@interfaces/Seller';
import ICategories from '@interfaces/Visit/Categories';
import VisitService from '@services/VisitService';
import VisitGradesService from '@services/VisitGradesService';
import useAuth from '@hooks/useAuth';
import IQuestions from '@interfaces/Visit/Questions';
import IQuestionGrade from '@interfaces/Visit/QuestionGrade';
import SellerService from '@services/SellerServices';
import Visit from '@interfaces/Visit/Visit';

interface RouteParams {
  params: {
    idEmployee: string;
    cargo: string;
    companyId: string;
  };
}

const VisitComponent = ({ route }: { route: RouteParams }) => {
  const { idEmployee, cargo, companyId } = route.params;
  const [loading, setLoading] = useState(false);
  const [seller, setSeller] = useState<ISeller | null>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [categories, setCategories] = useState<{
    [key: string]: ICategories[];
  }>({});
  const [questions, setQuestions] = useState<{ [key: string]: IQuestions[] }>(
    {}
  );
  const [questionGrades, setQuestionGrades] = useState<{
    [key: string]: IQuestionGrade[];
  }>({});

  const { user } = useAuth();

  const fetchTemplates = useCallback(async () => {
    let templates: any[] = [];
    if (user?.managerId) {
      templates = await VisitService.getTemplateByManagerId(user.managerId);
    }

    if (user?.job === 'Diretor') {
      const directorTemplates = await VisitService.getTemplateByDirectorId(
        user.id
      );
      if (directorTemplates) {
        templates = [...templates, ...directorTemplates];
      }
    }

    if (user?.job === 'Gerente') {
      const directorTemplates = await VisitService.getTemplateByManagerId(
        user.id
      );
      if (directorTemplates) {
        templates = [...templates, ...directorTemplates];
      }
    }

    if (user?.companyId) {
      const companyTemplates = await VisitService.getTemplateByCompanyId(
        user.companyId
      );
      if (companyTemplates) {
        templates = [...templates, ...companyTemplates];
      }
    }

    return templates;
  }, [user?.managerId, user?.job, user?.id, user?.companyId]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      if (cargo === 'Vendedor') {
        const sellerData =
          await SellerService.getAllSellerFromCompany(companyId);
        const foundSeller = sellerData.find(
          (seller) => seller.id === idEmployee
        );

        if (foundSeller) {
          setSeller(foundSeller);
          const visitsData = await VisitService.getVisitByIdSeller(
            foundSeller.id
          );
          setVisits(visitsData);

          const templates = await fetchTemplates();

          const fetchedCategories: { [key: string]: ICategories[] } = {};
          const fetchedQuestions: { [key: string]: IQuestions[] } = {};
          const fetchedQuestionGrades: { [key: string]: IQuestionGrade[] } = {};

          for (const visit of visitsData) {
            fetchedCategories[visit.id] = [];
            fetchedQuestions[visit.id] = [];
            fetchedQuestionGrades[visit.id] = [];

            for (const template of templates) {
              const categories = await VisitService.getCategoriesByIdTemplate(
                template.id
              );

              for (const category of categories) {
                if (category.visitTemplateId === visit.visitTemplateId) {
                  fetchedCategories[visit.id].push(category);

                  const questions = await VisitService.getQuestionsByIdCategory(
                    category.id
                  );
                  const questionGrades =
                    await VisitGradesService.getAllQuestionsBySeller(
                      foundSeller.id
                    );

                  fetchedQuestions[visit.id].push(...questions);
                  fetchedQuestionGrades[visit.id].push(
                    ...questionGrades.filter((qg) => qg.visitId === visit.id)
                  );
                }
              }
            }
          }

          setCategories(fetchedCategories);
          setQuestions(fetchedQuestions);
          setQuestionGrades(fetchedQuestionGrades);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados de supervisores:', error);
    } finally {
      setLoading(false);
    }
  }, [cargo, idEmployee, companyId, fetchTemplates]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <S.LoadingContainer>
        <ActivityIndicator color="#3E63DD" />
      </S.LoadingContainer>
    );
  }

  const calculateMedia = (
    visitId: string,
    questions: { [key: string]: IQuestions[] },
    questionGrades: { [key: string]: IQuestionGrade[] }
  ) => {
    const relevantQuestions = questions[visitId] || [];
    const relevantGrades = questionGrades[visitId] || [];

    const totalGrades = relevantGrades.reduce(
      (total, grade) => total + grade.grade,
      0
    );

    return relevantGrades.length > 0 ? totalGrades / relevantGrades.length : 0;
  };

  // const generateQuestionsWithGrades = (
  //   visitId: string,
  //   categoryId: string,
  //   questions: { [key: string]: IQuestions[] },
  //   questionGrades: { [key: string]: IQuestionGrade[] }
  // ) => {
  //   const relevantQuestions =
  //     questions[visitId]?.filter(
  //       (question) => question.categoriesId === categoryId
  //     ) || [];
  //   return relevantQuestions.map((question) => {
  //     const grade = questionGrades[visitId]?.find(
  //       (grade) => grade.questionsId === question.id && grade.grade !== 0
  //     );
  //     return {
  //       question: question.question,
  //       grade: grade ? grade.grade.toString() : 'X,X',
  //       comments: grade?.comments,
  //       categories: question.categoriesId,
  //     };
  //   });
  // };

  const generateQuestionsWithGradesByCategory = (
    visitId: string,
    categories: ICategories[],
    questions: { [key: string]: IQuestions[] },
    questionGrades: { [key: string]: IQuestionGrade[] }
  ) => {
    return categories.map((category) => {
      const relevantQuestions =
        questions[visitId]?.filter(
          (question) => question.categoriesId === category.id
        ) || [];

      const questionsWithGrades = relevantQuestions.map((question) => {
        const grade = questionGrades[visitId]?.find(
          (grade) => grade.questionsId === question.id && grade.grade !== 0
        );
        return {
          question: question.question,
          grade: grade ? grade.grade.toString() : 'X,X',
          comments: grade?.comments,
        };
      });

      return {
        categoryName: category.name,
        questions: questionsWithGrades,
      };
    });
  };

  return (
    <S.Wrapper>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <S.WrapperView>
          {visits.length > 0 ? (
            visits.map((visit) => {
              return (
                <AccordionVisit
                  key={visit.id}
                  title={`${visit.storeVisited} - ${visit.dateVisited}`}
                  media={calculateMedia(visit.id, questions, questionGrades)}
                  categories={generateQuestionsWithGradesByCategory(
                    visit.id,
                    categories[visit.id] || [],
                    questions,
                    questionGrades
                  )}
                  visitId={visit.id}
                />
              );
            })
          ) : (
            <S.NoVisitsContainer>
              <Text>Nenhuma visita registrada para o dia selecionado.</Text>
            </S.NoVisitsContainer>
          )}
        </S.WrapperView>
      </ScrollView>
    </S.Wrapper>
  );
};

export default VisitComponent;
