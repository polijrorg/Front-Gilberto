import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import DivGradient from '@components/DivGradient';
import { useNavigation } from '@react-navigation/native';
import HeaderSalesInspector from '@components/HeaderSalesInspector';
import useAuth from '@hooks/useAuth';
import SupervisorServices from '@services/SupervisorServices';
import ISeller from '@interfaces/Seller';

const SalesInpector = ({ route }) => {
  const navigation = useNavigation();
  const { idVendedor } = route.params;
  const { user } = useAuth();
  const [sellers, setSellers] = useState<ISeller>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SupervisorServices.getSellerById(
          user.id,
          idVendedor
        );
        setSellers(response as ISeller);
      } catch (error) {
        console.error('Erro ao buscar vendedores:', error);
      }
    };

    fetchData();
  }, [idVendedor, user.id]);

  const handleGoBack = () => {
    navigation.goBack();
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
        <HeaderSalesInspector sellers={sellers} />
      </S.Wrapper>
      <DivGradient />
    </S.WrapperTela>
  );
};

export default SalesInpector;
