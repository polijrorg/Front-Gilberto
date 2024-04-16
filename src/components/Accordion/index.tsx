/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type AccordionProps = {
  title: string;
  implementation: number | string;
  knowledge: number | string;
  comment?: string;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  implementation,
  knowledge,
  comment,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showText, setShowText] = useState(true);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setShowText(isExpanded);
  };

  const formatNumber = (number: number | string) => {
    if (number !== undefined) {
      return number.toLocaleString('pt-BR', { minimumFractionDigits: 1 });
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
            <>
              <Text
                style={{
                  marginRight: 8,
                  fontFamily: 'PoppinsBold',
                  backgroundColor: '#E6E8EB',
                  color: '#687076',
                  borderRadius: 2,
                  fontSize: 12,
                  padding: 2,
                }}
              >
                I: {formatNumber(implementation)}
              </Text>
              <Text
                style={{
                  marginRight: 8,
                  fontFamily: 'PoppinsBold',
                  backgroundColor: '#E6E8EB',
                  color: '#687076',
                  fontSize: 12,
                  borderRadius: 2,
                  padding: 2,
                }}
              >
                C: {formatNumber(knowledge)}
              </Text>
            </>
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
          <View
            style={{
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            <Text style={{ fontFamily: 'Poppins', color: '#687076' }}>
              Implementação: {formatNumber(implementation)}
            </Text>
            <Text style={{ fontFamily: 'Poppins', color: '#687076' }}>
              Conhecimento: {formatNumber(knowledge)}
            </Text>
          </View>
          <TextInput
            placeholder="Comentários"
            value={`${comment}`}
            multiline={true}
            numberOfLines={2}
            readOnly
            style={{
              backgroundColor: '#E6E8EB',
              padding: 16,
              borderRadius: 4,
              fontFamily: 'Poppins',
              color: '#687076',
              textAlignVertical: 'top',
              fontStyle: 'italic',
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Accordion;
