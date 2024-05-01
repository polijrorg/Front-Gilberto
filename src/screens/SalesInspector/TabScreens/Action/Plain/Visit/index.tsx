import CardsMentory from '@components/CardsMentory';
import * as S from './styles';
import React from 'react';

interface PlainActionProps {
  state: number;
}

const PlainVisit: React.FC<PlainActionProps> = ({ state }) => {
  const handleNavigator = () => {};

  return (
    <>
      <S.Wrapper>
        <S.WrapperView></S.WrapperView>
      </S.Wrapper>
      <S.BtnCriarAction onPress={handleNavigator}>
        <S.TextBtn>criar plano de ação</S.TextBtn>
      </S.BtnCriarAction>
    </>
  );
};

export default PlainVisit;
