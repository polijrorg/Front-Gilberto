import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ScrollView, View, StyleSheet } from 'react-native';
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

const Visit = ({ route }) => {
  const { user } = useAuth();
  const { idEmployee, cargo, companyId } = route.params;
  const [loading, setLoading] = useState(false);
  const [seller, setSeller] = useState<ISeller | null>(null);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [questionGrades, setQuestionGrades] = useState<IQuestionGrade[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cargo === 'Vendedor') {
          setLoading(true);

          const sellerData =
            await SellerService.getAllSellerFromCompany(companyId);
          const foundSeller = sellerData.find(
            (seller) => seller.id === idEmployee
          );
          if (foundSeller) {
            setSeller(foundSeller);

            const templates = await VisitService.getTemplateByCompanyId(
              foundSeller.companyId
            );
            const fetchedCategories: ICategories[] = [];

            for (const template of templates) {
              const categories = await VisitService.getCategoriesByIdTemplate(
                template.id
              );
              for (const category of categories) {
                fetchedCategories.push(category);
                const questions = await VisitService.getQuestionsByIdCategory(
                  category.id
                );
                const questionGrades =
                  await VisitGradesService.getAllQuestionsBySeller(
                    foundSeller.id
                  );
                setQuestions((prev) => [...prev, ...questions]);
                setQuestionGrades((prev) => [...prev, ...questionGrades]);
              }
            }

            setCategories(fetchedCategories);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados de supervisores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cargo, idEmployee]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3E63DD" />
      </View>
    );
  }

  const calculateMedia = (categoryId: string) => {
    const relevantQuestions = questions.filter(
      (question) => question.categoriesId === categoryId
    );

    const relevantGrades = questionGrades.filter((grade) =>
      relevantQuestions.some(
        (question) => question.id === grade.questionsId && grade.grade !== 0
      )
    );

    const totalGrades = relevantGrades.reduce(
      (total, grade) => total + grade.grade,
      0
    );
    return relevantGrades.length > 0 ? totalGrades / relevantGrades.length : 0;
  };
  const generateQuestionsWithGrades = (
    categoryId: string
  ): { question: string; grade: string }[] => {
    const relevantQuestions = questions.filter(
      (question) => question.categoriesId === categoryId
    );

    const questionsWithGrades: { question: string; grade: string }[] = [];

    relevantQuestions.forEach((question) => {
      const grade = questionGrades.find(
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
          {categories.map((category) => (
            <AccordionVisit
              key={category.id}
              title={category.name}
              media={calculateMedia(category.id)}
              questions={generateQuestionsWithGrades(category.id)}
            />
          ))}
        </S.WrapperView>
      </ScrollView>
    </S.Wrapper>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Visit;
