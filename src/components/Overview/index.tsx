import React, { Suspense, lazy, useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, Text } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import * as S from './styles';

import ICategories from '@interfaces/Visit/Categories';
import Visit from '@interfaces/Visit/Visit';
import IQuestions from '@interfaces/Visit/Questions';
import IQuestionGrade from '@interfaces/Visit/QuestionGrade';

import VisitService from '@services/VisitService';
import VisitGradesService from '@services/VisitGradesService';
import ModuleGradeServices from '@services/ModuleGradeService';
import User from '@interfaces/User';
import ITemplateVisit from '@interfaces/Visit/TemplateVisit';

const AccordionVisit = lazy(
  () =>
    import(
      '@components/AccordionVisit'
    ) /* webpackChunkName: "AccordionVisit" */
);
const BarChart = lazy(() =>
  import('react-native-chart-kit').then((module) => ({
    default: module.BarChart,
  }))
);

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

  const numberOfGrades = relevantGrades.length;

  return numberOfGrades > 0 ? totalGrades / numberOfGrades : 0;
};

const generateQuestionsWithGrades = (
  visitId: string,
  categoryId: string,
  questions: { [key: string]: IQuestions[] },
  questionGrades: { [key: string]: IQuestionGrade[] }
) => {
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

interface OverViewProps {
  sellerId: string;
  dateVisit: string;
  user: User;
  templates: ITemplateVisit[];
  setIndexScreen: () => void;
}

const OverView: React.FC<OverViewProps> = ({
  sellerId,
  dateVisit,
  user,
  templates,
  setIndexScreen,
}) => {
  const [questionsBar, setQuestionsBar] = useState<
    | { questionId: string; questionName: string; averageGrade: number }[]
    | undefined
  >([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [categories, setCategories] = useState<{
    [key: string]: ICategories[];
  }>({});
  const [questions, setQuestions] = useState<{ [key: string]: IQuestions[] }>(
    {}
  );
  const [questionGrades, setQuestionGrades] = useState<{
    [key: string]: IQuestionGrade[];
  }>({});

  useEffect(() => {
    if (!sellerId) {
      return;
    }

    const fetchQuestionsAndModules = async () => {
      try {
        setLoading(true);
        const result =
          await ModuleGradeServices.getModulesAvailabreGradesBySellerID(
            sellerId
          );
        const processedData = result.map((item: any) => ({
          questionId: item.questionId,
          questionName: item.questionName,
          averageGrade: item.averageGrade,
        }));
        setQuestionsBar(processedData);

        const visitsData = await VisitService.getVisitByIdSeller(sellerId);

        // Remove a visita mais recente
        const sortedVisits = visitsData.sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA; // Ordena do mais recente para o mais antigo
        });

        setVisits(sortedVisits);

        const fetchedCategories: { [key: string]: ICategories[] } = {};
        const fetchedQuestions: { [key: string]: IQuestions[] } = {};
        const fetchedQuestionGrades: { [key: string]: IQuestionGrade[] } = {};

        await Promise.all(
          sortedVisits.map(async (visit) => {
            fetchedCategories[visit.id] = [];
            fetchedQuestions[visit.id] = [];
            fetchedQuestionGrades[visit.id] = [];

            await Promise.all(
              templates.map(async (template) => {
                const categories = await VisitService.getCategoriesByIdTemplate(
                  template.id
                );

                await Promise.all(
                  categories.map(async (category) => {
                    if (category.visitTemplateId === visit.visitTemplateId) {
                      fetchedCategories[visit.id].push(category);

                      const questions =
                        await VisitService.getQuestionsByIdCategory(
                          category.id
                        );

                      const questionGrades =
                        await VisitGradesService.getAllQuestionsBySeller(
                          sellerId
                        );

                      fetchedQuestions[visit.id].push(...questions);
                      fetchedQuestionGrades[visit.id].push(
                        ...questionGrades.filter(
                          (qg) => qg.visitId === visit.id
                        )
                      );
                    }
                  })
                );
              })
            );
          })
        );

        setCategories(fetchedCategories);
        setQuestions(fetchedQuestions);
        setQuestionGrades(fetchedQuestionGrades);
      } catch (error) {
        console.error('Error fetching questions and modules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionsAndModules();
  }, [sellerId, templates, user.companyId, user.id, user.job, user.managerId]);

  if (loading) {
    return (
      <S.LoadingContainer>
        <ActivityIndicator size="large" color="#3E63DD" />
      </S.LoadingContainer>
    );
  }
  return (
    <S.ContainerChart>
      <Suspense fallback={<ActivityIndicator size="large" color="#3E63DD" />}>
        <BarChar dateVisit={dateVisit} questionsBar={questionsBar} />
      </Suspense>

      <S.WrapperView>
        {visits.length > 0 ? (
          visits.map((visit) => (
            <Suspense
              key={visit.id}
              fallback={<ActivityIndicator size="large" color="#3E63DD" />}
            >
              <AccordionVisit
                title={`${visit.storeVisited} - ${visit.dateVisited}`}
                media={calculateMedia(visit.id, questions, questionGrades)}
                questions={categories[visit.id]?.flatMap((category) =>
                  generateQuestionsWithGrades(
                    visit.id,
                    category.id,
                    questions,
                    questionGrades
                  )
                )}
              />
            </Suspense>
          ))
        ) : (
          <S.NoVisitsContainer>
            <Text>Nenhuma visita registrada para o dia selecionado.</Text>
          </S.NoVisitsContainer>
        )}
        <S.ViewWrapper>
          <S.ButtonIniciar onPress={setIndexScreen}>
            <S.TextBtn>Próximo</S.TextBtn>
          </S.ButtonIniciar>
        </S.ViewWrapper>
      </S.WrapperView>
    </S.ContainerChart>
  );
};

interface BarCharProps {
  questionsBar:
    | {
        questionId: string;
        questionName: string;
        averageGrade: number;
      }[]
    | undefined;
  dateVisit: string;
}

const BarChar: React.FC<BarCharProps> = ({ questionsBar, dateVisit }) => {
  const chartWidth = Dimensions.get('window').width - 50;
  const chartHeight = 200;

  const barChartData = {
    labels: (questionsBar || []).map(
      (_item: any, index: number) => `${index + 1}`
    ),
    datasets: [
      {
        data: (questionsBar || []).map((item: { averageGrade: number }) =>
          Math.min(Math.max(item.averageGrade, 0), 5)
        ),
        colors: (questionsBar || []).map(
          () =>
            (_opacity = 1) =>
              '#3E63DD'
        ),
      },
    ],
  };

  const barChartConfig = {
    backgroundGradientFrom: 'rgba(0, 0, 0, 0)',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'rgba(0, 0, 0, 0)',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(104, 112, 118, ${opacity})`,
    strokeWidth: 0,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
    minValue: 0,
    maxValue: 5,
  };

  const formattedDate = format(new Date(dateVisit), 'dd/MM/yyyy', {
    locale: ptBR,
  });

  return (
    <>
      <S.TitleBar>Resumo do dia da Visita - {formattedDate}</S.TitleBar>
      <BarChart
        data={barChartData}
        width={chartWidth}
        height={chartHeight}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={barChartConfig}
        showValuesOnTopOfBars={false}
        showBarTops={false}
        fromZero
        flatColor
        fromNumber={5}
        withInnerLines={false}
        withCustomBarColorFromData
      />
    </>
  );
};

export default OverView;
