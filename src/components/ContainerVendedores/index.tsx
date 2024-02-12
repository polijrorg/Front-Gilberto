import CardVendedor from '@components/CardVendedor';
import * as S from './styles';
import React from 'react';
import ISeller from '@interfaces/Seller';

type IContianer = {
  title?: string;
  search?: string;
  sellers: ISeller[];
};

const ContainerVendedores: React.FC<IContianer> = ({
  title,
  search,
  sellers,
}) => {
  const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  let filteredSeller = sellers;

  if (search) {
    const searchTerm = removeAccents(search.toLowerCase());
    filteredSeller = sellers.filter((vendedor) =>
      removeAccents(vendedor.name.toLowerCase()).includes(searchTerm)
    );
  }

  return (
    <S.DivWrapper>
      <S.TitleSlider>{title || 'Vendedores'}</S.TitleSlider>
      <S.Cards>
        {filteredSeller.map((seller, index) => {
          // Divide o nome do vendedor em partes
          const parts = seller.name.split(' ');
          // Se houver mais de um nome, use apenas o primeiro nome
          const firstName = parts.length > 1 ? parts[0] : seller.name;
          // Se houver mais de um nome, use apenas o último nome
          const lastName = parts.length > 1 ? parts[parts.length - 1] : '';
          return (
            <CardVendedor
              key={index}
              nome={`${firstName} ${lastName}`}
              cargo={'Supervisor: ' + seller.supervisorId}
              nota={3.2}
            />
          );
        })}
      </S.Cards>
    </S.DivWrapper>
  );
};

export default ContainerVendedores;
