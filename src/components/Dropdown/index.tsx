import React, { useState } from 'react';
import { View } from 'react-native';
import * as S from './styles';
import { FontAwesome } from '@expo/vector-icons';
import ISupervisor from '@interfaces/Supervisor';
import ISeller from '@interfaces/Seller';
import Manager from '@interfaces/Manager';

type IDropdownProps = {
  supervisors?: {
    single: ISupervisor | null;
    list: ISupervisor[];
  };
  managers?: {
    single: Manager | null;
    list: Manager[];
  };
  sellers?: ISeller[];
  selectedSeller?: ISeller | null; // nova prop
  onSelectSupervisor?: (supervisor: ISupervisor) => void;
  onSelectManager?: (manager: Manager) => void;
  onSelectSeller?: (seller: ISeller) => void;
};

const Dropdown: React.FC<IDropdownProps> = ({
  supervisors,
  onSelectSupervisor,
  sellers,
  onSelectSeller,
  managers,
  onSelectManager,
  selectedSeller,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] =
    useState<ISupervisor | null>(null);
  const [oldSelectedSeller, setOldSelectedSeller] = useState<ISeller | null>(null);

  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);

  const handleSelectSupervisor = (supervisor: ISupervisor) => {
    setSelectedSupervisor(supervisor);
    onSelectSupervisor && onSelectSupervisor(supervisor);
    setIsOpen(false);
  };

  const handleSelectManager = (manager: Manager) => {
    setSelectedManager(manager);
    onSelectManager && onSelectManager(manager);
    setIsOpen(false);
  };

  const handleSelectSeller = (seller: ISeller) => {
    if(!selectedSeller) {
      setOldSelectedSeller(seller);
    }
    onSelectSeller && onSelectSeller(seller);
    setIsOpen(false);
  };

  // Verifica se há supervisores ou vendedores disponíveis
  const hasSupervisors = (supervisors?.list?.length ?? 0) > 0;
  const hasSingleSupervisor = !!supervisors?.single;
  const hasSellers = (sellers?.length ?? 0) > 0;

  return (
    <View>
      <S.DivFields>
        <S.CustomDropdown isOpen={isOpen} setIsOpen={setIsOpen}>
          <S.DropDownButton onPress={() => setIsOpen(!isOpen)}>
            <S.Selected>
              {selectedManager?.name ||
                selectedSupervisor?.name ||
                (selectedSeller?.name ?? oldSelectedSeller?.name) ||
                'Selecione o responsável'}
            </S.Selected>
            <FontAwesome
              name={isOpen ? 'caret-up' : 'caret-down'}
              size={20}
              color="#687076"
            />
          </S.DropDownButton>
          {isOpen && (
            <S.DropdownList maxHeight={300}>
              {managers?.list && managers.list.length > 0 ? (
                managers.list.map((manager) => (
                  <S.DropdownItem
                    key={manager.id}
                    onPress={() => handleSelectManager(manager)}
                  >
                    <S.Selected>{manager.name}</S.Selected>
                  </S.DropdownItem>
                ))
              ) : hasSupervisors ? (
                supervisors?.list?.map((supervisor) => (
                  <S.DropdownItem
                    key={supervisor.id}
                    onPress={() => handleSelectSupervisor(supervisor)}
                  >
                    <S.Selected>{supervisor.name}</S.Selected>
                  </S.DropdownItem>
                ))
              ) : hasSingleSupervisor ? (
                <S.DropdownItem
                  onPress={() =>
                    supervisors?.single &&
                    handleSelectSupervisor(supervisors.single)
                  }
                >
                  <S.Selected>
                    {supervisors?.single
                      ? supervisors.single.name
                      : 'Nome não disponível'}
                  </S.Selected>
                </S.DropdownItem>
              ) : hasSellers ? (
                sellers?.map((seller) => (
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
