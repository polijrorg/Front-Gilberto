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
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number | null>(
    null
  );
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
        setLoading(false);
      }
    };

    fetchData();
  }, [user.companyId, user.id, user.job]);

  const handleSelectSeller = (seller: ISeller) => {
    setSelectedSeller(seller);
    updateButtonOpacity(seller, selectedModuleIndex);
  };

  const handleSelectModule = (index: number) => {
    setSelectedModuleIndex(index);
    updateButtonOpacity(selectedSeller, index);
  };

  const updateButtonOpacity = (
    seller: ISeller | null,
    moduleIndex: number | null
  ) => {
    if (seller && moduleIndex !== null) {
      setButtonOpacity(1);
    } else {
      setButtonOpacity(0.5);
    }
  };

  const handleSetAsk = () => {
    if (selectedModuleIndex !== null && selectedSeller !== null) {
      const selectedModule = modules[selectedModuleIndex];
      navigation.navigate('AskEvaluateMentoring', {
        module: selectedModule,
        index: selectedModuleIndex,
        seller: selectedSeller,
      });
    }
  };

  return (
    <>
      <StatusBar />
      <S.Wrapper>
        <HeaderPages title="Avaliar Mentorado" />
        <S.Container>
          <S.DivContainerSeller>
            <S.NameField>Nome do Vendedor</S.NameField>
            <Dropdown sellers={sellers} onSelectSeller={handleSelectSeller} />
          </S.DivContainerSeller>
          <S.DivContainerSeller>
            <S.NameField>Veja quais módulos estão disponíveis</S.NameField>
            <S.ContainerButton>
              {loading ? (
                <ActivityIndicator color="#3E63DD" />
              ) : modules.length > 0 ? (
                modules.map((module, index) => (
                  <S.BtnModule
                    key={index}
                    onPress={() => handleSelectModule(index)}
                    selected={selectedModuleIndex === index}
                  >
                    <S.TextBtn
                      selected={selectedModuleIndex === index}
                    >{`Módulo ${index + 1}`}</S.TextBtn>
                  </S.BtnModule>
                ))
              ) : (
                <S.StyledText>Nenhum módulo cadastrado</S.StyledText>
              )}
            </S.ContainerButton>
          </S.DivContainerSeller>
        </S.Container>
      </S.Wrapper>
      <S.BtnAvaliar onPress={handleSetAsk} style={{ opacity: buttonOpacity }}>
        <S.TextBtnAvaliar>Avaliar</S.TextBtnAvaliar>
      </S.BtnAvaliar>
      <DivGradient />
    </>
  );
};

export default EvaluateMentoring;
