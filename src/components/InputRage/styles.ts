import { View, Text } from 'react-native';
import styled from 'styled-components/native';

export const Title = styled(Text)`
  font-family: Poppins;
  color: black;
`;
export const Container = styled(View)`
  flex: 1;
`;

export const SliderContainer = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 4px 16px;
  align-items: center;
  gap: 8px;
`;

export const TextLimt = styled(Text)`
  font-family: Poppins;
  font-size: 12px;
`;
