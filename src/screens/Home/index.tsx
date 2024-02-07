import Header from '@components/HeaderMenu';
import * as S from './styles';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ContainerActions from '@components/ContainerActions';
import MatrizSlider from '@components/MatrizSlider';
import ContainerVendedores from '@components/ContainerVendedores';
import ButtonAdded from '@components/ButtonAdded';
import DivGradient from '@components/DivGradient';

const Home = () => {
  return (
    <>
      <StatusBar style="dark" />
      <S.Wrapper>
        <Header />
        <ContainerActions />
        <MatrizSlider />
        <ContainerVendedores />
        <DivGradient />
      </S.Wrapper>
      <ButtonAdded />
    </>
  );
};

export default Home;
