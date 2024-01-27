import Header from '@components/HeaderMenu';
import * as S from './styles';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

const MentoriaMatriz = () => (
  <>
    <StatusBar style="dark" />
    <S.Wrapper>
      <Header />
    </S.Wrapper>
  </>
);

export default MentoriaMatriz;
