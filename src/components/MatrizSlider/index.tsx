import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import BarChartComponent from '@components/BarChart';
import * as S from './styles';
import ModulesServices from '@services/ModuleServices';
import ModuleGradeServices from '@services/ModuleGradeService';

const MatrizSlider: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const { width: windowWidth } = Dimensions.get('window');
  
  // Ajuste do estado para corresponder ao tipo esperado
  const [moduleAverages, setModuleAverages] = useState<{ module: string, nameModule: string, average: number }[]>([]);

  const data = ['modulo', 'competencia', 'matrixxz']; // Tipos de gráficos

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / windowWidth);
    console.log('current index:', index);
  };

  const fetchModuleGradesAverages = async () => {
    try {
      const modulesGrades = await ModuleGradeServices.getGradeModuleAll();
  
      const modulesWithAverages = await Promise.all(
        modulesGrades.map(async (module) => {
          const moduleData = await ModulesServices.getModuleById(module.moduleId);
          return {
            module: module.moduleId, // Renomeando para corresponder ao estado
            nameModule: moduleData.name,
            average: module.average,
          };
        })
      );
  
      return modulesWithAverages;
    } catch (error) {
      console.error('Erro ao buscar médias dos módulos:', error);
      throw error;
    }
  };

  useEffect(() => {
    const getModuleAverages = async () => {
      const moduleAveragesData = await fetchModuleGradesAverages();
      setModuleAverages(moduleAveragesData);
    };

    getModuleAverages();
  }, []);

  return (
    <S.Wrapper>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {data.map((type, index) => (
          <View key={index} style={{ width: windowWidth, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#d1d1d1' }}>
            <BarChartComponent type={type} moduleAverages={moduleAverages} />
          </View>
        ))}
      </ScrollView>
    </S.Wrapper>
  );
};

export default MatrizSlider;
