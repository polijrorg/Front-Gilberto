import React from 'react';
import * as S from './styles';
import { Dimensions } from 'react-native';
import { ScatterChart, Grid } from 'react-native-svg-charts';
import { Circle, G } from 'react-native-svg';

interface BarChartProps {
  type: string;
}

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

const scatterChartData = [
  { x: 1, y: 2 },
  { x: 2, y: 4 },
  { x: 3, y: 6 },
  { x: 4, y: 8 },
  { x: 5, y: 10 },
];

const Decorator = ({ x, y, data }) => {
  return data.map((value, index) => (
    <G key={index}>
      <Circle cx={x(value.x)} cy={y(value.y)} r={5} stroke={'rgb(134, 65, 244)'} fill={'white'} />
    </G>
  ));
};

const BarChartComponent: React.FC<BarChartProps> = ({ type }) => {
  return (
    <S.Container>
      {type === 'modulo' && <S.TitleSlider>Médias por módulo</S.TitleSlider>}
      {type === 'competencia' && <S.TitleSlider>Médias por competência</S.TitleSlider>}
      {type === 'matrixxz' && <S.TitleSlider>Médias por MatrixXZ</S.TitleSlider>}

      {type === 'matrixxz' ? (
        <ScatterChart
          style={{ height: 200, width: Dimensions.get('window').width - 50 }}
          data={scatterChartData}
          svg={{ fill: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
          yAccessor={({ item }) => item.y}
          xAccessor={({ item }) => item.x}
        >
          <Grid />
          <Decorator x={item => item.x} y={item => item.y} data={scatterChartData} />
        </ScatterChart>
      ) : (
        <></> // Renderização vazia para outros tipos, ajuste conforme necessário
      )}
    </S.Container>
  );
};

export default BarChartComponent;
