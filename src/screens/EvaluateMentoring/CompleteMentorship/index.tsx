import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@styles/default.theme';
import * as S from './styles';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import ModuleGradeServices from '@services/ModuleGradeService';
import DivGradient from '@components/DivGradient';
import HeaderPages from '@components/HeaderPages';
import ISeller from '@interfaces/Seller';
import { useToast } from 'react-native-toast-notifications';
import { ActivityIndicator } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDataContext } from '../../../context/DataContext';
import SellerServices from '@services/SellerServices';
import PlainService from '@services/PlainService';
import ModulesServices from '@services/ModuleServices';

interface RouteParams {
  ModulesEvaluate: Array<{
    idModule: string;
    conhecimento: number;
    implementacao: number;
    comment: string;
  }>;
  Seller: ISeller;
}

const CompleteMentorship: React.FC = () => {
  const route = useRoute<RouteProp<{ ModuloAsk: RouteParams }, 'ModuloAsk'>>();
  const { ModulesEvaluate, Seller } = route.params;
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [comment, setComment] = useState('');
  const toast = useToast();
  const { data, setData } = useDataContext();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleModuleChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleComplete = async () => {
    try {
      setLoading(true);
      await Promise.all(ModulesEvaluate.map(updateModuleGrade));
  
      setData({
        ...data,
        seller: Seller,
      });
      setLoading(false);
      console.log('Módulos avaliados com sucesso');
      showToast('Módulos avaliados com sucesso', 'success');
  
      const allModulesEvaluated = await checkAllModulesEvaluated();
      console.log(allModulesEvaluated);
      if (allModulesEvaluated) {
        console.log('Todos os módulos foram avaliados. Atualizando estágio para "Visita"...');
        showToast('Todos os módulos avaliados', 'success');
        showToast('Alterando Estado para Visita', 'success');
        await SellerServices.updateSeller({ ...Seller, stage: 'Visita' });
        setData({
          ...data,
          seller: { ...Seller, stage: 'Visita' },
        });        
      }
    } catch (error) {
      console.error('Erro ao completar o mentorado:', error);
    }
  };

  const checkAllModulesEvaluated = async () => {
    try {
      const modules = await ModulesServices.getAllModules();
  
      const moduleGrades = await ModuleGradeServices.getModuleGradesByIdSeller(Seller.id);
  
      const allModulesEvaluated = modules.every(module =>
        moduleGrades.some(grade => grade.moduleId === module.id)
      );
  
      return allModulesEvaluated;
    } catch (error) {
      console.error('Erro ao verificar se todos os módulos foram avaliados:', error);
      return false;
    }
  };

  const updateModuleGrade = async (element: any) => {
    try {
      if (element) {
        const moduleGrades =
          await ModuleGradeServices.getModuleGradesByIdSeller(Seller.id);
        const existingModuleGrade = moduleGrades.find(
          (grade) => grade.moduleId === element.idModule
        );
        if (existingModuleGrade) {
          await ModuleGradeServices.updateModuleGrade({
            id: existingModuleGrade.id,
            supervisorComment: element.comment,
            implementationScore: element.implementacao,
            knowledgeScore: element.conhecimento,
            moduleId: element.idModule,
            sellerId: element.idModule,
          });
        } else {
          await ModuleGradeServices.create({
            supervisorComment: element.comment,
            moduleId: element.idModule,
            sellerId: Seller.id,
            implementationScore: element.implementacao,
            knowledgeScore: element.conhecimento,
          });
        }
      }
    } catch (error) {
      console.error('Erro ao criar ou atualizar módulo de avaliação:', error);
    }
  };

  const handleCompleteWithoutActionPlan = async () => {
    try {
      await Promise.all(ModulesEvaluate.map(createActionPlan));
    } catch (error) {
      console.error('Erro ao criar plano de ação:', error);
    }
    console.log('Completo sem plano');
  };

  const createActionPlan = async (element: any) => {
    try {
      const newPlan = {
        title: selectedAction,
        prize: date.toISOString(),
        comments: element.comment,
        sellerId: Seller.id,
        supervisorId: Seller.supervisorId,
        visitId: '',
        moduleId: element.moduleId,
        done: false,
      };
      await PlainService.createPlain(newPlan);
    } catch (error) {
      console.error('Erro ao criar plano de ação:', error);
    }
  };

  const handleBackHome = () => {
    navigation.navigate('Home' as never);
  };

  const showToast = (message: string, type: string) => {
    toast.show(message, {
      type: type,
      placement: 'bottom',
      duration: 3500,
      animationType: 'zoom-in',
    });
  };

  return (
    <>
      <StatusBar />
      <S.Wrapper>
        <HeaderPages title="Avaliar Mentorado" />
        <SellerInfo seller={Seller} handleBackHome={handleBackHome} />
        <InputsSection
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          date={date}
          showDatePickerModal={showDatePickerModal}
          showDatePicker={showDatePicker}
          handleDateChange={handleDateChange}
          comment={comment}
          setComment={setComment}
        />
        <ButtonsSection
          loading={loading}
          handleComplete={handleComplete}
          handleCompleteWithoutActionPlan={handleCompleteWithoutActionPlan}
        />
      </S.Wrapper>
      <DivGradient />
    </>
  );
};

