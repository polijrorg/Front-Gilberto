import * as S from './styles';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SellersContainer,
  SupervisorsContainer,
} from '@components/ContainerCards';
import DivGradient from '@components/DivGradient';
import { useNavigation } from '@react-navigation/native';
import useAuth from '@hooks/useAuth';
import HeaderPages from '@components/HeaderPages';

const MyTeam = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const handlePressAddedSeller = () => {
    navigation.navigate('SellerAdded' as never);
  };

  return (
    <S.WrapperTela>
      <StatusBar backgroundColor="#3E63DD" style="light" />
      <S.Wrapper>
        <HeaderPages title="Minha Equipe" />
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
        {user.job === 'Gerente' ? (
          <>
            <SupervisorsContainer search={search} />
            <SellersContainer search={search} />
          </>
        ) : (
          <SellersContainer search={search} />
        )}
      </S.Wrapper>
      <S.BtnAddColaborador onPress={handlePressAddedSeller}>
        <S.TextBtn>Adicionar COLABORADOres</S.TextBtn>
      </S.BtnAddColaborador>

      <DivGradient />
    </S.WrapperTela>
  );
};

export default MyTeam;
