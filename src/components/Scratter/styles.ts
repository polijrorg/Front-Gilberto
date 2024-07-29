import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 16px 0;
`;

export const TitleSlider = styled(Text)`
  color: #687076;
  font-size: 16px;
  font-weight: 400;
  margin: 16px 32px;
  align-self: flex-start;
  align-items: flex-start;
`;

export const Tooltip = styled(View)`
  position: absolute;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4.65px;
  elevation: 8;
`;

export const CloseButton = styled(TouchableOpacity)`
  align-self: flex-end;
`;

export const CloseButtonText = styled(Text)``;

export const TooltipText = styled(Text)`
  font-size: 14px;
  margin-bottom: 4px;
  color: #242323;
`;
