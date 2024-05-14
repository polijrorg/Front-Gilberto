import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { ActivityIndicator } from 'react-native'; // Importando o ActivityIndicator
import { useNavigation } from '@react-navigation/native';
import Breadcrumb from '@components/Breadcrumb';
import Dropdown from '@components/Dropdown';
import HeaderPages from '@components/HeaderPages';
import QuestionSection from '@components/QuestionSection';
import { useToast } from 'react-native-toast-notifications';

import useAuth from '@hooks/useAuth';

import SellerService from '@services/SellerServices';
import VisitService from '@services/VisitService';
import VisitGradesService from '@services/VisitGradesService';

import ISeller from '@interfaces/Seller';
import ICategories from '@interfaces/Visit/Categories';

const EvaluateVisit = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [indexScreen, setIndexScreen] = useState(1);
  const [selectedSeller, setSelectedSeller] = useState<ISeller | null>(null);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [storeName, setStoreName] = useState('');
  const [editedAnswers, setEditedAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const sellersData =
          user.job === 'Supervisor'
            ? await SellerService.getAllSellerFromSupervisor(user.id)
            : await SellerService.getAllSellerFromManager(user.id);
        setSellers(sellersData);
      } catch (error) {
        console.error('Erro ao buscar dados de vendedores:', error);
      }
    };

    fetchSellers();
  }, [user.id, user.job]);

  const handleSelectSeller = async (seller: ISeller) => {
    setSelectedSeller(seller);
    const templates = await VisitService.getTemplateByCompanyId(
      seller.companyId
    );
    const fetchedCategories: ICategories[] = [];

    await Promise.all(
      templates.map(async (template) => {
        const categories = await VisitService.getCategoriesByIdTemplate(
          template.id
        );

        categories.forEach((category) => {
          fetchedCategories.push(category);
        });
      })
    );

    setCategories(fetchedCategories);
  };

  const showToast = (message: string, type: string) => {
    toast.show(message, {
      type: type,
      placement: 'bottom',
      duration: 3500,
      animationType: 'zoom-in',
    });
  };

  const handleAdvance = () => {
    setIndexScreen(indexScreen < categories.length + 1 ? indexScreen + 1 : 1);
  };

  const handleNavigation = (index: number) => {
    setIndexScreen(index);
  };

  const handleStoreNameChange = (text: string) => {
    setStoreName(text);
  };

  const finishedVisit = async () => {
    try {
      if (!selectedSeller || !selectedSeller.id) {
        console.error('Nenhum vendedor selecionado.');
        return;
      }

      setLoading(true);

      for (const answer of editedAnswers) {
        const questions = await VisitGradesService.getAllQuestionsBySeller(
          selectedSeller.id
        );

        const existingQuestion = questions.find(
          (question) => question.questionsId === answer.questionId
        );

        if (existingQuestion) {
          await updateGrades(existingQuestion, answer);
        } else {
          await createGrades(answer);
        }
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      showToast('Problema em avaliar Visita', 'warning');
    } finally {
      setLoading(false);
      showToast('Visita avaliada com sucesso', 'success');
      setEditedAnswers([]);
    }
  };

  const createGrades = async (answer) => {
    try {
      const result = await VisitGradesService.create({
        grade: answer.grade,
        sellerId: answer.sellerId,
        questionsId: answer.questionId,
      });
    } catch (error) {
      console.error('Erro ao criar as notas:', error);
    }
  };

  const updateGrades = async (questionGrade, answer) => {
    try {
      const { grade } = answer;
      await VisitGradesService.update(questionGrade.id, grade);
    } catch (error) {
      console.error('Erro ao atualizar as notas:', error);
    }
  };

  const handleUpdateAnswers = (updatedAnswers: any[]) => {
    const formattedAnswers = updatedAnswers.map((answer) => ({
      questionId: answer.questionId,
      sellerId: selectedSeller.id,
      grade: answer.value,
    }));
    setEditedAnswers(formattedAnswers); // Armazena as respostas editadas
  };

  return (
    <>
      <S.WrapperView>
        <HeaderPages title="Visita" />
        <S.ContainerFields>
          <Breadcrumb
            size={categories?.length}
            handleNavigation={handleNavigation}
            selected={indexScreen}
          />
          <S.DivSellerInfo>
            <S.DivSellerImage>
              <S.ImageSeller
                source={require('@assets/img/cardVendedor/foto.png')}
              />
            </S.DivSellerImage>
            <S.DivInfoSeller>
              <S.InfoSeller>
                {selectedSeller ? selectedSeller.name : 'Nome do vendedor'}
              </S.InfoSeller>
            </S.DivInfoSeller>
          </S.DivSellerInfo>
          {indexScreen === 1 && (
            <SellerSelection
              sellers={sellers}
              onSelectSeller={handleSelectSeller}
              onAdvance={handleAdvance}
              storeName={storeName}
              onStoreNameChange={handleStoreNameChange}
            />
          )}
          {indexScreen !== 1 &&
            categories.map((category, idx) => (
              <QuestionSection
                key={category.id}
                sellerId={selectedSeller.id as string}
                category={category}
                index={idx + 2}
                selectedIndex={indexScreen}
                onUpdateAnswers={handleUpdateAnswers}
              />
            ))}
          {indexScreen <= categories.length && (
            <S.ButtonIniciar
              onPress={handleAdvance}
              disabled={storeName === ''}
            >
              <S.TextBtn>Próximo</S.TextBtn>
            </S.ButtonIniciar>
          )}
          {indexScreen > categories.length && user.job === 'Supervisor' && (
            <FinishedSection
              finishedVisit={finishedVisit}
              array={editedAnswers}
              loading={loading}
            />
          )}
        </S.ContainerFields>
      </S.WrapperView>
    </>
  );
};

const FinishedSection = ({ finishedVisit, array, loading }) => {
  return (
    <S.ContainerFields>
      <S.BtnFinished
        onPress={finishedVisit}
        disabled={array.length === 0 || loading}
        style={{ opacity: array.length === 0 ? 0.7 : 1 }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <S.TextBtn>Finalizar dia com com esse vendedor</S.TextBtn>
        )}
      </S.BtnFinished>
      <S.Outline>
        <S.TextBtnNova>Iniciar nova visita</S.TextBtnNova>
      </S.Outline>
    </S.ContainerFields>
  );
};

const SellerSelection = ({
  sellers,
  onSelectSeller,
  onAdvance,
  storeName,
  onStoreNameChange,
}) => {
  return (
    <S.DivContainer>
      <S.TitleInput>Nome do Vendedor</S.TitleInput>
      <Dropdown sellers={sellers} onSelectSeller={onSelectSeller} />
      <S.TitleInput>Loja</S.TitleInput>
      <S.Input
        placeholder="Nome da Loja"
        value={storeName}
        onChangeText={onStoreNameChange}
      />
      <S.ButtonFirst
        onPress={onAdvance}
        disabled={storeName === ''}
        style={{ opacity: storeName ? 1 : 0.5 }}
      >
        <S.TextBtn>iniciar Avaliação</S.TextBtn>
      </S.ButtonFirst>
    </S.DivContainer>
  );
};

export default EvaluateVisit;
