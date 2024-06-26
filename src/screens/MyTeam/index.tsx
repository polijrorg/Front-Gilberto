import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import DivGradient from '@components/DivGradient';
import * as S from './styles';
import { useNavigation } from '@react-navigation/native';
import Seller from '@interfaces/Seller';
import Container from '@components/ContainerCards';
import useAuth from '@hooks/useAuth';
import SellerServices from '@services/SellerServices';
import SupervisorServices from '@services/SupervisorServices';
import ModulesServices from '@services/ModuleServices';
import HeaderPages from '@components/HeaderPages';
import ISupervisor from '@interfaces/Supervisor';
import ISeller from '@interfaces/Seller';
import { useDataContext } from '../../context/DataContext';

const MyTeam = () => {
  const { user } = useAuth();
  const { data } = useDataContext();
  const [loading, setLoading] = useState(true);
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [supervisors, setSupervisors] = useState<ISupervisor[]>([]);
  const [search, setSearch] = useState('');
  const [media, setMedia] = useState({});
  const navigation = useNavigation();

  const handlePressAddedSeller = () => {
    navigation.navigate('SellerAdded' as never);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user.job === 'Supervisor') {
          const [sellersData] = await Promise.all([
            SellerServices.getAllSellerFromSupervisor(user.id),
          ]);
          const mediaData = await fetchMediaData(sellersData);
          setSellers(sellersData);
          setMedia(mediaData);
        } else if (user.job === 'Gerente') {
          const [sellersData, supervisorsData] = await Promise.all([
            SellerServices.getAllSellerFromManager(user.id),
            SupervisorServices.getAllSupervisorsFromManager(user.id),
          ]);
          const mediaData = await fetchMediaData(sellersData);
          setSellers(sellersData);
          setSupervisors(supervisorsData);
          setMedia(mediaData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.id, user.job, data]);

  const fetchMediaData = async (sellersData: Seller[]) => {
    const mediaData = {};
    for (const seller of sellersData) {
      const moduleGrades = await ModulesServices.getModuleGradesByIdSeller(
        seller.id
      );
      const totalGrade = moduleGrades.reduce(
        (sum, grade) => sum + grade.media,
        0
      );
      const averageGrade =
        moduleGrades.length > 0 ? totalGrade / moduleGrades.length : 0;
      mediaData[seller.id] = averageGrade;
    }
    return mediaData;
  };

  return (
    <S.WrapperTela>
      <StatusBar backgroundColor="#3E63DD" style="light" />
      <S.Wrapper>
        <HeaderPages title="Minha Equipe" />
        <S.DivContainerInput>
          <S.InputVendedor
            placeholder={'Pesquisar'}
            keyboardType={'default'}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <S.ButtonLupa>
            <S.Lupa source={require('@assets/img/myteam/lupa.png')} />
          </S.ButtonLupa>
        </S.DivContainerInput>
        {user.job === 'Gerente' && (
          <Container
            title="Supervisores"
            loading={loading}
            data={supervisors}
            search={search}
            userType={user.job}
          />
        )}

        <Container
          media={media}
          title="Vendedores"
          loading={loading}
          data={sellers}
          search={search}
        />
      </S.Wrapper>
      <S.BtnAddColaborador onPress={handlePressAddedSeller}>
        <S.TextBtn>Adicionar COLABORADORES</S.TextBtn>
      </S.BtnAddColaborador>
      <DivGradient />
    </S.WrapperTela>
  );
};

export default MyTeam;
