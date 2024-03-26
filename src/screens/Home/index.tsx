import Header from '@components/HeaderMenu';
import * as S from './styles';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ContainerActions from '@components/ContainerActions';
import MatrizSlider from '@components/MatrizSlider';
import {
  SellersContainer,
  SupervisorsContainer,
} from '@components/ContainerCards';
import ButtonAdded from '@components/ButtonAdded';
import DivGradient from '@components/DivGradient';
import useAuth from '@hooks/useAuth';

const Home = () => {
  const { user } = useAuth();
  return (
    <>
      <StatusBar backgroundColor="#3E63DD" style="light" />
      <S.Wrapper>
        <Header />
        <ContainerActions />
        <MatrizSlider />
        {user.job === 'Gerente' ? (
          <SupervisorsContainer />
        ) : (
          <SellersContainer />
        )}
        <DivGradient />
      </S.Wrapper>
      <ButtonAdded />
    </>
  );
};

export default Home;
