import CardsMentory from '@components/CardsMentory';
import * as S from './styles';
import React from 'react';

const Action = () => {
  return (
    <>
      <S.Wrapper>
        <S.WrapperView>
          <CardsMentory />
          <CardsMentory />
          <CardsMentory />
          <CardsMentory />
          <CardsMentory />
          <CardsMentory />
          <CardsMentory />
          <CardsMentory />
          <CardsMentory />
        </S.WrapperView>
      </S.Wrapper>
      <S.BtnCriarAction>
        <S.TextBtn>criar plano de ação</S.TextBtn>
      </S.BtnCriarAction>
    </>
  );
};

export default Action;
