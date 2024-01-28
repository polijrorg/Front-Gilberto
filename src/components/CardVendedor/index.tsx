import * as S from './styles';
import React, { useState } from 'react';

type IVendedor = {
  nome: string;
  cargo: string;
  nota?: number;
};

const CardVendedor: React.FC<IVendedor> = ({ nome, cargo, nota }) => {
  const [isSelected, setIsSelected] = useState(false);
  const handlePress = () => {
    setIsSelected(!isSelected);
  };
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
      <S.DivAvalia>
        <S.Nota>{nota}</S.Nota>
      </S.DivAvalia>
    </S.DivWrapper>
  );
};

export default CardVendedor;
