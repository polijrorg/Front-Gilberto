import { theme } from '@styles/default.theme';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  background-color: ${theme.colors.primary.main};
  height: 100%;
  margin: 0;
`;

export const DivWrapper = styled(ScrollView)`
  width: 100%;
  flex: 1; /* Adicionando flex: 1 para ocupar todo o espaço disponível */
`;
