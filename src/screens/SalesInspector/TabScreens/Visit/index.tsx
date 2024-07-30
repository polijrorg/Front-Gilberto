import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ScrollView, Text } from 'react-native';
import AccordionVisit from '@components/AccordionVisit';
import React, { useEffect, useState } from 'react';

import ISeller from '@interfaces/Seller';
import ICategories from '@interfaces/Visit/Categories';
import VisitService from '@services/VisitService';
import VisitGradesService from '@services/VisitGradesService';
import useAuth from '@hooks/useAuth';
import IQuestions from '@interfaces/Visit/Questions';
import IQuestionGrade from '@interfaces/Visit/QuestionGrade';
import SellerService from '@services/SellerServices';
import Visit from '@interfaces/Visit/Visit';

const VisitComponent = ({ route }) => {
  const { idEmployee, cargo, companyId } = route.params;
  const [loading, setLoading] = useState(false);
  const [seller, setSeller] = useState<ISeller | null>(null);
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

  useEffect(() => {
    const fetchData = async () => {
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

            // Busca todos os templates disponíveis
            let templates = [];
            if (user.managerId) {
              templates = await VisitService.getTemplateByManagerId(
                user.managerId
              );
            }

            if (user.job === 'Diretor') {
              const directorTemplates =
                await VisitService.getTemplateByDirectorId(user.id);
              if (directorTemplates) {
                templates = [...templates, ...directorTemplates];
              }
            }
            if (user.companyId) {
              const companyTemplates =
                await VisitService.getTemplateByCompanyId(user.companyId);
              if (companyTemplates) {
                templates = [...templates, ...companyTemplates];
              }
            }

            const fetchedCategories: { [key: string]: ICategories[] } = {};
            const fetchedQuestions: { [key: string]: IQuestions[] } = {};
            const fetchedQuestionGrades: { [key: string]: IQuestionGrade[] } =
              {};

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

                    const questions =
                      await VisitService.getQuestionsByIdCategory(category.id);

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
    };

    fetchData();
  }, [
    cargo,
    idEmployee,
    companyId,
    user.managerId,
    user.companyId,
    user.job,
    user.id,
  ]);

  if (loading) {
    return (
      <S.LoadingContainer>
        <ActivityIndicator size="large" color="#3E63DD" />
      </S.LoadingContainer>
    );
  }

  const calculateMedia = (visitId: string, categoryId: string) => {
    const relevantQuestions =
      questions[visitId]?.filter(
        (question) => question.categoriesId === categoryId
      ) || [];
    const relevantGrades =
      questionGrades[visitId]?.filter((grade) =>
        relevantQuestions.some(
          (question) => question.id === grade.questionsId && grade.grade !== 0
        )
      ) || [];
    const totalGrades = relevantGrades.reduce(
      (total, grade) => total + grade.grade,
      0
    );
    return relevantGrades.length > 0 ? totalGrades / relevantGrades.length : 0;
  };

  const generateQuestionsWithGrades = (visitId: string, categoryId: string) => {
    const relevantQuestions =
      questions[visitId]?.filter(
        (question) => question.categoriesId === categoryId
      ) || [];
    const questionsWithGrades: { question: string; grade: string }[] = [];

    relevantQuestions.forEach((question) => {
      const grade = questionGrades[visitId]?.find(
        (grade) => grade.questionsId === question.id && grade.grade !== 0
      );
      if (grade) {
        questionsWithGrades.push({
          question: question.question,
          grade: grade.grade.toString(),
        });
      } else {
        questionsWithGrades.push({ question: question.question, grade: 'X,X' });
      }
    });

    return questionsWithGrades;
  };

  return (
    <S.Wrapper>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <S.WrapperView>
          {visits.length > 0 ? (
            visits.map((visit) => (
              <S.ViewWrapper key={visit.id}>
                <S.VisitTitle>
                  {visit.storeVisited} - {visit.dateVisited}
                </S.VisitTitle>
                {categories[visit.id]?.map((category) => (
                  <AccordionVisit
                    key={category.id}
                    title={category.name}
                    media={calculateMedia(visit.id, category.id)}
                    questions={generateQuestionsWithGrades(
                      visit.id,
                      category.id
                    )}
                  />
                ))}
              </S.ViewWrapper>
            ))
          ) : (
            <S.NoVisitsContainer>
              <Text>{`${cargo} não tem visitas cadastradas.`}</Text>
            </S.NoVisitsContainer>
          )}
        </S.WrapperView>
      </ScrollView>
    </S.Wrapper>
  );
};

export default VisitComponent;
