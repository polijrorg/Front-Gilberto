import React from 'react';
import * as S from './styles';

interface TextProps {
  label: string;
  size?: 'small' | 'medium' | 'large';
  color?: string
  bold?: boolean;
}

const Text: React.FC<TextProps> = ({
  label,
  size = 'medium',
  color = '#11181c',
  bold = false,
}) => {
  return <S.Label size={size} color={color} bold={bold}>{label}</S.Label>;
};

export default Text;
