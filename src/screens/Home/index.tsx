import Header from '@components/HeaderMenu';
import * as S from './styles';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ContainerActions from '@components/ContainerActions';
const Home = () => (
  <>
    <StatusBar style="dark" />
    <S.Wrapper>
      <Header />
      <ContainerActions />
    </S.Wrapper>
  </>
);

export default Home;
