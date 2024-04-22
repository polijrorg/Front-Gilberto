import React, { useState } from 'react';
import * as S from './styles';
import Select from '@components/Select';

interface PlainActionProps {
  state: number;
}

const PlainMentory: React.FC<PlainActionProps> = ({ state }) => {
  const cities = [
    { label: 'City 1', value: 'City 1' },
    { label: 'City 2', value: 'City 2' },
    { label: 'City 3', value: 'City 3' },
    { label: 'City 4', value: 'City 4' },
    { label: 'City 5', value: 'City 5' },
  ];
  const days = Array.from({ length: 31 }, (_, index) => ({
    label: String(index + 1),
    value: String(index + 1),
  }));
  const months = Array.from({ length: 12 }, (_, index) => ({
    label: String(index + 1),
    value: String(index + 1),
  }));
  const years = Array.from({ length: 10 }, (_, index) => ({
    label: String(2024 - index),
    value: String(2024 - index),
  }));

  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [comment, setComment] = useState('');
  const [improvement, setImprovement] = useState('');

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  const handleNavigator = () => {
    // Aqui você pode usar selectedCity, selectedDay, selectedMonth, selectedYear conforme necessário
  };

  return (
    <S.Wrapper>
      <S.WrapperView>
        <S.TextForms>Módulo de Avaliação</S.TextForms>
        <Select
          placeholder="Selecione"
          options={cities}
          onChange={handleCityChange}
        />

        <S.TextForms>Ação Programada</S.TextForms>
        <S.InputText placeholder="Ex: Realizar nova visita " />

        <S.Row>
          <Select placeholder="Dia" options={days} onChange={handleDayChange} />
          <Select
            placeholder="Mês"
            options={months}
            onChange={handleMonthChange}
          />
          <Select
            placeholder="Ano"
            options={years}
            onChange={handleYearChange}
          />
        </S.Row>

        <S.TextForms>Pontos de Melhoria</S.TextForms>
        <S.TextArea
          placeholder="Digite aqui..."
          multiline={true}
          numberOfLines={5}
          value={improvement}
          onChangeText={(text) => setImprovement(text)}
        />

        <S.TextForms>Comentário</S.TextForms>
        <S.TextArea
          placeholder="Digite aqui..."
          multiline={true}
          numberOfLines={5}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />

        <S.BtnCriarAction onPress={handleNavigator}>
          <S.TextBtn>criar plano de ação</S.TextBtn>
        </S.BtnCriarAction>
      </S.WrapperView>
    </S.Wrapper>
  );
};

export default PlainMentory;
