import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '@styles/default.theme';

import IQuestions from '@interfaces/Visit/Questions';
import ICategories from '@interfaces/Visit/Categories';

import InputRange from '@components/InputRage';

import VisitService from '@services/VisitService';
import useAuth from '@hooks/useAuth';

interface Props {
  category: ICategories;
  index: number;
  selectedIndex: number;
  sellerId: string;
  onUpdateAnswers: (answers: any[]) => void;
}

const QuestionSection: React.FC<Props> = ({
  category,
  index,
  selectedIndex,
  sellerId,
  onUpdateAnswers,
}) => {
  const [categoryQuestions, setCategoryQuestions] = useState<IQuestions[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await VisitService.getQuestionsByIdCategory(
        category.id
      );
      setCategoryQuestions(questions);
    };
    fetchQuestions();
  }, [category.id]);

  const handleInputChange = (
    questionId: string,
    value: number,
    question: string
  ) => {
    const existingAnswerIndex = answers.findIndex(
      (answer) =>
        answer.questionId === questionId && answer.sellerId === sellerId
    );

    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        ...updatedAnswers[existingAnswerIndex],
        value: value,
      };
      setAnswers(updatedAnswers);
      onUpdateAnswers(updatedAnswers);
    } else {
      const updatedAnswers = [
        ...answers,
        {
          name: question,
          questionId: questionId,
          sellerId: sellerId,
          value: value,
        },
      ];
      setAnswers(updatedAnswers);
      onUpdateAnswers(updatedAnswers);
    }
  };

  const handleEditQuestion = () => {
    console.log('Editar pergunta');
  };

  return (
    selectedIndex === index && (
      <ScrollView style={{ height: 400, paddingHorizontal: 8 }}>
        {user.job === 'Gerente' && (
          <TouchableOpacity
            onPress={handleEditQuestion}
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              zIndex: 999,
            }}
          >
            <FontAwesome
              name="pencil"
              size={18}
              color={theme.colors.secundary.main}
            />
          </TouchableOpacity>
        )}
        <S.TemaQuestion>{category?.name || 'Tema Question'}</S.TemaQuestion>
        {categoryQuestions.map((question, index) => (
          <S.Wrapper key={question.id}>
            <InputRange
              onChangeValue={(id: string, value: number) =>
                handleInputChange(question.id, value, question.question)
              }
              textAsk={question.question}
            />
          </S.Wrapper>
        ))}
      </ScrollView>
    )
  );
};

export default QuestionSection;
