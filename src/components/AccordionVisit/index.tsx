/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type AccordionProps = {
  title?: string;
  media?: number | string;
  questions?: string[];
};

const AccordionVisit: React.FC<AccordionProps> = ({
  title,
  media,
  questions,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showText, setShowText] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatNumber = (number: number | string) => {
    if (number !== undefined) {
      return Number(number).toLocaleString('pt-BR', {
        minimumFractionDigits: 1,
      });
    }
    return '';
  };

  return (
    <View style={{ marginTop: 16, borderRadius: 8 }}>
      <TouchableWithoutFeedback onPress={toggleExpand}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F1F3F5',
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ flex: 0.9, fontFamily: 'Poppins' }}>{title}</Text>
          {showText && (
            <Text
              style={{
                marginRight: 0,
                fontFamily: 'PoppinsBold',
                backgroundColor: '#E6E8EB',
                color: '#687076',
                borderRadius: 2,
                fontSize: 12,
                padding: 2,
              }}
            >
              {formatNumber(media) || 'X,X'}
            </Text>
          )}
          <FontAwesome
            name={isExpanded ? 'angle-up' : 'angle-down'}
            size={24}
            color="black"
          />
        </View>
      </TouchableWithoutFeedback>

      {isExpanded && (
        <View
          style={{
            backgroundColor: '#F1F3F5',
            padding: 10,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          {questions?.map((element, index) => (
            <Text
              key={index}
              style={{ fontFamily: 'Poppins', color: '#687076' }}
            >
              {element}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default AccordionVisit;
