import * as S from './styles';
import React from 'react';
import ButtonWhite from '@components/ButtonWhite';
import { useNavigation } from '@react-navigation/native';
import useAuth from '@hooks/useAuth';

const ContainerActions: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const buttonConfig = {
    Gerente: {
      mentorado: 'Editar Mentoria',
      visita: 'Editar Visita',
    },
    default: {
      mentorado: 'Avaliar um Mentorado',
      visita: 'Auditar uma Visita',
    },
  };

  const handleEnviarMyTeam = () => {
    navigation.navigate('MyTeam' as never);
  };

  const handleEnviarEvaluateMentoring = () => {
    if (user.job === 'Supervisor') {
      navigation.navigate('EvaluateMentoring' as never);
    }
  };

  const getButtonText = (buttonType: string) => {
    const userTypeConfig = buttonConfig[user.job] || buttonConfig.default;
    return userTypeConfig[buttonType];
  };

  return (
    <S.ContainerActions>
      <S.TitleActions>O que você vai fazer hoje?</S.TitleActions>
      <S.DivActions>
        <ButtonWhite text={'Ver Planos de Ação'} />
        <ButtonWhite text="Visualizar Equipe" duty={handleEnviarMyTeam} />
        <ButtonWhite
          text={getButtonText('mentorado')}
          duty={handleEnviarEvaluateMentoring}
        />
        <ButtonWhite text={getButtonText('visita')} />
      </S.DivActions>
    </S.ContainerActions>
  );
};

export default ContainerActions;
