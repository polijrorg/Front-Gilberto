import React from 'react';
import * as S from './styles';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export interface BarChartProps {
  type: string;
  moduleAverages: { module: string, nameModule: string, average: number }[];
}

const BarChartComponent: React.FC<BarChartProps> = ({ type, moduleAverages }) => {  
  const data = {
    labels: moduleAverages.map((item, index) => `${index + 1}`),
    datasets: [
      {
        data: moduleAverages.map(item => Math.min(Math.max(item.average, 0), 5)),
        colors: moduleAverages.map(() => (_opacity = 1) => '#3E63DD'),
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
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
    minValue: 0,
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
        showValuesOnTopOfBars={false} 
        showBarTops={false}
        flatColor
        fromZero
        withInnerLines={false}
        withCustomBarColorFromData
      />
    </S.Container>
  );
};

export default BarChartComponent;
