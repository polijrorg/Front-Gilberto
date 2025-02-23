import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import * as S from './styles';
import CardsMentory from '@components/CardsMentory';
import PlainMentory from './Plain/MentoryAndVisit';
import PlainService from '@services/PlainService';
import SellerServices from '@services/SellerServices';
import ModuleServices from '@services/ModuleServices';
import VisitService from '@services/VisitService';
import IPlains from '@interfaces/Plain';
import ISeller from '@interfaces/Seller';
import IModules from '@interfaces/Module';
import IVisits from '@interfaces/Visit/Visit';
import User from '@interfaces/User';

interface IActionProps {
  user: User
}

const Action:React.FC<IActionProps> = ({ route, user }) => {
  const { idEmployee, cargo, companyId } = route.params;
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [plains, setPlains] = useState<IPlains[]>([]);
  const [completedPlains, setCompletedPlains] = useState<IPlains[]>([]);
  const [seller, setSeller] = useState<ISeller | undefined>(undefined);
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
          const visits = await VisitService.getVisitByIdSeller(
            responseSeller?.id ?? ''
          );
          const modulesData = await ModuleServices.getAllModules();
          const plainsData = await PlainService.getByIdSellerPlain(
            responseSeller?.id ?? ''
          );
          setPlains(plainsData.filter((plain) => !plain.done));
          setVisits(visits);
          setCompletedPlains(plainsData.filter((plain) => plain.done));
          setModules(modulesData);
          setSeller(responseSeller);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cargo, companyId, idEmployee]);

  const addNewPlain = async () => {
    const updatedPlains = await PlainService.getByIdSellerPlain(
      seller?.id ?? ''
    );
    setPlains(updatedPlains);
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
    } catch (error) {}
  };

  const handleNavigator = () => {
    setIsVisible(!isVisible);
  };

  return (
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
          {user?.job !== 'Gerente' && (
            <S.BtnCriarAction onPress={handleNavigator}>
              <S.TextBtn>criar plano de ação</S.TextBtn>
            </S.BtnCriarAction>
          )}
        </ScrollView>
      ) : (
        seller && (
          <PlainMentory
            setState={handleNavigator}
            seller={seller}
            modules={modules || []}
            visits={visits || []}
            addNewPlain={addNewPlain}
          />
        )
      )}
    </S.ViewWrapper>
  );
};

interface IPlanListProps {
  title: string;
  plains: IPlains[];
  handleToggleVisibility: (idPlain: string) => void;
  handleMarkDone: (idPlain: string) => void;
  user: User;
}
const PlanList: React.FC<IPlanListProps> = ({
  title,
  plains,
  handleToggleVisibility,
  handleMarkDone,
  user
}) => {
  return (
    <S.ListWrapper>
      <S.SectionHeader>{title}</S.SectionHeader>
      {plains.map((plain: IPlains) => {
        return (
          <CardsMentory
            user={user}
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
    </S.ListWrapper>
  );
};

interface ICompletedPlanListProps {
  title: string;
  completedPlains: IPlains[];
  handleToggleVisibility: (idPlain: string) => void;
  handleMarkDone: (idPlain: string) => void;
  complete: boolean;
  user: User
}

const CompletedPlanList: React.FC<ICompletedPlanListProps> = ({
  title,
  completedPlains,
  handleToggleVisibility,
  handleMarkDone,
  complete,
  user
}) => {
  return (
    <S.ListWrapper>
      <S.SectionHeader>{title}</S.SectionHeader>
      {completedPlains.map((plain) => (
        <CardsMentory
          user={user}
          key={plain.id}
          title={plain.title}
          prize={plain.prize}
          isVisible={!plain.done}
          complete={complete}
          onToggleVisibility={() => handleToggleVisibility(plain.id)}
          onMarkDone={() => handleMarkDone(plain.id)}
        />
      ))}
    </S.ListWrapper>
  );
};

export default Action;
