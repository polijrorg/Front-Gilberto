import * as S from './styles';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';

type IButton = {
  textButton: string;
  loading?: boolean;
  isEnviarDisabled?: boolean;
  onPress: () => void;
};

const DefaultButton: React.FC<IButton> = ({
  textButton,
  loading = false,
  isEnviarDisabled = false,
  onPress,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <S.StyleButton
      activeOpacity={0.8}
      onPressOut={() => setIsPressed(false)}
      isPressed={isPressed}
      disabled={loading || isEnviarDisabled}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <S.StyledHeading>{textButton}</S.StyledHeading>
      )}
    </S.StyleButton>
  );
};

export default DefaultButton;
