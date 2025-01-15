import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import * as S from './styles';

import Header from '@components/HeaderPages';
import CardsMentory from '@components/CardsMentory';

import PlainService from '@services/PlainService';
import IPlains from '@interfaces/Plain';
import { useDataContext } from '../../context/DataContext';
import User from '@interfaces/User';

interface PlainActionTemplateProps {
  user: User
}

const PlainActionTemplate:React.FC<PlainActionTemplateProps> = ({user}) => {
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
            <S.LoadingContainer>
              <ActivityIndicator  color="#3E63DD" />
            </S.LoadingContainer>
          ) : !isVisible ? (
            <ScrollView>
              <S.SectionContainer>
                <PlanList
                  user={user}
                  title="Planos Pendentes"
                  plains={plains}
                  handleToggleVisibility={handleToggleVisibility}
                  handleMarkDone={handleMarkDone}
                />
                {plains.length === 0 && (
                  <S.EmptyContainer>
                    <S.EmptyText>Você não tem planos pendentes</S.EmptyText>
                  </S.EmptyContainer>
                )}
              </S.SectionContainer>
              <S.SectionContainer>
                <CompletedPlanList
                  user={user}
                  title="Planos Concluídos"
                  completedPlains={completedPlains}
                  handleToggleVisibility={handleToggleVisibility}
                  handleMarkDone={handleMarkDone}
                  complete
                />
                {completedPlains.length === 0 && (
                  <S.EmptyContainer>
                    <S.EmptyText>Você não tem planos concluídos</S.EmptyText>
                  </S.EmptyContainer>
                )}
              </S.SectionContainer>
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
  user: User;
}

const PlanList: React.FC<PlanListProps> = ({
  title,
  plains,
  handleToggleVisibility,
  handleMarkDone,
  user
}) => {
  return (
    <S.Section>
      <S.SectionHeader>{title}</S.SectionHeader>
      {plains.map((plain: IPlains) => (
        <CardsMentory
        user={user}
          key={plain.id}
          title={plain.title}
          seller={plain.seller}
          prize={plain.prize}
          isVisible={plain.done}
          complete={false}
          onToggleVisibility={() => handleToggleVisibility(plain.id)}
          onMarkDone={() => handleMarkDone(plain.id)}
        />
      ))}
    </S.Section>
  );
};

interface CompletedPlanListProps {
  title: string;
  completedPlains: IPlains[];
  handleToggleVisibility: (idPlain: string) => void;
  handleMarkDone: (idPlain: string) => void;
  complete: boolean;
  user: User
}

const CompletedPlanList: React.FC<CompletedPlanListProps> = ({
  title,
  completedPlains,
  handleToggleVisibility,
  handleMarkDone,
  complete,
  user
}) => {
  return (
    <S.Section>
      <S.SectionHeader>{title}</S.SectionHeader>
      {completedPlains.map((plain) => (
        <CardsMentory
        user={user}
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
    </S.Section>
  );
};

export default PlainActionTemplate;
