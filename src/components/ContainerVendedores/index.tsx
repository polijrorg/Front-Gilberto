import CardVendedor from '@components/CardVendedor';
import * as S from './styles';
import React from 'react';

const ContainerVendedores: React.FC = () => {
  return (
    <S.DivWrapper>
      <S.TitleSlider>Vendedores</S.TitleSlider>
      <S.Cards>
        <CardVendedor
          nome="Thiago D. Velasquez"
          cargo="Coordenador"
          nota={4.8}
        />
        <CardVendedor
          nome="Pedro Gomes"
          cargo="Analista de Projetos"
          nota={3.8}
        />
        <CardVendedor
          nome="João Gallego"
          cargo="Analista de Projetos"
          nota={2.8}
        />
        <CardVendedor nome="Gilberto" cargo="CHEFE" nota={5.0} />
        <CardVendedor nome="Neymar" cargo="Futebolista" nota={1.3} />
        <CardVendedor nome="Mbappé" cargo="Uber" nota={3.4} />
      </S.Cards>
    </S.DivWrapper>
  );
};

export default ContainerVendedores;
