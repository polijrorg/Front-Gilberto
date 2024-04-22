import React, { useState } from 'react';
import CardsMentory from '@components/CardsMentory';
import PlainMentory from './Plain/Mentory';
import * as S from './styles';

const Action = () => {
  const [state, setState] = useState<number>(0);

  const handleNavigator = () => {
    setState(state + 1);
  };

  return (
    <S.ViewWrapper>
      {state === 0 && (
        <S.Wrapper>
          <CardsMentory />
          <CardsMentory />
          <CardsMentory />
          <CardsMentory />
          <CardsMentory />
          <CardsMentory />
          <CardsMentory />
          <CardsMentory />
          <CardsMentory />
          <S.BtnCriarAction onPress={handleNavigator}>
            <S.TextBtn>criar plano de ação</S.TextBtn>
          </S.BtnCriarAction>
        </S.Wrapper>
      )}
      {state === 1 && <PlainMentory state={state} />}
      {state === 2 && <PlainMentory state={state} />}
    </S.ViewWrapper>
  );
};

export default Action;