const SellerInfo: React.FC<{ seller: ISeller; handleBackHome: () => void }> = ({
  seller,
  handleBackHome,
}) => (
  <S.DivFields>
    <S.UserInfoContainer>
      <S.ImageUser source={require('@assets/img/cardVendedor/foto.png')} />
      <S.DivTexts>
        <S.TextName>{seller?.name}</S.TextName>
        <S.TextFunction>{seller?.job}</S.TextFunction>
      </S.DivTexts>
    </S.UserInfoContainer>
    <S.BtnHomeScreen onPress={handleBackHome}>
      <MaterialCommunityIcons name="home-outline" size={28} color="#fff" />
    </S.BtnHomeScreen>
  </S.DivFields>
);

const InputsSection: React.FC<{
  selectedAction: string;
  setSelectedAction: React.Dispatch<React.SetStateAction<string>>;
  date: Date;
  showDatePickerModal: () => void;
  showDatePicker: boolean;
  handleDateChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  selectedAction,
  setSelectedAction,
  date,
  showDatePickerModal,
  showDatePicker,
  handleDateChange,
  comment,
  setComment,
}) => (
  <S.Container>
    <S.DivInputs>
      <S.Label>Ação Programada</S.Label>
      <S.InputAction
        placeholder="Ex: Aumentar a comunicação pós venda "
        value={selectedAction}
        onChangeText={(text) => setSelectedAction(text)}
      />
    </S.DivInputs>
    <S.DivInputs>
      <S.Label>Data Limite</S.Label>
      <S.BtnData onPress={showDatePickerModal}>
        <S.TextBtnData>
          {date ? date.toLocaleDateString() : 'Selecione a Data'}
        </S.TextBtnData>
      </S.BtnData>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </S.DivInputs>
    <S.DivInputs>
      <S.Label>Comentário</S.Label>
      <S.TextArea
        placeholder="Digite aqui..."
        multiline={true}
        numberOfLines={5}
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
    </S.DivInputs>
  </S.Container>
);

const ButtonsSection: React.FC<{
  handleComplete: () => void;
  handleCompleteWithoutActionPlan: () => void;
  loading: boolean;
}> = ({ handleComplete, handleCompleteWithoutActionPlan, loading }) => (
  <>
    <S.BtnConcluirPlano onPress={handleCompleteWithoutActionPlan}>
      <S.TextBtnPlano>CONCLUIR PLANO DE AÇÃO</S.TextBtnPlano>
    </S.BtnConcluirPlano>

    <S.BtnConcluirSemPlano
      onPress={!loading ? handleComplete : undefined}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.secundary.main} />
      ) : (
        <S.TextBtnSemPlano>FINALIZAR SEM PLANO</S.TextBtnSemPlano>
      )}
    </S.BtnConcluirSemPlano>
  </>
);

export default CompleteMentorship;
