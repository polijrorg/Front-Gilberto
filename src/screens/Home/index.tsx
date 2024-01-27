import DefaultButton from '@components/DefaultButton';
import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const Home = () => (
  <S.Wrapper>
    <StatusBar style="light" />
    <DefaultButton textButton={'estátisticas'} />
    <DefaultButton textButton={'Olá mundo'} />
    <DefaultButton textButton={'Hello'} />
    <DefaultButton textButton={'Hello'} />
  </S.Wrapper>
);

export default Home;
