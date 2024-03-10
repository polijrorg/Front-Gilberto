import React, { useState } from 'react';
import * as S from './styles';
import { StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface askProps {
  textAsk: string;
}

const InputRange: React.FC<askProps> = ({ textAsk }) => {
  const [value, setValue] = useState(0);

  return (
    <S.Container>
      <S.Title>{textAsk}</S.Title>
      <S.SliderContainer>
        <S.TextLimt>0</S.TextLimt>
        <Slider
          style={styles.slider}
          thumbImage={require('@assets/img/slider.png')}
          minimumValue={0}
          maximumValue={5}
          minimumTrackTintColor="#3E63DD"
          maximumTrackTintColor="#D9E2FC"
          thumbTintColor="#3E63DD"
          value={value}
          onValueChange={(newValue) => setValue(newValue)}
        />
        <S.TextLimt>5</S.TextLimt>
      </S.SliderContainer>
    </S.Container>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: '80%',
    height: 40,
  },
});

export default InputRange;
