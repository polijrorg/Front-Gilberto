import CardVendedor from '@components/CardVendedor';
import * as S from './styles';
import React from 'react';

type IContianer = {
  title?: string;
  vendedorName?: string;
};

const ContainerVendedores: React.FC<IContianer> = ({ title, vendedorName }) => {
  const vendedores = [
    { nome: 'Thiago D. Velasquez', cargo: 'Coordenador', nota: 4.8 },
    { nome: 'Pedro Gomes', cargo: 'Analista de Projetos', nota: 3.8 },
    { nome: 'João Gallego', cargo: 'Analista de Projetos', nota: 2.8 },
    { nome: 'Gilberto', cargo: 'CHEFE', nota: 5.0 },
    { nome: 'Neymar', cargo: 'Futebolista', nota: 1.3 },
    { nome: 'Mbappé', cargo: 'Uber', nota: 3.4 },
    { nome: 'Pedro Souza', cargo: 'Frentista', nota: 3.7 },
    { nome: 'Matheuszin', cargo: 'Pegador', nota: 5.0 },
  ];

  //Deixa Otimizado para o Usuário n precisar digitar acentos
  const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  let filteredVendedores = vendedores;

  if (vendedorName && vendedorName.trim() !== '') {
    const searchTerm = removeAccents(vendedorName.toLowerCase());
    filteredVendedores = vendedores.filter((vendedor) =>
      removeAccents(vendedor.nome.toLowerCase()).includes(searchTerm)
    );
  }

  return (
    <S.DivWrapper>
      <S.TitleSlider>{title || 'Vendedores'}</S.TitleSlider>
      <S.Cards>
        {filteredVendedores.map((vendedor, index) => (
          <CardVendedor
            key={index}
            nome={vendedor.nome}
            cargo={vendedor.cargo}
            nota={vendedor.nota}
          />
        ))}
      </S.Cards>
    </S.DivWrapper>
  );
};

export default ContainerVendedores;
