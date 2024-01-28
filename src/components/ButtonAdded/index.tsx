import * as S from './styles';
import React from 'react';

const ButtonAdded: React.FC = () => {
  return (
    <S.StyleButton>
      <S.StyledImage source={require('@assets/img/ButtonAdded/mais.png')} />
    </S.StyleButton>
  );
};

export default ButtonAdded;
