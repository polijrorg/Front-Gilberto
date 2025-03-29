import FormsLogin from '@components/FormsLogin';
import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';

const Login = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <S.Wrapper>
        <StatusBar backgroundColor={'#3E63DD'} />
        <S.Header>
          <S.TitleHeader>Faça seu login</S.TitleHeader>
          <S.ImageHeader source={require('@assets/img/login/mao.png')} />
        </S.Header>
        <FormsLogin /> 
      </S.Wrapper>
    </KeyboardAvoidingView>
  );
};

export default Login;
