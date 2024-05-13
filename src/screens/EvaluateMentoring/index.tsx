import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DivGradient from '@components/DivGradient';
import useAuth from '@hooks/useAuth';
import HeaderPages from '@components/HeaderPages';
import Dropdown from '@components/Dropdown';
import SellerService from '@services/SellerServices';
import ModulesServices from '../../services/ModuleServices';
import { useNavigation } from '@react-navigation/native';
import * as S from './styles';
import ISeller from '@interfaces/Seller';
import IModule from '@interfaces/Module';

const EvaluateMentoring = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [modules, setModules] = useState<IModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeller, setSelectedSeller] = useState<ISeller | null>(null);
  const [buttonOpacity, setButtonOpacity] = useState(0.5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.job === 'Supervisor') {
          setLoading(true);
          const [sellerData, modulesData] = await Promise.all([
            SellerService.getAllSellerFromSupervisor(user.id),
            ModulesServices.getAllModules(),
          ]);
          setSellers(sellerData);
          setModules(modulesData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user.companyId, user.id, user.job]);

  const handleSelectSeller = (seller: ISeller) => {
    setSelectedSeller(seller);
    updateButtonOpacity(seller);
  };

  const updateButtonOpacity = (seller: ISeller | null) => {
    setButtonOpacity(seller ? 1 : 0.5);
  };

  const handleSetAsk = () => {
    navigation.navigate('AskEvaluateMentoring', {
      seller: selectedSeller,
    });
  };

  return (
    <>
      <StatusBar />
      <S.Wrapper>
        <HeaderPages title="Avaliar Mentorado" />
        <S.Container>
          <SellerSelection
            sellers={sellers}
            onSelectSeller={handleSelectSeller}
          />
          <ModuleList loading={loading} modules={modules} />
        </S.Container>
      </S.Wrapper>
      <EvaluationButton onPress={handleSetAsk} opacity={buttonOpacity} />
      <DivGradient />
    </>
  );
};

const SellerSelection = ({ sellers, onSelectSeller }) => (
  <S.DivContainerSeller>
    <S.NameField>Nome do Vendedor</S.NameField>
    <Dropdown sellers={sellers} onSelectSeller={onSelectSeller} />
  </S.DivContainerSeller>
);

const ModuleList = ({ loading, modules }) => (
  <S.DivContainerSeller>
    <S.NameField>Veja quais módulos estão disponíveis</S.NameField>
    <S.ContainerButton>
      {loading ? (
        <ActivityIndicator color="#3E63DD" />
      ) : modules.length > 0 ? (
        modules.map((_module, index) => (
          <S.BtnModule key={index} disabled>
            <S.TextBtn>{`Módulo ${index + 1}`}</S.TextBtn>
          </S.BtnModule>
        ))
      ) : (
        <S.StyledText>Nenhum módulo cadastrado</S.StyledText>
      )}
    </S.ContainerButton>
  </S.DivContainerSeller>
);

const EvaluationButton = ({ onPress, opacity }) => (
  <S.BtnAvaliar onPress={onPress} style={{ opacity }}>
    <S.TextBtnAvaliar>Avaliar</S.TextBtnAvaliar>
  </S.BtnAvaliar>
);

export default EvaluateMentoring;
