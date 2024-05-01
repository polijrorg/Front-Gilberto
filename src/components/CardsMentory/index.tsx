/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from './styles';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '@hooks/useAuth';
import { View, TouchableOpacity, Text } from 'react-native';

const CheckBox = ({ onChange }) => {
  const [checked, setChecked] = useState(false);

  const toggleCheckBox = () => {
    setChecked(!checked);
    onChange && onChange(!checked);
  };

  return (
    <TouchableOpacity onPress={toggleCheckBox}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 16,
            height: 16,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: '#687076',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {checked && (
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                backgroundColor: '#687076',
              }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface CardMentoryProps {
  title: string;
  prize: string;
}

const CardsMentory: React.FC<CardMentoryProps> = ({ title, prize }) => {
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(false);

  return (
    <S.StyledWrapper>
      <CheckBox onChange={setSelection} />
      <S.DivText>
        <S.Title>{title}</S.Title>
      </S.DivText>
      <S.DivNota>
        <S.Nota>{prize}</S.Nota>
      </S.DivNota>
    </S.StyledWrapper>
  );
};

export default CardsMentory;
