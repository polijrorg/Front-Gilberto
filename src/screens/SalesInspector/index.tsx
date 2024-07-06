import * as S from './styles';
import React, { useEffect, useState } from 'react';
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
  const { user } = useAuth();
  const { data, setData } = useDataContext();
  const [seller, setSeller] = useState<ISeller | null>(null);
  const [supervisors, setSupervisors] = useState<ISupervisor | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cargo === 'Supervisor') {
          const responseSupervisor =
            await SupervisorServices.getSupervisorByIdCompany(
              companyId,
              idEmployee
            );
          setSupervisors(responseSupervisor);
        } else if (cargo === 'Vendedor') {
          const responseSeller = await SellerServices.getSupervisorByIdCompany(
            companyId,
            idEmployee
          );
          setSeller(responseSeller);
        }
      } catch (error) {}
    };

    fetchData();
  }, [cargo, companyId, idEmployee, user.companyId, user.id]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      if (cargo === 'Supervisor') {
        await SupervisorServices.delete(supervisors.id);
      } else if (cargo === 'Vendedor') {
        await SellerServices.delete(seller.id);
      }
      setData({
        ...data,
        seller: seller,
      });
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao excluir vendedor:', error);
    }
  };

  return (
    <S.Wrapper>
      <S.DivButtonBack>
        <S.ButtonBack onPress={handleGoBack}>
          <S.ImageBtn source={require('@assets/img/myteam/back.png')} />
        </S.ButtonBack>
      </S.DivButtonBack>
      <View>
        <S.Container>
          <S.ViewInfoUser>
            <S.ImageUser
              source={require('@assets/img/cardVendedor/foto.png')}
            />
            <S.InfoUser>
              <S.Title>
                {seller?.name || supervisors?.name || 'Usuário'}
              </S.Title>
              <S.Loja>{seller?.stage || supervisors?.job || 'Estágio'}</S.Loja>
              <S.Funcao>
                {seller?.email || supervisors?.email || 'user123@gmail.com'}
              </S.Funcao>
            </S.InfoUser>

            <S.BtnLixeira onPress={toggleModal}>
              <S.ImageVectorLixeira
                source={require('@assets/img/lixeira.png')}
              />
            </S.BtnLixeira>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
              <S.ContentModal>
                <S.WrapperConteudo>
                  <S.ImageWarning
                    source={require('@assets/img/warnnign.png')}
                  />
                  <S.TextModal>
                    Tem certeza que deseja excluir esse vendedor?
                  </S.TextModal>
                </S.WrapperConteudo>
                <S.BtnYes
                  onPress={!loading ? handleDelete : undefined}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <S.TitleBtnYes>Sim</S.TitleBtnYes>
                  )}
                </S.BtnYes>
                <S.BtnBack onPress={toggleModal}>
                  <S.TitleBtnBack>Voltar</S.TitleBtnBack>
                </S.BtnBack>
              </S.ContentModal>
            </Modal>
          </S.ViewInfoUser>
        </S.Container>
      </View>
    </S.Wrapper>
  );
};

export default SalesInspector;
