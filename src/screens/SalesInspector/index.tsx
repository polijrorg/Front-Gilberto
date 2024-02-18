import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '@hooks/useAuth';
import SellerServices from '@services/SellerServices';
import ISeller from '@interfaces/Seller';
import { View } from 'react-native';

const SalesInpector = ({ route }) => {
  const navigation = useNavigation();
  const { idVendedor } = route.params;
  const { user } = useAuth();
  const [seller, setSeller] = useState<ISeller | null>(null);

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

            <S.BtnLixeira>
              <S.ImageVectorLixeira
                source={require('@assets/img/lixeira.png')}
              />
            </S.BtnLixeira>
          </S.ViewInfoUser>
        </S.Container>
      </View>
    </S.Wrapper>
  );
};

export default SalesInpector;
