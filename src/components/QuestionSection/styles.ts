import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(View)`
  width: 90%;
  height: auto;
  margin: 0 auto;
`;

export const TemaQuestion = styled(Text)`
  font-family: Poppins;
  font-size: 22px;
  font-style: normal;
  font-weight: bolder;
  margin: 16px 8px;
`;
