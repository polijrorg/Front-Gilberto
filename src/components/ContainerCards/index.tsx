import Card from '@components/Cards';
import * as S from './styles';
import React, { useEffect, useState } from 'react';
import ISupervisor from '@interfaces/Supervisor';
import ISeller from '@interfaces/Seller';
import SupervisorServices from '@services/SupervisorServices';
import useAuth from '@hooks/useAuth';

type IContianer = {
  title?: string;
  search?: string;
  sellers?: ISeller[];
};

const ContainerCards: React.FC<IContianer> = ({ title, search, sellers }) => {
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
        } else {
          console.error('Resposta vazia');
        }
      } catch (error) {
        console.error('Erro ao obter supervisor:', error);
      }
    };

    fetchSupervisor();
  }, [supervisor, user.companyId, user.id]);

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
          if (seller) {
            const fullName = seller.name || 'Usuário';

            const nameParts = fullName.split(' ');

            let displayName = '';
            if (nameParts.length > 1) {
              const firstName = nameParts[0];
              const lastName = nameParts[nameParts.length - 1];
              displayName = `${firstName} ${lastName}`;
            } else {
              displayName = fullName;
            }

            return (
              <Card
                key={index}
                idVendedor={seller.id}
                nome={displayName}
                cargo={`${supervisor?.job}: ${supervisor?.name || 'Cargo'}`}
                nota={3.2}
              />
            );
          } else {
            return <></>;
          }
        })}
      </S.Cards>
    </S.DivWrapper>
  );
};

export default ContainerCards;
