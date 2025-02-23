import * as S from './styles';
import React from 'react';
import ButtonWhite from '@components/ButtonWhite';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import User from '@interfaces/User';

interface ContanerActionsProps {
  user: User;
}

const ContainerActions: React.FC<ContanerActionsProps> = ({user}) => {
  const navigation = useNavigation();
  const toast = useToast();

  type ButtonConfig = {
    [key: string]: {
      mentorado: string;
      visita: string;
    };
  };

  const buttonConfig: ButtonConfig = {
    Gerente: {
      mentorado: 'Avaliar um Mentoreado',
      visita: 'Editar Visita',
    },
    default: {
      mentorado: 'Avaliar um Mentoreado',
      visita: 'Auditar uma Visita',
    },
  };

  const handleEnviarMyTeam = () => {
    navigation.navigate('MyTeam' as never);
  };

  const handleEnviarEvaluateMentoring = () => {
    if (user?.job === 'Supervisor') {
      navigation.navigate('EvaluateMentoring' as never);
    } else {
      showToast('Funcionalidade apenas para Supervsiores', '');
    }
  };

  const showToast = (message: string, type: string) => {
    toast.show(message, {
      type: type,
      placement: 'center',
      duration: 3500,
      animationType: 'slide-in',
    });
  };

  const handleEnviarEvaluateVisit = () => {
    if (user?.job === 'Supervisor') {
      navigation.navigate('EvaluateVisit' as never);
    } else if (user?.job === 'Gerente') {
      navigation.navigate('EvaluateVisitManager' as never);
    }
  };

  const handleEnviarPlainAction = () => {
    if (user?.job === 'Supervisor') {
    const userTypeConfig = buttonConfig[user?.job as keyof ButtonConfig] || buttonConfig.default;
    } else {
      showToast('Funcionalidade apenas para Supervisores', '');
    }
  };

  const getButtonText = (buttonType: 'mentorado' | 'visita') => {
    const userTypeConfig = buttonConfig[user?.job] || buttonConfig.default;
    return userTypeConfig[buttonType];
  };

  return (
    <S.ContainerActions>
      <S.TitleActions>O que você vai fazer hoje?</S.TitleActions>
      <S.DivActions>
        <ButtonWhite
          text={getButtonText('visita')}
          duty={handleEnviarEvaluateVisit}
        />
        {user.job !== 'Gerente' && (
          <>
            <ButtonWhite
              text={getButtonText('mentorado')}
              duty={handleEnviarEvaluateMentoring}
            />
            <ButtonWhite
              text={'Ver Planos de Ação'}
              duty={handleEnviarPlainAction}
            />
          </>
        )}

        <ButtonWhite text="Visualizar Equipe" duty={handleEnviarMyTeam} />
      </S.DivActions>
    </S.ContainerActions>
  );
};

export default ContainerActions;
