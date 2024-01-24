import * as S from './styles';
import Heading from '@components/Heading';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const Home = () => (
  <S.Wrapper>
    <StatusBar style="light" />
    <Heading color="#fca925">Poli Junior</Heading>
    <S.StyledText>Template para iniciar projetos da PJ</S.StyledText>
    <S.StyledText>Criado por Cauan Kazama</S.StyledText>
  </S.Wrapper>
);

export default Home;
