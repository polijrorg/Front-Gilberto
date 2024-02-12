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
        const sellersData = await SupervisorServices.getAllSellerInSupervisor();
        console.log(sellersData);
        if (sellersData && sellersData.sellers) {
          setSellers(sellersData.sellers);
        } else {
          console.error(
            'Dados de vendedores ausentes ou inválidos:',
            sellersData
          );
        }
      } catch (error) {
        console.error('Erro ao obter vendedores:', error);
      }
    };

    fetchSellers();
  }, []);

  const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  let filteredVendedores = sellers;

  if (user.name) {
    const searchTerm = removeAccents(user.name.toLowerCase());
    filteredVendedores = sellers.filter((vendedor) =>
      removeAccents(vendedor.name.toLowerCase()).includes(searchTerm)
    );
  }
  return (
    <S.DivWrapper>
      <S.TitleSlider>{title || 'Vendedores'}</S.TitleSlider>
      <S.Cards>
        {filteredVendedores.map((vendedor, index) => (
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
