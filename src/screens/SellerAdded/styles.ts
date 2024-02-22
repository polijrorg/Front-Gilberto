import {
  View,
  Text,
  Image,
  StatusBar as RNStatusBar,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${theme.colors.primary.main};
`;

export const Header = styled(View)`
  height: 60px;
  width: 100%;
  display: flex;
  margin: 0 auto;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.secundary.main};
`;

export const TitleHeader = styled(Text)`
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  font-family: PoppinsBold;
  letter-spacing: 0.5px;
  border-bottom-width: 3px;
  border-bottom-color: #d9e2fc;
  line-height: 56px;
`;

export const BtnBack = styled(TouchableOpacity)`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 10px;
`;

export const ImageHeader = styled(Image)`
  width: 24px;
  height: 24px;
`;
