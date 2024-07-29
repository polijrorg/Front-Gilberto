import React, { useState } from 'react';
import * as S from './styles';
import { Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Circle, Line, Text } from 'react-native-svg';
import SellerService from '@services/SellerServices';
import { FontAwesome } from '@expo/vector-icons';

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
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    name: string;
    averageImplementation: number;
    averageKnowledge: number;
  } | null>(null);

  const padding = 40;
  const chartWidth = Dimensions.get('window').width - 20;
  const chartHeight = 290;
  const circleRadius = 6;
  const labelOffset = 12;
  const axisLabelOffset = 20;
  const middleLineColor = '#C6D4F9';
  const textColor = '#687076';

  // Função para lidar com o clique no ponto
  const handleCirclePress = async (
    event: any,
    sellerId: string,
    averageImplementation: number,
    averageKnowledge: number,
    x: number,
    y: number
  ) => {
    const seller = await SellerService.findSellerById(sellerId);

    // Se o tooltip já estiver visível e nas mesmas coordenadas, esconda-o
    if (tooltip && tooltip.visible && tooltip.x === x && tooltip.y === y) {
      setTooltip(null);
    } else {
      setTooltip({
        visible: true,
        x,
        y,
        name: seller.name,
        averageImplementation,
        averageKnowledge,
      });
    }
  };

  // Eixo X - Conhecimento
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

  // Eixo Y - Implementação
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

  // Rótulos do eixo X - Conhecimento
  const xAxisLabels = Array.from({ length: 6 }).map((_, i) => (
    <Text
      key={`xLabel-${i}`}
      x={padding + ((chartWidth - 2 * padding) * i) / 5}
      y={chartHeight - padding + axisLabelOffset}
      textAnchor="middle"
      fontSize={9}
      fill={textColor}
    >
      {((i / 5) * 5).toFixed(1).replace('.', ',')}
    </Text>
  ));

  // Rótulos do eixo Y - Implementação
  const yAxisLabels = Array.from({ length: 6 }).map((_, i) => (
    <Text
      key={`yLabel-${i}`}
      x={padding - axisLabelOffset}
      y={chartHeight - padding - ((chartHeight - 2 * padding) * i) / 5}
      textAnchor="middle"
      fontSize={9}
      fill={textColor}
    >
      {((i / 5) * 5).toFixed(1).replace('.', ',')}
    </Text>
  ));

  // Linha de Implementação
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

  // Rótulo da Linha de Implementação (Girado 180 graus)
  const implementationLabel = (
    <Text
      x={chartWidth - 80 + labelOffset}
      y={chartHeight - padding - (chartHeight - 2 * padding) / 2}
      textAnchor="start"
      fontSize={12}
      fill={textColor}
      transform={`rotate(90 ${chartWidth - padding + labelOffset},${chartHeight - padding - (chartHeight - 2 * padding) / 2})`}
    >
      Implementação
    </Text>
  );

  // Linha de Conhecimento
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

  // Rótulo da Linha de Conhecimento
  const knowledgeLabel = (
    <Text
      x={padding + (chartWidth - 2 * padding) / 2}
      y={padding - labelOffset}
      textAnchor="middle"
      fontSize={12}
      fill={textColor}
    >
      Conhecimento
    </Text>
  );

  // Circulos
  const circles = moduleAverages.map((item, index) => {
    const x =
      padding + ((chartWidth - 2 * padding) * item.averageKnowledge) / 5;
    const y =
      chartHeight -
      padding -
      ((chartHeight - 2 * padding) * item.averageImplementation) / 5;
    return (
      <Circle
        key={index}
        cx={x}
        cy={y}
        r={circleRadius}
        fill="#3E63DD"
        onPress={(event) =>
          handleCirclePress(
            event,
            item.sellerId,
            item.averageImplementation,
            item.averageKnowledge,
            x,
            y
          )
        }
      />
    );
  });

  const handleCloseTooltip = () => {
    setTooltip(null);
  };

  return (
    <S.Container>
      <Svg width={chartWidth} height={chartHeight}>
        {xAxis}
        {xAxisLabels}
        {yAxis}
        {yAxisLabels}
        {circles}
        {knowledgeLine}
        {knowledgeLabel}
        {implementationLine}
        {implementationLabel}
      </Svg>
      {tooltip?.visible && (
        <S.Tooltip
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          <S.CloseButton onPress={handleCloseTooltip}>
            <S.CloseButtonText>
              <FontAwesome name="close" size={12} color="#750101" />
            </S.CloseButtonText>
          </S.CloseButton>
          <S.TooltipText>{tooltip.name}</S.TooltipText>
          <S.TooltipText>
            Implementação:{' '}
            {tooltip.averageImplementation.toFixed(1).replace('.', ',')}
          </S.TooltipText>
          <S.TooltipText>
            Conhecimento:{' '}
            {tooltip.averageKnowledge.toFixed(1).replace('.', ',')}
          </S.TooltipText>
        </S.Tooltip>
      )}
    </S.Container>
  );
};

export default ScatterPlotComponent;
