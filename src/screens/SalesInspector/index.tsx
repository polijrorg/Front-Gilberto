import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '@hooks/useAuth';
import SellerServices from '@services/SellerServices';
import ISeller from '@interfaces/Seller';
import { View } from 'react-native';
import Modal from 'react-native-modal';

const SalesInpector = ({ route }) => {
  const navigation = useNavigation();
  const { idVendedor } = route.params;
  const { user } = useAuth();
  const [seller, setSeller] = useState<ISeller | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const responseGetSeller = await SellerServices.getSellerById(
        user.id,
        idVendedor
      );
      setSeller(responseGetSeller);
    };

    fetchData();
  }, [idVendedor, user.id]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDelete = async () => {
    try {
      console.log('DELETADO');
    } catch (error) {
      console.error('Erro ao excluir vendedor:', error);
    }
  };

  return (
    <S.Wrapper>
      <S.DivButtonBack>
        <S.ButtonBack onPress={handleGoBack}>
          <S.ImageBtn source={require('@assets/img/myteam/back.png')} />
        </S.ButtonBack>
      </S.DivButtonBack>
      <View>
        <S.Container>
          <S.ViewInfoUser>
            <S.ImageUser
              source={require('@assets/img/cardVendedor/foto.png')}
            />
            <S.InfoUser>
              <S.Title>{seller?.name || 'Usuário'}</S.Title>
              <S.Loja>{seller?.job || 'Cargo'}</S.Loja>
              <S.Funcao>{seller?.email || 'user123@gmail.com'}</S.Funcao>
            </S.InfoUser>

            <S.BtnLixeira onPress={toggleModal}>
              <S.ImageVectorLixeira
                source={require('@assets/img/lixeira.png')}
              />
            </S.BtnLixeira>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
              <S.ContentModal>
                <S.WrapperConteudo>
                  <S.ImageWarning
                    source={require('@assets/img/warnnign.png')}
                  />
                  <S.TextModal>
                    Tem certeza que deseja excluir esse vendedor?
                  </S.TextModal>
                </S.WrapperConteudo>
                <S.BtnYes onPress={handleDelete}>
                  <S.TitleBtnYes>Sim</S.TitleBtnYes>
                </S.BtnYes>
                <S.BtnBack onPress={toggleModal}>
                  <S.TitleBtnBack>Voltar</S.TitleBtnBack>
                </S.BtnBack>
              </S.ContentModal>
            </Modal>
          </S.ViewInfoUser>
        </S.Container>
      </View>
    </S.Wrapper>
  );
};

export default SalesInpector;
