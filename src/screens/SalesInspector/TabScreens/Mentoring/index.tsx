import React, { useEffect, useMemo, useState } from 'react';
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

  // Sorteia módulos por nome antes de renderizar
  const sortedModules = useMemo(
    () => [...modules].sort((a, b) => a.name.localeCompare(b.name)),
    [modules]
  );

  return (
    <S.Wrapper>
      {isLoading ? (
        <S.ViewContainer>
          <ActivityIndicator color="#3E63DD" />
        </S.ViewContainer>
      ) : sortedModules.length === 0 ? (
        <S.ViewContainer>
          <Text>Nenhum módulo disponível</Text>
        </S.ViewContainer>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <S.WrapperView>
            {sortedModules.map((module, index) => (
              <Accordion
                key={module.id || index}
                comment={moduleGrade[index]?.supervisorComment || 'Comentários'}
                title={module.name || `Módulo: Tema`}
                implementation={
                  formatScore(moduleGrade[index]?.implementationScore) || 'N.A'
                }
                knowledge={
                  formatScore(moduleGrade[index]?.knowledgeScore) || 'N.A'
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
