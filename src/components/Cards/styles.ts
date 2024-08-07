import { View, Image, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const DivWrapper = styled(TouchableOpacity)`
  background-color: ${theme.colors.primary.main};
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 7px;
  border-radius: 3px;
`;
export const DivImage = styled(View)`
  width: 56px;
  border-radius: 27px;
  height: 56px;
`;

export const ImageVendedor = styled(Image)`
  width: 56px;
  height: 56px;
`;

export const DivText = styled(View)`
  width: 45%;
`;

export const Name = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  color: #11181c;
  font-family: Poppins;
`;

export const Stage = styled(Text)`
  color: #687076;
  font-size: 12px;
  font-weight: 400;
  font-family: Poppins;
`;

export const StyledText = styled(Text)`
  color: #687076;
  font-size: 12px;
  font-weight: 400;
  font-family: Poppins;
`;

interface DivAvaliaProps {
  nota: number;
  stage: string;
}

const getStageStyle = (stage: string, nota: number) => {
  if (stage === 'Mentoria') {
    return `background-color: ${getColorByNoteDiv(nota)};`;
  }
  return 'background-color: transparent';
};

export const DivAvalia = styled(View)<DivAvaliaProps>`
  background-color: ${({ stage, nota }) =>
    stage === 'Mentoria' ? getColorByNoteDiv(nota) : '#FFF'};
  border-radius: 2px;
  width: 34px;
  height: 32px;
  display: flex;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  ${({ stage, nota }) => getStageStyle(stage, nota)}
`;

const getColorByNoteDiv = (note?: number): string => {
  if (note !== undefined) {
    if (note >= 4) {
      return '#DFF3DF';
    } else if (note >= 3) {
      return '#FFF8BB';
    } else {
      return '#FFF0EE';
    }
  }
};

export const Nota = styled(Text)<DivAvaliaProps>`
  color: ${({ nota }) => getColorByNoteText(nota)};
  display: ${({ stage }) => (stage === 'Visita' ? 'none' : 'flex')};
  font-size: 16px;
  font-weight: 700;
  font-family: Poppins;
`;

const getColorByNoteText = (note?: number): string => {
  if (note !== undefined) {
    if (note >= 4) {
      return '#46A758';
    } else if (note >= 3) {
      return '#F1A10D';
    } else {
      return '#E5484D';
    }
  }
};
