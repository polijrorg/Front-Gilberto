import * as S from './styles';
import React from 'react';
import TapRoutes from '@routes/StackSalesInspector/salesInspector.routes';
import { NavigationContainer } from '@react-navigation/native';

const MenuSalesInspector: React.FC = () => {
  return (
    <>
      <S.Wrapper>
        <NavigationContainer independent={true}>
          <TapRoutes />
        </NavigationContainer>
      </S.Wrapper>
    </>
  );
};

export default MenuSalesInspector;
