import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  width: 100%;
  height: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 16px 0;
  position: absolute;
`;

export const Button = styled(TouchableOpacity)<{
  Selected: 'check' | 'selected' | 'false';
}>`
  width: 20px;
  height: 20px;
  padding: 0px;
  border-radius: 16px;
  background-color: ${({ Selected }) => {
    switch (Selected) {
      case 'check':
        return '#46A758';
      case 'selected':
        return '#3E63DD';
      case 'false':
        return '#c1c8cd';
      default:
        return '#c1c8cd';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const Crumb = styled(Text)`
  font-size: 12px;
  color: #fff;
`;

export const Separator = styled(Text)`
  font-size: 16px;
  margin: 0 5px;
  color: #999;
`;
