import DefaultButton from '@components/DefaultButton';
import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import BackButton from '@components/BackButton';
import DropdownSelect from '@components/ListDropdown';

const Home = () => (
  <S.Wrapper>
    <StatusBar style="light" />
    <DefaultButton textButton={'estátisticas'} />
    <DefaultButton textButton={'Olá mundo'} />
    <DefaultButton textButton={'Hello'} />
    <DefaultButton textButton={'Hello'} />
    <BackButton />
    <DropdownSelect />
  </S.Wrapper>
);

export default Home;
