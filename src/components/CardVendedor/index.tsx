import * as S from './styles';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

type IVendedor = {
  nome: string;
  cargo: string;
  nota: number;
  idVendedor: string;
};

const CardVendedor: React.FC<IVendedor> = ({
  nome,
  cargo,
  nota,
  idVendedor,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const navigation = useNavigation();

  const handlePress = () => {
    setIsSelected(!isSelected);
    navigation.navigate('SalesInpector', { idVendedor: idVendedor });
  };
  const formattedNota =
    nota !== undefined ? nota.toFixed(1).replace('.', ',') : '';
  return (
    <S.DivWrapper selected={isSelected} onPress={handlePress}>
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

export default CardVendedor;
