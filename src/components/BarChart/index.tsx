import React from 'react';
import * as S from './styles';
import { Dimensions } from 'react-native';
import Svg, { Circle, Line, Text } from 'react-native-svg';
import { BarChart } from 'react-native-chart-kit';

export interface BarChartProps {
  type: string;
  moduleAverages: { module: string; nameModule: string; average: number }[];
}

const BarChartComponent: React.FC<BarChartProps> = ({
  type,
  moduleAverages,
}) => {
  const padding = 20; // Espaçamento interno do gráfico
  const chartWidth = Dimensions.get('window').width - 50; // Largura do gráfico
  const chartHeight = 200; // Altura do gráfico
  const circleRadius = 5; // Raio do círculo que representa cada ponto

  // Configuração do gráfico de barras
  const barChartData = {
    labels: moduleAverages.map((item, index) => `${index + 1}`),
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

  // Eixos X e Y do gráfico de dispersão
  const xAxis = (
    <Line
      x1={padding}
      y1={chartHeight - padding}
      x2={chartWidth - padding}
      y2={chartHeight - padding}
      stroke="black"
      strokeWidth={1}
    />
  );

  const yAxis = (
    <Line
      x1={padding}
      y1={padding}
      x2={padding}
      y2={chartHeight - padding}
      stroke="black"
      strokeWidth={1}
    />
  );

  const yAxisLabels = Array.from({ length: 6 }).map((_, i) => (
    <Text
      key={`yLabel-${i}`}
      x={padding - 10}
      y={chartHeight - padding - ((chartHeight - 2 * padding) * i) / 5}
      textAnchor="end"
      alignmentBaseline="middle"
      fontSize={10}
      fill="#555"
    >
      {5 - i}
    </Text>
  ));

  const xAxisLabels = barChartData.labels.map((label, index) => (
    <Text
      key={`xLabel-${index}`}
      x={
        padding +
        ((chartWidth - 2 * padding) * index) / (moduleAverages.length - 1)
      }
      y={chartHeight - padding + 16}
      textAnchor="middle"
      fontSize={10}
      fill="#555"
    >
      {label}
    </Text>
  ));

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
      {type === 'matriz' && (
        <>
          <S.TitleSlider>Matriz IC Implementação | Conhecimento</S.TitleSlider>
          <Svg width={chartWidth} height={chartHeight}>
            {xAxis}
            {xAxisLabels}
            {yAxis}
            {yAxisLabels}
            {moduleAverages.map((item, index) => (
              <Circle
                key={index}
                cx={
                  padding +
                  ((chartWidth - 2 * padding) * index) /
                    (moduleAverages.length - 1)
                }
                cy={
                  chartHeight -
                  padding -
                  ((chartHeight - 2 * padding) * item.average) / 5
                }
                r={circleRadius}
                fill="#3E63DD"
              />
            ))}
          </Svg>
        </>
      )}
    </S.Container>
  );
};

export default BarChartComponent;
