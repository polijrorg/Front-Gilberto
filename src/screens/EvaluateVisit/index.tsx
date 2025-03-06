import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { ActivityIndicator, Dimensions, StatusBar } from 'react-native';
import Breadcrumb from '@components/Breadcrumb';
import Dropdown from '@components/Dropdown';
import HeaderPages from '@components/HeaderPages';
import QuestionSection from '@components/QuestionSection';
import { useToast } from 'react-native-toast-notifications';

import SellerService from '@services/SellerServices';
import VisitService from '@services/VisitService';
import VisitGradesService from '@services/VisitGradesService';

import ISeller from '@interfaces/Seller';
import ICategories from '@interfaces/Visit/Categories';
import ITemplateVisit from '@interfaces/Visit/TemplateVisit';
import PdfService from '@services/PdfService';
import Visit from '@interfaces/Visit/Visit';

import PlainAction from '@components/PlainVisit';

import OverView from '@components/Overview';
import { useNavigation } from '@react-navigation/native';
import User from '@interfaces/User';

interface VisitGrade {
  questionId: string;
  sellerId: string;
  grade: number;
  visitId: string;
  comments?: string;
}

interface EvaluateVisitVisitProps {
  user: User;
}

const EvaluateVisit: React.FC<EvaluateVisitVisitProps> = ({ user }) => {
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [visitToDay, setVisitToDay] = useState<Visit>();
  const [indexScreen, setIndexScreen] = useState(0);
  const [evaluationStarted, setEvaluationStarted] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<ISeller | null>(null);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [template, setTemplate] = useState<ITemplateVisit[]>([]);
  const [storeName, setStoreName] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchedVisitGrade, setFetchedVisitGrade] = useState<VisitGrade[]>([]);
  const toast = useToast();

  const router = useNavigation();

  const dateVisited = new Date().toISOString();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const sellersData =
          user.job === 'Supervisor'
            ? await SellerService.getAllSellerFromSupervisor(user.id)
            : await SellerService.getAllSellerFromManager(user.id);
        const visitsSellers =
          sellersData?.filter((seller) => seller.stage === 'Visita') || [];
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
        (await SellerService.getManagerAndDirectorFromSeller(seller.id)) as {
          managerId: string | null;
          directorId: string | null;
        };
      let templates: ITemplateVisit[] = [];

      // Verificação na ordem: Gerente, Companhia, Diretor
      if (managerId) {
        templates = await VisitService.getTemplateByManagerId(managerId);
      }

      if (templates.length === 0 && seller.companyId) {
        templates = await VisitService.getTemplateByCompanyId(seller.companyId);
      }

      if (templates.length === 0 && directorId) {
        templates = await VisitService.getTemplateByDirectorId(directorId);
      }

      if (templates.length > 0) {
        const template = templates[0];
        const categories = await VisitService.getCategoriesByIdTemplate(
          template.id
        );
        setTemplate([template]);
        setCategories(categories);
      } else {
        setTemplate([]);
        setCategories([]);
      }
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
          const visit = await VisitService.createVisit({
            sellerId: selectedSeller.id,
            visitTemplateId: template[0].id,
            storeVisited: storeName,
            dateVisited: formattedDate,
          });
          setVisitToDay(visit);
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
        await createGrades(answer);
      }
      //await pdfAndEmail(selectedSeller.id);
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
    visitId: string;
    comments?: string;
  }) => {
    try {
      const resolver = await VisitGradesService.create({
        grade: answer.grade,
        sellerId: answer.sellerId,
        questionsId: answer.questionId,
        visitId: visitToDay?.id || '',
        comments: answer.comments,
      });
    } catch (error) {
      console.error('Erro ao criar as notas:', error);
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
          visitId: visitToDay?.id || '',
          comments: answer.comments,
        });
      }
    });

    setFetchedVisitGrade(updatedGrades);
  };

  const initialNewVisit = () => {
    finishedVisit();
    setIndexScreen(0);
    setSelectedSeller(null);
    setStoreName('');
    setCategories([]);
    setTemplate([]);
    setFetchedVisitGrade([]);
    setEvaluationStarted(false);
    setVisitToDay(undefined);
  };

  const overView = async () => {
    await finishedVisit();
    setIndexScreen(indexScreen + 1);
  };

  return (
    <>
      <S.WrapperView>
        <StatusBar backgroundColor={'#3E63DD'} />
        <HeaderPages title="Visita" />
        <S.ContainerFields>
          <Breadcrumb
            key={indexScreen}
            size={categories.length}
            handleNavigation={(index) => setIndexScreen(index)}
            selected={indexScreen}
            style={{ opacity: indexScreen > 0 ? 1 : 0 }}
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

          {indexScreen === 0 && (
            <SellerSelection
              sellers={sellers}
              onSelectSeller={handleSelectSeller}
              onAdvance={handleAdvance}
              storeName={storeName}
              onStoreNameChange={setStoreName}
            />
          )}

          {indexScreen > 0 && indexScreen <= categories.length && (
            <QuestionSection
              user={user}
              sellerId={selectedSeller?.id || ''}
              category={categories[indexScreen - 1]} // Ajustado para usar a categoria correta
              index={indexScreen}
              selectedIndex={indexScreen}
              onUpdateAnswers={handleUpdateAnswers}
            />
          )}
          {indexScreen >= 1 && indexScreen < categories.length && (
            <S.ButtonIniciar
              onPress={handleAdvance}
              disabled={storeName === '' || loading}
            >
              <S.TextBtn>Próximo</S.TextBtn>
            </S.ButtonIniciar>
          )}

          {indexScreen === categories.length && categories.length !== 0 && (
            <>
              <S.ContainerButton>
                <S.ButtonIniciar onPress={overView} disabled={loading}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <S.TextBtn>Ver Resumo do dia de visita</S.TextBtn>
                  )}
                </S.ButtonIniciar>
                <S.Outline onPress={initialNewVisit}>
                  <S.TextBtnNova>Iniciar nova visita</S.TextBtnNova>
                </S.Outline>
              </S.ContainerButton>
            </>
          )}

          {indexScreen === categories.length + 1 && (
            <>
              <OverView
                sellerId={selectedSeller?.id || ''}
                dateVisit={dateVisited}
                user={user}
                templates={template}
                setIndexScreen={() => setIndexScreen(indexScreen + 1)}
              />
            </>
          )}

          {indexScreen === categories.length + 2 && (
            <>
              <FinishedSection
                selectedSeller={selectedSeller}
                finishedVisit={() => {
                  router.navigate('Home' as never);
                }}
                array={fetchedVisitGrade}
                loading={loading}
                visitToDay={visitToDay}
              />
            </>
          )}
        </S.ContainerFields>
      </S.WrapperView>
    </>
  );
};

