import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type AccordionProps = {
  title?: string;
  media?: number | string;
  questions?: { question: string; grade: string }[];
  questionGrades?: number[];
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

type AccordionContentProps = {
  isExpanded: boolean;
  questions?: { question: string; grade: string }[] | null;
};

const AccordionContent: React.FC<AccordionContentProps> = ({
  isExpanded,
  questions,
}) => {
  const formatNumber = (number: string) => {
    const isNumeric = /^\d*\.?\d*$/.test(number);

    if (isNumeric) {
      return parseFloat(number).toFixed(1).replace('.', ',');
    }

    return '';
  };

  return (
    isExpanded && (
      <View style={styles.content}>
        {questions?.map((item, index) => (
          <View
            key={index}
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
        ))}
      </View>
    )
  );
};

const AccordionVisit: React.FC<AccordionProps> = ({
  title,
  media,
  questions,
  questionGrades,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <AccordionHeader
        title={title}
        media={media}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
      />
      <AccordionContent isExpanded={isExpanded} questions={questions} />
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  gradeText: {
    fontFamily: 'Poppins',
    color: '#687076',
  },
});

export default AccordionVisit;
