import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import ContainerVendedores from '@components/ContainerVendedores';
import DivGradient from '@components/DivGradient';
import { useNavigation } from '@react-navigation/native';
import useAuth from '@hooks/useAuth';
import SupervisorServices from '@services/SupervisorServices';
import ISeller from '@interfaces/Seller';

const MyTeam = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [sellers, setSellers] = useState<ISeller[]>([]);

  const { user } = useAuth();

  const handlePressBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const sellersData =
          await SupervisorServices.getAllSellerInSupervisorById(user.id);
        console.log(sellersData);
        setSellers(sellersData as ISeller[]);
      } catch (error) {
        console.error('Erro ao obter vendedores:', error);
      }
    };

    fetchSellers();
  }, [user.id]);

  return (
    <S.WrapperTela>
      <StatusBar style="dark" />
      <S.Wrapper>
        <S.Header>
          <S.TextWithBorder>
            <S.TextMyTeam>Minha Equipe</S.TextMyTeam>
          </S.TextWithBorder>
          <S.ButtonBack onPress={handlePressBack}>
            <S.BackImage source={require('@assets/img/myteam/back.png')} />
          </S.ButtonBack>
        </S.Header>
        <S.DivContainerInput>
          <S.InputVendedor
            placeholder={'Pesquisar'}
            keyboardType={'default'}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <S.ButtonLupa>
            <S.Lupa source={require('@assets/img/myteam/lupa.png')} />
          </S.ButtonLupa>
        </S.DivContainerInput>
        <ContainerVendedores
          title="Meus Vendedores"
          search={search}
          sellers={sellers}
        />
      </S.Wrapper>
      <DivGradient />
    </S.WrapperTela>
  );
};

export default MyTeam;
