/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import DivGradient from '@components/DivGradient';
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
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SellerServices.getSellerById(
          user.id,
          idVendedor
        );

        if (response) {
          setSeller(response);
          console.log(response.name);
        } else {
          console.error('Resposta vazia');
        }
      } catch (error) {
        console.error('Erro ao buscar vendedor:', error);
      }
    };

    fetchData();
  }, [reload]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePress = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <S.WrapperTela>
      <StatusBar style="dark" />
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
              {seller && (
                <S.InfoUser>
                  <S.Title>{seller.name}</S.Title>
                  <S.Loja>{seller.companyId}</S.Loja>
                  <S.Funcao>{seller.email}</S.Funcao>
                </S.InfoUser>
              )}

              <S.BtnLixeira>
                <S.ImageVectorLixeira
                  source={require('@assets/img/lixeira.png')}
                />
              </S.BtnLixeira>
            </S.ViewInfoUser>
            <S.Menu>
              <S.ButtonItem
                isSelected={selectedItem === 'mentoria'}
                onPress={() => handlePress('mentoria')}
              >
                <S.TextItem>Mentoria</S.TextItem>
              </S.ButtonItem>

              <S.ButtonItem
                isSelected={selectedItem === 'visita'}
                onPress={() => handlePress('visita')}
              >
                <S.TextItem>Visita</S.TextItem>
              </S.ButtonItem>

              <S.ButtonItem
                isSelected={selectedItem === 'planos'}
                onPress={() => handlePress('planos')}
              >
                <S.TextItem>Planos de ação</S.TextItem>
              </S.ButtonItem>
            </S.Menu>
          </S.Container>
        </View>
      </S.Wrapper>
      <DivGradient />
    </S.WrapperTela>
  );
};

export default SalesInpector;
