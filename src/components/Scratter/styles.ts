import { View, Text } from 'react-native';
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
