import React from 'react';
import * as S from './styles';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import ScatterPlotComponent from '@components/Scratter';

export interface BarChartProps {
  type: string;
  moduleAverages: { module: string; nameModule: string; average: number }[];
  infoAll:
    | {
        module: string;
        nameModule: string;
        knowledge: number;
        implementation: number;
      }[]
    | null;
}

const BarChartComponent: React.FC<BarChartProps> = ({
  type,
  moduleAverages,
  infoAll,
}) => {
  const chartWidth = Dimensions.get('window').width - 50;
  const chartHeight = 200;

  const barChartData = {
    labels: moduleAverages.map((_item, index) => `${index + 1}`),
    datasets: [
      {
        data: moduleAverages.map((item) =>
          Math.min(Math.max(item.average, 0), 5)
        ),
        colors: moduleAverages.map(
          () =>
            (_opacity = 1) =>
              '#3E63DD'
        ),
      },
    ],
  };

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
        </>
      )}
      {type === 'matriz' && <ScatterPlotComponent moduleAverages={infoAll} />}
    </S.Container>
  );
};

export default BarChartComponent;
