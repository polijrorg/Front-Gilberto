import React, { useEffect, useState } from 'react';
import CardsMentory from '@components/CardsMentory';
import PlainMentory from './Plain/Mentory';
import PlainService from '@services/PlainService';
import SellerServices from '@services/SellerServices';
import ModuleServices from '@services/ModuleServices';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import * as S from './styles';
import IPlains from '@interfaces/Plain';
import ISeller from '@interfaces/Seller';
import IModules from '@interfaces/Module';

const Action = ({ route }) => {
  const { idEmployee, cargo, companyId } = route.params;
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [plains, setPlains] = useState<IPlains[]>([]);
  const [seller, setSeller] = useState<ISeller | null>(null);
  const [modules, setModules] = useState<IModules[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plainsData = await PlainService.getAll();
        const modulesData = await ModuleServices.getAllModules();
        if (cargo === 'Vendedor') {
          const responseSeller = await SellerServices.getSupervisorByIdCompany(
            companyId,
            idEmployee
          );
          setPlains(plainsData);
          setModules(modulesData);
          setSeller(responseSeller);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNavigator = () => {
    setIsVisible(!isVisible);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3E63DD" />
      </View>
    );
  }

  return (
    <S.ViewWrapper>
      {!isVisible && (
        <S.Wrapper>
          {plains.map((plainsData) => (
            <CardsMentory title={plainsData.title} prize={plainsData.prize} />
          ))}
          <S.BtnCriarAction onPress={handleNavigator}>
            <S.TextBtn>criar plano de ação</S.TextBtn>
          </S.BtnCriarAction>
        </S.Wrapper>
      )}
      {isVisible && (
        <PlainMentory
          setState={handleNavigator}
          seller={seller}
          modules={modules}
        />
      )}
    </S.ViewWrapper>
  );
};

export default Action;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
