import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HeaderPages from '@components/HeaderPages';
import Dropdown from '@components/Dropdown';
import SellerService from '@services/SellerServices';
import ModulesServices from '../../services/ModuleServices';
import { useNavigation } from '@react-navigation/native';
import * as S from './styles';
import ISeller from '@interfaces/Seller';
import IModule from '@interfaces/Module';
import User from '@interfaces/User';

interface EvaluateMentoringProps {
  user: User
}

const EvaluateMentoring:React.FC<EvaluateMentoringProps> = ({user}) => {
  const navigation = useNavigation();
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [modules, setModules] = useState<IModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeller, setSelectedSeller] = useState<ISeller | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.job === 'Supervisor') {
          setLoading(true);
          const [sellerData, modulesData] = await Promise.all([
            SellerService.getAllSellerFromSupervisor(user.id),
            ModulesServices.getAllModules(),
          ]);
          const mentoringSellers = sellerData.filter(
            (seller) => seller.stage === 'Mentoria'
          );
          setSellers(mentoringSellers);
          setModules(modulesData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user.companyId, user.id, user.job]);

  useEffect(() => {
    // Atualiza a disponibilidade do botão com base no vendedor selecionado
    setButtonDisabled(selectedSeller === null);
  }, [selectedSeller]);

  const handleSelectSeller = (seller: ISeller) => {
    setSelectedSeller(seller);
  };

  const handleSetAsk = () => {
    navigation.navigate('AskEvaluateMentoring', {
      seller: selectedSeller,
    });
  };

  return (
    <>
      <StatusBar backgroundColor={'#3E63DD'} />
      <S.Wrapper>
        <HeaderPages title="Avaliar Mentoreado" />
        <S.Container>
          <SellerSelection
            sellers={sellers}
            onSelectSeller={handleSelectSeller}
          />
          <ModuleList loading={loading} modules={modules} />
        </S.Container>
      </S.Wrapper>
      <EvaluationButton onPress={handleSetAsk} disabled={buttonDisabled} />
    </>
  );
};

interface SellerSelectionProps {
  sellers: ISeller[];
  onSelectSeller: (seller: ISeller) => void;
}

const SellerSelection: React.FC<SellerSelectionProps> = ({
  sellers,
  onSelectSeller,
}) => (
  <S.DivContainerSeller>
    <S.NameField>Nome do Vendedor</S.NameField>
    <Dropdown sellers={sellers} onSelectSeller={onSelectSeller} />
  </S.DivContainerSeller>
);

interface ModuleListProps {
  loading: boolean;
  modules: IModule[];
}

const ModuleList: React.FC<ModuleListProps> = ({ loading, modules }) => (
  <S.DivContainerSeller>
    <S.NameField>Veja quais módulos estão disponíveis</S.NameField>
    <S.ContainerButton>
      {loading ? (
        <ActivityIndicator color="#3E63DD" />
      ) : modules.length > 0 ? (
        modules.map((_module, index) => (
          <S.BtnModule key={index} disabled>
            <S.TextBtn>{`Módulo ${index + 1}`}</S.TextBtn>
          </S.BtnModule>
        ))
      ) : (
        <S.StyledText>Nenhum módulo cadastrado</S.StyledText>
      )}
    </S.ContainerButton>
  </S.DivContainerSeller>
);

interface EvaluationButtonProps {
  onPress: () => void;
  disabled: boolean;
}

const EvaluationButton: React.FC<EvaluationButtonProps> = ({
  onPress,
  disabled,
}) => (
  <S.BtnAvaliar onPress={onPress} disabled={disabled}>
    <S.TextBtnAvaliar>Avaliar</S.TextBtnAvaliar>
  </S.BtnAvaliar>
);

export default EvaluateMentoring;
