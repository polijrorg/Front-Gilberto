/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DivGradient from '@components/DivGradient';
import useAuth from '@hooks/useAuth';
import HeaderPages from '@components/HeaderPages';
import Dropdown from '@components/Dropdown';
import SellerService from '@services/SellerServices';
import ISeller from '@interfaces/Seller';
import ModulesServices from '../../services/ModuleServices';
import IModule from '@interfaces/Module';

const EvaluateMentoring = () => {
  const { user } = useAuth();
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [modules, setModules] = useState<IModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupervisor, setSelectedSupervisor] = useState<ISeller | null>(
    null
  );
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number | null>(
    null
  );

  const handleSelect = (seller: ISeller) => {
    setSelectedSupervisor(seller);
  };

  const handleModuleSelect = (index: number) => {
    setSelectedModuleIndex(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.job === 'Supervisor') {
          setLoading(true);
          const sellerData = await SellerService.getAllSellerFromSupervisor(
            user.id
          );

          const modulesData = await ModulesServices.getAllModules();
          setModules(modulesData);
          setSellers(sellerData);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.companyId, user.id, user.job]);

  return (
    <>
      <StatusBar />
      <S.Wrapper>
        <HeaderPages title="Avaliar Mentorado" />
        <S.Container>
          <S.DivContanerSeller>
            <S.NameField>Nome do Vendedor</S.NameField>
            <Dropdown sellers={sellers} onSelectSeller={handleSelect} />
          </S.DivContanerSeller>
          <S.DivContanerSeller>
            <S.NameField>Veja quais módulos estão disponíveis</S.NameField>
            <S.ContainerButton>
              {loading ? (
                <ActivityIndicator color="#3E63DD" />
              ) : modules.length > 0 ? (
                modules.map((module, index) => (
                  <S.BtnModule
                    key={index}
                    onPress={() => handleModuleSelect(index)}
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
          </S.DivContanerSeller>
        </S.Container>
      </S.Wrapper>
      <S.BtnAvaliar>
        <S.TextBtnAvaliar>Avaliar</S.TextBtnAvaliar>
      </S.BtnAvaliar>
      <DivGradient />
    </>
  );
};

export default EvaluateMentoring;
