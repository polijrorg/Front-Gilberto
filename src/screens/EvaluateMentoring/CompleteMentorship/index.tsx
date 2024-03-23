/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as S from './styles';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import ModuleGradeServices from '@services/ModuleGradeService';
import DivGradient from '@components/DivGradient';
import HeaderPages from '@components/HeaderPages';
import ISeller from '@interfaces/Seller';

interface RouteParams {
  ModulesEvaluate: Array<{
    idModule: string;
    conhecimento: number;
    implementacao: number;
  }>;
  Seller: ISeller;
}

const CompleteMentoship: React.FC = () => {
  const route = useRoute<RouteProp<{ ModuloAsk: RouteParams }, 'ModuloAsk'>>();
  const { ModulesEvaluate, Seller } = route.params;

  const [selectedAction, setSelectedAction] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [comment, setComment] = useState('');

  const days = Array.from(Array(30), (_, i) => (i + 1).toString());
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  const years = Array.from(Array(8), (_, i) => (2020 + i).toString());

  const handleComplete = async () => {
    console.log('complete');
  };

  const handleCompleteWithoutActionPlan = async () => {
    try {
      await Promise.all(
        ModulesEvaluate.map(async (element) => {
          try {
            if (element) {
              // Verifica se element não é indefinido
              const moduleGrades =
                await ModuleGradeServices.getModuleGradesByIdSeller(Seller.id);
              const existingModuleGrade = moduleGrades.find(
                (grade) => grade.moduleId === element.idModule
              );
              if (existingModuleGrade) {
                await ModuleGradeServices.updateModuleGrade(
                  existingModuleGrade.id,
                  comment,
                  element.conhecimento,
                  element.implementacao
                );
              } else {
                await ModuleGradeServices.create(
                  comment,
                  element.idModule,
                  Seller.id,
                  element.conhecimento,
                  element.implementacao
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
            <S.DivPicker>
              <Picker
                style={{ flex: 1, marginRight: 5 }}
                selectedValue={selectedDay}
                onValueChange={(itemValue, _itemIndex) =>
                  setSelectedDay(itemValue)
                }
              >
                {days.map((day) => (
                  <Picker.Item key={day} label={day} value={day} />
                ))}
              </Picker>
              <Picker
                style={{ flex: 2, marginRight: 5 }}
                selectedValue={selectedMonth}
                onValueChange={(itemValue, _itemIndex) =>
                  setSelectedMonth(itemValue)
                }
              >
                {months.map((month, index) => (
                  <Picker.Item
                    key={index.toString()}
                    label={month}
                    value={index.toString()}
                  />
                ))}
              </Picker>
              <Picker
                style={{ flex: 1 }}
                selectedValue={selectedYear}
                onValueChange={(itemValue, _itemIndex) =>
                  setSelectedYear(itemValue)
                }
              >
                {years.map((year) => (
                  <Picker.Item key={year} label={year} value={year} />
                ))}
              </Picker>
            </S.DivPicker>
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
