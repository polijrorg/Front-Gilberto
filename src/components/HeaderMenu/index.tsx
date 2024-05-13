import * as S from './styles';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import useAuth from '@hooks/useAuth';

const HeaderMenu: React.FC = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleClick = () => {
    setLoading(!loading);
    setTimeout(() => {
      navigation.navigate('Login' as never);
      logout();
    }, 1000);
    setLoading(!loading);
  };

  return (
    <S.StyledWrapper>
      <S.StyledHeading>Olá, {user.name}</S.StyledHeading>
      <S.ButtonLogout onPress={toggleModal}>
        <S.IconLogout source={require('@assets/img/header/Exit.png')} />
      </S.ButtonLogout>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <S.ContentModal>
          <S.WrapperConteudo>
            <S.ImageWarning source={require('@assets/img/warnnign.png')} />
            <S.TextModal>Deseja Sair?</S.TextModal>
          </S.WrapperConteudo>
          <S.BtnYes
            onPress={!loading ? handleClick : undefined}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <S.TitleBtnYes>Sim</S.TitleBtnYes>
            )}
          </S.BtnYes>
          <S.BtnBack onPress={toggleModal}>
            <S.TitleBtnBack>Não</S.TitleBtnBack>
          </S.BtnBack>
        </S.ContentModal>
      </Modal>
    </S.StyledWrapper>
  );
};

export default HeaderMenu;
