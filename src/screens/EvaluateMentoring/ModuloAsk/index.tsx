import { RouteProp, useNavigation } from '@react-navigation/native';
import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View, StyleSheet } from 'react-native';
import DivGradient from '@components/DivGradient';
import InputRange from '@components/InputRage';
import HeaderPages from '@components/HeaderPages';
import IModule from '@interfaces/Module';
import ISeller from '@interfaces/Seller';
import ModulesServices from '@services/ModuleServices';
import ModuleGradeServices from '@services/ModuleGradeService';
import IModuleGrade from '@interfaces/ModuleGrade';

interface RouteParams {
  module: IModule;
  seller: ISeller;
  index: number;
}

interface Props {
  Modulo: IModule;
  numberModule: number;
  route: RouteProp<{ EvaluateMentoring: RouteParams }, 'EvaluateMentoring'>;
}

const ModuloAsk: React.FC<Props> = ({ route }) => {
  const { seller } = route.params;
  const [modules, setModules] = useState<IModule[]>([]);
  const [modulesGrades, setModulesGrades] = useState<IModuleGrade[]>();
  const [loading, setLoading] = useState(true);
  const [moduleValues, setModuleValues] = useState<
    Array<{ idModule: string; conhecimento: number; implementacao: number }>
  >([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modulesData = await ModulesServices.getAllModules();
        const modulesGradeData =
          await ModuleGradeServices.getModuleGradesByIdSeller(seller.id);
        setModulesGrades(modulesGradeData);
        setModules(modulesData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [seller]);

  const handleUpdateModuleValues = (
    moduleId: string,
    index: number,
    conhecimento: number,
    implementacao: number
  ) => {
    setModuleValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = {
        idModule: moduleId,
        conhecimento,
        implementacao,
      };
      return updatedValues;
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3E63DD" />
      </View>
    );
  }

  const handleSetComplete = () => {
    navigation.navigate('CompleteMentoring', {
      Seller: seller,
      ModulesEvaluate: moduleValues,
    });
  };

  return (
    <>
      <StatusBar />
      <S.Wrapper>
        <HeaderPages title="Avaliar Mentorado" />
        <S.HeaderMentorado>
          <S.DivFilds>
            <S.ImageUser
              source={require('@assets/img/cardVendedor/foto.png')}
            />
            <S.NomeMentora>{seller.name}</S.NomeMentora>
          </S.DivFilds>
        </S.HeaderMentorado>
        {modules.map((module, index) => {
          const moduleGrade = modulesGrades.find(
            (grade) => grade.moduleId === module.id
          );

          return (
            <S.AskDiv key={module.id}>
              <S.TitleModule>
                Módulo {index + 1}: {module.name}
              </S.TitleModule>
              <InputRange
                moduleId={module.id}
                textAsk="Conhecimento"
                initialValue={moduleGrade?.knowledgeScore || 1}
                onChangeValue={(moduleId, value) =>
                  handleUpdateModuleValues(
                    moduleId,
                    index,
                    value,
                    moduleValues[index]?.implementacao || 0
                  )
                }
              />
              <InputRange
                moduleId={module.id}
                textAsk="Implementação"
                initialValue={moduleGrade?.implementationScore || 1}
                onChangeValue={(moduleId, value) =>
                  handleUpdateModuleValues(
                    moduleId,
                    index,
                    moduleValues[index]?.conhecimento || 0,
                    value
                  )
                }
              />
            </S.AskDiv>
          );
        })}
        <S.ButtonConcluir onPress={handleSetComplete}>
          <S.TextBtn>Concluir Avaliação</S.TextBtn>
        </S.ButtonConcluir>
      </S.Wrapper>
      <DivGradient />
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModuloAsk;
