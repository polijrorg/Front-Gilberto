import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export const StyledWrapper = styled(View)`
  width: 95%;
  height: auto;
  background-color: #f1f3f5;
  margin: 10px auto;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-radius: 8px;
`;

export const DivText = styled(View)`
  padding: 8px;
`;

export const Title = styled(Text)`
  font-size: 14px;
  font-family: Poppins;
`;

export const Nota = styled(Text)`
  font-size: 12px;
  color: #3451b2;
  font-family: Poppins;
`;

export const DivNota = styled(View)`
  padding: 4px;
  border-radius: 2px;
  background-color: #e6edfe;
`;
