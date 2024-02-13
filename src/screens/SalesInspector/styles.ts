import {
  ScrollView,
  View,
  StatusBar as RNStatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const WrapperTela = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.primary.main};
`;

export const Wrapper = styled(ScrollView)`
  width: 100%;
  height: 100%;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
  position: relative;
  background-color: ${theme.colors.primary.main};
`;

export const DivButtonBack = styled(View)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  background-color: ${theme.colors.secundary.main};
  padding: 20px;
`;

export const ButtonBack = styled(TouchableOpacity)`
  border: none;
`;

export const ImageBtn = styled(Image)`
  width: 24px;
  height: 24px;
`;
