import CardVendedor from '@components/CardVendedor';
import * as S from './styles';
import React, { useEffect, useState } from 'react';
import IUser from '@interfaces/User';
import SupervisorServices from '@services/SupervisorServices';
import ISeller from '@interfaces/Seller';

type IContianer = {
  user: IUser;
  title?: string;
};

const ContainerVendedores: React.FC<IContianer> = ({ user, title }) => {
  const [sellers, setSellers] = useState<ISeller[]>([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const sellersData =
          await SupervisorServices.getAllSellerInSupervisorById(user.id);
        console.log(sellersData);
        setSellers(sellersData as ISeller[]);
      } catch (error) {
        console.error('Erro ao obter vendedores:', error);
      }
    };

    fetchSellers();
  }, [user.id]);

  return (
    <S.DivWrapper>
      <S.TitleSlider>{title || 'Vendedores'}</S.TitleSlider>
      <S.Cards>
        {sellers.map((vendedor, index) => (
          <CardVendedor
            key={index}
            nome={vendedor.name}
            cargo={'Supervisor: ' + vendedor.supervisorId}
            nota={3.2}
          />
        ))}
      </S.Cards>
    </S.DivWrapper>
  );
};

export default ContainerVendedores;
