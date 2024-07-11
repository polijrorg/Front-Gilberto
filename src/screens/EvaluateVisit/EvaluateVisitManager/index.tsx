/* eslint @typescript-eslint/no-unused-vars: "off" */

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
        const managerTemplate = await VisitService.getTemplateByCompanyId(
          user.companyId
        );
        const fetchedCategories: ICategories[] = [];

        await Promise.all(
          managerTemplate.map(async (template) => {
            const categories = await VisitService.getCategoriesByIdTemplate(
              template.id
            );
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
        (grade) => grade.questionId === answer.questionId
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

  const handleCategoryUpdate = (updatedCategory: ICategories) => {
    const updatedCategories = categories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
    );
    setCategories(updatedCategories);
  };

  return (
    <S.WrapperView>
      <HeaderPages title="Visita" />
      <S.ContainerFields>
        {categories.map((category, idx) => (
          <View key={category.id}>
            <QuestionSection
              key={category.id}
              loading={loading}
              sellerId=""
              category={category}
              index={idx + 1}
              selectedIndex={indexScreen}
              onCategoryUpdate={handleCategoryUpdate}
              onUpdateAnswers={handleUpdateAnswers}
            />
          </View>
        ))}
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            position: 'absolute',
            bottom: 50,
            width: '100%',
          }}
        >
          <S.ButtonFirst
            onPress={handlePreviousCategory}
            disabled={indexScreen === 1}
          >
            <S.TextBtn>{'<'}</S.TextBtn>
          </S.ButtonFirst>
          <S.ButtonFirst
            onPress={handleAdvanceCategory}
            disabled={indexScreen === categories.length}
          >
            <S.TextBtn>{'>'}</S.TextBtn>
          </S.ButtonFirst>
        </View>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </S.ContainerFields>
    </S.WrapperView>
  );
};

export default EvaluateVisitManager;
