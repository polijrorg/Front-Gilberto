/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from './styles';
import React, { useState } from 'react';
import InputRange from '@components/InputRage';

interface IQuestion {
  title?: string;
  textAsk?: string;
}

const Question: React.FC<IQuestion> = ({ title, textAsk }) => {
  const [inputValue, setInputValue] = useState<number>(0);

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };
  return (
    <S.Wrapper>
      <S.TemaQuestion>{title}</S.TemaQuestion>
      <InputRange onChangeValue={handleInputChange} textAsk={textAsk} />
    </S.Wrapper>
  );
};

export default Question;
