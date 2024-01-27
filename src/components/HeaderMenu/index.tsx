import { Alert } from 'react-native';
import * as S from './styles';
import React from 'react';

const HeaderMenu: React.FC = () => {
  const handleClick = () => {
    Alert.alert('Logout', 'Até mais!');
  };

  return (
    <S.StyledWrapper>
      <S.StyledHeading>Olá, Gilberto!</S.StyledHeading>
      <S.ButtonLogout onPress={handleClick}>
        <S.IconLogout source={require('@assets/img/header/Exit.png')} />
      </S.ButtonLogout>
    </S.StyledWrapper>
  );
};

export default HeaderMenu;
