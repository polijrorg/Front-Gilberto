import {
  Image,
  Text,
  View,
  StatusBar as RNStatusBar,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const StyledHeading = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  font-family: PoppinsBold;
  color: #fff;
  border-bottom-width: 3px;
  border-bottom-color: #d9e2fc;
  letter-spacing: 0.5px;
  line-height: 64px;
`;

export const StyledWrapper = styled(View)`
  width: 100%;
  height: 65px;
  padding: 0 16px;
  background-color: ${theme.colors.secundary.main};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
`;

export const ButtonLogout = styled(TouchableOpacity)`
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: 0;
  outline: none;
`;

export const IconLogout = styled(Image)`
  width: 24px;
  height: 24px;
`;
