import React, { useState } from 'react';
import * as S from './styles';
import { StyleSheet, Text } from 'react-native';
import Slider from '@react-native-community/slider';

interface askProps {
  textAsk: string;
  moduleId: string;
  onChangeValue: (moduleId: string, newValue: number) => void;
  initialValue?: number; // Propriedade para receber o valor inicial
}

const InputRange: React.FC<askProps> = ({
  textAsk,
  moduleId,
  onChangeValue,
  initialValue = 1, // Atribui o valor 1 caso initialValue não seja fornecido
}) => {
  const [value, setValue] = useState(initialValue); // Usa initialValue como valor inicial

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
          step={1}
          onValueChange={(newValue) => {
            setValue(newValue);
            onChangeValue(moduleId, newValue);
          }}
        />
        <Text style={styles.sliderValue}>
          {value.toFixed(0).replace('.', ',')}
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
