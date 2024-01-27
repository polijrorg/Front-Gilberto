import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

export const StyledHeading = styled(Text)`
  font-size: 12px;
  text-transform: uppercase;
  color: #e5484d;
`;

export const StyleButton = styled(TouchableOpacity)<{ isPressed: boolean }>`
  background-color: transparent;
  border: 1px solid #e5484d;
  padding: 8px 16px;
  border-radius: 8px;
  opacity: ${(props) => (props.isPressed ? 0.8 : 1)};
`;
