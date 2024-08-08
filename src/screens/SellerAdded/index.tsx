import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { theme } from '@styles/default.theme';
import * as S from './styles';
import SupervisorServices from '@services/SupervisorServices';
import useAuth from '@hooks/useAuth';
import ISupervisor from '@interfaces/Supervisor';
import SellerService from '@services/SellerServices';
import { useToast } from 'react-native-toast-notifications';
import HeaderPages from '@components/HeaderPages';
import DropdownData from '@components/Dropdown';
import { useDataContext } from '../../context/DataContext';
import ISeller from '@interfaces/Seller';
import { ActivityIndicator } from 'react-native';
import StateSelect from '@components/Select';

interface SupervisorState {
  single: ISupervisor | null;
  list: ISupervisor[];
}

const SellerAdded: React.FC = () => {
  const [supervisorState, setSupervisorState] = useState<SupervisorState>({
    single: null,
    list: [],
  });
  const { data, setData } = useDataContext();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] =
    useState<ISupervisor | null>(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const toast = useToast();
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const options = [
    { label: 'Mentoria', value: 'Mentoria' },
    { label: 'Visita', value: 'Visita' },
  ];

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
  }, [user]);

  const handleSelectSupervisor = (supervisor: ISupervisor) => {
    setSelectedSupervisor(supervisor);
    setIsButtonEnabled(true);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const supervisorId = selectedSupervisor?.id || undefined;
      const companyId = user.companyId;

      const seller: ISeller = await SellerService.createSeller({
        name,
        image,
        email,
        supervisorId,
        companyId,
        stage: selectedValue,
      });

      setData({
        ...data,
        seller,
      });

      setName('');
      setEmail('');
      setSelectedSupervisor(null);

      toast.show('Vendedor cadastrado com sucesso', {
        type: 'success',
        placement: 'bottom',
        duration: 3000,
        animationType: 'zoom-in',
      });
    } catch (error) {
      toast.show('Alguns dados podem estar incorretos', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        animationType: 'zoom-in',
      });
    } finally {
      setLoading(false);
      setIsModalVisible(false);
      setIsButtonEnabled(false);
    }
  };

  const isCreateDisabled = !name || !selectedValue || !selectedSupervisor;

  return (
    <>
      <StatusBar backgroundColor="#3E63DD" style="light" />
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
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
          </S.DivFileds>
          <S.DivFileds>
            <S.NameField>Responsável</S.NameField>
            <DropdownData
              supervisors={supervisorState}
              onSelectSupervisor={handleSelectSupervisor}
            />
          </S.DivFileds>
          <S.DivFileds>
            <S.NameField>Estágio</S.NameField>
            <StateSelect options={options} onChange={handleSelectChange} />
          </S.DivFileds>
        </S.Main>
        <S.BtnCreateSeller
          onPress={toggleModal}
          disabled={isCreateDisabled}
          color={isCreateDisabled ? false : true}
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
              {loading ? (
                <ActivityIndicator color={theme.colors.primary.main} />
              ) : (
                <S.TitleBtnYes>ADICIONAR</S.TitleBtnYes>
              )}
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
