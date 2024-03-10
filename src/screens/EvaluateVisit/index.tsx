/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { useNavigation } from '@react-navigation/native';
import Breadcrumb from '@components/Breadcrumb';
import Dropdown from '@components/Dropdown';
import useAuth from '@hooks/useAuth';
import SellerService from '@services/SellerServices';
import ISeller from '@interfaces/Seller';

const EvaluateVisit = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState<ISeller | null>(
    null
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.job === 'Supervisor') {
          const sellerInSupervisor =
            await SellerService.getAllSellerFromSupervisor(user.id);
          setSellers(sellerInSupervisor);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de vendedores:', error);
      }
    };

    fetchData();
  }, [user.id, user.job]);
  const [path, setPath] = useState([
    { name: '1', path: '' },
    { name: '2', path: 'ScreenSequence' },
    { name: '3', path: 'SellerAdded' },
    { name: '4', path: 'SellerAdded' },
    { name: '5', path: 'SellerAdded' },
    { name: '6', path: 'SellerAdded' },
    { name: '7', path: 'SellerAdded' },
  ]);
  const handleSelect = (seller: ISeller) => {
    setSelectedSupervisor(seller);
  };

  const handleNavigation = (index) => {
    const newPath = path.slice(0, index + 1);
    console.log(newPath);
    navigation.navigate(newPath[index].path as never);
    setPath(newPath);
  };

  return (
    <S.WrapperView>
      <S.ContainerFields>
        <Breadcrumb path={path} handleNavigation={handleNavigation} />
        <S.DivContainer>
          <S.TitleInput>Nome do Vendedor</S.TitleInput>
          <Dropdown sellers={sellers} onSelectSeller={handleSelect} />
        </S.DivContainer>

        <S.DivContainer>
          <S.TitleInput>Loja</S.TitleInput>
          <S.Input placeholder="Nome da Loja" />
        </S.DivContainer>
      </S.ContainerFields>
      <S.ButtonIniciar>
        <S.TextBtn>iniciar Avaliação</S.TextBtn>
      </S.ButtonIniciar>
    </S.WrapperView>
  );
};

export default EvaluateVisit;
