import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as S from './styles';

import Header from '@components/HeaderPages';
import useAuth from '@hooks/useAuth';
import CardsMentory from '@components/CardsMentory';

import PlainService from '@services/PlainService';

import IPlains from '@interfaces/Plain';

import { useDataContext } from '../../context/DataContext';

const PlainActionTemplate = () => {
  const { user } = useAuth();
  const { data } = useDataContext();

  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [plains, setPlains] = useState<IPlains[]>([]);
  const [completedPlains, setCompletedPlains] = useState<IPlains[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.job === 'Supervisor') {
          const plainsData = await PlainService.getPlainActionByIdSupervisor(
            user.id
          );

          setPlains(plainsData.filter((plain) => !plain.done));
          setCompletedPlains(plainsData.filter((plain) => plain.done));
        } else if (user.job === 'Manager') {
          const plainsData = await PlainService.getAll();

          setPlains(plainsData.filter((plain) => !plain.done));
          setCompletedPlains(plainsData.filter((plain) => plain.done));
        }
      } catch (error) {
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

  return (
    <>
      <StatusBar backgroundColor="#3E63DD" />
      <S.Wrapper>
        <Header title="Planos de Ação" />
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
            </ScrollView>
          ) : (
            <></>
          )}
        </S.ViewWrapper>
      </S.Wrapper>
    </>
  );
};

interface PlanListProps {
  title: string;
  plains: IPlains[];
  handleToggleVisibility: (idPlain: string) => void;
  handleMarkDone: (idPlain: string) => void;
}

const PlanList: React.FC<PlanListProps> = ({
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
            seller={plain.seller}
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

interface CompletedPlanListProps {
  title: string;
  completedPlains: IPlains[];
  handleToggleVisibility: (idPlain: string) => void;
  handleMarkDone: (idPlain: string) => void;
  complete: boolean;
}

const CompletedPlanList: React.FC<CompletedPlanListProps> = ({
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
          seller={plain.seller}
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

export default PlainActionTemplate;
