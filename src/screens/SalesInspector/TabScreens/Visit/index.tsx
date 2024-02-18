import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const Visit = () => {
  return (
    <S.Wrapper>
      <StatusBar style="light" />
      <S.Header>
        <S.TitleHeader>Página Visit</S.TitleHeader>
        <S.ImageHeader source={require('@assets/img/login/mao.png')} />
      </S.Header>
    </S.Wrapper>
  );
};

export default Visit;
