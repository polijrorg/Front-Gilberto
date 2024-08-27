import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as S from './styles';
import BarChartComponent, { BarChartProps } from '@components/BarChart';
import ModuleGradeServices from '@services/ModuleGradeService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import VisitGradeService from '@services/VisitGradesService';
import useAuth from '@hooks/useAuth';
import { ScatterPlotProps } from '@components/Scratter';

const MatrizSlider: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const { width: windowWidth } = Dimensions.get('window');

  const [questionsBar, setQuestionsBar] = useState<
    BarChartProps['questionsBar']
  >([]);
  const [moduleAll, setModuleAll] = useState<ScatterPlotProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { user } = useAuth();
  const data = ['modulo', 'matriz'];

  const fetchModuleGradesAverages = useCallback(async () => {
    try {
      const moduleInfoAll = await ModuleGradeServices.getAllModulesInfo(
        user.id
      );
      setModuleAll(moduleInfoAll);

      const jobToServiceMap: {
        [key: string]: (
          id: string
        ) => Promise<
          { questionId: string; questionName: string; averageGrade: number }[]
        >;
      } = {
        Supervisor: VisitGradeService.getAverageGradesSupervisor,
        Gerente: VisitGradeService.getAverageGradesManager,
      };

      const fetchAverageGrades = jobToServiceMap[user.job];

      if (!fetchAverageGrades) {
        throw new Error(`Invalid job type: ${user.job}`);
      }

      const averageGrades = await fetchAverageGrades(user.id);
      setQuestionsBar(averageGrades);
    } catch (error) {
      console.error('Erro ao buscar médias dos módulos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user.id, user.job]);

  const handleScroll = useCallback(
    (event: { nativeEvent: { contentOffset: { x: any } } }) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / windowWidth);
      setCurrentIndex(index);
    },
    [windowWidth]
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          animated: true,
          x: index * windowWidth,
          y: 0,
        });
      }
    },
    [windowWidth]
  );

  const handleReload = async () => {
    setIsLoading(true);
    try {
      await fetchModuleGradesAverages();
    } catch (error) {
      console.error('Erro ao recarregar os dados:', error);
    } finally {
      scrollToIndex(currentIndex); // Garante que o índice atual seja preservado
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchModuleGradesAverages();
    };

    fetchData();
  }, [fetchModuleGradesAverages]);

  return (
    <S.Wrapper>
      {isLoading ? (
        <S.LoadingContainer>
          <ActivityIndicator size="large" color="#3E63DD" />
        </S.LoadingContainer>
      ) : (
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {data?.map((type, index) => (
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
  modulesInfoAll: ScatterPlotProps[];
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
  const isVisible = currentIndex === sectionIndex;

  return (
    <S.SectionWrapper windowWidth={windowWidth}>
      {isVisible && (
        <BarChartComponent
          type={type}
          moduleAverages={modulesInfoAll}
          questionsBar={questionsBar}
        />
      )}
      <ReloadButton onPress={onReload} />
    </S.SectionWrapper>
  );
};

interface ReloadButtonProps {
  onPress: () => void;
}

const ReloadButton: React.FC<ReloadButtonProps> = ({ onPress }) => {
  return (
    <S.ReloadButton onPress={onPress}>
      <S.ReloadButtonText>
        <MaterialCommunityIcons name="reload" size={20} color="#3E63DD" />
      </S.ReloadButtonText>
    </S.ReloadButton>
  );
};

export default MatrizSlider;
