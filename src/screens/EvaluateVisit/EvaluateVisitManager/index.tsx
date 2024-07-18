import React, { useEffect, useState, useCallback } from 'react';
import * as S from './styles';
import {
  ActivityIndicator,
  Button,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
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
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toast = useToast();

  const fetchCategories = useCallback(async () => {
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
  }, [user.companyId]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.show('Nome da categoria não pode estar vazio', { type: 'danger' });
      return;
    }
    try {
      setLoading(true);
      const newCategory = await VisitService.createCategoria(
        template[0].id,
        newCategoryName
      );
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      setIsModalVisible(false);
      toast.show('Categoria adicionada com sucesso', { type: 'success' });
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      toast.show('Erro ao adicionar categoria', { type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.WrapperView>
      <HeaderPages title="Visita" />
      <S.ContainerFields>
        {categories.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>Você não tem nenhuma categoria</Text>
            <TouchableOpacity
              style={{ marginTop: 20, alignItems: 'center' }}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={{ color: '#3E63DD', fontSize: 16 }}>
                Adicionar Categoria
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          categories.map((category, idx) => (
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
                onDeleteCategory={() => fetchCategories()} // Passa fetchCategories como prop
              />
            </View>
          ))
        )}

        {categories.length > 0 && (
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
            <S.ButtonFirst onPress={handlePreviousCategory}>
              {indexScreen > 1 && <S.TextBtn>{'<'}</S.TextBtn>}
            </S.ButtonFirst>

            <TouchableOpacity
              style={{ marginTop: 20, alignItems: 'center' }}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={{ color: '#3E63DD', fontSize: 16 }}>
                Adicionar Categoria
              </Text>
            </TouchableOpacity>

            <S.ButtonFirst onPress={handleAdvanceCategory}>
              {indexScreen < categories.length && <S.TextBtn>{'>'}</S.TextBtn>}
            </S.ButtonFirst>
          </View>
        )}

        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <View
              style={{
                width: '80%',
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
              }}
            >
              <TextInput
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
                placeholder="Nome da Nova Categoria"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  title="Cancelar"
                  onPress={() => setIsModalVisible(false)}
                />
                <Button title="Adicionar" onPress={handleAddCategory} />
              </View>
            </View>
          </View>
        </Modal>
      </S.ContainerFields>
    </S.WrapperView>
  );
};

export default EvaluateVisitManager;
