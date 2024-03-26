/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { useNavigation } from '@react-navigation/native';
import Breadcrumb from '@components/Breadcrumb';
import Dropdown from '@components/Dropdown';
import useAuth from '@hooks/useAuth';
import SellerService from '@services/SellerServices';
import CompanyService from '@services/CompanyService';
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
    const fetchData = async () => {
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

    fetchData();
  }, [user.id, user.job]);

  const handleSelect = async (seller: ISeller) => {
    setSelectedSeller(seller);
    setCompany(await findyCompanyById(seller));
  };

  const findyCompanyById = async (seller: ISeller) => {
    const companyResponse = await CompanyService.getCompanyById(
      seller.companyId
    );
    return companyResponse;
  };

  const handleAdvance = () => {
    setIndexScreen(indexScreen + 1);
    if (indexScreen > 7) {
      setIndexScreen(1);
    }
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
          {indexScreen === 1 && (
            <S.DivContainer>
              <S.TitleInput>Nome do Vendedor</S.TitleInput>
              <Dropdown sellers={sellers} onSelectSeller={handleSelect} />
              <S.TitleInput>Loja</S.TitleInput>
              <S.Input
                placeholder="Nome da Loja"
                readOnly
                value={company?.name}
              />
              <S.ButtonFirst onPress={handleAdvance}>
                <S.TextBtn>iniciar Avaliação</S.TextBtn>
              </S.ButtonFirst>
            </S.DivContainer>
          )}

          {indexScreen === 2 && (
            <S.DivContainer>
              <Question
                title="2. Planejamento"
                textAsk="O material de trabalho está em ordem (tablet, política comercial, catálogo)?"
              />
              <Question textAsk="Apresentou plano de vendas para o cliente visitado?" />
              <Question textAsk="Apresentou planos alinhados à expectativa (S.M.A.R.T)?" />
              <S.ButtonIniciar onPress={handleAdvance}>
                <S.TextBtn>Próximo</S.TextBtn>
              </S.ButtonIniciar>
            </S.DivContainer>
          )}
          {indexScreen === 3 && (
            <S.DivContainer>
              <Question
                title="3. Aproximação"
                textAsk="Realizou verificação de produtos em gôndola?"
              />
              <Question textAsk="Buscou formas de melhorar visibilidade de itens?" />
              <Question textAsk="Verificou se precificação aplicada pelo cliente é coerente com objetivos?" />
              <Question textAsk="Pesquisou novos meios de promoção para produtos?" />
              <Question textAsk="Identificou rupturas de itens já cadastrados?" />
              <S.ButtonIniciar onPress={handleAdvance}>
                <S.TextBtn>Próximo</S.TextBtn>
              </S.ButtonIniciar>
            </S.DivContainer>
          )}
          {indexScreen === 4 && (
            <S.DivContainer>
              <Question
                title="4. Apresentação"
                textAsk="Fez revisão de sua proposta inicial, após checagem de loja?"
              />
              <Question textAsk="Elencou prioridades de acordo com as estratégias comerciais?" />
              <Question textAsk="Conduziu a apresentação com segurança e coerência?" />
              <Question textAsk="Enfatizou os benefícios da proposta para o cliente?" />
              <S.ButtonIniciar onPress={handleAdvance}>
                <S.TextBtn>Próximo</S.TextBtn>
              </S.ButtonIniciar>
            </S.DivContainer>
          )}
          {indexScreen === 5 && (
            <S.DivContainer>
              <Question
                title="5. Identificação de objeções"
                textAsk="Surgiram objeções durante a apresentação da proposta de vendas?"
              />
              <Question textAsk="Vendedor se manteve calmo ao se deparar com a objeção?" />
              <Question textAsk="Utilizou as técnicas de comunicação para identificar objeções (falsas/verdadeiras)?" />
              <Question textAsk="Propôs um fechamento?" />
              <Question textAsk="Surgiram objeções durante a apresentação da proposta de vendas?" />
              <Question textAsk="Vendedor se manteve calmo ao se deparar com a objeção?" />
              <Question textAsk="Conduziu a apresentação com segurança e coerência?" />
              <Question textAsk="Enfatizou os benefícios da proposta para o cliente?" />
              <S.ButtonIniciar onPress={handleAdvance}>
                <S.TextBtn>Próximo</S.TextBtn>
              </S.ButtonIniciar>
            </S.DivContainer>
          )}
          {indexScreen === 6 && (
            <S.DivContainer>
              <Question
                title="6. Cobranças"
                textAsk="Questionou ao cliente sobre alguma pendência acordada anteriormente?"
              />
              <Question textAsk="Iniciou processo de cobrança relativo a pendências financeiras?" />
              <S.ButtonIniciar onPress={handleAdvance}>
                <S.TextBtn>Próximo</S.TextBtn>
              </S.ButtonIniciar>
            </S.DivContainer>
          )}
          {indexScreen === 7 && (
            <S.DivContainer>
              <Question
                title="7. Acompanhamento"
                textAsk="Estabeleceu agenda de acompanhamento para os acordos firmados?"
              />
              <S.ButtonIniciar onPress={handleAdvance}>
                <S.TextBtn>Próximo</S.TextBtn>
              </S.ButtonIniciar>
            </S.DivContainer>
          )}
        </S.ContainerFields>
      </S.WrapperView>
    </>
  );
};

export default EvaluateVisit;
