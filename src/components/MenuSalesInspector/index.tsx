import * as S from './styles';
import React, { useState } from 'react';

const MenuSalesInspector: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handlePress = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <S.Menu>
      <S.ButtonItem
        isSelected={selectedItem === 'mentoria'}
        onPress={() => handlePress('mentoria')}
      >
        <S.TextItem>Mentoria</S.TextItem>
      </S.ButtonItem>

      <S.ButtonItem
        isSelected={selectedItem === 'visita'}
        onPress={() => handlePress('visita')}
      >
        <S.TextItem>Visita</S.TextItem>
      </S.ButtonItem>

      <S.ButtonItem
        isSelected={selectedItem === 'planos'}
        onPress={() => handlePress('planos')}
      >
        <S.TextItem>Planos de ação</S.TextItem>
      </S.ButtonItem>
    </S.Menu>
  );
};

export default MenuSalesInspector;
