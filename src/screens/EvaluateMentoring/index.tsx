/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from './styles';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ButtonAdded from '@components/ButtonAdded';
import DivGradient from '@components/DivGradient';
import useAuth from '@hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import HeaderPages from '@components/HeaderPages';

const EvaluateMentoring = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const handlePressBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <StatusBar />
      <S.Wrapper>
        <HeaderPages title="Avaliar Mentorado" />
        <DivGradient />
      </S.Wrapper>
      <ButtonAdded />
    </>
  );
};

export default EvaluateMentoring;
