import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(ScrollView)`
  width: 100%;
  height: auto;
  background-color: ${theme.colors.primary.main};
`;
