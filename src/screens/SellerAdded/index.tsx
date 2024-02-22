import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import * as S from './styles';
import { FontAwesome } from '@expo/vector-icons';
import SupervisorServices from '@services/SupervisorServices';
import useAuth from '@hooks/useAuth';
import ISupervisor from '@interfaces/Supervisor';

const SupervisorDropdown = ({ supervisors, onSelectSupervisor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState<ISupervisor>();

  const handleSelectSupervisor = (supervisor: ISupervisor) => {
    setSelectedSupervisor(supervisor);
    onSelectSupervisor(supervisor);
    setIsOpen(false);
  };

  return (
    <View>
      <S.DivFileds>
        <S.NameField>Supervisor Responsável</S.NameField>
        <S.CustomDropdown isOpen={isOpen} setIsOpen={setIsOpen}>
          <S.DropDownButton onPress={() => setIsOpen(!isOpen)}>
            <S.Selected>
              {selectedSupervisor?.name
                ? selectedSupervisor?.name
                : 'Selecione o supervisor...'}
            </S.Selected>
            <FontAwesome
              name={isOpen ? 'caret-up' : 'caret-down'}
              size={20}
              color="#687076"
            />
          </S.DropDownButton>
          {isOpen && (
            <S.DropdownList>
              {supervisors.map((supervisor, index) => (
                <S.DropdownItem
                  key={index}
                  onPress={() => handleSelectSupervisor(supervisor)}
                >
                  <S.Selected>{supervisor.name}</S.Selected>
                </S.DropdownItem>
              ))}
            </S.DropdownList>
          )}
        </S.CustomDropdown>
      </S.DivFileds>
    </View>
  );
};

const SellerAdded = () => {
  const { user } = useAuth();
  const [supervisors, setSupervisors] = useState<ISupervisor[]>();

  const navigation = useNavigation();

  const handlePressBack = () => {
    navigation.goBack();
  };

  const handleSelectSupervisor = (supervisor) => {
    console.log('Supervisor selecionado:', supervisor);
  };

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

    fetchData();
  }, [user.id]);

  return (
    <S.Wrapper>
      <StatusBar style="light" />
      <S.Header>
        <S.TitleHeader>Adicionar Vendedor</S.TitleHeader>
        <S.BtnBack onPress={handlePressBack}>
          <S.ImageHeader source={require('@assets/img/myteam/back.png')} />
        </S.BtnBack>
      </S.Header>
      <S.Main>
        <S.DivFileds>
          <S.NameField>Nome</S.NameField>
          <S.InputField placeholder="Nome do Vendedor" />
        </S.DivFileds>
        <S.DivFileds>
          <SupervisorDropdown
            supervisors={supervisors}
            onSelectSupervisor={handleSelectSupervisor}
          />
        </S.DivFileds>
      </S.Main>
    </S.Wrapper>
  );
};

export { SellerAdded };
