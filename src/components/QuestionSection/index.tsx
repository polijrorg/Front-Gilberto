import React, { useEffect, useState } from 'react';
import * as S from './styles';
import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
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
  onCategoryUpdate?: (updatedCategory: ICategories) => void;
  loading: boolean;
}

const QuestionSection: React.FC<Props> = ({
  category,
  index,
  selectedIndex,
  sellerId,
  onUpdateAnswers,
  onCategoryUpdate,
  loading,
}) => {
  const [categoryQuestions, setCategoryQuestions] = useState<IQuestions[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState<ICategories>(category);
  const [editedQuestions, setEditedQuestions] = useState<IQuestions[]>([]);
  const { user } = useAuth();

  const fetchQuestions = async () => {
    try {
      const questions = await VisitService.getQuestionsByIdCategory(
        category.id
      );
      setCategoryQuestions(questions);
      setEditedQuestions(questions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    try {
      await VisitService.updateCategory({
        id: editedCategory.id,
        name: editedCategory.name,
      });

      for (const question of editedQuestions) {
        await VisitService.updateQuestion({
          id: question.id,
          question: question.question,
        });
      }

      setIsEditing(false);
      onCategoryUpdate(editedCategory); // Update the parent component with the new category data
      await fetchQuestions();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (name: string) => {
    setEditedCategory({ ...editedCategory, name });
  };

  const handleQuestionChange = (id: string, question: string) => {
    const updatedQuestions = editedQuestions.map((q) =>
      q.id === id ? { ...q, question } : q
    );
    setEditedQuestions(updatedQuestions);
  };

  if (loading) {
    return null;
  }

  return (
    selectedIndex === index && (
      <ScrollView style={{ minWidth: '95%',height: 700, marginVertical: 16, marginHorizontal: 16 }}>
        {user.job === 'Gerente' && (
          <TouchableOpacity onPress={handleEditQuestion} style={styles.editButton}>
            <FontAwesome
              name="pencil"
              size={24}
              color={theme.colors.secundary.main}
            />
          </TouchableOpacity>
        )}
        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.categoryInput}
              value={editedCategory.name}
              onChangeText={handleCategoryChange}
              placeholder="Edit Category"
              placeholderTextColor="#666"
            />
            {editedQuestions.map((question) => (
              <TextInput
                key={question.id}
                style={styles.questionInput}
                value={question.question}
                onChangeText={(text) =>
                  handleQuestionChange(question.id, text)
                }
                placeholder="Edit Question"
                placeholderTextColor="#666"
              />
            ))}
            <S.ButtonFirst onPress={handleSaveChanges}>
              <S.TextBtn>Salvar Alterações</S.TextBtn>
            </S.ButtonFirst>
          </View>
        ) : (
          <>
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
          </>
        )}
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  editButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 999,
  },
  editContainer: {
    padding: 10,
    marginVertical: 36,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  categoryInput: {
    height: 50,
    borderColor: '#3E63DD',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#fff',
  },
  questionInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default QuestionSection;
