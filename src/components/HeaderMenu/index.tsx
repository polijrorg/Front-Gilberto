import { Alert } from 'react-native';
import * as S from './styles';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const HeaderMenu: React.FC = () => {
  const navigation = useNavigation();

  const handleClick = () => {
    Alert.alert('Logout', 'Volte Sempre');

    setTimeout(() => {
      navigation.navigate('Login' as never);
    }, 1000);
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
