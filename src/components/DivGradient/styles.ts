import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const DivGradiente = styled(LinearGradient).attrs({
  colors: ['#3EDDAD', '#3E63DD'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  height: 8px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
`;
