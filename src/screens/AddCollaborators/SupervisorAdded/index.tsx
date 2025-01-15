import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { theme } from '@styles/default.theme';
import * as S from './styles';
import SupervisorServices from '@services/SupervisorServices';
import ManagerService from '@services/ManagerService';
import Manager from '@interfaces/Manager';
import { useToast } from 'react-native-toast-notifications';
import DropdownData from '@components/Dropdown';
import { useDataContext } from '../../../context/DataContext';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import User from '@interfaces/User';
import Supervisor from '@interfaces/Supervisor';

interface ManagerState {
  single: Manager | null;
  list: Manager[];
}

interface SupervisorAdded {
  user: User
}

const SupervisorAdded: React.FC<SupervisorAdded> = ({ user }) => {
  const [managerState, setManagerState] = useState<ManagerState>({
    single: null,
    list: [],
  });
  const { data, setData } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const toast = useToast();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const options = [
    { label: 'Mentoria', value: 'Mentoria' },
    { label: 'Visita', value: 'Visita' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.job === 'Gerente') {
          const managersData = await ManagerService.getAllManagersFromCmpany(
            user.companyId
          );
          setManagerState({ single: null, list: managersData });
        }
      } catch (error) {
        console.error('Erro ao buscar dados de supervisores:', error);
      }
    };

    fetchData();
  }, [user]);

  const handleSelectManager = (manager: Manager) => {
    setSelectedManager(manager);
    setIsButtonEnabled(true);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const managerId = selectedManager?.id || '';
      const companyId = user.companyId;

      const supervisor: Supervisor = await SupervisorServices.create({
        name,
        image,
        email,
        managerId,
        companyId,
        password,
      });

      setData({
        ...data,
        supervisor,
      });

      setName('');
      setEmail('');
      setSelectedManager(null);

      toast.show('Supervisor cadastrado com sucesso', {
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
      console.log('Erro ao criar supervisor:', error);
    } finally {
      setLoading(false);
      setIsModalVisible(false);
      setIsButtonEnabled(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isCreateDisabled = !name || !selectedManager;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
    >
      <S.Wrapper>
        <S.Main>
          <S.DivFileds>
            <S.NameField>Nome</S.NameField>
            <S.InputField
              placeholder="Nome do Supervisor"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </S.DivFileds>
          <S.DivFileds>
            <S.NameField>Email</S.NameField>
            <S.InputField
              placeholder="Email do Supervisor"
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
          </S.DivFileds>

          <S.DivFileds>
            <S.NameField>Senha</S.NameField>
            <S.DivViewTextInput>
              <S.InputField
                placeholder={'Senha'}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <S.BtnIconPass onPress={toggleShowPassword}>
                <S.Icon
                  source={
                    showPassword
                      ? require('@assets/img/olho_aberto.png')
                      : require('@assets/img/olho_fechado.png')
                  }
                />
              </S.BtnIconPass>
            </S.DivViewTextInput>
          </S.DivFileds>
          <S.DivFileds>
            <S.NameField>Responsável</S.NameField>
            <DropdownData
              managers={managerState}
              onSelectManager={handleSelectManager}
            />
          </S.DivFileds>
        </S.Main>
        <S.BtnCreateSeller
          onPress={toggleModal}
          disabled={isCreateDisabled}
          color={isCreateDisabled ? false : true}
        >
          <S.BtnCreateSellerText>Criar Supervisor</S.BtnCreateSellerText>
        </S.BtnCreateSeller>
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <S.ContentModal>
            <S.WrapperConteudo>
              <S.ImageWarning
                source={require('@assets/img/Triangle_Warning.png')}
              />
              <S.TextModal>
                Tem certeza que deseja adicionar esse Supervisor?
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
    </KeyboardAvoidingView>
  );
};

export default SupervisorAdded;
