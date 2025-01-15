import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View, StyleSheet } from 'react-native';
import InputRange from '@components/InputRage';
import HeaderPages from '@components/HeaderPages';
import ModulesServices from '@services/ModuleServices';
import ModuleGradeServices from '@services/ModuleGradeService';
import * as S from './styles';
import { RouteProp, useNavigation } from '@react-navigation/native';
import IModule from '@interfaces/Module';
import ISeller from '@interfaces/Seller';
import IModuleGrade from '@interfaces/ModuleGrade';

interface RouteParams {
  module: IModule;
  seller: ISeller;
  index: number;
}

interface Props {
  module: IModule;
  numberModule: number;
  route: RouteProp<{ EvaluateMentoring: RouteParams }, 'EvaluateMentoring'>;
}

const ModuloAsk: React.FC<Props> = ({ route }) => {
  const { seller } = route.params;
  const [modules, setModules] = useState<IModule[]>([]);
  const [modulesGrades, setModulesGrades] = useState<IModuleGrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [moduleValues, setModuleValues] = useState<
    Array<{
      name: string;
      idModule: string;
      conhecimento: number;
      implementacao: number;
      comment: string;
    }>
  >([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [modulesData, modulesGradeData] = await Promise.all([
          ModulesServices.getAllModules(),
          ModuleGradeServices.getModuleGradesByIdSeller(seller.id),
        ]);
        setModules(modulesData);
        setModulesGrades(modulesGradeData);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    implementacao: number,
    comment: string,
    name: string
  ) => {
    setModuleValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = {
        idModule: moduleId,
        name,
        conhecimento,
        implementacao,
        comment,
      };
      return updatedValues;
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#3E63DD" />
      </View>
    );
  }

  const handleSetComplete = () => {
    const editedModules = moduleValues.filter(
      (moduleValue) => moduleValue !== undefined
    );
    navigation.navigate('CompleteMentoring', {
      Seller: seller,
      ModulesEvaluate: editedModules,
    });
  };

  return (
    <>
      <StatusBar backgroundColor={'#3E63DD'} />
      <S.Wrapper>
        <HeaderPages title="Avaliar Mentorado" />
        <SellerInfo seller={seller} />
        {modules.map((module, index) => (
          <ModuleAsk
            key={module.id}
            module={module}
            index={index}
            moduleValues={moduleValues}
            handleUpdateModuleValues={handleUpdateModuleValues}
            modulesGrades={modulesGrades}
          />
        ))}
        <CompleteButton onPress={handleSetComplete} />
      </S.Wrapper>
    </>
  );
};

const SellerInfo: React.FC<{ seller: ISeller }> = ({ seller }) => (
  <S.HeaderMentorado>
    <S.DivFilds>
      <S.ImageUser source={require('@assets/img/cardVendedor/foto.png')} />
      <S.NomeMentora>{seller.name}</S.NomeMentora>
    </S.DivFilds>
  </S.HeaderMentorado>
);

const ModuleAsk: React.FC<{
  module: IModule;
  index: number;
  moduleValues: Array<{
    name: string;
    idModule: string;
    conhecimento: number;
    implementacao: number;
    comment: string;
  }>;
  handleUpdateModuleValues: (
    moduleId: string,
    index: number,
    conhecimento: number,
    implementacao: number,
    comment: string,
    name: string
  ) => void;
  modulesGrades: IModuleGrade[];
}> = ({
  module,
  index,
  moduleValues,
  handleUpdateModuleValues,
  modulesGrades,
}) => {
  const moduleGrade = modulesGrades.find(
    (grade) => grade.moduleId === module.id
  );

  return (
    <S.AskDiv key={module.id}>
      <S.TitleModule>{module.name}</S.TitleModule>
      <InputRange
        id={module.id}
        textAsk="Conhecimento"
        initialValue={moduleGrade?.knowledgeScore || 1}
        onChangeValue={(id, value) =>
          handleUpdateModuleValues(
            module.id,
            index,
            value,
            moduleValues[index]?.implementacao || 0,
            moduleValues[index]?.comment || '',
            module.name
          )
        }
      />
      <InputRange
        id={module.id}
        textAsk="Implementação"
        initialValue={moduleGrade?.implementationScore || 1}
        onChangeValue={(id, value) =>
          handleUpdateModuleValues(
            module.id,
            index,
            moduleValues[index]?.conhecimento || 0,
            value,
            moduleValues[index]?.comment || '',
            module.name
          )
        }
      />
      <S.TextArea
        placeholder="Digite aqui..."
        multiline={true}
        numberOfLines={5}
        value={moduleValues[index]?.comment || ''}
        onChangeText={(text) =>
          handleUpdateModuleValues(
            module.id,
            index,
            moduleValues[index]?.conhecimento || 0,
            moduleValues[index]?.implementacao || 0,
            text,
            module.name
          )
        }
      />
    </S.AskDiv>
  );
};

const CompleteButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <S.ButtonConcluir onPress={onPress}>
    <S.TextBtn>Concluir Avaliação</S.TextBtn>
  </S.ButtonConcluir>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModuloAsk;
