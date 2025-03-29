import React, { useEffect, useState } from 'react';
import * as S from './styles';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '@styles/default.theme';

import IQuestions from '@interfaces/Visit/Questions';
import ICategories from '@interfaces/Visit/Categories';

import InputRange from '@components/InputRage';

import VisitService from '@services/VisitService';
import useAuth from '@hooks/useAuth';
import { useToast } from 'react-native-toast-notifications';
import User from '@interfaces/User';
import { Platform } from 'react-native';
import KeyboardAvoidWrapper from '@components/KeyboardAvoidWrapper';

interface Props {
  category: ICategories;
  index: number;
  selectedIndex: number;
  sellerId: string;
  onUpdateAnswers: (answers: any[]) => void;
  onCategoryUpdate?: (updatedCategory: ICategories) => void;
  onDeleteCategory?: (categoryId: string) => void;
  user: User
}

const QuestionSection: React.FC<Props> = ({
  category,
  index,
  selectedIndex,
  sellerId,
  onUpdateAnswers,
  onCategoryUpdate,
  onDeleteCategory,
  user
}) => {
  const [categoryQuestions, setCategoryQuestions] = useState<IQuestions[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState<ICategories>(category);
  const [editedQuestions, setEditedQuestions] = useState<IQuestions[]>([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [showAddQuestionInput, setShowAddQuestionInput] = useState(false);
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const questions = await VisitService.getQuestionsByIdCategory(
          category.id
        );
        setCategoryQuestions(questions);
        setEditedQuestions(questions);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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

    const updatedAnswers =
      existingAnswerIndex !== -1
        ? [...answers]
        : [
            ...answers,
            {
              name: question,
              questionId,
              sellerId,
              value,
              comments: comments[category.id] || '',
            },
          ];

    if (existingAnswerIndex !== -1) {
      updatedAnswers[existingAnswerIndex] = {
        ...updatedAnswers[existingAnswerIndex],
        value,
        comments: comments[category.id] || '',
      };
    }

    setAnswers(updatedAnswers);
    onUpdateAnswers(updatedAnswers);
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
          id: question.id || '',
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
      console.error(error);
    }
  };

  const handleCategoryChange = (name: string) => {
    setEditedCategory({ ...editedCategory, name });
  };

  const handleQuestionChange = (id: string | undefined, question: string) => {
    if (id) {
      const updatedQuestions = editedQuestions.map((q) =>
        q.id === id ? { ...q, question } : q
      );
      setEditedQuestions(updatedQuestions);
    }
  };

  const showToast = (message: string, type: string) => {
    toast.show(message, {
      type,
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
    }
  };

  const handleDeleteCategory = async () => {
    try {
      setIsDeleting(true);
      await VisitService.deleteCategories(category.id);
      onDeleteCategory?.(category.id);
      showToast('Categoria deletada com sucesso', 'success');
    } catch (error) {
      showToast('Não foi possível deletar a categoria', 'danger');
    } finally {
      setIsDeleting(false);
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
    }
  };

  const handleCancelAddQuestion = () => {
    setNewQuestionText('');
    setShowAddQuestionInput(false);
  };

  if (loading || isDeleting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#3E63DD" />
      </View>
    );
  }

  const handleCommentChange = (value: string) => {
    setComments({ [category.id]: value });
  };

  return selectedIndex === index ? (
    <View
      style={{
        minWidth: '95%',
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
                onChangeText={(text) =>
                  handleQuestionChange(question.id!, text)
                }
                placeholder="Edit Question"
                placeholderTextColor="#666"
              />
              <TouchableOpacity
                onPress={() => handleDeleteQuestion(question.id!)}
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
                value={newQuestionText}
                onChangeText={(text) => setNewQuestionText(text)}
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
            onPress={handleDeleteCategory}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Deletar Categoria</Text>
          </TouchableOpacity>
        </View>
      ) : (

        <View>
          <S.TemaQuestion>{category?.name || 'Tema Question'}</S.TemaQuestion>
          {loading ? (
            <ActivityIndicator color="#3E63DD" />
          ) : (
            <View style={{ flex: 1 }}>
              {categoryQuestions.map((question) => (
                <View key={question.id}>
                  <InputRange
                    onChangeValue={(id: string, value: number) => handleInputChange(question.id!, value, question.question)}
                    textAsk={question.question} id={''}                  />
                </View>
              ))}
              {user.job !== 'Gerente' && (
                <S.TextArea
                  placeholder="Digite aqui..."
                  multiline={true}
                  numberOfLines={5}
                  value={comments[category.id] || ''}
                  onChangeText={handleCommentChange} // Apenas um campo de texto para comentários
                />
              )}
            </View>
          )}
        </View>
      )}
    </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuestionSection;
