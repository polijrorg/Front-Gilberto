import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import VisitGradesService from '@services/VisitGradesService';

// type AccordionProps = {
//   title?: string;
//   media?: number | string;
//   questions?: { question: string; grade: string; comments?: string }[];
//   questionGrades?: number[];
//   categories?: string[];
// };

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
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.media}>
        {media !== 0 ? formatNumber(media) : 'N.A'}
      </Text>
      <FontAwesome
        name={isExpanded ? 'angle-up' : 'angle-down'}
        size={24}
        color="black"
      />
    </View>
  </TouchableWithoutFeedback>
);

// type AccordionContentProps = {
//   isExpanded: boolean;
//   questions?: { question: string; grade: string; comments?: string }[] | null;
// };

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
    <View style={styles.content}>
      {categories?.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.categoryName}</Text>
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
                <Text style={styles.questionText}>{item.question}</Text>
                <Text style={styles.gradeText}>
                  {formatNumber(item.grade) || 'N.A'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ))}
      {/* Mostrar o comentário da categoria apenas uma vez no final */}
      {comments.length > 0 && (
        <Text style={styles.commentText}>
          {'Comentários:\n' + comments.join('\n')}
        </Text>
      )}
    </View>
  );

  // return (
  //   <View style={styles.content}>
  //     {questions?.map((item, index) => (
  //       <>
  //         <View
  //           key={index}
  //           style={{
  //             display: 'flex',
  //             flexDirection: 'row',
  //             justifyContent: 'space-between',
  //             paddingHorizontal: 4,
  //           }}
  //         >
  //           <Text style={styles.questionText}>{item.question}</Text>
  //           <Text style={styles.gradeText}>
  //             {formatNumber(item.grade) || 'N.A'}
  //           </Text>
  //         </View>
  //         <Text style={styles.questionText}>{item.comments}</Text>
  //       </>
  //     ))}
  //   </View>
  // );
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
    <View style={styles.accordion}>
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
    </View>
  );
};

// const AccordionVisit: React.FC<AccordionProps> = ({
//   title,
//   media,
//   questions,
//   questionGrades,
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <View style={styles.container}>
//       <AccordionHeader
//         title={title || 'Default Title'}
//         media={media ?? 0}
//         isExpanded={isExpanded}
//         toggleExpand={toggleExpand}
//       />
//       <AccordionContent isExpanded={isExpanded} categories={categories} />
//     </View>
//   );
// };

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 10,
  },
  commentText: {
    fontStyle: 'italic',
    color: '#666',
    marginLeft: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  accordion: {
    marginBottom: 10,
  },
  container: {
    marginTop: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F3F5',
    padding: 10,
    borderRadius: 8,
  },
  title: {
    flex: 0.9,
    fontFamily: 'Poppins',
  },
  media: {
    marginRight: 0,
    fontFamily: 'PoppinsBold',
    backgroundColor: '#E6E8EB',
    color: '#687076',
    borderRadius: 2,
    fontSize: 12,
    padding: 2,
  },
  content: {
    backgroundColor: '#F1F3F5',
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontFamily: 'Poppins',
    color: '#687076',
    width: '90%',
  },
  gradeText: {
    fontFamily: 'Poppins',
    color: '#687076',
  },
});

export default AccordionVisit;
