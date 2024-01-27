import Header from '@components/HeaderMenu';
import * as S from './styles';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ButtonWhite from '@components/ButtonWhite';

const Home = () => (
  <>
    <StatusBar style="dark" />
    <S.Wrapper>
      <Header />
      <S.ContainerActions>
        <S.TitleActions>O que você vai fazer hoje?</S.TitleActions>
        <S.DivActions>
          <ButtonWhite text={'Avaliar um Mentorado'} />
          <ButtonWhite text={'Auditar uma Visita'} />
          <ButtonWhite text={'Ver Planos de Ação'} />
          <ButtonWhite text={'Visualizar Equipe'} />
        </S.DivActions>
      </S.ContainerActions>
    </S.Wrapper>
  </>
);

export default Home;
