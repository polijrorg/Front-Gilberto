import { View } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(View)`
  background-color: ${theme.colors.primary.main};
  width: 100%;
  height: 300px; // Altura ajustada para o carrossel
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SectionWrapper = styled.View<{ windowWidth: number }>`
  width: ${({ windowWidth }) => windowWidth}px;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-color: #d1d1d1;
`;

export const ReloadButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #fff1;
  padding: 8px;
  border-radius: 8px;
`;

export const ReloadButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;
