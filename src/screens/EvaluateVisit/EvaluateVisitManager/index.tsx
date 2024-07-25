import React, { useEffect, useState, useCallback, useMemo } from 'react';
import * as S from './styles';
import {
  ActivityIndicator,
  Modal as RNModal,
  Button as RNButton,
  View as RNView,
} from 'react-native';
import HeaderPages from '@components/HeaderPages';
import QuestionSection from '@components/QuestionSection';
import { useToast } from 'react-native-toast-notifications';
import useAuth from '@hooks/useAuth';
import VisitService from '@services/VisitService';
import ICategories from '@interfaces/Visit/Categories';
import ITemplateVisit from '@interfaces/Visit/TemplateVisit';
import Select from '@components/Select';

interface VisitGrade {
  questionId: string;
  sellerId: string;
  grade: number;
}

const EvaluateVisitManager = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [indexScreen, setIndexScreen] = useState(1);
  const [templates, setTemplates] = useState<ITemplateVisit[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<ITemplateVisit | null>(null);
  const [loading, setLoading] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fetchedVisitGrade, setFetchedVisitGrade] = useState<VisitGrade[]>([]);
  const toast = useToast();

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const [companyTemplate, managerTemplate] = await Promise.all([
        VisitService.getTemplateByCompanyId(user.companyId),
        VisitService.getTemplateByManagerId(user.id),
      ]);

      const allTemplates = [...companyTemplate, ...managerTemplate];
      setTemplates(allTemplates);

      if (selectedTemplate) {
        const categories = await VisitService.getCategoriesByIdTemplate(
          selectedTemplate.id
        );
        setCategories(categories);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error('Erro ao buscar Templates e Categorias:', error);
    } finally {
      setLoading(false);
    }
  }, [user.companyId, user.id, selectedTemplate]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAdvanceCategory = useCallback(() => {
    if (indexScreen < categories.length) {
      setIndexScreen(indexScreen + 1);
    }
  }, [indexScreen, categories.length]);

  const handlePreviousCategory = useCallback(() => {
    if (indexScreen > 1) {
      setIndexScreen(indexScreen - 1);
    }
  }, [indexScreen]);

  const handleAddCategory = useCallback(async () => {
    if (!newCategoryName.trim()) {
      toast.show('Nome da categoria não pode estar vazio', { type: 'danger' });
      return;
    }
    try {
      setLoading(true);
      const newCategory = await VisitService.createCategoria(
        selectedTemplate?.id || '',
        newCategoryName
      );
      setCategories((prev) => [...prev, newCategory]);
      setNewCategoryName('');
      setIsModalVisible(false);
      toast.show('Categoria adicionada com sucesso', { type: 'success' });
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      toast.show('Erro ao adicionar categoria', { type: 'danger' });
    } finally {
      setLoading(false);
    }
  }, [newCategoryName, selectedTemplate, toast]);

  const handleTemplateChange = useCallback(
    (value: string) => {
      const templateSelect = templates.find(
        (template) => template.id === value
      );
      setSelectedTemplate(templateSelect || null);
    },
    [templates]
  );

  const handleCategoryUpdate = useCallback(
    (updatedCategory: ICategories) => {
      const updatedCategories = categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      );
      setCategories(updatedCategories);
    },
    [categories]
  );

  const handleUpdateAnswers = useCallback(
    (updatedAnswers: any[]) => {
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
    },
    [fetchedVisitGrade]
  );

  const selectOptions = useMemo(
    () =>
      templates.map((template, index) => ({
        label: template.name || `Template ${index + 1}`,
        value: template.id,
      })),
    [templates]
  );

  return (
    <S.WrapperView>
      <HeaderPages title="Visita" />
      <S.ContainerFields>
        <S.ContainerVisit>
          <S.Title>Escolha um template de Visita:</S.Title>
          <Select
            onChange={handleTemplateChange}
            placeholder="Selecione um template"
            options={selectOptions}
          />
        </S.ContainerVisit>
        {loading ? (
          <S.Loading size="large" color="#0000ff" />
        ) : templates.length === 0 ? (
          <S.NoCategoriesContainer>
            <S.NoCategoriesText>
              Você não tem nenhum template
            </S.NoCategoriesText>
            <S.AddCategoryButton onPress={() => setIsModalVisible(true)}>
              <S.AddCategoryText>Adicionar Template</S.AddCategoryText>
            </S.AddCategoryButton>
          </S.NoCategoriesContainer>
        ) : categories.length === 0 ? (
          <S.NoCategoriesContainer>
            {selectedTemplate ? (
              <>
                <S.NoCategoriesText>
                  Você não tem nenhuma categoria para este template:
                  {selectedTemplate.name}
                </S.NoCategoriesText>
                <S.AddCategoryEmpty onPress={() => setIsModalVisible(true)}>
                  <S.AddCategoryEmptyText>
                    Adicionar Categoria
                  </S.AddCategoryEmptyText>
                </S.AddCategoryEmpty>
              </>
            ) : (
              <S.NoCategoriesText>
                Você não selecionou nenhum template
              </S.NoCategoriesText>
            )}
          </S.NoCategoriesContainer>
        ) : (
          <>
            {categories.map((category, idx) => (
              <S.CategoryContainer key={category.id}>
                <QuestionSection
                  key={category.id}
                  loading={loading}
                  sellerId=""
                  category={category}
                  index={idx + 1}
                  selectedIndex={indexScreen}
                  onCategoryUpdate={handleCategoryUpdate}
                  onUpdateAnswers={handleUpdateAnswers}
                  onDeleteCategory={fetchCategories}
                />
              </S.CategoryContainer>
            ))}
            <S.NavigationContainer>
              <S.ButtonFirst
                onPress={handlePreviousCategory}
                disabled={indexScreen <= 1}
                isDisabled={indexScreen <= 1}
              >
                <S.TextBtn>{'<'}</S.TextBtn>
              </S.ButtonFirst>
              <S.AddCategoryButton onPress={() => setIsModalVisible(true)}>
                <S.AddCategoryText>Add Categoria</S.AddCategoryText>
              </S.AddCategoryButton>
              <S.ButtonFirst
                onPress={handleAdvanceCategory}
                disabled={indexScreen >= categories.length}
                isDisabled={indexScreen >= categories.length}
              >
                <S.TextBtn>{'>'}</S.TextBtn>
              </S.ButtonFirst>
            </S.NavigationContainer>
          </>
        )}
        <RNModal visible={isModalVisible} transparent animationType="slide">
          <S.ModalContainer>
            <S.ModalContent>
              <S.Input
                placeholder="Nome da Categoria"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
              />
              <S.ModalButtonsContainer>
                <RNButton
                  title="Cancelar"
                  onPress={() => setIsModalVisible(false)}
                />
                <RNButton title="Adicionar" onPress={handleAddCategory} />
              </S.ModalButtonsContainer>
            </S.ModalContent>
          </S.ModalContainer>
        </RNModal>
      </S.ContainerFields>
    </S.WrapperView>
  );
};

export default EvaluateVisitManager;
