import * as S from './styles';
import React, { useState } from 'react';

type IButton = {
  textButton: String;
};

const DefaultButton: React.FC<IButton> = ({ textButton }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <S.StyleButton
      activeOpacity={0.8}
      onPressOut={() => setIsPressed(false)}
      isPressed={isPressed}
    >
      <S.StyledHeading>{textButton}</S.StyledHeading>
    </S.StyleButton>
  );
};

export default DefaultButton;
