import * as S from './styles';
import React, { useState } from 'react';

type IbutonWhite = {
  text: string;
  duty?: () => void;
};

const ButtonWhite: React.FC<IbutonWhite> = ({ text, duty }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <S.StyleButton
      activeOpacity={0.8}
      onPressOut={() => setIsPressed(false)}
      isPressed={isPressed}
      onPress={duty}
    >
      <S.StyledHeading>{text}</S.StyledHeading>
    </S.StyleButton>
  );
};

export default ButtonWhite;
