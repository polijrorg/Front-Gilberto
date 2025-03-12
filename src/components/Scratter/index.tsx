import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { Dimensions } from 'react-native';
import Svg, { Circle, Line, Text } from 'react-native-svg';
import SellerService from '@services/SellerServices';
import { FontAwesome } from '@expo/vector-icons';
import SupervisorServices from '@services/SupervisorServices';
import User from '@interfaces/User';

export interface ScatterPlotProps {
  moduleAverages:
    | {
        averageImplementation: number;
        averageKnowledge: number;
        sellerId: string;
      }[]
    | null;
  user: User;
}

interface CircleData {
  x: number;
  y: number;
  sellerId: string;
  sellerName: string;
  supervisorName: string;
  averageImplementation: number;
  averageKnowledge: number;
}

const ScatterPlotComponent: React.FC<ScatterPlotProps> = React.memo(({ moduleAverages, user }) => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    name: string;
    supervisorName: string;
    averageImplementation: number;
    averageKnowledge: number;
  } | null>(null);

  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [circlesData, setCirclesData] = useState<CircleData[]>([]);

  const padding = 40;
  const chartWidth = Dimensions.get('window').width - 20;
  const chartHeight = 290;
  const circleRadius = 7;
  const labelOffset = 12;
  const axisLabelOffset = 20;
  const middleLineColor = '#C6D4F9';
  const textColor = '#687076';
  const selectedCircleColor = '#FF6347';

  // Preload seller and supervisor data for each circle
  useEffect(() => {
    const fetchData = async () => {
      if (!moduleAverages) return;
      const dataPromises = moduleAverages.map(async (item) => {
        const x = padding + ((chartWidth - 2 * padding) * (item.averageKnowledge - 1)) / 4;
        const y = chartHeight - padding - ((chartHeight - 2 * padding) * (item.averageImplementation - 1)) / 4;
        try {
          const seller = await SellerService.findSellerById(item.sellerId);
          const supervisor = await SupervisorServices.findByID(seller.supervisorId);
          return {
            x,
            y,
            sellerId: item.sellerId,
            sellerName: seller.name,
            supervisorName: supervisor.name,
            averageImplementation: item.averageImplementation,
            averageKnowledge: item.averageKnowledge,
          };
        } catch (error) {
          console.error('Error fetching data for seller:', item.sellerId, error);
          return null;
        }
      });
      const results = await Promise.all(dataPromises);
      setCirclesData(results.filter((res): res is CircleData => res !== null));
    };

    fetchData();
  }, [moduleAverages, chartWidth, chartHeight, padding]);

  const handleCirclePress = (
    circle: CircleData,
    x: number,
    y: number
  ) => {
    if (tooltip && tooltip.visible && tooltip.x === x && tooltip.y === y) {
      setTooltip(null);
      setSelectedSellerId(null);
    } else {
      setSelectedSellerId(circle.sellerId);
      setTooltip({
        visible: true,
        x,
        y,
        name: circle.sellerName,
        supervisorName: circle.supervisorName,
        averageImplementation: circle.averageImplementation,
        averageKnowledge: circle.averageKnowledge,
      });
    }
  };

  // Create axis elements
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

  const xAxisLabels = Array.from({ length: 5 }).map((_, i) => (
    <Text
      key={`xLabel-${i}`}
      x={padding + ((chartWidth - 2 * padding) * i) / 4}
      y={chartHeight - padding + axisLabelOffset}
      textAnchor="middle"
      fontSize={9}
      fill={textColor}
    >
      {(i + 1).toFixed(1).replace('.', ',')}
    </Text>
  ));
  

  const yAxisLabels = Array.from({ length: 5 }).map((_, i) => (
    <Text
      key={`yLabel-${i}`}
      x={padding - axisLabelOffset}
      y={chartHeight - padding - ((chartHeight - 2 * padding) * i) / 4}
      textAnchor="middle"
      fontSize={9}
      fill={textColor}
    >
      {(i + 1).toFixed(1).replace('.', ',')}
    </Text>
  ));

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
      x={padding + (chartWidth - 2 * padding) / 2}
      y={padding - labelOffset}
      textAnchor="middle"
      fontSize={12}
      fill={textColor}
    >
      Conhecimento
    </Text>
  );

  const adjustTooltipPosition = (tooltipX: number, tooltipY: number) => {
    const tooltipWidth = 200;
    const tooltipHeight = 100;
    const margin = 10;

    let adjustedX = tooltipX;
    let adjustedY = tooltipY + circleRadius + 10;

    if (adjustedX + tooltipWidth > chartWidth - margin) {
      adjustedX = chartWidth - tooltipWidth - margin;
    } else if (adjustedX < margin) {
      adjustedX = margin;
    }

    if (adjustedY + tooltipHeight > chartHeight - margin) {
      if (tooltipY - tooltipHeight - 10 >= margin) {
        adjustedY = tooltipY - tooltipHeight - 10;
      } else {
        adjustedY = chartHeight - tooltipHeight - margin;
      }
    }

    if (adjustedY < margin) {
      adjustedY = margin;
    }

    return { x: adjustedX, y: adjustedY };
  };

  // Pre-calculate tooltip position only once
  const tooltipPosition = tooltip ? adjustTooltipPosition(tooltip.x, tooltip.y) : null;

  return (
    <S.Container>
      <Svg width={chartWidth} height={chartHeight}>
        <>
          {xAxis}
          {xAxisLabels}
          {yAxis}
          {yAxisLabels}
          {circlesData.map((circle) => (
            <Circle
              key={circle.sellerId}
              cx={circle.x}
              cy={circle.y}
              r={circleRadius}
              fill={
                selectedSellerId === circle.sellerId ? selectedCircleColor : '#3E63DD'
              }
              onPressIn={() => handleCirclePress(circle, circle.x, circle.y)}
            />
          ))}
          {knowledgeLine}
          {knowledgeLabel}
          {implementationLine}
          {implementationLabel}
        </>
      </Svg>
      {tooltip?.visible && tooltipPosition && (
        <S.Tooltip
          style={{
            position: 'absolute',
            left: tooltipPosition.x,
            top: tooltipPosition.y,
          }}
        >
          <S.CloseButton onPress={() => { setTooltip(null); setSelectedSellerId(null); }}>
            <S.CloseButtonText>
              <FontAwesome name="close" size={12} color="#750101" />
            </S.CloseButtonText>
          </S.CloseButton>
          <S.TooltipText>
            {tooltip.name}
            {user.job === 'Gerente' && (
              <S.TooltipText>
                {'\n'}Responsável: {tooltip.supervisorName}
              </S.TooltipText>
            )}
            {'\n'}Implementação:{' '}
            {tooltip.averageImplementation.toFixed(1).replace('.', ',')}
            {'\n'}Conhecimento:{' '}
            {tooltip.averageKnowledge.toFixed(1).replace('.', ',')}
          </S.TooltipText>
        </S.Tooltip>
      )}
    </S.Container>
  );
});

export default ScatterPlotComponent;
