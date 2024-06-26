import styled from 'styled-components/native';
import { Text, View } from 'react-native';

export const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const TitleSlider = styled(Text)`
  font-size: 18px;
  color: #333;
  margin-bottom: 16px;
  font-weight: bold;
`;

export const Wrapper = styled(View)`
  background-color: #f8f9fa;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
