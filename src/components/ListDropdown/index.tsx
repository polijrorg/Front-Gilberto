import React, { useState } from 'react';
import * as S from './styles';
import { View, Text } from 'react-native';

const DropdownSelect = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const dropdownOptions = [
    'Equipe',
    'Período',
    'Visita',
    'Atenção',
    'Sucesso',
    'Data',
    'Supervisor',
  ];

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  return (
    <View>
      <S.StyledButton onPress={toggleDropdown}>
        <Text>{selectedOption || 'Selecione'}</Text>
        <S.ImageVetor source={require('@assets/img/Vector.png')} />
      </S.StyledButton>

      {isDropdownVisible && (
        <S.StyledFlatList
          data={dropdownOptions}
          renderItem={({ item }) => (
            <S.StyledButtonItem
              onPress={() => handleSelectOption(item as string)}
            >
              <Text>{item as string}</Text>
            </S.StyledButtonItem>
          )}
          keyExtractor={(item) => item as string}
        />
      )}
    </View>
  );
};

export default DropdownSelect;
