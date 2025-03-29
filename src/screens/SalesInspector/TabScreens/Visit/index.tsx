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

// Helper to parse dd/mm/yyyy into a Date object
const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};

const VisitComponent = ({ route }: { route: RouteParams }) => {
  const { idEmployee, cargo, companyId } = route.params;
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState<ISeller | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: ICategories[] }>({});
  const [questions, setQuestions] = useState<{ [key: string]: IQuestions[] }>({});
  const [questionGrades, setQuestionGrades] = useState<{ [key: string]: IQuestionGrade[] }>({});

  const { user } = useAuth();

  // Fetch details templates
  const fetchTemplates = useCallback(async () => {
    let templates: any[] = [];
    if (user?.managerId) {
      const managerTemplates = await VisitService.getTemplateByManagerId(user.managerId);
      if (managerTemplates) templates = [...templates, ...managerTemplates];
    }

    if (user?.job === 'Diretor') {
      const directorTemplates = await VisitService.getTemplateByDirectorId(user.id);
      if (directorTemplates) templates = [...templates, ...directorTemplates];
    } else if (user?.job === 'Gerente') {
      const gerenteTemplates = await VisitService.getTemplateByManagerId(user.id);
      if (gerenteTemplates) templates = [...templates, ...gerenteTemplates];
    }

    if (user?.companyId) {
      const companyTemplates = await VisitService.getTemplateByCompanyId(user.companyId);
      if (companyTemplates) templates = [...templates, ...companyTemplates];
    }

    return templates;
  }, [user]);

  const fetchData = useCallback(async () => {
    try {
      if (cargo !== "Vendedor") return;
  
      const sellerData = await SellerService.getAllSellerFromCompany(companyId);
      const foundSeller = sellerData.find((seller) => seller.id === idEmployee);
      if (!foundSeller) return;
  
      setSeller(foundSeller);
  
      // Fetch visits and sort by most recent first
      let visitsData = await VisitService.getVisitByIdSeller(foundSeller.id);
      visitsData.sort((a, b) => parseDate(b.dateVisited).getTime() - parseDate(a.dateVisited).getTime());
      setVisits(visitsData);
  
      setLoading(true);
  
      // Fetch templates, categories, and grades in parallel
      const [templates, allQuestionGrades] = await Promise.all([
        fetchTemplates(),
        VisitGradesService.getAllQuestionsBySeller(foundSeller.id),
      ]);
  
      // Fetch all categories for templates in parallel
      const categoriesPromises = templates.map((template) => 
        VisitService.getCategoriesByIdTemplate(template.id)
      );
      const allTemplatesCategories = await Promise.all(categoriesPromises);
  
      // Create maps to structure the data efficiently
      const fetchedCategories: { [key: string]: ICategories[] } = {};
      const fetchedQuestions: { [key: string]: IQuestions[] } = {};
      const fetchedQuestionGrades: { [key: string]: IQuestionGrade[] } = {};
  
      // Initialize containers for each visit
      visitsData.forEach(visit => {
        fetchedCategories[visit.id] = [];
        fetchedQuestions[visit.id] = [];
        fetchedQuestionGrades[visit.id] = [];
      });
  
      // Create a map for visitTemplateId -> visitIds for fast lookup
      const visitTemplateMap = new Map<string, string[]>();
      visitsData.forEach(visit => {
        if (!visitTemplateMap.has(visit.visitTemplateId)) {
          visitTemplateMap.set(visit.visitTemplateId, []);
        }
        visitTemplateMap.get(visit.visitTemplateId)?.push(visit.id);
      });
  
      // Gather all category-question fetch promises
      const questionPromises: Promise<IQuestions[]>[] = [];
      allTemplatesCategories.flat().forEach(category => {
        const relatedVisits = visitTemplateMap.get(category.visitTemplateId) || [];
        relatedVisits.forEach(visitId => {
          fetchedCategories[visitId].push(category);
          questionPromises.push(VisitService.getQuestionsByIdCategory(category.id));
        });
      });
  
      // Fetch all questions in one go
      const allQuestions = await Promise.all(questionPromises);
  
      // Assign fetched questions to visits
      let questionIndex = 0;
      allTemplatesCategories.flat().forEach(category => {
        const relatedVisits = visitTemplateMap.get(category.visitTemplateId) || [];
        relatedVisits.forEach(visitId => {
          fetchedQuestions[visitId].push(...allQuestions[questionIndex]);
        });
        questionIndex++;
      });
  
      // Assign grades to visits
      visitsData.forEach(visit => {
        fetchedQuestionGrades[visit.id] = allQuestionGrades.filter(qg => qg.visitId === visit.id);
      });
  
      setCategories(fetchedCategories);
      setQuestions(fetchedQuestions);
      setQuestionGrades(fetchedQuestionGrades);
    } catch (error) {
      console.error("Erro ao buscar dados de visitas:", error);
    } finally {
      setLoading(false);
    }
  }, [cargo, idEmployee, companyId, fetchTemplates]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          {loading && (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text>Carregando informações adicionais...</Text> 
              <ActivityIndicator color="#0000ff" />
            </View>
          )}
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
