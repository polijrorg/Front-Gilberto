import { RouteProp } from '@react-navigation/native';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import DivGradient from '@components/DivGradient';
import InputRage from '@components/InputRage';
import HeaderPages from '@components/HeaderPages';
import IModule from '@interfaces/Module';
import ISeller from '@interfaces/Seller';

interface RouteParams {
  module: IModule;
  seller: ISeller;
  index: number;
}

interface Props {
  Modulo: IModule;
  numberModule: number;
  route: RouteProp<{ EvaluateMentoring: RouteParams }, 'EvaluateMentoring'>;
}

const ModuloAsk: React.FC<Props> = ({ route }) => {
  const { module, index, seller } = route.params;
  console.log(module, index, seller);

  return (
    <>
      <StatusBar />
      <S.Wrapper>
        <HeaderPages title="Avaliar Mentorado" />
        <S.AskDiv>
          <S.TitleModule>
            Módulo {index + 1}: {module.name}
          </S.TitleModule>
          <InputRage textAsk="Conhecimento" />
        </S.AskDiv>
      </S.Wrapper>
      <DivGradient />
    </>
  );
};

export default ModuloAsk;
