import {
  ScrollView,
  View,
  Text,
  Image,
  StatusBar as RNStatusBar,
  TouchableOpacity,
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

export const Header = styled(View)`
  width: 100%;
  height: auto;
  position: relative;
  background-color: #3a5ccc;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const ButtonBack = styled(TouchableOpacity)`
  border: none;
  width: 24px;
  height: 24px;
  position: absolute;
  left: 24px;
`;

export const TextMyTeam = styled(Text)`
  font-weight: 700;
  font-size: 16px;
  color: #fbfcfd;
  letter-spacing: 0.5px;
`;

export const ImageVendedor = styled(Image)`
  width: 24px;
  height: 24px;
`;
