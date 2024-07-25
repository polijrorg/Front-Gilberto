import React, { useState } from 'react';
import { View } from 'react-native';
import * as S from './styles';
import { FontAwesome } from '@expo/vector-icons';
import ISupervisor from '@interfaces/Supervisor';
import ISeller from '@interfaces/Seller';

interface SupervisorState {
  single: ISupervisor | null;
  list: ISupervisor[];
}

interface IDropdownProps {
  supervisors?: SupervisorState;
  onSelectSupervisor?: (supervisor: ISupervisor) => void;
  sellers?: ISeller[];
  onSelectSeller?: (seller: ISeller) => void;
}

const Dropdown: React.FC<IDropdownProps> = ({
  supervisors = { single: null, list: [] },
  onSelectSupervisor,
  sellers = [],
  onSelectSeller,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] =
    useState<ISupervisor | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<ISeller | null>(null);

  const handleSelectSupervisor = (supervisor: ISupervisor) => {
    setSelectedSupervisor(supervisor);
    onSelectSupervisor?.(supervisor);
    setIsOpen(false);
  };

  const handleSelectSeller = (seller: ISeller) => {
    setSelectedSeller(seller);
    onSelectSeller?.(seller);
    setIsOpen(false);
  };

  const renderDropdownItems = () => {
    if (supervisors.list.length > 0) {
      return supervisors.list.map((supervisor, index) => (
        <S.DropdownItem
          key={index}
          onPress={() => handleSelectSupervisor(supervisor)}
        >
          <S.Selected>{supervisor.name}</S.Selected>
        </S.DropdownItem>
      ));
    } else if (sellers.length > 0) {
      return sellers.map((seller, index) => (
        <S.DropdownItem key={index} onPress={() => handleSelectSeller(seller)}>
          <S.Selected>{seller.name}</S.Selected>
        </S.DropdownItem>
      ));
    } else {
      return <S.NoOptionsMessage>Nenhuma opção disponível</S.NoOptionsMessage>;
    }
  };

  return (
    <View>
      <S.DivFields>
        <S.CustomDropdown isOpen={isOpen} setIsOpen={setIsOpen}>
          <S.DropDownButton onPress={() => setIsOpen(!isOpen)}>
            <S.Selected>
              {selectedSupervisor?.name ||
                selectedSeller?.name ||
                'Selecione o responsável'}
            </S.Selected>
            <FontAwesome
              name={isOpen ? 'caret-up' : 'caret-down'}
              size={20}
              color="#687076"
            />
          </S.DropDownButton>
          {isOpen && (
            <S.DropdownList
              maxHeight={
                supervisors.list.length > 1 || sellers.length > 1 ? 300 : null
              }
            >
              {renderDropdownItems()}
            </S.DropdownList>
          )}
        </S.CustomDropdown>
      </S.DivFields>
    </View>
  );
};

export default Dropdown;
