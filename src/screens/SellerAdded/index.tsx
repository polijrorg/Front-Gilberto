import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SellerAdded = () => {
  const navigation = useNavigation();

  const handlePressBack = () => {
    navigation.goBack();
  };
  return (
    <S.Wrapper>
      <StatusBar style="light" />
      <S.Header>
        <S.TitleHeader>Adicionar Vendedor</S.TitleHeader>
        <S.BtnBack onPress={handlePressBack}>
          <S.ImageHeader source={require('@assets/img/myteam/back.png')} />
        </S.BtnBack>
      </S.Header>
    </S.Wrapper>
  );
};

export default SellerAdded;
