import * as S from './styles';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ContainerVendedores from '@components/ContainerVendedores';
import DivGradient from '@components/DivGradient';
import { useNavigation } from '@react-navigation/native';

const MyTeam = () => {
  const navigation = useNavigation();

  const handlePressBack = () => {
    navigation.goBack();
  };

  return (
    <S.WrapperTela>
      <StatusBar style="dark" />
      <S.Wrapper>
        <S.Header>
          <S.TextMyTeam>Minha Equipe</S.TextMyTeam>
          <S.ButtonBack onPress={handlePressBack}>
            <S.ImageVendedor source={require('@assets/img/myteam/back.png')} />
          </S.ButtonBack>
        </S.Header>
        <ContainerVendedores title="Meus Vendedores" />
      </S.Wrapper>
      <DivGradient />
    </S.WrapperTela>
  );
};

export default MyTeam;
