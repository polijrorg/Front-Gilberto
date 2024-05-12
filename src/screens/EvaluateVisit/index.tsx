import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Breadcrumb from '@components/Breadcrumb';
import Dropdown from '@components/Dropdown';
import HeaderPages from '@components/HeaderPages';
import QuestionSection from '@components/QuestionSection';

import useAuth from '@hooks/useAuth';

import SellerService from '@services/SellerServices';
import VisitService from '@services/VisitService';

import ISeller from '@interfaces/Seller';
import ICategories from '@interfaces/Visit/Categories';
import IQuestions from '@interfaces/Visit/Questions';

const EvaluateVisit = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [indexScreen, setIndexScreen] = useState(1);
  const [selectedSeller, setSelectedSeller] = useState<ISeller | null>(null);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [storeName, setStoreName] = useState('');
  const [answers, setAnswers] = useState<any[]>([]);

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
    const templates = await VisitService.getTemplateByCompanyId(seller.companyId);
    const fetchedCategories: ICategories[] = [];
    
    await Promise.all(templates.map(async (template) => {
      const categories = await VisitService.getCategoriesByIdTemplate(template.id);
      
      categories.forEach(category => {
        fetchedCategories.push(category);
      });
    }));
    
    setCategories(fetchedCategories);
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

  const handleUpdateAnswers = (updatedAnswers: any[]) => {
    console.log("", updatedAnswers);
    setAnswers(updatedAnswers);
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
          {indexScreen !== 1 && categories.map((category, idx) => (
            <QuestionSection
              key={category.id}
              sellerId={selectedSeller.id as string}
              category={category}
              index={idx + 2}
              selectedIndex={indexScreen}
              onUpdateAnswers={handleUpdateAnswers} // Passando a função para o componente QuestionSection
            />
          ))}
          {indexScreen <= categories.length && (
            <S.ButtonIniciar onPress={handleAdvance} disabled={storeName === ''}>
              <S.TextBtn>Próximo</S.TextBtn>
            </S.ButtonIniciar>
          )}
          {indexScreen > categories.length && (
            <FinishedSection />
          )}
        </S.ContainerFields>
      </S.WrapperView>
    </>
  );  
};

const FinishedSection = () => {
  return (
    <S.ContainerFields>
      <S.BtnFinished>
        <S.TextBtn>Finalizar dia com com esse vendedor</S.TextBtn>
      </S.BtnFinished>
      <S.Outline>
        <S.TextBtnNova>Iniciar nova visita</S.TextBtnNova>
      </S.Outline>
    </S.ContainerFields>
  )
};

const SellerSelection = ({ sellers, onSelectSeller, onAdvance, storeName, onStoreNameChange }) => {
  return (
    <S.DivContainer>
      <S.TitleInput>Nome do Vendedor</S.TitleInput>
      <Dropdown sellers={sellers} onSelectSeller={onSelectSeller} />
      <S.TitleInput>Loja</S.TitleInput>
      <S.Input placeholder="Nome da Loja" value={storeName} onChangeText={onStoreNameChange} />
      <S.ButtonFirst onPress={onAdvance} disabled={storeName === ''} style={{opacity: storeName ? 1 : 0.5}}>
        <S.TextBtn>iniciar Avaliação</S.TextBtn>
      </S.ButtonFirst>
    </S.DivContainer>
  );
};

export default EvaluateVisit;
