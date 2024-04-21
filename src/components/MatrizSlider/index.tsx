/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import BarChartComponent from '@components/BarChart';
import * as S from './styles';

const MatrizSlider: React.FC = () => {
  return (
    <S.Wrapper>
      <Carousel
        loop
        width={400}
        height={300}
        data={[...new Array(2).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 30 }}>{index}</Text>
          </View>
        )}
      />
    </S.Wrapper>
  );
};

export default MatrizSlider;
