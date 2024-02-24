/* eslint-disable react-native/no-inline-styles */

import Card from '@components/Cards';
import * as S from './styles';
import React, { useEffect, useState } from 'react';
import ISeller from '@interfaces/Seller';
import ISupervisor from '@interfaces/Supervisor';
import useAuth from '@hooks/useAuth';
import SupervisorServices from '@services/SupervisorServices';
import { View, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

type IContainer = {
  search?: string;
};

/*IMPORTANTE: AQUI EU FIZ UM CONTAINER PARA VENDEDORES E PARA SUPERVISORES */

const SellersContainer: React.FC<IContainer> = ({ search }) => {
  const { user } = useAuth();
  const [sellers, setSellers] = useState<ISeller[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellersData =
          await SupervisorServices.getAllSellerInSupervisorById(user.id);
        setSellers(sellersData);
      } catch (error) {
        console.error('Erro ao buscar dados de vendedores:', error);
      }
    };

    if (isFocused) {
      fetchData();
    }
  }, [user.id, isFocused]);

  let filteredSellers: ISeller[] = sellers;

  const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  if (search) {
    const searchTerm = removeAccents(search.toLowerCase());
    filteredSellers = sellers.filter((seller) =>
      removeAccents(seller.name.toLowerCase()).includes(searchTerm)
    );
  }

  return (
    <S.DivWrapper>
      <S.TitleSlider>{'Vendedores'}</S.TitleSlider>
      <S.Cards>
        {filteredSellers.length > 0 ? (
          filteredSellers.map((seller, index) => {
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
                cargo={`Cargo: ${seller.job || 'Vendedor'}`}
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
              Não há vendedores cadastrados
            </Text>
          </View>
        )}
      </S.Cards>
    </S.DivWrapper>
  );
};

const SupervisorsContainer: React.FC<IContainer> = ({ search }) => {
  const { user } = useAuth();
  const isFocused = useIsFocused();
  const [supervisors, setSupervisors] = useState<ISupervisor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supervisorsData =
          await SupervisorServices.getAllSupervisorsFromManager(user.id);
        setSupervisors(supervisorsData);
      } catch (error) {
        console.error('Erro ao buscar dados de supervisores:', error);
      }
    };

    if (isFocused) {
      fetchData();
    }
  }, [user.id, isFocused]);

  let filteredSupervisors: ISupervisor[] = supervisors;

  const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  if (search) {
    const searchTerm = removeAccents(search.toLowerCase());
    filteredSupervisors = supervisors.filter((supervisor) =>
      removeAccents(supervisor.name.toLowerCase()).includes(searchTerm)
    );
  }

  return (
    <S.DivWrapper>
      <S.TitleSlider>{'Supervisores'}</S.TitleSlider>
      <S.Cards>
        {filteredSupervisors.length > 0 ? (
          filteredSupervisors.map((supervisor, index) => {
            const fullName = supervisor.name || 'Usuário';
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
                id={supervisor.id}
                nome={displayName}
                cargo={`Cargo: ${supervisor.job || 'Supervisor'}`}
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
              Não há supervisores cadastrados
            </Text>
          </View>
        )}
      </S.Cards>
    </S.DivWrapper>
  );
};

export { SellersContainer, SupervisorsContainer };
