import * as S from './styles';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ContainerVendedores from '@components/ContainerVendedores';
import ButtonAdded from '@components/ButtonAdded';
const MyTeam = () => (
  <>
    <StatusBar style="dark" />
    <S.Wrapper>
      <ContainerVendedores />
    </S.Wrapper>
    <ButtonAdded />
  </>
);

export default MyTeam;
