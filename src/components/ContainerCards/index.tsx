/* eslint-disable react-native/no-inline-styles */

import Card from '@components/Cards';
import * as S from './styles';
import React, { useEffect, useState } from 'react';
import ISeller from '@interfaces/Seller';
import ISupervisor from '@interfaces/Supervisor';
import useAuth from '@hooks/useAuth';
import SupervisorServices from '@services/SupervisorServices';
import { View, Text } from 'react-native';

type IContainer = {
  title?: string;
  search?: string;
};

const ContainerCards: React.FC<IContainer> = ({ title, search }) => {
  const { user } = useAuth();
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [supervisors, setSupervisors] = useState<ISupervisor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.job === 'Supervisor') {
          const sellersData =
            await SupervisorServices.getAllSellerInSupervisorById(user.id);
          setSellers(sellersData);
        } else if (user.job === 'Gerente') {
          const supervisorsData =
            await SupervisorServices.getAllSupervisorsFromManager(user.id);
          setSupervisors(supervisorsData);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [user.id, user.job]);

  let dataToShow: (ISeller | ISupervisor)[] = [];
  if (user.job === 'Supervisor') {
    dataToShow = sellers;
  } else if (user.job === 'Gerente') {
    dataToShow = supervisors;
  }

  let filteredData = dataToShow;

  const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  if (search) {
    const searchTerm = removeAccents(search.toLowerCase());
    filteredData = dataToShow.filter((item) =>
      removeAccents(item.name.toLowerCase()).includes(searchTerm)
    );
  }

  return (
    <S.DivWrapper>
      <S.TitleSlider>{title || 'Vendedores'}</S.TitleSlider>
      <S.Cards>
        {filteredData.length > 0 ? (
          filteredData.map((data, index) => {
            const fullName = data.name || 'Usuário';
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
                id={data.id}
                nome={displayName}
                cargo={`Cargo: ${data.job || 'Gerente'}`}
                nota={3.2} // Ajuste isso para obter a nota correta de cada tipo de dados (supervisor ou vendedor)
              />
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 24,
            }}
          >
            <Text style={{ textTransform: 'uppercase', fontFamily: 'Poppins' }}>
              Não há nada cadastrado
            </Text>
          </View>
        )}
      </S.Cards>
    </S.DivWrapper>
  );
};

export default ContainerCards;
