import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View, Text, StyleSheet, ScrollView } from 'react-native';
import * as S from './styles';

import Header from '@components/HeaderPages';
import useAuth from '@hooks/useAuth';
import CardsMentory from '@components/CardsMentory';

import PlainService from '@services/PlainService';
import SellerServices from '@services/SellerServices';
import ModuleServices from '@services/ModuleServices';
import VisitService from '@services/VisitService';

import IPlains from '@interfaces/Plain';
import ISeller from '@interfaces/Seller';
import IModules from '@interfaces/Module';
import IVisits from '@interfaces/Visit/Visit';

import { useDataContext } from '../../context/DataContext';
import PlainMentory from '@screens/SalesInspector/TabScreens/Action/Plain/MentoryAndVisit';

const PlainAction = () => {
  const { user } = useAuth();
  const { data } = useDataContext();

  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [plains, setPlains] = useState<IPlains[]>([]);
  const [completedPlains, setCompletedPlains] = useState<IPlains[]>([]);
  const [seller, setSeller] = useState<ISeller | null>(null);
  const [modules, setModules] = useState<IModules[] | null>(null);
  const [visits, setVisits] = useState<IVisits[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.job === 'Vendedor') {
          const responseSeller = await SellerServices.getSupervisorByIdCompany(user.companyId, user.id);
          const visitsData = await VisitService.getVisitByIdSeller(responseSeller.id);
          const modulesData = await ModuleServices.getAllModules();
          const plainsData = await PlainService.getByIdSellerPlain(responseSeller.id);

          setPlains(plainsData.filter((plain) => !plain.done));
          setCompletedPlains(plainsData.filter((plain) => plain.done));
          setModules(modulesData);
          setSeller(responseSeller);
          setVisits(visitsData);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id, user.job, data]);

  const handleToggleVisibility = (idPlain: string) => {
    setPlains((prevPlains) =>
      prevPlains.map((plain) =>
        plain.id === idPlain ? { ...plain, done: true } : plain
      )
    );
    setCompletedPlains((prevPlains) =>
      prevPlains.filter((plain) => plain.id !== idPlain)
    );
  };

  const addNewPlain = (newPlain: IPlains) => {
    setPlains((prevPlains) => [...prevPlains, newPlain]);
  };

  const handleMarkDone = async (idPlain: string) => {
    try {
      const plain = await PlainService.markDone(idPlain);
      setPlains((prevPlains) =>
        prevPlains.filter((plain) => plain.id !== idPlain)
      );
      setCompletedPlains((prevPlains) => [...prevPlains, plain]);
    } catch (error) {
      console.error('Erro ao marcar o plano como concluído:', error);
    }
  };

  const handleNavigator = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <StatusBar backgroundColor="#3E63DD" />
      <S.Wrapper>
        <Header title='Planos de Ação'/>
        <S.ViewWrapper>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3E63DD" />
            </View>
          ) : !isVisible ? (
            <ScrollView>
              <View style={styles.sectionContainer}>
                <PlanList
                  title="Planos Pendentes"
                  plains={plains}
                  handleToggleVisibility={handleToggleVisibility}
                  handleMarkDone={handleMarkDone}
                />
                {plains.length === 0 && (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      Você não tem planos pendentes
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.sectionContainer}>
                <CompletedPlanList
                  title="Planos Concluídos"
                  completedPlains={completedPlains}
                  handleToggleVisibility={handleToggleVisibility}
                  handleMarkDone={handleMarkDone}
                  complete
                />
                {completedPlains.length === 0 && (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      Você não tem planos concluídos
                    </Text>
                  </View>
                )}
              </View>
              <S.BtnCriarAction onPress={handleNavigator}>
                <S.TextBtn>criar plano de ação</S.TextBtn>
              </S.BtnCriarAction>
            </ScrollView>
          ) : (
            <PlainMentory
              setState={handleNavigator}
              seller={seller}
              modules={modules}
              addNewPlain={addNewPlain} // Esta função precisa ser definida
              visits={visits}
            />
          )}
        </S.ViewWrapper>
      </S.Wrapper>
    </>
  );
};

const PlanList = ({
  title,
  plains,
  handleToggleVisibility,
  handleMarkDone,
}) => {
  return (
    <View>
      <Text style={styles.sectionHeader}>{title}</Text>
      {plains.map((plain: IPlains) => {
        return (
          <CardsMentory
            key={plain.id}
            title={plain.title}
            prize={plain.prize}
            isVisible={plain.done}
            complete={false}
            onToggleVisibility={() => handleToggleVisibility(plain.id)}
            onMarkDone={() => handleMarkDone(plain.id)}
          />
        );
      })}
    </View>
  );
};

const CompletedPlanList = ({
  title,
  completedPlains,
  handleToggleVisibility,
  handleMarkDone,
  complete,
}) => {
  return (
    <View>
      <Text style={styles.sectionHeader}>{title}</Text>
      {completedPlains.map((plain) => (
        <CardsMentory
          key={plain.id}
          title={plain.title}
          prize={plain.prize}
          isVisible={!plain.done}
          complete={complete}
          onToggleVisibility={() => handleToggleVisibility(plain.id)}
          onMarkDone={() => handleMarkDone(plain.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    flex: 1,
    marginBottom: 20,
  },
  emptyContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    textAlign: 'center',
  },
  sectionHeader: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
});

export default PlainAction;