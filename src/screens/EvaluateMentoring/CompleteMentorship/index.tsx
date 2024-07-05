import React, { useEffect, useState }  from 'react';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@styles/default.theme';
import * as S from './styles';
import { useRoute, RouteProp, useNavigation,  } from '@react-navigation/native';
import ModuleGradeServices from '@services/ModuleGradeService';
import DivGradient from '@components/DivGradient';
import HeaderPages from '@components/HeaderPages';
import ISeller from '@interfaces/Seller';
import { useToast } from 'react-native-toast-notifications';
import { ActivityIndicator, View, Text, StyleSheet, Platform } from 'react-native';
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

  // Função para completar a avaliação dos módulos
  const handleComplete = async () => {
    try {
      setLoading(true);
      await Promise.all(ModulesEvaluate.map(updateModuleGrade));

      setData({
        ...data,
        seller: Seller,
      });
      setLoading(false);
      console.log('Módulos avaliados com sucesso');
      showToast('Módulos avaliados com sucesso', 'success');

      const allModulesEvaluated = await checkAllModulesEvaluated();
      console.log(allModulesEvaluated);
      if (allModulesEvaluated) {
        console.log('Todos os módulos foram avaliados. Atualizando estágio para "Visita"...');
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

  // Função para verificar se todos os módulos foram avaliados
  const checkAllModulesEvaluated = async () => {
    try {
      const modules = await ModulesServices.getAllModules();

      const moduleGrades = await ModuleGradeServices.getModuleGradesByIdSeller(Seller.id);

      const allModulesEvaluated = modules.every(module =>
        moduleGrades.some(grade => grade.moduleId === module.id)
      );

      return allModulesEvaluated;
    } catch (error) {
      console.error('Erro ao verificar se todos os módulos foram avaliados:', error);
      return false;
    }
  };

  // Função para atualizar a avaliação do módulo
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

  // Função para navegar de volta para a tela inicial
  const handleBackHome = () => {
    navigation.navigate('Home' as never);
  };

  // Função para exibir um toast de mensagem
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
      <StatusBar />
      <S.Wrapper>
        <HeaderPages title="Avaliar Mentorado" />
        <SellerInfo seller={Seller} handleBackHome={handleBackHome} />
        {ModulesEvaluate.map((module, index) => (
          <ModuleEvaluation key={index} moduleData={module} />
        ))}
        <ButtonsSection
          loading={loading}
          handleComplete={handleComplete}
        />
      </S.Wrapper>
      <DivGradient />
    </>
  );
};

// Componente para exibir as informações do vendedor
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

// Componente para exibir a avaliação de um módulo específico
interface ModuleEvaluationProps {
  moduleData: {
    idModule: string;
    conhecimento: number;
    implementacao: number;
    comment: string;
  };
}
const ModuleEvaluation: React.FC<ModuleEvaluationProps> = ({ moduleData }) => {
  const [module, setModule] = useState<IModule | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedModule = await ModulesServices.getModuleById(moduleData.idModule);
        setModule(fetchedModule);
      } catch (error) {
        console.error('Erro ao buscar módulo:', error);
      }
    };

    fetchData();
  }, [moduleData.idModule]);

  if (!module) {
    return null;
  }

  return (
    <View style={styles.moduleContainer}>
      <Text style={styles.moduleName}>Módulo Nome: {module.name}</Text>
      {moduleData.conhecimento && (
        <Text style={styles.moduleLabel}>Conhecimento: {moduleData.conhecimento.toFixed(2).replace('.', ',')}</Text>
      )}
      {moduleData.implementacao && (
        <Text style={styles.moduleLabel}>Implementação: {moduleData.implementacao.toFixed(2).replace('.', ',')}</Text>
      )}
      {moduleData.comment && (
        <Text style={styles.moduleLabel}>{ 'Comentário: '+ moduleData.comment}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  moduleContainer: {
    maxWidth: '95%',
    minWidth: '95%',
    padding: 16,
    marginHorizontal: 'auto',
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  moduleName: {
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginBottom: 8,
  },
  moduleLabel: {
    fontSize: 12,
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
});

// Componente para exibir o botão de finalizar
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
