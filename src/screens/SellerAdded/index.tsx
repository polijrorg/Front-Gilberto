import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import * as S from './styles';
import { FontAwesome } from '@expo/vector-icons';
import SupervisorServices from '@services/SupervisorServices';
import useAuth from '@hooks/useAuth';
import ISupervisor from '@interfaces/Supervisor';
import SellerService from '@services/SellerServices';

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
  const [supervisors, setSupervisors] = useState<ISupervisor[]>([]);
  const { user } = useAuth();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = React.useState('');
  const [selectedSupervisor, setSelectedSupervisor] =
    useState<ISupervisor | null>(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const navigation = useNavigation();

  const handlePressBack = () => {
    navigation.goBack();
  };
  const isCreateDisabled = !name;

  const handleSelectSupervisor = (supervisor: ISupervisor) => {
    setSelectedSupervisor(supervisor);
    setIsButtonEnabled(true);
    console.log('Supervisor selecionado:', supervisor);
  };

  const handleCreateSeller = async () => {
    try {
      const supervisorId = selectedSupervisor?.id;
      const companyId = user.companyId;
      await SellerService.createSeller({
        name,
        image,
        email,
        supervisorId,
        companyId,
      });
      setName('');
      setEmail('');
      setSelectedSupervisor(null);
      setIsButtonEnabled(false);
    } catch (error) {
      console.error('Erro ao criar vendedor:', error.message);
    }
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
          <S.InputField
            placeholder="Nome do Vendedor"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </S.DivFileds>
        <S.DivFileds>
          <S.NameField>Email</S.NameField>
          <S.InputField
            placeholder="Email do Vendedor"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </S.DivFileds>
        <S.DivFileds>
          <SupervisorDropdown
            supervisors={supervisors}
            onSelectSupervisor={handleSelectSupervisor}
          />
        </S.DivFileds>
      </S.Main>
      <S.BtnCreateSeller
        onPress={handleCreateSeller}
        disabled={!isButtonEnabled}
        color={!isButtonEnabled && isCreateDisabled}
      >
        <S.BtnCreateSellerText>Criar Vendedor</S.BtnCreateSellerText>
      </S.BtnCreateSeller>
    </S.Wrapper>
  );
};

export { SellerAdded };
