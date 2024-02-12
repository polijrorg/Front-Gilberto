import * as S from './styles';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import ContainerVendedores from '@components/ContainerVendedores';
import DivGradient from '@components/DivGradient';
import { useNavigation } from '@react-navigation/native';
import useAuth from '@hooks/useAuth';

const MyTeam = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const { user } = useAuth();

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
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <S.ButtonLupa>
            <S.Lupa source={require('@assets/img/myteam/lupa.png')} />
          </S.ButtonLupa>
        </S.DivContainerInput>
        <ContainerVendedores title="Meus Vendedores" user={user} />
      </S.Wrapper>
      <DivGradient />
    </S.WrapperTela>
  );
};

export default MyTeam;
