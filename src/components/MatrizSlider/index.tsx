import React, { useRef } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import BarChartComponent from '@components/BarChart';
import * as S from './styles';

const MatrizSlider: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const { width: windowWidth } = Dimensions.get('window');

  const data = ['modulo', 'competencia', 'matrixxz']; // Tipos de gráficos

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
        {data.map((type, index) => (
          <View key={index} style={{ width: windowWidth, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#d1d1d1' }}>
            <BarChartComponent type={type} />
          </View>
        ))}
      </ScrollView>
    </S.Wrapper>
  );
};

export default MatrizSlider;
