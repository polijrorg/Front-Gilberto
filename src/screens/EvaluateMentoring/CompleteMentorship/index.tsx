/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as S from './styles';
import { useRoute, RouteProp } from '@react-navigation/native';
import ModuleGradeServices from '@services/ModuleGradeService';
import DivGradient from '@components/DivGradient';
import HeaderPages from '@components/HeaderPages';
import ISeller from '@interfaces/Seller';
import { useToast } from 'react-native-toast-notifications';
import PlainService from '@services/PlainService';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface RouteParams {
  ModulesEvaluate: Array<{
    idModule: string;
    conhecimento: number;
    implementacao: number;
    comment: string;
  }>;
  Seller: ISeller;
}

const CompleteMentoship: React.FC = () => {
  const route = useRoute<RouteProp<{ ModuloAsk: RouteParams }, 'ModuloAsk'>>();
  const { ModulesEvaluate, Seller } = route.params;
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [comment, setComment] = useState('');

  const toast = useToast();

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
      await Promise.all(
        ModulesEvaluate.map(async (element) => {
          try {
            if (element) {
              const moduleGrades =
                await ModuleGradeServices.getModuleGradesByIdSeller(Seller.id);
              const existingModuleGrade = moduleGrades.find(
                (grade) => grade.moduleId === element.idModule
              );
              if (existingModuleGrade) {
                await ModuleGradeServices.updateModuleGrade(
                  existingModuleGrade.id,
                  element.comment,
                  element.implementacao,
                  element.conhecimento
                );
              } else {
                await ModuleGradeServices.create(
                  comment,
                  element.idModule,
                  Seller.id,
                  element.implementacao,
                  element.conhecimento
                );
              }

              /* await PlainService.createPlain({
                title: selectedAction,
                comments: comment,
                prize: date.toLocaleDateString(),
                sellerId: Seller.id,
                supervisorId: Seller.supervisorId,
                moduleId: selectedValue,
              }); */
            }
          } catch (error) {
            console.error(
              'Erro ao criar ou atualizar módulo de avaliação:',
              error
            );
          }
        })
      );
      console.log('Módulos avaliados com sucesso');
      toast.show('Módulos avaliados com sucesso', {
        type: 'success',
        placement: 'bottom',
        duration: 3500,
        animationType: 'zoom-in',
      });
    } catch (error) {
      console.error('Erro ao completar o mentorado:', error);
    }
  };

  const handleCompleteWithoutActionPlan = async () => {
    try {
      await Promise.all(
        ModulesEvaluate.map(async (element) => {
          try {
            if (element) {
              const moduleGrades =
                await ModuleGradeServices.getModuleGradesByIdSeller(Seller.id);
              const existingModuleGrade = moduleGrades.find(
                (grade) => grade.moduleId === element.idModule
              );
              if (existingModuleGrade) {
                await ModuleGradeServices.updateModuleGrade(
                  existingModuleGrade.id,
                  element.comment,
                  element.implementacao,
                  element.conhecimento
                );
              } else {
                await ModuleGradeServices.create(
                  comment,
                  element.idModule,
                  Seller.id,
                  element.implementacao,
                  element.conhecimento
                );
              }
            }
          } catch (error) {
            console.error(
              'Erro ao criar ou atualizar módulo de avaliação:',
              error
            );
          }
        })
      );
      console.log('Módulos avaliados com sucesso');
      toast.show('Módulos avaliados com sucesso', {
        type: 'success',
        placement: 'bottom',
        duration: 3500,
        animationType: 'zoom-in',
      });
    } catch (error) {
      console.error('Erro ao completar o mentorado:', error);
    }
  };

  return (
    <>
      <StatusBar />
      <S.Wrapper>
        <HeaderPages title="Avaliar Mentorado" />
        <S.DivFields>
          <S.ImageUser source={require('@assets/img/cardVendedor/foto.png')} />
          <S.DivTexts>
            <S.TextName>{Seller?.name}</S.TextName>
            <S.TextFunction>{Seller?.job}</S.TextFunction>
          </S.DivTexts>
        </S.DivFields>
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
        <S.BtnConcluirPlano onPress={handleComplete}>
          <S.TextBtnPlano>CONCLUIR PLANO DE AÇÃO</S.TextBtnPlano>
        </S.BtnConcluirPlano>

        <S.BtnConcluirSemPlano onPress={handleCompleteWithoutActionPlan}>
          <S.TextBtnSemPlano>FINALIZAR SEM PLANO</S.TextBtnSemPlano>
        </S.BtnConcluirSemPlano>
      </S.Wrapper>
      <DivGradient />
    </>
  );
};

export default CompleteMentoship;
