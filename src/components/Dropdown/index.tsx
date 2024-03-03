import React, { useState } from 'react';
import { View } from 'react-native';
import * as S from './styles';
import { FontAwesome } from '@expo/vector-icons';
import ISupervisor from '@interfaces/Supervisor';

interface SupervisorState {
  single: ISupervisor | null;
  list: ISupervisor[];
}

type IDropdownProps = {
  supervisors?: SupervisorState;
  onSelectSupervisor?: (supervisor: ISupervisor) => void;
};

const Dropdown: React.FC<IDropdownProps> = ({
  supervisors,
  onSelectSupervisor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState<ISupervisor>();

  const handleSelectSupervisor = (supervisor: ISupervisor) => {
    setSelectedSupervisor(supervisor);
    onSelectSupervisor(supervisor);
    setIsOpen(false);
  };

  return (
    <View>
      <S.DivFileds>
        <S.NameField>Supervisor Responsável</S.NameField>
        <S.CustomDropdown isOpen={isOpen} setIsOpen={setIsOpen}>
          <S.DropDownButton onPress={() => setIsOpen(!isOpen)}>
            <S.Selected>
              {selectedSupervisor?.name
                ? selectedSupervisor?.name
                : 'Selecione o supervisor...'}
            </S.Selected>
            <FontAwesome
              name={isOpen ? 'caret-up' : 'caret-down'}
              size={20}
              color="#687076"
            />
          </S.DropDownButton>
          {isOpen && (
            <S.DropdownList>
              {supervisors && supervisors.list.length > 0 ? (
                supervisors.list.map((supervisor, index) => (
                  <S.DropdownItem
                    key={index}
                    onPress={() => handleSelectSupervisor(supervisor)}
                  >
                    <S.Selected>{supervisor.name}</S.Selected>
                  </S.DropdownItem>
                ))
              ) : (
                <S.DropdownItem
                  onPress={() => handleSelectSupervisor(supervisors?.single)}
                >
                  <S.Selected>{supervisors?.single?.name}</S.Selected>
                </S.DropdownItem>
              )}
            </S.DropdownList>
          )}
        </S.CustomDropdown>
      </S.DivFileds>
    </View>
  );
};

export default Dropdown;
