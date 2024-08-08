import React, { useState } from 'react';
import * as S from './styles';
import { Dimensions } from 'react-native';
import Svg, { Circle, Line, Text } from 'react-native-svg';
import SellerService from '@services/SellerServices';
import { FontAwesome } from '@expo/vector-icons';
import SupervisorServices from '@services/SupervisorServices';
import useAuth from '@hooks/useAuth';

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
    supervisorName: string;
    averageImplementation: number;
    averageKnowledge: number;
  } | null>(null);

  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);

  const { user } = useAuth();

  const padding = 40;
  const chartWidth = Dimensions.get('window').width - 20;
  const chartHeight = 290;
  const circleRadius = 7;
  const labelOffset = 12;
  const axisLabelOffset = 20;
  const middleLineColor = '#C6D4F9';
  const textColor = '#687076';
  const selectedCircleColor = '#FF6347'; // Cor para o ponto selecionado

  // Função para lidar com o clique no ponto
  const handleCirclePress = async (
    supervisorName: string,
    sellerId: string,
    sellerName: string,
    averageImplementation: number,
    averageKnowledge: number,
    x: number,
    y: number
  ) => {
    // Se o tooltip já estiver visível e nas mesmas coordenadas, esconda-o
    if (tooltip && tooltip.visible && tooltip.x === x && tooltip.y === y) {
      setTooltip(null);
      setSelectedSellerId(null); // Resetar seleção ao fechar o tooltip
    } else {
      setSelectedSellerId(sellerId); // Selecionar o ponto

      setTooltip({
        visible: true,
        x,
        y,
        name: sellerName,
        supervisorName: supervisorName,
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
  const circles = moduleAverages?.map(async (item, index) => {
    const x =
      padding + ((chartWidth - 2 * padding) * item.averageKnowledge) / 5;
    const y =
      chartHeight -
      padding -
      ((chartHeight - 2 * padding) * item.averageImplementation) / 5;
    const seller = await SellerService.findSellerById(item.sellerId);
    const supervisor = await SupervisorServices.findByID(seller.supervisorId);
    return (
      <Circle
        key={x}
        cx={x}
        cy={y}
        r={circleRadius}
        fill={
          selectedSellerId === item.sellerId ? selectedCircleColor : '#3E63DD'
        } // Cor do ponto selecionado
        onPressIn={() =>
          handleCirclePress(
            supervisor.name,
            item.sellerId,
            seller.name,
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
    setSelectedSellerId(null); // Resetar seleção ao fechar o tooltip
  };

  // Função para ajustar a posição do tooltip
  const adjustTooltipPosition = (tooltipX: number, tooltipY: number) => {
    const { width: windowWidth, height: windowHeight } =
      Dimensions.get('window');
    const tooltipWidth = 200; // Ajuste conforme necessário
    const tooltipHeight = 100; // Ajuste conforme necessário

    let adjustedX = tooltipX;
    let adjustedY = tooltipY + circleRadius + 10; // Mantenha o tooltip abaixo da bolinha

    // Ajuste horizontal
    if (adjustedX + tooltipWidth > windowWidth) {
      adjustedX = windowWidth - tooltipWidth - 10; // 10px de margem
    }

    // Ajuste vertical
    if (adjustedY + tooltipHeight > windowHeight) {
      adjustedY = windowHeight - tooltipHeight - 10; // 10px de margem
    }

    return { x: adjustedX, y: adjustedY };
  };

  return (
    <S.Container>
      <Svg width={chartWidth} height={chartHeight}>
        <>
          {xAxis}
          {xAxisLabels}
          {yAxis}
          {yAxisLabels}
          {circles}
          {knowledgeLine}
          {knowledgeLabel}
          {implementationLine}
          {implementationLabel}
        </>
      </Svg>
      {tooltip?.visible && (
        <S.Tooltip
          style={{
            left: adjustTooltipPosition(tooltip.x, tooltip.y).x,
            top: adjustTooltipPosition(tooltip.x, tooltip.y).y,
          }}
        >
          <S.CloseButton onPress={handleCloseTooltip}>
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
};

export default ScatterPlotComponent;
