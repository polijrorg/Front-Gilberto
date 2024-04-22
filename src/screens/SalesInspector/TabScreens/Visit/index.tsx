import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView } from 'react-native';
import AccordionVisit from '@components/AccordionVisit';
import React from 'react';

const Visit = () => {
  const questions1 = [
    'Como você planeja abordar o cliente?',
    'Qual é o objetivo principal desta visita?',
    'Quais são as metas que você deseja alcançar durante esta etapa?',
  ];

  const questions2 = [
    'Como você se aproximará do cliente?',
    'Quais são os primeiros passos para estabelecer uma conexão?',
    'Você tem alguma estratégia específica para se apresentar?',
  ];

  const questions3 = [
    'Quais são os principais pontos que você deseja destacar durante a apresentação?',
    'Como você adaptará sua apresentação com base nas necessidades do cliente?',
    'Quais recursos ou materiais você utilizará durante esta etapa?',
  ];

  const questions4 = [
    'Quais objeções você antecipa e como planeja lidar com elas?',
    'Você tem alguma estratégia para transformar objeções em oportunidades?',
    'Como você garantirá que o cliente se sinta confortável com suas respostas às objeções?',
  ];

  return (
    <S.Wrapper>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <S.WrapperView>
          <AccordionVisit
            title="2. Planejamento"
            media={7.4}
            questions={questions1}
          />
          <AccordionVisit
            title="3. Aproximação"
            media={5.0}
            questions={questions2}
          />
          <AccordionVisit
            title="4. Apresentação"
            media={1.2}
            questions={questions3}
          />
          <AccordionVisit
            title="5. Identificação de Objeções"
            media={3.3}
            questions={questions4}
          />
        </S.WrapperView>
      </ScrollView>
    </S.Wrapper>
  );
};

export default Visit;
