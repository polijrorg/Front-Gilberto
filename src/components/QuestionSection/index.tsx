import React, { useEffect, useState } from 'react';
import * as S from './styles';
import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '@styles/default.theme';

import IQuestions from '@interfaces/Visit/Questions';
import ICategories from '@interfaces/Visit/Categories';

import InputRange from '@components/InputRage';

import VisitService from '@services/VisitService';
import useAuth from '@hooks/useAuth';
import { useToast } from 'react-native-toast-notifications';

interface Props {
  category: ICategories;
  index: number;
  selectedIndex: number;
  sellerId: string;
  onUpdateAnswers: (answers: any[]) => void;
  onCategoryUpdate?: (updatedCategory: ICategories) => void;
  onDeleteCategory?: (categoryId: string) => void; // Novo prop para deletar categoria
  loading?: boolean;
}

const QuestionSection: React.FC<Props> = ({
  category,
  index,
  selectedIndex,
  sellerId,
  onUpdateAnswers,
  onCategoryUpdate,
  onDeleteCategory,
  loading,
}) => {
  const [categoryQuestions, setCategoryQuestions] = useState<IQuestions[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState<ICategories>(category);
  const [editedQuestions, setEditedQuestions] = useState<IQuestions[]>([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [showAddQuestionInput, setShowAddQuestionInput] = useState(false);
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
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
      onCategoryUpdate?.(editedCategory);
      const updatedQuestions = await VisitService.getQuestionsByIdCategory(
        editedCategory.id
      );
      setCategoryQuestions(updatedQuestions);
      setEditedQuestions(updatedQuestions);
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

  const showToast = (message: string, type: string) => {
    toast.show(message, {
      type: type,
      placement: 'bottom',
      duration: 3500,
      animationType: 'zoom-in',
    });
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      await VisitService.deleteQuestion(questionId);
      const updatedQuestions = editedQuestions.filter(
        (q) => q.id !== questionId
      );
      setEditedQuestions(updatedQuestions);
      showToast('Pergunta deletada com sucesso', 'success');
    } catch (error) {
      showToast('Não foi possível deletar a pergunta', 'danger');
      console.log(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await VisitService.deleteCategories(category.id);
      onDeleteCategory?.(category.id);
      showToast('Categoria deletada com sucesso', 'success');
    } catch (error) {
      showToast('Não foi possível deletar a categoria', 'danger');
      console.log(error);
    }
  };

  const handleAddQuestion = async () => {
    setNewQuestionText('');
    setShowAddQuestionInput(true);
  };

  const handleConfirmAddQuestion = async () => {
    try {
      const newQuestion = await VisitService.createQuestions({
        categoriesId: editedCategory.id,
        question: newQuestionText,
        number: 0,
      });
      showToast('Pergunta adicionada', 'success');
      setEditedQuestions([...editedQuestions, newQuestion]);
      setCategoryQuestions([...categoryQuestions, newQuestion]);
      setShowAddQuestionInput(false);
    } catch (error) {
      showToast('Não foi possível adicionar a pergunta', 'danger');
      console.log(error);
    }
  };

  const handleCancelAddQuestion = () => {
    setNewQuestionText('');
    setShowAddQuestionInput(false);
  };

  const handleAddCategory = async () => {
    console.log('Adicionar Nova Categoria');
  };

  if (loading) {
    return null;
  }

  return selectedIndex === index ? (
    <ScrollView
      style={{
        minWidth: '95%',
        height: user.job === 'Gerente' ? 600 : 400,
        marginVertical: 16,
        marginHorizontal: 16,
      }}
    >
      {user.job === 'Gerente' && (
        <TouchableOpacity
          onPress={handleEditQuestion}
          style={styles.editButton}
        >
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
            <View key={question.id} style={styles.questionContainer}>
              <TextInput
                style={styles.questionInput}
                value={question.question}
                onChangeText={(text) => handleQuestionChange(question.id, text)}
                placeholder="Edit Question"
                placeholderTextColor="#666"
              />
              <TouchableOpacity
                onPress={() => handleDeleteQuestion(question.id)}
              >
                <FontAwesome
                  name="trash"
                  size={24}
                  color="#FF6347"
                  style={styles.trashIcon}
                />
              </TouchableOpacity>
            </View>
          ))}
          {showAddQuestionInput ? (
            <View style={styles.questionContainer}>
              <TextInput
                style={styles.questionInput}
                value={newQuestionText} // Mostra o texto digitado
                onChangeText={(text) => setNewQuestionText(text)} // Atualiza o texto da nova pergunta
                placeholder="Nova Pergunta"
                placeholderTextColor="#666"
              />
              <TouchableOpacity onPress={handleConfirmAddQuestion}>
                <FontAwesome
                  name="check"
                  size={24}
                  color="#3E63DD"
                  style={styles.trashIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancelAddQuestion}>
                <FontAwesome
                  name="times"
                  size={24}
                  color="#FF6347"
                  style={styles.trashIcon}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleAddQuestion}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Adicionar Pergunta</Text>
            </TouchableOpacity>
          )}
          <S.ButtonFirst onPress={handleSaveChanges}>
            <S.TextBtn>Salvar Alterações</S.TextBtn>
          </S.ButtonFirst>
          <TouchableOpacity
            onPress={handleDeleteCategory} // Adicionando a função para deletar a categoria
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Deletar Categoria</Text>
          </TouchableOpacity>
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
  ) : null;
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
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  questionInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  trashIcon: {
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#3E63DD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuestionSection;
