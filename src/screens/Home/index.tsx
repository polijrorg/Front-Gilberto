import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as S from './styles';
import Header from '@components/HeaderMenu';
import ContainerActions from '@components/ContainerActions';
import MatrizSlider from '@components/MatrizSlider';
import {
  SellersContainer,
  SupervisorsContainer,
} from '@components/ContainerCards';
import ButtonAdded from '@components/ButtonAdded';
import useAuth from '@hooks/useAuth';
import SupervisorServices from '@services/SupervisorServices';
import SellerServices from '@services/SellerServices';
import ModulesServices from '@services/ModuleServices';
import Seller from '@interfaces/Seller';

const Home = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [sellers, setSellers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [media, setMedia] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user.job === 'Supervisor') {
          const sellersData = await SellerServices.getAllSellerFromSupervisor(
            user.id
          );
          const mediaData = await fetchMediaData(sellersData);
          setSellers(sellersData);
          setMedia(mediaData);
        } else if (user.job === 'Gerente') {
          const supervisorsData =
            await SupervisorServices.getAllSupervisorsFromManager(user.id);
          setSupervisors(supervisorsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.id, user.job]);

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
    <>
      <StatusBar backgroundColor="#3E63DD" style="light" />
      <S.Wrapper>
        <Header />
        <ContainerActions />
        <MatrizSlider />
        {user.job === 'Gerente' ? (
          <SupervisorsContainer loading={loading} supervisors={supervisors} />
        ) : (
          <SellersContainer loading={loading} media={media} sellers={sellers} />
        )}
      </S.Wrapper>
      <ButtonAdded />
    </>
  );
};

export default Home;
