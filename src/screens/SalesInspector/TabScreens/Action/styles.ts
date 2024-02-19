import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${theme.colors.secundary.main};
`;

export const Header = styled(View)`
  height: 50%;
  width: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const TitleHeader = styled(Text)`
  color: #fff;
  font-weight: 700;
  font-size: 32px;
  font-family: PoppinsBold;
`;

export const ImageHeader = styled(Image)`
  width: 80px;
  height: 80px;
`;
