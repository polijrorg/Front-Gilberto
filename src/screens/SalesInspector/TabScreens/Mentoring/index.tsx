import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, ScrollView } from 'react-native';
import * as S from './styles';
import Accordion from '@components/AccordionMentory';
import ModulesServices from '@services/ModuleServices';
import IModuleGrade from '@interfaces/ModuleGrade';
import IModule from '@interfaces/Module';

const Mentoring = ({ route }) => {
  const { idEmployee, cargo } = route.params;
  const [moduleGrade, setModuleGrade] = useState<IModuleGrade[]>([]);
  const [modules, setModules] = useState<IModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cargo === 'Vendedor' || cargo === 'Supervisor') {
          const dataSeller =
            await ModulesServices.getModuleGradesByIdSeller(idEmployee);
          setModuleGrade(dataSeller);

          const moduleIds = dataSeller.map((grade) => grade.moduleId);
          const modulesData =
            moduleIds.length > 0
              ? await Promise.all(
                  moduleIds.map((id) => ModulesServices.getModuleById(id))
                )
              : await ModulesServices.getAllModules();

          setModules(modulesData);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de supervisores:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cargo, idEmployee]);

  const formatScore = (score: number) =>
    score === 0 ? '0,0' : score?.toFixed(2).replace('.', ',');

  return (
    <S.Wrapper>
      {isLoading ? (
        <S.ViewContainer>
          <ActivityIndicator color="#3E63DD" />
        </S.ViewContainer>
      ) : modules.length === 0 ? (
        <S.ViewContainer>
          <Text>Nenhum módulo disponível</Text>
        </S.ViewContainer>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <S.WrapperView>
            {modules.map((module, index) => (
              <Accordion
                key={index}
                comment={moduleGrade[index]?.supervisorComment || 'Comentários'}
                title={module.name || `Módulo ${index + 1}: Tema`}
                implementation={
                  formatScore(moduleGrade[index]?.implementationScore) || 'X,X'
                }
                knowledge={
                  formatScore(moduleGrade[index]?.knowledgeScore) || 'Y,Y'
                }
              />
            ))}
          </S.WrapperView>
        </ScrollView>
      )}
    </S.Wrapper>
  );
};

export default Mentoring;
