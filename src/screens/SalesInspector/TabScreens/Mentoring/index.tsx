import * as S from './styles';
import React from 'react';
import Accordion from '@components/Accordion';

const Mentoring = () => {
  return (
    <S.Wrapper>
      <S.WrapperView>
        <Accordion title="Módulo 1: Tema" />
        <Accordion title="Módulo 2: Tema" />
        <Accordion title="Módulo 3: Tema" />
        <Accordion title="Módulo 4: Tema" />
        <Accordion title="Módulo 5: Tema" />
        <Accordion title="Módulo 6: Tema" />
        <Accordion title="Módulo 7: Tema" />
      </S.WrapperView>
    </S.Wrapper>
  );
};

export default Mentoring;
