import FormsLogin from '@components/FormsLogin';
import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import PdfService from '@services/PdfService';

const Login = () => {
  return (
    <S.Wrapper>
      <StatusBar />
      <S.Header>
        <S.TitleHeader>Faça seu login</S.TitleHeader>
        <S.ImageHeader source={require('@assets/img/login/mao.png')} />
      </S.Header>
      <FormsLogin />
    </S.Wrapper>
  );
};

export default Login;
