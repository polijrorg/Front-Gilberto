import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { useNavigation } from '@react-navigation/native';
import Breadcrumb from '@components/Breadcrumb';
import Dropdown from '@components/Dropdown';
import useAuth from '@hooks/useAuth';
import SellerService from '@services/SellerServices';
import CompanyService from '@services/CompanyService';
import VisitService from '@services/VisitService';
import ICompany from '@interfaces/Company';
import ISeller from '@interfaces/Seller';
import HeaderPages from '@components/HeaderPages';
import Question from '@components/Question';

const EvaluateVisit = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [indexScreen, setIndexScreen] = useState(1);
  const [selectedSeller, setSelectedSeller] = useState<ISeller | null>(null);
  const [company, setCompany] = useState<ICompany | null>();

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
    setCompany(await findCompanyById(seller));
    const visitTemplate = await VisitService.getTemplateByCompanyId(
      seller.companyId
    );
    const categories = await VisitService.getCategoriesByIdTemplate(
      visitTemplate[0].id
    );
    const questions = await VisitService.getQuestionsByIdCategory(
      categories[0].id
    );
    console.log(questions, categories, visitTemplate);
  };

  const findCompanyById = async (seller: ISeller) => {
    const companyResponse = await CompanyService.getCompanyById(
      seller.companyId
    );
    return companyResponse;
  };

  const handleAdvance = () => {
    setIndexScreen(indexScreen < 7 ? indexScreen + 1 : 1);
  };

  const handleNavigation = (index: number) => {
    setIndexScreen(index);
  };

  return (
    <>
      <S.WrapperView>
        <HeaderPages title="Visita" />
        <S.ContainerFields>
          <Breadcrumb
            size={7}
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
            />
          )}
          {[2, 3, 4, 5, 6, 7].map((screen) => (
            <QuestionSection
              key={screen}
              indexScreen={indexScreen}
              screen={screen}
              onAdvance={handleAdvance}
            />
          ))}
        </S.ContainerFields>
      </S.WrapperView>
    </>
  );
};

const SellerSelection = ({ sellers, onSelectSeller, onAdvance }) => {
  return (
    <S.DivContainer>
      <S.TitleInput>Nome do Vendedor</S.TitleInput>
      <Dropdown sellers={sellers} onSelectSeller={onSelectSeller} />
      <S.TitleInput>Loja</S.TitleInput>
      <S.Input placeholder="Nome da Loja" />
      <S.ButtonFirst onPress={onAdvance}>
        <S.TextBtn>iniciar Avaliação</S.TextBtn>
      </S.ButtonFirst>
    </S.DivContainer>
  );
};

const QuestionSection = ({ indexScreen, screen, onAdvance }) => {
  const titles = [
    'Planejamento',
    'Aproximação',
    'Apresentação',
    'Identificação de objeções',
    'Cobranças',
    'Acompanhamento',
  ];
  const questions = [
    'O material de trabalho está em ordem (tablet, política comercial, catálogo)?',
    'Apresentou plano de vendas para o cliente visitado?',
    'Apresentou planos alinhados à expectativa (S.M.A.R.T)?',
    'Realizou verificação de produtos em gôndola?',
    'Buscou formas de melhorar visibilidade de itens?',
    'Verificou se precificação aplicada pelo cliente é coerente com objetivos?',
    'Pesquisou novos meios de promoção para produtos?',
    'Identificou rupturas de itens já cadastrados?',
    'Fez revisão de sua proposta inicial, após checagem de loja?',
    'Elencou prioridades de acordo com as estratégias comerciais?',
    'Conduziu a apresentação com segurança e coerência?',
    'Enfatizou os benefícios da proposta para o cliente?',
    'Surgiram objeções durante a apresentação da proposta de vendas?',
    'Utilizou as técnicas de comunicação para identificar objeções (falsas/verdadeiras)?',
    'Iniciou processo de cobrança relativo a pendências financeiras?',
    'Estabeleceu agenda de acompanhamento para os acordos firmados?',
  ];

  return (
    indexScreen === screen && (
      <S.DivContainer>
        <Question
          title={`${screen}. ${titles[screen - 2]}`}
          textAsk={questions[screen - 2]}
        />
        <S.ButtonIniciar onPress={onAdvance}>
          <S.TextBtn>Próximo</S.TextBtn>
        </S.ButtonIniciar>
      </S.DivContainer>
    )
  );
};

export default EvaluateVisit;
