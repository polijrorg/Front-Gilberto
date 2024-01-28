import Header from '@components/HeaderMenu';
import * as S from './styles';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ContainerActions from '@components/ContainerActions';
import MatrizSlider from '@components/MatrizSlider';
import ContainerVendedores from '@components/ContainerVendedores';
const Home = () => (
  <>
    <StatusBar style="dark" />
    <S.Wrapper>
      <Header />
      <ContainerActions />
      <MatrizSlider />
      <ContainerVendedores />
    </S.Wrapper>
  </>
);

export default Home;
