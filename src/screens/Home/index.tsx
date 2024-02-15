import Header from '@components/HeaderMenu';
import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import ContainerActions from '@components/ContainerActions';
import MatrizSlider from '@components/MatrizSlider';
import ContainerCards from '@components/ContainerCards';
import ButtonAdded from '@components/ButtonAdded';
import DivGradient from '@components/DivGradient';
import useAuth from '@hooks/useAuth';
import ISeller from '@interfaces/Seller';
import SupervisorServices from '@services/SupervisorServices';

const Home = () => {
  const { user } = useAuth();
  const [sellers, setSellers] = useState<ISeller[]>([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        if (user.job === 'Supervisor') {
          const sellersData =
            await SupervisorServices.getAllSellerInSupervisorById(user.id);
          setSellers(sellersData as ISeller[]);
        }
      } catch (error) {
        console.error('Erro ao obter vendedores:', error);
      }
    };

    fetchSellers();
  }, [user.id, user.job]);

  return (
    <>
      <StatusBar style="dark" />
      <S.Wrapper>
        <Header user={user} />
        <ContainerActions />
        <MatrizSlider />
        <ContainerCards sellers={sellers} />
        <DivGradient />
      </S.Wrapper>
      <ButtonAdded />
    </>
  );
};

export default Home;