interface FinishedProps {
  finishedVisit: () => void;
  array: any[];
  loading: boolean;
  selectedSeller: ISeller | null;
  visitToDay: Visit | undefined;
}

const FinishedSection: React.FC<FinishedProps> = ({
  finishedVisit,
  array,
  loading,
  selectedSeller,
  visitToDay = {} as Visit,
}) => {
  const toast = useToast();
  const dateVisited = new Date().toISOString();
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

  const showToast = (message: string, type: string) => {
    toast.show(message, {
      type: type,
      placement: 'bottom',
      duration: 3500,
      animationType: 'zoom-in',
    });
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

  return (
    <S.ContainerButton>
      <S.ContainerPlain>
        <PlainAction
          seller={selectedSeller as ISeller}
          dateVisited={visitToDay}
        />
      </S.ContainerPlain>

      <S.BtnFinished
        onPress={() => {
          pdfAndEmail(selectedSeller.id);
          finishedVisit();
        }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <S.TextBtn>Finalizar dia com esse vendedor</S.TextBtn>
        )}
      </S.BtnFinished>
    </S.ContainerButton>
  );
};

interface SellerSelectionProps {
  sellers: ISeller[];
  onSelectSeller: (seller: ISeller) => void;
  onAdvance: () => void;
  storeName: string;
  onStoreNameChange: (text: string) => void;
}

const SellerSelection: React.FC<SellerSelectionProps> = ({
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
