import * as S from './styles';
import React, { useState } from 'react';

type IVendedor = {
  nome: string;
  cargo: string;
  nota: number;
};

const CardVendedor: React.FC<IVendedor> = ({ nome, cargo, nota }) => {
  const [isSelected, setIsSelected] = useState(false);
  const handlePress = () => {
    setIsSelected(!isSelected);
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
