import FormsLogin from '@components/FormsLogin';
import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const Login = () => {
  return (
    <S.Wrapper>
      <StatusBar style="light" />
      <S.Header>
        <S.TitleHeader>Faça seu login</S.TitleHeader>
        <S.ImageHeader source={require('@assets/img/login/mao.png')} />
      </S.Header>
      <FormsLogin />
    </S.Wrapper>
  );
};

export default Login;
