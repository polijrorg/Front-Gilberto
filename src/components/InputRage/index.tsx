import React, { useState } from 'react';
import * as S from './styles';
import { StyleSheet, Text } from 'react-native';
import Slider from '@react-native-community/slider';

interface askProps {
  textAsk?: string;
  id: string;
  onChangeValue?: (id: string, newValue: number) => void;
  initialValue?: number;
}

const InputRange: React.FC<askProps> = ({
  textAsk,
  id,
  onChangeValue,
  initialValue = 1,
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <S.Container>
      <S.Title>{textAsk}</S.Title>
      <S.SliderContainer>
        <S.TextLimt>1</S.TextLimt>
        <Slider
          style={styles.slider}
          thumbImage={require('@assets/img/slider.png')}
          minimumValue={1}
          maximumValue={5}
          minimumTrackTintColor="#3E63DD"
          maximumTrackTintColor="#D9E2FC"
          thumbTintColor="#3E63DD"
          value={value}
          onValueChange={(newValue) => {
            setValue(newValue);
            onChangeValue && onChangeValue(id, newValue);
          }}
        />
        <S.SliderValue>
          {value.toFixed(1).replace('.', ',')}
        </S.SliderValue>
      </S.SliderContainer>
    </S.Container>
  );
};

const styles = StyleSheet.create({
  slider: {
    minWidth: '70%',
    height: 40,
  },
});

export default InputRange;
