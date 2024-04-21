import React from 'react';
import * as S from './styles';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

interface BarChartProps {}

const BarChartComponent: React.FC<BarChartProps> = ({}) => {
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
      <S.TitleSlider>Matriz IC Implementação | Conhecimento</S.TitleSlider>
      <S.WrapperChart>
        <BarChart
          data={data}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ borderRadius: 4, padding: 12 }}
          width={Dimensions.get('window').width - 90}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          showValuesOnTopOfBars
          showBarTops={false}
          flatColor
          withInnerLines={false}
          withCustomBarColorFromData
        />
      </S.WrapperChart>
    </S.Container>
  );
};

export default BarChartComponent;
