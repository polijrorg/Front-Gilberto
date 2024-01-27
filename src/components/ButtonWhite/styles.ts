import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

export const StyledHeading = styled(Text)`
  font-size: 12px;
  text-transform: uppercase;
  color: #687076;
  letter-spacing: 0.5px;
  font-weight: 400;
`;

export const StyleButton = styled(TouchableOpacity)<{ isPressed: boolean }>`
  background-color: #f1f3f5;
  width: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  opacity: ${(props) => (props.isPressed ? 0.8 : 1)};
`;
