import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import BarChartComponent, { BarChartProps } from '@components/BarChart';
import * as S from './styles';
import ModuleGradeServices from '@services/ModuleGradeService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import VisitGradeService from '@services/VisitGradesService';

const MatrizSlider: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const { width: windowWidth } = Dimensions.get('window');
  const [questionsBar, setQuestionsBar] = useState<
    BarChartProps['questionsBar']
  >([]);
  const [moduleAll, setModuleAll] = useState<
    | {
        module: string;
        nameModule: string;
        knowledge: number;
        implementation: number;
      }[]
    | null
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para controlar o índice atual do slider

  const data = ['modulo', 'matriz'];

  const fetchModuleGradesAverages = async () => {
    try {
      const moduleInfoAll = await ModuleGradeServices.getAllModulesInfo();
      setModuleAll(moduleInfoAll);
      const averageGrades = await VisitGradeService.getAverageGrades();
      setQuestionsBar(averageGrades);
      return averageGrades;
    } catch (error) {
      console.error('Erro ao buscar médias dos módulos:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / windowWidth);
    setCurrentIndex(index); // Atualiza o índice atual do slider
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        animated: true,
        x: index * windowWidth,
        y: 0,
      });
    }
  };

  const handleReload = async () => {
    setIsLoading(true);
    try {
      const averageGrades = await fetchModuleGradesAverages();
      setQuestionsBar(averageGrades);
    } catch (error) {
      console.error('Erro ao recarregar os dados:', error);
    } finally {
      setIsLoading(false);
      scrollToIndex(currentIndex); // Após recarregar, volta para o índice atual do slider
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const averageGrades = await fetchModuleGradesAverages();
        setQuestionsBar(averageGrades);
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
            <BarChartSection
              key={index}
              windowWidth={windowWidth}
              type={type}
              questionsBar={questionsBar}
              onReload={handleReload}
              currentIndex={currentIndex}
              sectionIndex={index}
              modulesInfoAll={moduleAll}
            />
          ))}
        </ScrollView>
      )}
    </S.Wrapper>
  );
};

interface BarChartSectionProps {
  windowWidth: number;
  type: string;
  questionsBar: BarChartProps['questionsBar'];
  onReload: () => void;
  currentIndex: number;
  sectionIndex: number;
  modulesInfoAll:
    | {
        module: string;
        nameModule: string;
        knowledge: number;
        implementation: number;
      }[]
    | null;
}

const BarChartSection: React.FC<BarChartSectionProps> = ({
  windowWidth,
  type,
  questionsBar,
  onReload,
  currentIndex,
  sectionIndex,
  modulesInfoAll,
}) => {
  // Verifica se esta seção é a seção atualmente visível
  const isVisible = currentIndex === sectionIndex;

  return (
    <View
      style={{
        width: windowWidth,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#d1d1d1',
      }}
    >
      {isVisible && (
        <BarChartComponent
          type={type}
          infoAll={modulesInfoAll}
          questionsBar={questionsBar}
        />
      )}
      <ReloadButton onPress={onReload} />
    </View>
  );
};

interface ReloadButtonProps {
  onPress: () => void;
}

const ReloadButton: React.FC<ReloadButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
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
        <MaterialCommunityIcons name="reload" size={20} color="#3E63DD" />
      </Text>
    </TouchableOpacity>
  );
};

export default MatrizSlider;
