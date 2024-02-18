import Card from '@components/Cards';
import * as S from './styles';
import React, { useEffect, useState } from 'react';
import ISeller from '@interfaces/Seller';
import useAuth from '@hooks/useAuth';
import SupervisorServices from '@services/SupervisorServices';

type IContianer = {
  title?: string;
  search?: string;
};

const ContainerCards: React.FC<IContianer> = ({ title, search }) => {
  const { user } = useAuth();
  const [sellers, setSellers] = useState<ISeller[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      if (user.job === 'Supervisor') {
        const sellersData =
          await SupervisorServices.getAllSellerInSupervisorById(user.id);
        setSellers(sellersData as ISeller[]);
      }
    };

    fetchCards();
  }, [user.id, user.job]);

  let filteredSeller = sellers;

  const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

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
                id={seller.id}
                nome={displayName}
                cargo={`${user.job}: ${user.name || 'Cargo'}`}
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
