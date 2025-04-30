import { 
  Text,
  View,
  StatusBar as RNStatusBar,
  TouchableOpacity,
  ActivityIndicator, 
} from "react-native";

import styled from "styled-components/native";

export const WrapperView = styled(View)`
  width: 100%;
  margin-bottom: 10px;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
  display: flex;
`;

export const Loading = styled(ActivityIndicator)`
  margin: 25px auto;
`;

export const Container = styled(View)`
  width: 95%;
  padding: 20px;
`;


export const Title = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0;
  font-family: Poppins;

  text-transform: capitalize;
`;

export const P = styled(Text)`
  font-size: 16px;
  font-family: Poppins;
`;

export const FormButtonsContainer = styled(View)`
  margin: 40px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 90%;
`;

export const ButtonGeneric = styled(TouchableOpacity)`
  padding: 8px 16px;
  border-radius: 4px;

  background-color: #3e63dd;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonGenericText = styled(Text)`
  color: white;
  font-size: 14px;
  font-family: Poppins;
`;