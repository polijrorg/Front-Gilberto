import React from 'react';
import * as S from './styles';
import { Dimensions } from 'react-native';
import Svg, { Circle, Line, Text } from 'react-native-svg';

export interface ScatterPlotProps {
  moduleAverages:
    | {
        averageImplementation: number;
        averageKnowledge: number;
        sellerId: string;
      }[]
    | null;
}

const ScatterPlotComponent: React.FC<ScatterPlotProps> = ({
  moduleAverages,
}) => {
  const padding = 40; // Espaçamento interno do gráfico
  const chartWidth = Dimensions.get('window').width - 50; // Largura do gráfico
  const chartHeight = 270; // Altura do gráfico
  const circleRadius = 5; // Raio do círculo que representa cada ponto
  const labelOffset = 10; // Espaçamento entre os rótulos e os eixos
  const axisLabelOffset = 20; // Distância das linhas de indicação aos eixos
  const middleLineColor = '#C6D4F9'; // Cor das linhas de meio
  const textColor = '#687076'; // Cor dos textos

  // Eixos X e Y do gráfico de dispersão
  const xAxis = (
    <Line
      x1={padding}
      y1={chartHeight - padding}
      x2={chartWidth - padding}
      y2={chartHeight - padding}
      stroke={middleLineColor}
      strokeWidth={1}
    />
  );

  const yAxis = (
    <Line
      x1={padding}
      y1={padding}
      x2={padding}
      y2={chartHeight - padding}
      stroke={middleLineColor}
      strokeWidth={1}
    />
  );

  // Rótulos e marcadores dos eixos
  const yAxisLabels = Array.from({ length: 6 }).map((_, i) => (
    <Text
      key={`yLabel-${i}`}
      x={padding - labelOffset}
      y={chartHeight - padding - ((chartHeight - 2 * padding) * i) / 5}
      textAnchor="middle"
      alignmentBaseline="middle"
      fontSize={10}
      fill={textColor}
    >
      {((i / 5) * 4).toFixed(1)} {/* Ajuste para mostrar valores de 0 a 4 */}
    </Text>
  ));

  const xAxisLabels = Array.from({ length: 6 }).map((_, i) => (
    <Text
      key={`xLabel-${i}`}
      x={padding + ((chartWidth - 2 * padding) * i) / 5}
      y={chartHeight - padding + labelOffset * 2}
      textAnchor="middle"
      fontSize={10}
      fill={textColor}
    >
      {((i / 5) * 4).toFixed(1)} {/* Ajuste para mostrar valores de 0 a 4 */}
    </Text>
  ));

  // Linha de indicação "Implementation"
  const implementationLine = (
    <Line
      x1={padding}
      y1={chartHeight - padding - (chartHeight - 2 * padding) / 2}
      x2={chartWidth - padding}
      y2={chartHeight - padding - (chartHeight - 2 * padding) / 2}
      stroke={middleLineColor}
      strokeWidth={1}
    />
  );

  const implementationLabel = (
    <Text
      x={chartWidth - padding}
      y={chartHeight - padding - (chartHeight - 2 * padding) / 2 + labelOffset}
      textAnchor="end"
      alignmentBaseline="middle"
      fontSize={10}
      fill={textColor}
    >
      Implementação
    </Text>
  );

  // Linha de indicação "Knowledge"
  const knowledgeLine = (
    <Line
      x1={padding + (chartWidth - 2 * padding) / 2}
      y1={padding}
      x2={padding + (chartWidth - 2 * padding) / 2}
      y2={chartHeight - padding}
      stroke={middleLineColor}
      strokeWidth={1}
    />
  );

  const knowledgeLabel = (
    <Text
      x={padding + (chartWidth - 2 * padding) / 2 - labelOffset}
      y={padding - 10}
      textAnchor="middle"
      alignmentBaseline="middle"
      fontSize={10}
      fill={textColor}
    >
      Conhecimento
    </Text>
  );

  // Cálculo das coordenadas para os círculos
  const circles = moduleAverages.map((item, index) => {
    const x =
      padding + ((chartWidth - 2 * padding) * item.averageImplementation) / 4;
    const y =
      chartHeight -
      padding -
      ((chartHeight - 2 * padding) * item.averageKnowledge) / 4;
    return <Circle key={index} cx={x} cy={y} r={circleRadius} fill="#3E63DD" />;
  });

  return (
    <S.Container>
      <Svg width={chartWidth} height={chartHeight}>
        {xAxis}
        {xAxisLabels}
        {yAxis}
        {yAxisLabels}
        {circles}
        {implementationLine}
        {implementationLabel}
        {knowledgeLine}
        {knowledgeLabel}
      </Svg>
    </S.Container>
  );
};

export default ScatterPlotComponent;
