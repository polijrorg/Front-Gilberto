import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: 'center';
  align-items: 'center';
`;

export const ContainerChart = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: auto;

  margin: 0 auto;

  gap: 16px;
`;

export const TitleBar = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
  font-weight: bold;

  text-transform: capitalize;

  margin: 16px 24px;
  align-self: flex-start;
`;

export const ViewWrapper = styled(View)`
  margin: 32px auto;
  width: 100%;
`;

export const WrapperView = styled(ScrollView)`
  display: flex;
  width: 90%;
  height: 100%;
  margin: 16px auto;
  padding: 24px 8px;
  background-color: transparent;
`;

export const VisitTitle = styled(Text)`
  font-size: 20px;
  font-family: PoppinsBold;
  font-weight: bold;
`;

export const NoVisitsContainer = styled(View)`
  width: 100%;
  height: 15%;
  display: flex;

  background-color: red;
  align-items: 'center';
  justify-content: 'center';
`;

export const ButtonIniciar = styled(TouchableOpacity)`
  padding: 8px 24px;
  background-color: #3e63dd;
  width: 90%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 0px auto;
`;

export const TextBtn = styled(Text)`
  font-family: Poppins;
  text-transform: uppercase;
  color: #fff;
  font-size: 16px;
`;
