import React, { useMemo } from 'react';
import * as S from './styles';
import { Dimensions, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import ScatterPlotComponent, { ScatterPlotProps } from '@components/Scratter';
import User from '@interfaces/User';

export interface BarChartProps {
  type: 'modulo' | 'matriz' | string;
  questionsBar?: {
    categoryId: string;
    categoryName: string;
    averageGrade: number;
  }[];
  moduleAverages?: ScatterPlotProps[];
  user: User;
}

const BarChartComponent: React.FC<BarChartProps> = React.memo(
  ({ type, questionsBar = [], moduleAverages, user }) => {
    const chartWidth = Dimensions.get('window').width - 50;
    const chartHeight = 200;
    const hasBarChartData = questionsBar && questionsBar.length > 0;

    const barColor = (_opacity = 1) => '#3E63DD';

    const barChartData = useMemo(() => {
      return hasBarChartData
        ? {
            labels: questionsBar.map((item) =>  {
              return item.categoryName.slice(0,3);
            }),
            datasets: [
              {
                data: questionsBar.map((item) =>
                  Math.min(Math.max(item.averageGrade, 1), 5)
                ),
                colors: questionsBar.map(() => barColor),
              },
              {
                data: [1]
              }
            ],
          }
        : null;
    }, [questionsBar]);

    const barChartConfig = useMemo(
      () => ({
        backgroundGradientFrom: '#F8F9FA',
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: '#F8F9FA',
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(104, 112, 118, ${opacity})`,
        strokeWidth: 0,
        barPercentage: 0.6,
        useShadowColorFromDataset: false,
        decimalPlaces: 1,
      }),
      []
    );

    return (
      <S.Container>
        <View style={{ display: type === 'modulo' ? 'flex' : 'none' }}>
          <S.TitleSlider>Histórico de Visitas Auditadas</S.TitleSlider>
          {hasBarChartData && barChartData && (
            <BarChart
              data={barChartData}
              width={chartWidth}
              height={chartHeight}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={barChartConfig}
              showValuesOnTopOfBars={false}
              showBarTops={false}
              flatColor
              fromZero
              segments={5}
              fromNumber={5}
              withInnerLines={false}
              withCustomBarColorFromData
            />
          )}
        </View>

        <View style={{ display: type === 'matriz' ? 'flex' : 'none' }}>
          <ScatterPlotComponent
            user={user}
            moduleAverages={
              moduleAverages as unknown as {
                averageImplementation: number;
                averageKnowledge: number;
                sellerId: string;
              }[]
            }
          />
        </View>
      </S.Container>
    );
  }
);

export default BarChartComponent;
