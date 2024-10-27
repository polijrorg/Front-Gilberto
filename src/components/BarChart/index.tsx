import React from 'react';
import * as S from './styles';
import { Dimensions, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import ScatterPlotComponent, { ScatterPlotProps } from '@components/Scratter';

export interface BarChartProps {
  type: 'modulo' | 'matriz' | string;
  questionsBar?: {
    categoryId: string;
    categoryName: string;
    averageGrade: number;
  }[];
  moduleAverages?: ScatterPlotProps[];
}

const BarChartComponent: React.FC<BarChartProps> = ({
  type,
  questionsBar = [],
  moduleAverages,
}) => {
  const chartWidth = Dimensions.get('window').width - 50;
  const chartHeight = 200;
  const hasBarChartData = questionsBar && questionsBar.length > 0;

  const barChartData = hasBarChartData
    ? {
        labels: questionsBar.map((_item, index) => `${index + 1}`),
        datasets: [
          {
            data: questionsBar.map((item) =>
              Math.min(Math.max(item.averageGrade, 0), 5)
            ),
            colors: questionsBar.map(
              () =>
                (_opacity = 1) =>
                  '#3E63DD'
            ),
          },
        ],
      }
    : null;

  const barChartConfig = {
    backgroundGradientFrom: '#F8F9FA',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#F8F9FA',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(104, 112, 118, ${opacity})`,
    strokeWidth: 0,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
    minValue: 0,
    maxValue: 5,
  };

  return (
    <S.Container>
      {type === 'modulo' && (
        <>
          <S.TitleSlider>Médias por módulo</S.TitleSlider>
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
              fromZero
              flatColor
              fromNumber={5}
              withInnerLines={false}
              withCustomBarColorFromData
            />
          )}
        </>
      )}
      {type === 'matriz' && (
        <ScatterPlotComponent
          moduleAverages={
            moduleAverages as unknown as {
              averageImplementation: number;
              averageKnowledge: number;
              sellerId: string;
            }[]
          }
        />
      )}
    </S.Container>
  );
};

export default BarChartComponent;
