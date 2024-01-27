import { View, Text } from 'react-native';
import styled from 'styled-components/native';

export const ContainerActions = styled(View)`
  width: 100%;
  height: auto;
  padding: 10px 16px;
  margin: 8px 0;
`;

export const TitleActions = styled(Text)`
  color: #687076;
  font-size: 16px;
  font-weight: 400;
  padding: 0px 18px;
`;

export const DivActions = styled(View)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 18px 0;
  padding: 0 5px;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 16px;
`;
