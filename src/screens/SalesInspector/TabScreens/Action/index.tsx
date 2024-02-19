import * as S from './styles';
import React from 'react';

const Action = () => {
  return (
    <S.Wrapper>
      <S.Header>
        <S.TitleHeader>Página Ação</S.TitleHeader>
        <S.ImageHeader source={require('@assets/img/login/mao.png')} />
      </S.Header>
    </S.Wrapper>
  );
};

export default Action;
