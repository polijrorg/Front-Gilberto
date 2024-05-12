import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { ScrollView } from 'react-native';

import IQuestions from '@interfaces/Visit/Questions';
import ICategories from '@interfaces/Visit/Categories';

import InputRange from '@components/InputRage';

import VisitService from '@services/VisitService';

interface Props {
  category: ICategories;
  index: number;
  selectedIndex: number;
  sellerId: string;
  onUpdateAnswers: (answers: any[]) => void;
}

const QuestionSection:React.FC<Props> = ({ category, index, selectedIndex, sellerId, onUpdateAnswers }) => {
  const [categoryQuestions, setCategoryQuestions] = useState<IQuestions[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await VisitService.getQuestionsByIdCategory(category.id);
      setCategoryQuestions(questions);
    };
    fetchQuestions();
  }, [category.id]);

  const handleInputChange = (
    questionId: string,
    questionCategoryId: string,
    value: number,
  ) => {
    const updatedAnswers = [
      ...answers,
      {
        questionId: questionId,
        sellerId: sellerId,
        questionCategoryId: questionCategoryId,
        value: value
      }
    ];
    setAnswers(updatedAnswers);
    onUpdateAnswers(updatedAnswers); // Passando o array atualizado para o componente pai
  };

  return (
    selectedIndex === index && (
      <ScrollView style={{height: 400, paddingHorizontal: 8}}>
        {categoryQuestions.map((question, index) => (
          <S.Wrapper key={question.id}>
            <InputRange onChangeValue={(id: string,value: number) =>
              handleInputChange(question.id, question.categoriesId, value)
            } textAsk={question.question} />
          </S.Wrapper>
        ))}
      </ScrollView>
    )
  );
};

export default QuestionSection;
