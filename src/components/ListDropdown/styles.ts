import { TouchableOpacity, FlatList, Platform, Image } from 'react-native';
import styled from 'styled-components/native';

export const StyledButton = styled(TouchableOpacity)`
  padding: 10px;
  width: 200px;
  border-radius: 4px;
  background-color: #f1f3f5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${Platform.OS === 'android'
    ? 'elevation: 4;' //NÃO FUNCIONA O BOX-SHADOW, ENT TEM Q FAZER ESSA DISTINÇÃO DE ANDROID E IOS
    : `shadow-color: #000;
       shadow-offset: 0px 3px;
       shadow-opacity: 0.24;
       shadow-radius: 8px;`};
`;

export const ImageVetor = styled(Image)`
  align-self: center;
`;

export const StyledFlatList = styled(FlatList)`
  width: 200px;
  position: absolute;
  top: 40px;
  left: 0;
  padding: 0;
  margin: 0;
  z-index: 1;
`;

export const StyledButtonItem = styled(TouchableOpacity)`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #f1f3f5;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 3px;
`;
