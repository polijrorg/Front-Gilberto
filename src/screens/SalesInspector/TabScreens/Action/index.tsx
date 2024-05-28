import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import * as S from './styles';

import CardsMentory from '@components/CardsMentory';
import PlainMentory from './Plain/Mentory';

import PlainService from '@services/PlainService';
import SellerServices from '@services/SellerServices';
import ModuleServices from '@services/ModuleServices';
import VisitService from '@services/VisitService';

import IPlains from '@interfaces/Plain';
import ISeller from '@interfaces/Seller';
import IModules from '@interfaces/Module';
import IVisits from '@interfaces/Visit/Visit';

const Action = ({ route }) => {
  const { idEmployee, cargo, companyId } = route.params;
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
        if (cargo === 'Vendedor') {
          const responseSeller = await SellerServices.getSupervisorByIdCompany(
            companyId,
            idEmployee
          );
          const visits = await VisitService.getVisitByIdSeller(responseSeller.id);
          const modulesData = await ModuleServices.getAllModules();
          const plainsData = await PlainService.getByIdSellerPlain(
            responseSeller.id
          );
          console.log(visits)
          setPlains(plainsData.filter((plain) => !plain.done));
          setVisits(visits);
          setCompletedPlains(plainsData.filter((plain) => plain.done));
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

  const addNewPlain = (newPlain: IPlains) => {
    setPlains((prevPlains) => [...prevPlains, newPlain]);
  };

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

  const handleMarkDone = async (idPlain: string) => {
    try {
      const plain = await PlainService.markDone(idPlain);
      setPlains((prevPlains) =>
        prevPlains.filter((plain) => plain.id !== idPlain)
      );
      setCompletedPlains((prevPlains) => [...prevPlains, plain]);
    } catch (error) {
      console.log('Erro ao marcar o plano como concluído:', error);
    }
  };

  const handleNavigator = () => {
    setIsVisible(!isVisible);
  };

  return (
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
          addNewPlain={addNewPlain}
          visits={visits}
        />
      )}
    </S.ViewWrapper>
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

export default Action;

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
