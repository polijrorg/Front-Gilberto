import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import BarChartComponent from '@components/BarChart';
import * as S from './styles';
import ModulesServices from '@services/ModuleServices';
import ModuleGradeServices from '@services/ModuleGradeService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MatrizSlider: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const { width: windowWidth } = Dimensions.get('window');
  const [moduleAverages, setModuleAverages] = useState<
    { module: string; nameModule: string; average: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const data = ['modulo', 'matrixxz'];

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
          const moduleData = await ModulesServices.getModuleById(
            module.moduleId
          );
          return {
            module: module.moduleId,
            nameModule: moduleData.name,
            average: module.average,
          };
        })
      );
      return modulesWithAverages;
    } catch (error) {
      console.error('Erro ao buscar médias dos módulos:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleReload = async () => {
    setIsLoading(true);
    const moduleAveragesData = await fetchModuleGradesAverages();
    setModuleAverages(moduleAveragesData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moduleAveragesData = await fetchModuleGradesAverages();
        setModuleAverages(moduleAveragesData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <S.Wrapper>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#3E63DD" />
        </View>
      ) : (
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {data.map((type, index) => (
            <View
              key={index}
              style={{
                width: windowWidth,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderColor: '#d1d1d1',
              }}
            >
              <BarChartComponent type={type} moduleAverages={moduleAverages} />
              <TouchableOpacity
                onPress={handleReload}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: '#fff1',
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  <MaterialCommunityIcons
                    name="reload"
                    size={20}
                    color="#3E63DD"
                  />
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </S.Wrapper>
  );
};

export default MatrizSlider;
