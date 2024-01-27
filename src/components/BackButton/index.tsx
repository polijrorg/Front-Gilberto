import * as S from './styles';
import React, { useState } from 'react';

const BackButton: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <S.StyleButton
      activeOpacity={0.8}
      onPressOut={() => setIsPressed(false)}
      isPressed={isPressed}
    >
      <S.StyledHeading>Voltar</S.StyledHeading>
    </S.StyleButton>
  );
};

export default BackButton;
