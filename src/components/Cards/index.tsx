import * as S from './styles';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

type IVendedor = {
  nome: string;
  cargo: string;
  nota: number;
  id: string;
};

const Cards: React.FC<IVendedor> = ({ nome, cargo, nota, id }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('SalesInspector', { idVendedor: id });
  };
  const formattedNota =
    nota !== undefined ? nota.toFixed(1).replace('.', ',') : '';
  return (
    <S.DivWrapper onPress={handlePress}>
      <S.DivImage>
        <S.ImageVendedor
          source={require('@assets/img/cardVendedor/foto.png')}
        />
      </S.DivImage>
      <S.DivText>
        <S.Name>{nome}</S.Name>
        <S.Cargo>{cargo}</S.Cargo>
      </S.DivText>
      <S.DivAvalia nota={nota}>
        <S.Nota nota={nota}>{formattedNota}</S.Nota>
      </S.DivAvalia>
    </S.DivWrapper>
  );
};

export default Cards;