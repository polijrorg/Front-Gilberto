import React from 'react';
import * as S from './styles';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

interface BarChartProps {
  type: string;
}

const BarChartComponent: React.FC<BarChartProps> = ({ type }) => {
  const data = {
    labels: ['6', '7', '8', '9', '10'],
    datasets: [
      {
        data: [0, 32, 45, 42, 80, 180],
        colors: [
          (_opacity = 1) => '#338acc',
          (_opacity = 1) => '#065d9e',
          (_opacity = 1) => '#113f61',
          (_opacity = 1) => '#065d9e',
          (_opacity = 1) => '#113f61',
        ],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#F8F9FA',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#F8F9FA',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(104, 112, 118, ${opacity})`,
    strokeWidth: 0,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
  };

  return (
    <S.Container>
      {type === 'modulo' && <S.TitleSlider>Médias por módulo</S.TitleSlider>}
      {type === 'competencia' && <S.TitleSlider>Médias por competência</S.TitleSlider>}
      {type === 'matrixxz' && <S.TitleSlider>Médias por MatrixXZ</S.TitleSlider>}
      <BarChart
        data={data}
        style={{ borderRadius: 4, padding: 8 }}
        width={Dimensions.get('window').width - 50}
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        showValuesOnTopOfBars
        showBarTops={false}
        flatColor
        withInnerLines={false}
        withCustomBarColorFromData
      />
    </S.Container>
  );
};

export default BarChartComponent;
