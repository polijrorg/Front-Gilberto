import React, { useState } from 'react';
import * as S from './styles';
import { StyleSheet, Text } from 'react-native';
import Slider from '@react-native-community/slider';

interface askProps {
  textAsk: string;
}

const InputRange: React.FC<askProps> = ({ textAsk }) => {
  const [value, setValue] = useState(1);

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
          onValueChange={(newValue) => setValue(newValue)}
        />
        <Text style={styles.sliderValue}>
          {value !== 1 && value !== 5
            ? value.toFixed(2).replace('.', ',')
            : value.toFixed(0).replace('.', ',')}
        </Text>
      </S.SliderContainer>
    </S.Container>
  );
};

const styles = StyleSheet.create({
  slider: {
    minWidth: '80%',
    height: 40,
  },
  sliderValue: {
    marginLeft: 10,
  },
});

export default InputRange;
