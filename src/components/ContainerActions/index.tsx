import * as S from './styles';
import React from 'react';
import ButtonWhite from '@components/ButtonWhite';
import { useNavigation } from '@react-navigation/native';

const ContainerActions: React.FC = () => {
  const navigation = useNavigation();

  const handleEnviarMyTeam = () => {
    navigation.navigate('MyTeam' as never);
  };

  return (
    <S.ContainerActions>
      <S.TitleActions>O que você vai fazer hoje?</S.TitleActions>
      <S.DivActions>
        <ButtonWhite text={'Ver Planos de Ação'} />
        <ButtonWhite text={'Visualizar Equipe'} duty={handleEnviarMyTeam} />
        <ButtonWhite text={'Avaliar um Mentorado'} />
        <ButtonWhite text={'Auditar uma Visita'} />
      </S.DivActions>
    </S.ContainerActions>
  );
};

export default ContainerActions;
