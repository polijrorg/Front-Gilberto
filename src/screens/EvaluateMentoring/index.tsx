/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import DivGradient from '@components/DivGradient';
import useAuth from '@hooks/useAuth';
import HeaderPages from '@components/HeaderPages';
import Dropdown from '@components/Dropdown';
import SellerService from '@services/SellerServices';
import ISeller from '@interfaces/Seller';

const EvaluateMentoring = () => {
  const { user } = useAuth();
  const [sellers, setSellers] = useState<ISeller[]>();
  const [selectedSupervisor, setSelectedSupervisor] = useState<ISeller | null>(
    null
  );
  const handleSelect = (seller: ISeller) => {
    setSelectedSupervisor(seller);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.job === 'Supervisor') {
          const sellerData = await SellerService.getAllSellerFromSupervisor(
            user.id
          );
          setSellers(sellerData);
        }
      } catch (error) {}
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
              <S.BtnModule>
                <S.TextBtn>Mod. 1</S.TextBtn>
              </S.BtnModule>
            </S.ContainerButton>
          </S.DivContanerSeller>
        </S.Container>
        <DivGradient />
      </S.Wrapper>
    </>
  );
};

export default EvaluateMentoring;
