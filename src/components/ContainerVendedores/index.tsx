import CardVendedor from '@components/CardVendedor';
import * as S from './styles';
import React, { useEffect, useState } from 'react';
import ISupervisor from '@interfaces/Supervisor';
import ISeller from '@interfaces/Seller';
import SupervisorServices from '@services/SupervisorServices';
import useAuth from '@hooks/useAuth';

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
  const { user } = useAuth();
  const [supervisor, setSupervisor] = useState<ISupervisor>();

  useEffect(() => {
    const fetchSupervisor = async () => {
      try {
        const supervisorLogged = await SupervisorServices.getSupervisorById(
          user.id,
          user.companyId
        );
        if (supervisorLogged) {
          setSupervisor(supervisorLogged);
          console.log(supervisorLogged.name);
        } else {
          console.error('Resposta vazia');
        }
      } catch (error) {
        console.error('Erro ao obter supervisor:', error);
      }
    };

    fetchSupervisor();
  }, [user.companyId, user.id]);

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
          const parts = seller.name.split(' ');
          const firstName = parts.length > 1 ? parts[0] : seller.name;
          const lastName = parts.length > 1 ? parts[parts.length - 1] : '';

          return (
            <CardVendedor
              key={index}
              idVendedor={seller.id}
              nome={`${firstName} ${lastName}`}
              cargo={`Supervisor: ${supervisor.name}`}
              nota={3.2}
            />
          );
        })}
      </S.Cards>
    </S.DivWrapper>
  );
};

export default ContainerVendedores;
