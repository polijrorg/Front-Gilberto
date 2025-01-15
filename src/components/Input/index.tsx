import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import * as S from './styles';
import Text from '@components/Text';

interface InputProps extends TextInputProps {
  label: string;
  onChangeValue?: (value: string) => void;
  secureTextEntry?: boolean;
  type?: 'text' | 'number' | 'password' | 'email';
  initialValue?: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  onChangeValue,
  secureTextEntry = false,
  type = 'text',
  initialValue = '',
  showPasswordToggle = false,
  onTogglePassword,
  ...rest
}) => {
  const [value, setValue] = useState(initialValue);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (text: string) => {
    setValue(text);
    onChangeValue?.(text);
  };

  const handleTogglePassword = () => {
    if (onTogglePassword) {
      onTogglePassword();
    }
    setShowPassword(!showPassword);
  };

  const keyboardType = type === 'email' ? 'email-address' : type === 'number' ? 'numeric' : 'default';

  return (
    <S.DivFields>
      <Text label={label} size='medium'/>
      <S.DivViewTextInput>
        <S.Input
          {...rest}
          value={value}
          onChangeText={handleChange}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
        />
        {showPasswordToggle && type === 'password' && (
          <S.BtnIconPass onPress={handleTogglePassword}>
            <S.Icon
              source={
                showPassword
                  ? require('@assets/img/olho_aberto.png') // Ajuste o caminho da imagem conforme necessário
                  : require('@assets/img/olho_fechado.png')
              }
            /> 
          </S.BtnIconPass>
        )}
      </S.DivViewTextInput>
    </S.DivFields>
  );
};

export default Input;
