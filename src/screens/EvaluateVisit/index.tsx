import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { ActivityIndicator } from 'react-native';
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
import QuestionsGrade from '@interfaces/Visit/QuestionGrade';
import ITemplateVisit from '@interfaces/Visit/TemplateVisit';
import PdfService from '@services/PdfService';

interface VisitGrade {
  questionId: string;
  sellerId: string;
  grade: number;
}

const EvaluateVisit = () => {
  const { user } = useAuth();
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [indexScreen, setIndexScreen] = useState(1);
  const [evaluationStarted, setEvaluationStarted] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<ISeller | null>(null);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [template, setTemplate] = useState<ITemplateVisit[]>([]);
  const [storeName, setStoreName] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchedVisitGrade, setFetchedVisitGrade] = useState<VisitGrade[]>([]);
  const toast = useToast();

  const dateVisited = new Date().toISOString();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const sellersData =
          user.job === 'Supervisor'
            ? await SellerService.getAllSellerFromSupervisor(user.id)
            : await SellerService.getAllSellerFromManager(user.id);
        const visitsSellers = sellersData.filter(
          (seller) => seller.stage === 'Visita'
        );
        setSellers(visitsSellers);
      } catch (error) {
        console.error('Erro ao buscar dados de vendedores:', error);
      }
    };

    fetchSellers();
  }, [user.id, user.job]);

  const handleSelectSeller = async (seller: ISeller) => {
    try {
      setSelectedSeller(seller);

      const { directorId, managerId } =
        await SellerService.getManagerAndDirectorFromSeller(seller.id);
      const fetchedCategories: ICategories[] = [];
      let templates:
        | any[]
        | ((prevState: ITemplateVisit[]) => ITemplateVisit[]);

      if (managerId !== undefined || managerId !== null) {
        templates = await VisitService.getTemplateByManagerId(managerId);
      } else if (directorId !== undefined || directorId !== null) {
        templates = await VisitService.getTemplateByDirectorId(directorId);
      } else {
        templates = await VisitService.getTemplateByCompanyId(seller.companyId);
      }

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
      setTemplate(templates);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Erro ao buscar dados de vendedores:', error);
    }
  };

  const showToast = (message: string, type: string) => {
    toast.show(message, {
      type: type,
      placement: 'bottom',
      duration: 3500,
      animationType: 'zoom-in',
    });
  };

  const handleAdvance = async () => {
    if (!selectedSeller) return;

    setEvaluationStarted(true);
    if (indexScreen === 1) {
      try {
        if (template.length > 0) {
          const formattedDate = formatDateForPdf(dateVisited);
          await VisitService.createVisit({
            sellerId: selectedSeller.id,
            visitTemplateId: template[0].id,
            storeVisited: storeName,
            dateVisited: formattedDate,
          });
        } else {
          showToast(
            'Nenhum template disponível para criar a visita',
            'warning'
          );
          return;
        }
      } catch (error) {
        console.error('Erro ao criar a visita:', error);
        showToast('Erro ao criar a visita', 'warning');
        return;
      }
    }

    setIndexScreen(indexScreen < categories.length + 1 ? indexScreen + 1 : 1);
    console.log('index:', indexScreen);

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
      for (const answer of fetchedVisitGrade) {
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
      await pdfAndEmail(selectedSeller.id);
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      showToast('Problema em avaliar Visita', 'warning');
    } finally {
      setLoading(false);
      showToast('Visita avaliada com sucesso', 'success');
      setFetchedVisitGrade([]);
    }
  };

  const pdfAndEmail = async (sellerId: string) => {
    try {
      const formattedDate = formatDateForPdf(dateVisited);
      const encodedDate = formatToEncodedDate(formattedDate);
      await PdfService.getPdf(sellerId, encodedDate);
      showToast('PDF Enviado para o E-mail', 'success');
    } catch (error) {
      console.error('Erro ao criar o PDF:', error);
    }
  };

  const formatDateForPdf = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();

    return `${day}/${month}/${year}`;
  };

  const formatToEncodedDate = (formattedDate: string): string => {
    const [day, month, year] = formattedDate.split('/');
    return `${day}%2F${month}%2F${year}`;
  };

  const createGrades = async (answer: {
    grade: number;
    sellerId: string;
    questionId: string;
  }) => {
    try {
      await VisitGradesService.create({
        grade: answer.grade,
        sellerId: answer.sellerId,
        questionsId: answer.questionId,
      });
    } catch (error) {
      console.error('Erro ao criar as notas:', error);
    }
  };

  const updateGrades = async (
    questionGrade: QuestionsGrade,
    answer: { grade: number }
  ) => {
    try {
      await VisitGradesService.update(questionGrade.id, answer.grade);
    } catch (error) {
      console.error('Erro ao atualizar as notas:', error);
    }
  };

  const handleUpdateAnswers = (updatedAnswers: any[]) => {
    const updatedGrades = [...fetchedVisitGrade];

    updatedAnswers.forEach((answer) => {
      const existingIndex = updatedGrades.findIndex(
        (grade) =>
          grade.questionId === answer.questionId &&
          grade.sellerId === selectedSeller?.id
      );

      if (existingIndex !== -1) {
        updatedGrades[existingIndex].grade = answer.value;
      } else {
        updatedGrades.push({
          questionId: answer.questionId,
          sellerId: selectedSeller?.id || '',
          grade: answer.value,
        });
      }
    });

    setFetchedVisitGrade(updatedGrades);
  };

  return (
    <>
      <S.WrapperView>
        <HeaderPages title="Visita" />
        <S.ContainerFields>
          <Breadcrumb
            key={indexScreen}
            size={categories?.length}
            handleNavigation={handleNavigation}
            selected={indexScreen}
            style={{ opacity: evaluationStarted ? 1 : 0 }}
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
                sellerId={selectedSeller?.id || ''}
                category={category}
                index={idx + 2}
                selectedIndex={indexScreen}
                onUpdateAnswers={handleUpdateAnswers}
              />
            ))}
          {/* console.log('indexScreen:', indexScreen) */}
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
              setStoreName={setStoreName}
              selectedSeller={setSelectedSeller}
              setIndexScreen={setIndexScreen}
              finishedVisit={finishedVisit}
              array={fetchedVisitGrade}
              loading={loading}
            />
          )}
        </S.ContainerFields>
      </S.WrapperView>
    </>
  );
};

const FinishedSection = ({
  setStoreName,
  setIndexScreen,
  finishedVisit,
  array,
  loading,
  selectedSeller,
}) => {
  const handlePress = () => {
    setIndexScreen(1);
    selectedSeller(null);
    setStoreName('');
  };
  return (
    <S.ContainerFields>
      <S.BtnFinished
        onPress={finishedVisit}
        disabled={loading || array.length === 0} // Disable button if loading or array is empty
        style={{ opacity: array.length === 0 ? 0.7 : 1 }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <S.TextBtn>Finalizar dia com esse vendedor</S.TextBtn>
        )}
      </S.BtnFinished>
      <S.Outline onPress={handlePress}>
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
        <S.TextBtn>Iniciar Avaliação</S.TextBtn>
      </S.ButtonFirst>
    </S.DivContainer>
  );
};

export default EvaluateVisit;
