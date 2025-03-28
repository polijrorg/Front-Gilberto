import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@styles/default.theme';
import * as S from './styles';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import ModuleGradeServices from '@services/ModuleGradeService';
import HeaderPages from '@components/HeaderPages';
import ISeller from '@interfaces/Seller';
import { useToast } from 'react-native-toast-notifications';
import { ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDataContext } from '../../../context/DataContext';
import SellerServices from '@services/SellerServices';
import ModulesServices from '@services/ModuleServices';
import IModule from '@interfaces/Module';

interface RouteParams {
  ModulesEvaluate: Array<{
    idModule: string;
    conhecimento: number;
    implementacao: number;
    comment: string;
  }>;
  Seller: ISeller;
}

const CompleteMentorship: React.FC = () => {
  const route = useRoute<RouteProp<{ ModuloAsk: RouteParams }, 'ModuloAsk'>>();
  const { ModulesEvaluate, Seller } = route.params;
  const toast = useToast();
  const { data, setData } = useDataContext();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    try {
      setLoading(true);
      await Promise.all(ModulesEvaluate.map(updateModuleGrade));

      setData({
        ...data,
        seller: Seller,
      });
      setLoading(false);
      showToast('Módulos avaliados com sucesso', 'success');

      const allModulesEvaluated = await checkAllModulesEvaluated();
      if (allModulesEvaluated) {
        showToast('Todos os módulos avaliados', 'success');
        showToast('Alterando Estado para Visita', 'success');
        await SellerServices.updateSeller({ ...Seller, stage: 'Visita' });
        setData({
          ...data,
          seller: { ...Seller, stage: 'Visita' },
        });
      }
    } catch (error) {
      console.error('Erro ao completar o mentorado:', error);
    }
  };

  const checkAllModulesEvaluated = async () => {
    try {
      const modules = await ModulesServices.getAllModules();

      const moduleGrades = await ModuleGradeServices.getModuleGradesByIdSeller(
        Seller.id
      );

      const allModulesEvaluated = modules.every((module) =>
        moduleGrades.some((grade) => grade.moduleId === module.id)
      );

      return allModulesEvaluated;
    } catch (error) {
      console.error(
        'Erro ao verificar se todos os módulos foram avaliados:',
        error
      );
      return false;
    }
  };

  const updateModuleGrade = async (element: any) => {
    try {
      if (element) {
        const moduleGrades =
          await ModuleGradeServices.getModuleGradesByIdSeller(Seller.id);
        const existingModuleGrade = moduleGrades.find(
          (grade) => grade.moduleId === element.idModule
        );
        if (existingModuleGrade) {
          await ModuleGradeServices.updateModuleGrade({
            id: existingModuleGrade.id,
            supervisorComment: element.comment,
            implementationScore: element.implementacao,
            knowledgeScore: element.conhecimento,
            moduleId: element.idModule,
            sellerId: element.idModule,
          });
        } else {
          await ModuleGradeServices.create({
            supervisorComment: element.comment,
            moduleId: element.idModule,
            sellerId: Seller.id,
            implementationScore: element.implementacao,
            knowledgeScore: element.conhecimento,
          });
        }
      }
    } catch (error) {
      console.error('Erro ao criar ou atualizar módulo de avaliação:', error);
    }
  };

  const handleBackHome = () => {
    navigation.navigate('Home' as never);
  };

  const showToast = (message: string, type: string) => {
    toast.show(message, {
      type: type,
      placement: 'bottom',
      duration: 3500,
      animationType: 'zoom-in',
    });
  };

  return (
    <>
      <StatusBar backgroundColor={'#3E63DD'} />
      <S.Wrapper>
        <HeaderPages title="Avaliar Mentorado" />
        <SellerInfo seller={Seller} handleBackHome={handleBackHome} />

        {ModulesEvaluate?.length > 0 ? (
          ModulesEvaluate.map((module, index) => (
            <ModuleEvaluation key={index} moduleData={module} />
          ))
        ) : (
          <S.ViewWrapperCrome>
            <S.Message>Nenhum módulo editado</S.Message>
          </S.ViewWrapperCrome>
        )}
        <ButtonsSection loading={loading} handleComplete={handleComplete} />
      </S.Wrapper>
    </>
  );
};

const SellerInfo: React.FC<{ seller: ISeller; handleBackHome: () => void }> = ({
  seller,
  handleBackHome,
}) => (
  <S.DivFields>
    <S.UserInfoContainer>
      <S.ImageUser source={require('@assets/img/cardVendedor/foto.png')} />
      <S.DivTexts>
        <S.TextName>{seller?.name}</S.TextName>
        <S.TextFunction>{seller?.job}</S.TextFunction>
      </S.DivTexts>
    </S.UserInfoContainer>
    <S.BtnHomeScreen onPress={handleBackHome}>
      <MaterialCommunityIcons name="home-outline" size={28} color="#fff" />
    </S.BtnHomeScreen>
  </S.DivFields>
);

interface ModuleEvaluationProps {
  moduleData: {
    idModule?: string;
    conhecimento?: number;
    implementacao?: number;
    comment?: string;
  };
}

const ModuleEvaluation: React.FC<ModuleEvaluationProps> = ({ moduleData }) => {
  const [module, setModule] = useState<IModule | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedModule = await ModulesServices.getModuleById(
          moduleData?.idModule ?? ''
        );
        setModule(fetchedModule);
      } catch (error) {
        console.error('Erro ao buscar módulo:', error);
      }
    };

    fetchData();
  }, [moduleData?.idModule]);

  if (!module) {
    return null;
  }

  return (
    <S.ModuleContainer>
      {module.name && (
        <S.ModuleName>Módulo Nome: {module?.name || ''}</S.ModuleName>
      )}
      {moduleData.conhecimento !== undefined && (
        <S.ModuleLabel>
          Conhecimento:{' '}
          {moduleData?.conhecimento?.toFixed(2).replace('.', ',') || ''}
        </S.ModuleLabel>
      )}
      {moduleData.implementacao !== undefined && (
        <S.ModuleLabel>
          Implementação:{' '}
          {moduleData?.implementacao?.toFixed(2).replace('.', ',') || ''}
        </S.ModuleLabel>
      )}
      {moduleData.comment && (
        <S.ModuleLabel>
          {'Comentário: ' + moduleData?.comment || ''}
        </S.ModuleLabel>
      )}
    </S.ModuleContainer>
  );
};

const ButtonsSection: React.FC<{
  handleComplete: () => void;
  loading: boolean;
}> = ({ handleComplete, loading }) => (
  <>
    <S.BtnConcluirPlano
      onPress={!loading ? handleComplete : undefined}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.primary.main} />
      ) : (
        <S.TextBtnPlano>FINALIZAR</S.TextBtnPlano>
      )}
    </S.BtnConcluirPlano>
  </>
);

export default CompleteMentorship;
