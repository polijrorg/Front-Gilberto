import * as S from './styles';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import ContainerCards from '@components/ContainerCards';
import DivGradient from '@components/DivGradient';
import { useNavigation } from '@react-navigation/native';

const MyTeam = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const handlePressBack = () => {
    navigation.goBack();
  };

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
        <ContainerCards title="Meus Vendedores" search={search} />
      </S.Wrapper>
      <DivGradient />
    </S.WrapperTela>
  );
};

export default MyTeam;
