import * as S from './styles';
import React from 'react';
import ButtonWhite from '@components/ButtonWhite';

const Action = () => {
  return (
    <S.Wrapper>
      <S.Header>
        <S.TitleHeader>Página Ação</S.TitleHeader>
        <S.ImageHeader source={require('@assets/img/login/mao.png')} />
        <ButtonWhite text="text" />
        <ButtonWhite text="text" />
        <ButtonWhite text="text" />
        <ButtonWhite text="text" />
        <ButtonWhite text="text" />
        <ButtonWhite text="text" />
      </S.Header>
    </S.Wrapper>
  );
};

export default Action;
