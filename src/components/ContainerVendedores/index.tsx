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
          nota={10}
        />
        <CardVendedor
          nome="João Gallego"
          cargo="Analista de Projetos"
          nota={3.8}
        />
        <CardVendedor nome="Gilberto" cargo="CHEFE" nota={9.8} />
        <CardVendedor nome="Neymar" cargo="CHEFE" nota={6.9} />
        <CardVendedor nome="Mbappé" cargo="Uber" nota={1.2} />
        <CardVendedor nome="Allan Douglas" cargo="Gerente de RH" nota={1.2} />
        <CardVendedor nome="Allan Gomes" cargo="Economista" nota={8.2} />
      </S.Cards>
    </S.DivWrapper>
  );
};

export default ContainerVendedores;
