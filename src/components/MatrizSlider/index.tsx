import React, { useRef } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import BarChartComponent from '@components/BarChart';
import * as S from './styles';


const MatrizSlider: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const { width: windowWidth } = Dimensions.get('window');

  const data = [0, 1]; // Array de dados do carrossel

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / windowWidth);
    console.log('current index:', index);
  };

  return (
    <S.Wrapper>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {data.map((_, index) => (
          <View key={index} style={{ width: windowWidth, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#d1d1d1' }}>
            <BarChartComponent type="modulo" />
          </View>
        ))}
      </ScrollView>
    </S.Wrapper>
  );
};

export default MatrizSlider;
