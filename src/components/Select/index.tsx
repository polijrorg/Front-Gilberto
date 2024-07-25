import React, { useState } from 'react';
import { View } from 'react-native';
import * as S from './styles';
import { FontAwesome } from '@expo/vector-icons';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options?: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  options = [],
  onChange,
  placeholder = 'Selecione uma opção',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedLabel, setSelectedLabel] = useState<string>('');

  const handleSelectOption = (label: string, value: string) => {
    setSelectedLabel(label);
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <S.ViewWrapper>
      <S.DivFields>
        <S.CustomDropdown isOpen={isOpen} setIsOpen={setIsOpen}>
          <S.DropDownButton onPress={() => setIsOpen(!isOpen)}>
            <S.Selected>{selectedLabel || placeholder}</S.Selected>
            <FontAwesome
              name={isOpen ? 'caret-up' : 'caret-down'}
              size={20}
              color="#687076"
            />
          </S.DropDownButton>
          {isOpen && (
            <S.DropdownList maxHeight={options.length > 1 ? 300 : null}>
              {options.length > 0 ? (
                options.map((option, index) => (
                  <S.DropdownItem
                    key={index}
                    onPress={() =>
                      handleSelectOption(option.label, option.value)
                    }
                  >
                    <S.Selected>{option.label}</S.Selected>
                  </S.DropdownItem>
                ))
              ) : (
                <S.NoOptionsMessage>
                  Nenhuma opção disponível
                </S.NoOptionsMessage>
              )}
            </S.DropdownList>
          )}
        </S.CustomDropdown>
      </S.DivFields>
    </S.ViewWrapper>
  );
};

export default Select;
