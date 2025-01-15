import { Text as RNText } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Label = styled(RNText)<{ size?: 'small' | 'medium' | 'large'; color?: string; bold?: boolean }>`
  font-family: Poppins;
  text-transform: capitalize;

  ${({ size }) =>
    size === 'small' &&
    css`
      font-size: 14px;
      font-weight: 400;
    `}
    
  ${({ size }) =>
    size === 'medium' &&
    css`
      font-size: 18px;
      font-weight: bold;
    `}
  
  ${({ size }) =>
    size === 'large' &&
    css`
      font-size: 24px;
      font-weight: bold;
    `}
  
  ${({ color }) => color && css`
    color: ${color};
  `}

  ${({ bold }) => bold && css`
    font-weight: bold;
  `}
`;
