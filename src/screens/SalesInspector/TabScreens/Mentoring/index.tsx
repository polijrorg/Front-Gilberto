/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, ScrollView } from 'react-native';
import * as S from './styles';
import Accordion from '@components/Accordion';
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
          setIsLoading(false); // Informa que o carregamento foi concluído
        }
      } catch (error) {
        console.error('Erro ao buscar dados de supervisores:', error);
        setIsLoading(false); // Se ocorrer um erro, também encerra o carregamento
      }
    };

    fetchData();
  }, [cargo, idEmployee]);

  return (
    <S.Wrapper>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <ActivityIndicator color="#3E63DD" />
        </View>
      ) : modules.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Text>Nenhum módulo disponível</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <S.WrapperView>
            {modules.map((module, index) => (
              <Accordion
                key={index}
                comment={moduleGrade[index]?.supervisorComment}
                title={
                  `Módulo ${index + 1}: ${module.name}` || 'Módulo X: Tema'
                }
                implementation={
                  moduleGrade[index]?.implementationScore === 0
                    ? '0,0'
                    : moduleGrade[index]?.implementationScore || 'X.X'
                }
                knowledge={
                  moduleGrade[index]?.knowledgeScore === 0
                    ? '0,0'
                    : moduleGrade[index]?.knowledgeScore || 'X.X'
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
