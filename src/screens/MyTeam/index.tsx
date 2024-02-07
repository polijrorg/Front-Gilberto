import * as S from './styles';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ContainerVendedores from '@components/ContainerVendedores';
import DivGradient from '@components/DivGradient';
const MyTeam = () => (
  <S.WrapperTela>
    <StatusBar style="dark" />
    <S.Wrapper>
      <ContainerVendedores />
    </S.Wrapper>
    <DivGradient />
  </S.WrapperTela>
);

export default MyTeam;
