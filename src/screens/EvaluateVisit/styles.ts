import {
  TouchableOpacity,
  StatusBar as RNStatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { Text } from 'react-native';
import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';

export const WrapperView = styled(View)`
  width: 100%;
  height: 100vh;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
  display: flex;
`;

export const Title = styled(Text)`
  font-family: Poppins;
  font-size: 24px;
  font-weight: bold;
  text-transform: capitalize;
  margin: 16px 0;
`;

export const ContainerFields = styled(ScrollView)`
  max-width: 100%;

  max-height: auto !important;

  display: flex;
  padding: 8px 4px;

  gap: 16px;
`;

export const DivSellerInfo = styled(View)`
  width: 100%;
  height: auto;
  margin: 0 auto;
  margin-top: 64px;
  display: flex;
  flex-direction: row;
  padding: 4px 20%;
  align-items: center;
  justify-content: space-around;
`;

export const Wrapper = styled(View)`
  width: 100%;
  height: auto;
`;

export const TemaQuestion = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
`;

export const DivSellerImage = styled(View)`
  width: 64px;
  height: 64px;
`;

export const ImageSeller = styled(Image)`
  width: 64px;
  height: 64px;
`;

export const DivInfoSeller = styled(View)`
  width: 100%;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  padding: 4px;
`;

export const InfoSeller = styled(Text)`
  font-size: 18px;
  max-width: 75%;
  font-weight: bold;
  text-transform: uppercase;
  font-family: Poppins;
  margin-left: 24px;
`;

export const DivContainer = styled(ScrollView)`
  width: 100%;
  height: 100%;
  margin: 10px auto;
  padding: 16px 8px;
`;

export const TitleInput = styled(Text)`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  margin: 8px 0;
`;

export const Input = styled(TextInput)`
  font-family: Poppins;
  max-width: 100%;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: #f1f3f5;
  border-width: 1px;
  border-color: #d7dbdf;
  font-size: 12px;
  font-weight: 400;
  color: #687076;
`;

export const ButtonFirst = styled(TouchableOpacity)`
  padding: 8px 24px;
  background-color: #3e63dd;
  width: 100%;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  margin-top: 80%;
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

export const Outline = styled(TouchableOpacity)`
  padding: 8px 24px;
  width: 90%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 0px auto;
  border-width: 1px;
  border-color: #3451b2;
`;

export const TextBtnNova = styled(Text)`
  font-family: Poppins;
  text-transform: uppercase;
  color: #3451b2;
  font-size: 16px;
`;

export const ContainerChart = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90%;

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

export const ContainerButton = styled(View)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  height: auto;

  gap: 16px;

  padding: 16px 0;
`;

export const ContainerOverView = styled(View)`
  width: auto;
  height: auto;

  margin: 0 20px;

  align-self: flex-start;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  flex-direction: row;

  padding: 16px 0;
`;

export const TitleOverView = styled(Text)`
  font-family: Poppins;
  font-size: 14px;
  font-weight: bold;

  margin: 0 8px;

  text-transform: capitalize;
`;

export const BtnOverView = styled(TouchableOpacity)`
  padding: 8px 16px;
  width: auto;
  height: auto;

  border-width: 0.5px;
  border-color: #3451b2;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: row;

  border-radius: 8px;

  margin: 0px auto;
`;

export const BtnFinished = styled(TouchableOpacity)`
  padding: 8px 24px;
  background-color: #3e63dd;
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 0px auto;
`;
