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

type IDropdownProps = {
  supervisors?: SupervisorState;
  onSelectSupervisor?: (supervisor: ISupervisor) => void;
  sellers?: ISeller[];
  onSelectSeller?: (seller: ISeller) => void;
};

const Dropdown: React.FC<IDropdownProps> = ({
  supervisors,
  onSelectSupervisor,
  sellers,
  onSelectSeller,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] =
    useState<ISupervisor | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<ISeller | null>(null);

  const handleSelectSupervisor = (supervisor: ISupervisor) => {
    setSelectedSupervisor(supervisor);
    onSelectSupervisor && onSelectSupervisor(supervisor);
    setIsOpen(false);
  };

  const handleSelectSeller = (seller: ISeller) => {
    setSelectedSeller(seller);
    onSelectSeller && onSelectSeller(seller);
    setIsOpen(false);
  };

  // Verifica se há supervisores ou vendedores disponíveis
  const hasSupervisors = supervisors?.list.length > 0;
  const hasSingleSupervisor = !!supervisors?.single;
  const hasSellers = sellers?.length > 0;

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
              maxHeight={hasSupervisors || hasSellers ? 300 : null}
            >
              {hasSupervisors ? (
                supervisors.list.map((supervisor) => (
                  <S.DropdownItem
                    key={supervisor.id}
                    onPress={() => handleSelectSupervisor(supervisor)}
                  >
                    <S.Selected>{supervisor.name}</S.Selected>
                  </S.DropdownItem>
                ))
              ) : hasSingleSupervisor ? (
                <S.DropdownItem
                  onPress={() => handleSelectSupervisor(supervisors.single!)}
                >
                  <S.Selected>{supervisors.single!.name}</S.Selected>
                </S.DropdownItem>
              ) : hasSellers ? (
                sellers.map((seller) => (
                  <S.DropdownItem
                    key={seller.id}
                    onPress={() => handleSelectSeller(seller)}
                  >
                    <S.Selected>{seller.name}</S.Selected>
                  </S.DropdownItem>
                ))
              ) : (
                <S.DropdownItem disabled>
                  <S.Selected>Nenhuma opção disponível</S.Selected>
                </S.DropdownItem>
              )}
            </S.DropdownList>
          )}
        </S.CustomDropdown>
      </S.DivFields>
    </View>
  );
};

export default Dropdown;
