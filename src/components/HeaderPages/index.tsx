import * as S from './styles';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

type IHeaderProps = {
  title: string;
};

const HeaderPages: React.FC<IHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  const handlePressBack = () => {
    navigation.goBack();
  };

  return (
    <S.Header>
      <S.TextWithBorder>
        <S.TextMyTeam>{title}</S.TextMyTeam>
      </S.TextWithBorder>
      <S.ButtonBack onPress={handlePressBack}>
        <S.BackImage source={require('@assets/img/myteam/back.png')} />
      </S.ButtonBack>
    </S.Header>
  );
};

export default HeaderPages;
