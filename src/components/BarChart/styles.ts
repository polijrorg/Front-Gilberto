import { View, Text } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  width: 100%;
  height: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 16px 0;
`;

export const WrapperChart = styled(View)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleSlider = styled(Text)`
  color: #687076;
  font-size: 16px;
  font-weight: 400;
  margin: 5px 0;
  align-self: flex-start;
  align-items: flex-start;
`;
