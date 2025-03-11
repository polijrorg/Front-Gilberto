import * as S from './styles';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '@hooks/useAuth';
import SellerServices from '@services/SellerServices';
import ISeller from '@interfaces/Seller';
import ISupervisor from '@interfaces/Supervisor';
import { View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import SupervisorServices from '@services/SupervisorServices';
import { useDataContext } from '../../context/DataContext';

const SalesInspector = ({ route }) => {
  const navigation = useNavigation();
  const { idEmployee, cargo, companyId } = route.params;
  const { data, setData } = useDataContext();

  const [seller, setSeller] = useState<ISeller | null>(null);
  const [supervisors, setSupervisors] = useState<ISupervisor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (cargo === 'Supervisor') {
        const responseSupervisor = await SupervisorServices.getSupervisorByIdCompany(companyId, idEmployee);
        setSupervisors(responseSupervisor || null);
      } else if (cargo === 'Vendedor') {
        const responseSeller = await SellerServices.getSupervisorByIdCompany(companyId, idEmployee);
        setSeller(responseSeller || null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [cargo, companyId, idEmployee]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (cargo === 'Supervisor' && supervisors) {
        await SupervisorServices.delete(supervisors.id);
      } else if (cargo === 'Vendedor' && seller) {
        await SellerServices.delete(seller.id);
      }
      setData((prev: any) => ({ ...prev, seller }));
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#0000ff" />
      </View>
    );
  }

  return (
    <S.Wrapper>
      <S.DivButtonBack>
        <S.ButtonBack onPress={handleGoBack}>
          <S.ImageBtn source={require('@assets/img/myteam/back.png')} />
        </S.ButtonBack>
      </S.DivButtonBack>
      <S.Container>
        <S.ViewInfoUser>
          <S.ImageUser source={require('@assets/img/cardVendedor/foto.png')} />
          <S.InfoUser>
            <S.Title>{seller?.name || supervisors?.name || 'Usuário'}</S.Title>
            <S.Loja>{seller?.stage || supervisors?.job || 'Estágio'}</S.Loja>
            <S.Funcao>{seller?.email || supervisors?.email || 'user123@gmail.com'}</S.Funcao>
          </S.InfoUser>
          <S.BtnLixeira onPress={toggleModal}>
            <S.ImageVectorLixeira source={require('@assets/img/lixeira.png')} />
          </S.BtnLixeira>
        </S.ViewInfoUser>
      </S.Container>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <S.ContentModal>
          <S.WrapperConteudo>
            <S.ImageWarning source={require('@assets/img/warnnign.png')} />
            <S.TextModal>Tem certeza que deseja excluir esse {cargo}?</S.TextModal>
          </S.WrapperConteudo>
          <S.BtnYes onPress={handleDelete} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <S.TitleBtnYes>Sim</S.TitleBtnYes>}
          </S.BtnYes>
          <S.BtnBack onPress={toggleModal}>
            <S.TitleBtnBack>Voltar</S.TitleBtnBack>
          </S.BtnBack>
        </S.ContentModal>
      </Modal>
    </S.Wrapper>
  );
};

export default SalesInspector;
