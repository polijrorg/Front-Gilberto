import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import * as S from './styles';
import { FontAwesome } from '@expo/vector-icons';
import SupervisorServices from '@services/SupervisorServices';
import useAuth from '@hooks/useAuth';
import ISupervisor from '@interfaces/Supervisor';
import SellerService from '@services/SellerServices';
import { useToast } from 'react-native-toast-notifications';
import HeaderPages from '@components/HeaderPages';

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
              {supervisors && supervisors.list.length > 0 ? (
                supervisors.list.map((supervisor, index) => (
                  <S.DropdownItem
                    key={index}
                    onPress={() => handleSelectSupervisor(supervisor)}
                  >
                    <S.Selected>{supervisor.name}</S.Selected>
                  </S.DropdownItem>
                ))
              ) : (
                <S.DropdownItem
                  onPress={() => handleSelectSupervisor(supervisors?.single)}
                >
                  <S.Selected>{supervisors?.single?.name}</S.Selected>
                </S.DropdownItem>
              )}
            </S.DropdownList>
          )}
        </S.CustomDropdown>
      </S.DivFileds>
    </View>
  );
};

interface SupervisorState {
  single: ISupervisor | null;
  list: ISupervisor[];
}

const SellerAdded = () => {
  const [supervisorState, setSupervisorState] = useState<SupervisorState>({
    single: null,
    list: [],
  });
  const { user } = useAuth();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = React.useState('');
  const [selectedSupervisor, setSelectedSupervisor] =
    useState<ISupervisor | null>(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const toast = useToast();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isCreateDisabled = !name;

  const handleSelectSupervisor = (supervisor: ISupervisor) => {
    setSelectedSupervisor(supervisor);
    setIsButtonEnabled(true);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCreate = async () => {
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
      setIsModalVisible(false);

      toast.show('Vendedor cadastrado com sucesso', {
        type: 'success',
        placement: 'bottom',
        duration: 3000,
        animationType: 'zoom-in',
      });
    } catch (error) {
      console.error('Erro ao criar vendedor:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.job === 'Gerente') {
          const supervisorsData =
            await SupervisorServices.getAllSupervisorsFromManager(user.id);
          setSupervisorState({ single: null, list: supervisorsData });
        } else if (user.job === 'Supervisor') {
          const supervisorData = await SupervisorServices.getSupervisorById(
            user.id,
            user.managerId
          );
          setSupervisorState({ single: supervisorData, list: [] });
        }
      } catch (error) {
        console.error('Erro ao buscar dados de supervisores:', error);
      }
    };

    fetchData();
  }, [user, user.id]);

  return (
    <>
      <StatusBar />
      <S.Wrapper>
        <HeaderPages title="Adicionar Vendedor" />
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
              keyboardType={'email-address'}
              onChangeText={(text) => setEmail(text)}
            />
          </S.DivFileds>
          <S.DivFileds>
            <SupervisorDropdown
              supervisors={supervisorState}
              onSelectSupervisor={handleSelectSupervisor}
            />
          </S.DivFileds>
        </S.Main>
        <S.BtnCreateSeller
          onPress={toggleModal}
          disabled={!isButtonEnabled}
          color={!isButtonEnabled && isCreateDisabled}
        >
          <S.BtnCreateSellerText>Criar Vendedor</S.BtnCreateSellerText>
        </S.BtnCreateSeller>
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <S.ContentModal>
            <S.WrapperConteudo>
              <S.ImageWarning
                source={require('@assets/img/Triangle_Warning.png')}
              />
              <S.TextModal>
                Tem certeza que deseja adicionar esse vendedor?
              </S.TextModal>
            </S.WrapperConteudo>
            <S.BtnYes onPress={handleCreate}>
              <S.TitleBtnYes>ADICIONAR</S.TitleBtnYes>
            </S.BtnYes>
            <S.BtnBackModal onPress={toggleModal}>
              <S.TitleBtnBack>Voltar</S.TitleBtnBack>
            </S.BtnBackModal>
          </S.ContentModal>
        </Modal>
      </S.Wrapper>
    </>
  );
};

export { SellerAdded };
