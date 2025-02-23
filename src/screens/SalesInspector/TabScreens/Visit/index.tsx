import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
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
  const [visits, setVisits] = useState<Visit[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: ICategories[] }>({});
  const [questions, setQuestions] = useState<{ [key: string]: IQuestions[] }>({});
  const [questionGrades, setQuestionGrades] = useState<{ [key: string]: IQuestionGrade[] }>({});
  
  const { user } = useAuth();

  const fetchTemplates = useCallback(async () => {
    let templates: any[] = [];
    if (user?.managerId) {
      const managerTemplates = await VisitService.getTemplateByManagerId(user.managerId);
      if (managerTemplates) templates = [...templates, ...managerTemplates];
    }

    if (user?.job === 'Diretor') {
      const directorTemplates = await VisitService.getTemplateByDirectorId(user.id);
      if (directorTemplates) templates = [...templates, ...directorTemplates];
    }

    if (user?.job === 'Gerente') {
      const gerenteTemplates = await VisitService.getTemplateByManagerId(user.id);
      if (gerenteTemplates) templates = [...templates, ...gerenteTemplates];
    }

    if (user?.companyId) {
      const companyTemplates = await VisitService.getTemplateByCompanyId(user.companyId);
      if (companyTemplates) templates = [...templates, ...companyTemplates];
    }

    return templates;
  }, [user?.managerId, user?.job, user?.id, user?.companyId]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      if (cargo === 'Vendedor') {
        // Busca os dados do vendedor e as visitas dele
        const sellerData = await SellerService.getAllSellerFromCompany(companyId);
        const foundSeller = sellerData.find((seller) => seller.id === idEmployee);

        if (foundSeller) {
          setSeller(foundSeller);
          const visitsData = await VisitService.getVisitByIdSeller(foundSeller.id);
          setVisits(visitsData);

          // Busca os templates uma única vez
          const templates = await fetchTemplates();

          // Pré-carrega as categorias de todos os templates em paralelo
          const categoriesPromises = templates.map(template =>
            VisitService.getCategoriesByIdTemplate(template.id)
          );
          const allTemplatesCategories = await Promise.all(categoriesPromises);

          // Pré-carrega os questionGrades uma única vez
          const allQuestionGrades = await VisitGradesService.getAllQuestionsBySeller(foundSeller.id);

          // Inicializa os objetos que irão armazenar os dados agrupados por visita
          const fetchedCategories: { [key: string]: ICategories[] } = {};
          const fetchedQuestions: { [key: string]: IQuestions[] } = {};
          const fetchedQuestionGrades: { [key: string]: IQuestionGrade[] } = {};

          // Para cada visita, inicializa os arrays
          visitsData.forEach(visit => {
            fetchedCategories[visit.id] = [];
            fetchedQuestions[visit.id] = [];
            fetchedQuestionGrades[visit.id] = [];
          });

          // Para cada template, itera pelas categorias já pré-carregadas
          for (let i = 0; i < templates.length; i++) {
            const template = templates[i];
            const templateCategories: ICategories[] = allTemplatesCategories[i] || [];

            // Para cada categoria do template, verifica se ela pertence à visita e busca as perguntas
            for (const category of templateCategories) {
              // Itera por cada visita para ver se a categoria pertence a ela
              for (const visit of visitsData) {
                if (category.visitTemplateId === visit.visitTemplateId) {
                  fetchedCategories[visit.id].push(category);

                  // Busca as perguntas para a categoria (pode ser feito em paralelo se necessário)
                  const questionsForCategory = await VisitService.getQuestionsByIdCategory(category.id);
                  fetchedQuestions[visit.id].push(...questionsForCategory);

                  // Filtra os questionGrades que correspondem à visita atual e à categoria, se necessário
                  const gradesForVisit = allQuestionGrades.filter(qg => qg.visitId === visit.id);
                  fetchedQuestionGrades[visit.id].push(...gradesForVisit);
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
      console.error('Erro ao buscar dados de visitas:', error);
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
    const relevantGrades = questionGrades[visitId] || [];
    const totalGrades = relevantGrades.reduce((total, grade) => total + grade.grade, 0);
    return relevantGrades.length > 0 ? totalGrades / relevantGrades.length : 0;
  };

  const generateQuestionsWithGradesByCategory = (
    visitId: string,
    categories: ICategories[],
    questions: { [key: string]: IQuestions[] },
    questionGrades: { [key: string]: IQuestionGrade[] }
  ) => {
    return categories.map((category) => {
      const relevantQuestions =
        questions[visitId]?.filter((question) => question.categoriesId === category.id) || [];
      const questionsWithGrades = relevantQuestions.map((question) => {
        const grade = questionGrades[visitId]?.find(
          (qg) => qg.questionsId === question.id && qg.grade !== 0
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
            visits.map((visit) => (
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
            ))
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
