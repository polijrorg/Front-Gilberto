import Header from '@components/HeaderMenu';
import * as S from './styles';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ContainerActions from '@components/ContainerActions';
import MatrizSlider from '@components/MatrizSlider';
import ContainerVendedores from '@components/ContainerVendedores';
import ButtonAdded from '@components/ButtonAdded';
import DivGradient from '@components/DivGradient';
import useAuth from '@hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <>
      <StatusBar style="dark" />
      <S.Wrapper>
        <Header user={user} />
        <ContainerActions />
        <MatrizSlider />
        <ContainerVendedores user={user} />
        <DivGradient />
      </S.Wrapper>
      <ButtonAdded />
    </>
  );
};

export default Home;
