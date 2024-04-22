import React, { useState } from 'react';
import { View } from 'react-native';
import * as S from './styles';
import { FontAwesome } from '@expo/vector-icons';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  placeholder = 'Selecione uma opção',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleSelectOption = (value: string) => {
    setSelectedValue(value);
    onChange && onChange(value);
    setIsOpen(false);
  };

  return (
    <View>
      <S.DivFields>
        <S.CustomDropdown isOpen={isOpen} setIsOpen={setIsOpen}>
          <S.DropDownButton onPress={() => setIsOpen(!isOpen)}>
            <S.Selected>{selectedValue || placeholder}</S.Selected>
            <FontAwesome
              name={isOpen ? 'caret-up' : 'caret-down'}
              size={20}
              color="#687076"
            />
          </S.DropDownButton>
          {isOpen && (
            <S.DropdownList maxHeight={options?.length > 1 ? 200 : null}>
              {options.map((option, index) => (
                <S.DropdownItem
                  key={index}
                  onPress={() => handleSelectOption(option.value)}
                >
                  <S.Selected>{option.label}</S.Selected>
                </S.DropdownItem>
              ))}
            </S.DropdownList>
          )}
        </S.CustomDropdown>
      </S.DivFields>
    </View>
  );
};

export default Select;
