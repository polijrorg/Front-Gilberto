import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as S from './styles';
import VisitGradesService from '@services/VisitGradesService';

type AccordionProps = {
  title?: string;
  media?: number | string;
  categories?: {
    categoryName: string;
    questions: { question: string; grade: string; comments?: string }[];
  }[];
  visitId: string;
};

const formatNumber = (number: number | string) => {
  if (typeof number === 'number') {
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  }
  return '';
};

const AccordionHeader: React.FC<{
  title: string;
  media: number | string;
  isExpanded: boolean;
  toggleExpand: () => void;
}> = ({ title, media, isExpanded, toggleExpand }) => (
  <TouchableWithoutFeedback onPress={toggleExpand}>
    <S.Header>
      <S.Title>{title}</S.Title>
      <S.Media>
        {media !== 0 ? formatNumber(media) : 'N.A'}
      </S.Media>
      <FontAwesome
        name={isExpanded ? 'angle-up' : 'angle-down'}
        size={24}
        color="black"
      />
    </S.Header>
  </TouchableWithoutFeedback>
);

type AccordionContentProps = {
  isExpanded: boolean;
  categories?:
    | {
        categoryName: string;
        questions: { question: string; grade: string; comments?: string }[];
      }[]
    | null;
  visitId: string;
};

const AccordionContent: React.FC<AccordionContentProps> = ({
  isExpanded,
  categories,
  visitId,
}) => {
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const comments = await VisitGradesService.getCommentsByVisitId(visitId);
      // Filtra apenas os comentários que têm texto
      const filteredComments = comments.filter(
        (comment) => comment.trim() !== ''
      );
      setComments(filteredComments);
    };

    fetchData();
  }, [visitId]);

  const formatNumber = (number: string) => {
    const isNumeric = /^\d*\.?\d*$/.test(number);

    if (isNumeric) {
      return parseFloat(number).toFixed(1).replace('.', ',');
    }

    return '';
  };

  if (!isExpanded) {
    return null;
  }

  return (
    <S.Content>
      {categories?.map((category, index) => (
        <S.CategoryContainer key={index}>
          <S.CategoryTitle>{category.categoryName}</S.CategoryTitle>
          {category.questions.map((item, i) => (
            <View key={i}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 4,
                }}
              >
                <S.QuestionText>{item.question}</S.QuestionText>
                <S.GradeText>
                  {formatNumber(item.grade) || 'N.A'}
                </S.GradeText>
              </View>
            </View>
          ))}
        </S.CategoryContainer>
      ))}
      {/* Mostrar o comentário da categoria apenas uma vez no final */}
      {comments.length > 0 && (
        <S.CommentText>
          {'Comentários:\n' + comments.join('\n')}
        </S.CommentText>
      )}
    </S.Content>
  );
};

const AccordionVisit: React.FC<AccordionProps> = ({
  title = '',
  media = 0,
  categories = null,
  visitId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <S.Accordion>
      <AccordionHeader
        title={title}
        media={media}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
      />
      <AccordionContent
        isExpanded={isExpanded}
        categories={categories}
        visitId={visitId}
      />
    </S.Accordion>
  );
};

export default AccordionVisit;
