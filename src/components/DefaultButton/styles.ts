import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const StyledHeading = styled(Text)`
  font-size: 12px;
  text-transform: uppercase;
  color: ${theme.colors.text};
`;

export const StyleButton = styled(TouchableOpacity)<{ isPressed: boolean }>`
  background-color: ${theme.colors.secundary.main};
  padding: 8px 16px;
  border-radius: 8px;
  opacity: ${(props) => (props.isPressed ? 0.8 : 1)};
`;
