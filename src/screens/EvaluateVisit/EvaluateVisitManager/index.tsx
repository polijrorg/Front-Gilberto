import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { ActivityIndicator, Button, View } from 'react-native';
import HeaderPages from '@components/HeaderPages';
import QuestionSection from '@components/QuestionSection';
import { useToast } from 'react-native-toast-notifications';

import useAuth from '@hooks/useAuth';
import VisitService from '@services/VisitService';

import ICategories from '@interfaces/Visit/Categories';
import ITemplateVisit from '@interfaces/Visit/TemplateVisit';

interface VisitGrade {
  questionId: string;
  sellerId: string;
  grade: number;
}

const EvaluateVisitManager = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [indexScreen, setIndexScreen] = useState(1);
  const [template, setTemplate] = useState<ITemplateVisit[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchedVisitGrade, setFetchedVisitGrade] = useState<VisitGrade[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const managerTemplate = await VisitService.getTemplateByCompanyId(user.companyId);
        const fetchedCategories: ICategories[] = [];

        await Promise.all(
          managerTemplate.map(async (template) => {
            const categories = await VisitService.getCategoriesByIdTemplate(template.id);
            categories.forEach((category) => {
              fetchedCategories.push(category);
            });
          })
        );

        setTemplate(managerTemplate);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategories();
  }, [user.companyId]);

  const showToast = (message: string, type: string) => {
    toast.show(message, {
      type: type,
      placement: 'bottom',
      duration: 3500,
      animationType: 'zoom-in',
    });
  };

  const handleAdvanceCategory = () => {
    if (indexScreen < categories.length) {
      setIndexScreen(indexScreen + 1);
    }
  };

  const handlePreviousCategory = () => {
    if (indexScreen > 1) {
      setIndexScreen(indexScreen - 1);
    }
  };

  const handleUpdateAnswers = (updatedAnswers: any[]) => {
    const updatedGrades = [...fetchedVisitGrade];

    updatedAnswers.forEach((answer) => {
      const existingIndex = updatedGrades.findIndex(
        (grade) =>
          grade.questionId === answer.questionId
      );

      if (existingIndex !== -1) {
        updatedGrades[existingIndex].grade = answer.value;
      } else {
        updatedGrades.push({
          questionId: answer.questionId,
          sellerId: '',
          grade: answer.value,
        });
      }
    });

    setFetchedVisitGrade(updatedGrades);
  };

  return (
    <S.WrapperView>
      <HeaderPages title="Visita" />
      <S.ContainerFields>
        {categories.map((category, idx) => (
          <View>
            <QuestionSection
              key={category.id}
              sellerId=''
              category={category}
              index={idx + 1}
              selectedIndex={indexScreen}
              onUpdateAnswers={handleUpdateAnswers}
            />
          </View>
        ))}
        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
          <S.ButtonFirst onPress={handlePreviousCategory}><S.TextBtn>Voltar</S.TextBtn></S.ButtonFirst>
          <S.ButtonFirst onPress={handleAdvanceCategory}><S.TextBtn>Avançar</S.TextBtn></S.ButtonFirst>
        </View>
       
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </S.ContainerFields>
    </S.WrapperView>
  );
};

export default EvaluateVisitManager;