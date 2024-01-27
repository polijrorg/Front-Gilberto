import * as S from './styles';
import React, { useState } from 'react';

type IbutonWhite = {
  text: string;
};

const ButtonWhite: React.FC<IbutonWhite> = ({ text }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <S.StyleButton
      activeOpacity={0.8}
      onPressOut={() => setIsPressed(false)}
      isPressed={isPressed}
    >
      <S.StyledHeading>{text}</S.StyledHeading>
    </S.StyleButton>
  );
};

export default ButtonWhite;
