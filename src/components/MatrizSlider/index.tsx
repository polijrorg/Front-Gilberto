import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as S from './styles';
import BarChartComponent, { BarChartProps } from '@components/BarChart';
import ModuleGradeServices from '@services/ModuleGradeService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import VisitGradeService from '@services/VisitGradesService';
import { ScatterPlotProps } from '@components/Scratter';
import ITemplateVisit from '@interfaces/Visit/TemplateVisit';
import VisitService from '@services/VisitService';
import User from '@interfaces/User';

interface matrizSliderProps{
  user: User;
}

const MatrizSlider: React.FC<matrizSliderProps> = ({
  user
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const { width: windowWidth } = Dimensions.get('window');

  const [questionsBar, setQuestionsBar] = useState<
    BarChartProps['questionsBar']
  >([]);
  const [moduleAll, setModuleAll] = useState<ScatterPlotProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState<ITemplateVisit[]>([]);

  const data = ['modulo', 'matriz'];
  
  const fetchModuleGradesAverages = useCallback(async () => {
    setIsLoading(true);
    setMessage('');
    try {
      // 1) Fetch templates
      let templates: ITemplateVisit[] = [];
      if (user.job === 'Supervisor') {
        templates = await VisitService.getTemplateByManagerId(user.managerId);
      } else if (user.job === 'Gerente') {
        templates = await VisitService.getTemplateByManagerId(user.id);
      }
      if (templates.length === 0 && user.companyId) {
        templates = await VisitService.getTemplateByCompanyId(user.companyId);
      }

      // 2) If no templates, clear and exit early
      if (templates.length === 0) {
        setTemplate([]);
        setQuestionsBar([]);
        return;
      }

      // 3) Save the first template for UI
      const selectedTemplate = templates[0];
      setTemplate([selectedTemplate]);

      // 4) Fetch module info once
      const moduleInfoAll = await ModuleGradeServices.getAllModulesInfo(user.id);
      setModuleAll(moduleInfoAll);

      // 5) Choose the correct VisitGradeService method
      const jobToServiceMap: Record<string, typeof VisitGradeService.getAverageGradesSupervisor> = {
        Supervisor: VisitGradeService.getAverageGradesSupervisor,
        Gerente:    VisitGradeService.getAverageGradesManager,
      };
      const fetchAverageGrades = jobToServiceMap[user.job];
      if (!fetchAverageGrades) {
        throw new Error(`Invalid job type: ${user.job}`);
      }

      // 6) Fetch averages using the freshly fetched template ID
      const averageGrades = await fetchAverageGrades(user.id, selectedTemplate.id);

      // 7) Only update state if really changed
      setQuestionsBar(prev => {
        const prevJson = JSON.stringify(prev);
        const newJson  = JSON.stringify(averageGrades);
        return prevJson === newJson ? prev : averageGrades;
      });
    } catch (err: any) {
      setMessage(err?.response?.data?.message ?? err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // kick off on mount (and whenever `user` changes)
  useEffect(() => {
    fetchModuleGradesAverages();
  }, [fetchModuleGradesAverages]);

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
          <ActivityIndicator color="#3E63DD" />
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
            user={user}
              key={index}
              windowWidth={windowWidth}
              type={type}
              questionsBar={questionsBar}
              onReload={handleReload}
              currentIndex={currentIndex}
              sectionIndex={index}
              modulesInfoAll={moduleAll}
              message={message}
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
  message?: string;
  user: User;
}

const BarChartSection: React.FC<BarChartSectionProps> = ({
  windowWidth,
  type,
  questionsBar,
  onReload,
  currentIndex,
  sectionIndex,
  modulesInfoAll,
  message,
  user
}) => {
  const isVisible = currentIndex === sectionIndex;

  return (
    <S.SectionWrapper windowWidth={windowWidth}>
      {message ? (
        <S.MassageContainer>
          <S.Title>Nenhuma nota para vendedores</S.Title>
        </S.MassageContainer>
      ) : (
        isVisible && (
          <BarChartComponent
            user={user}
            type={type}
            moduleAverages={modulesInfoAll}
            questionsBar={questionsBar}
          />
        )
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
