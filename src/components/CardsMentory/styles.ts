import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export const StyledWrapper = styled(View)`
  width: 90%;
  height: auto;
  background-color: #f1f3f3;
  border-width: 1px;
  border-color: #8c8c8c;
  margin: 10px auto;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-radius: 8px;
`;

export const Container = styled(View)`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;
  flex-direction: row;
`;

export const DivText = styled(View)`
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 35%;
`;

export const Title = styled(Text)`
  font-size: 12px;
  font-family: Poppins;
  width: 100%;
  padding: 0 4px;
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
