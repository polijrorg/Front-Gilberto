import * as S from './styles';
import React from 'react';
import ButtonWhite from '@components/ButtonWhite';

const ContainerActions: React.FC = () => {
  return (
    <S.ContainerActions>
      <S.TitleActions>O que você vai fazer hoje?</S.TitleActions>
      <S.DivActions>
        <ButtonWhite text={'Avaliar um Mentorado'} />
        <ButtonWhite text={'Auditar uma Visita'} />
        <ButtonWhite text={'Ver Planos de Ação'} />
        <ButtonWhite text={'Visualizar Equipe'} />
      </S.DivActions>
    </S.ContainerActions>
  );
};

export default ContainerActions;
