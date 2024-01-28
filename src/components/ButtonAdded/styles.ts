import { TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const StyledImage = styled(Image)`
  width: 12px;
  height: 12px;
`;

export const StyleButton = styled(TouchableOpacity)`
  background-color: ${theme.colors.secundary.main};
  width: 24px;
  height: 24px;
  display: flex;
  padding: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  position: absolute;
  bottom: 24px;
  right: 32px;
  z-index: 1000;
  border: 1px solid #ffffff;
`;
