import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, TextInput, Text as RNCText } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as S from './styles';
import Text from '@components/Text';

type AccordionProps = {
  title: string;
  implementation: number | string;
  knowledge: number | string;
  comment?: string;
};

const AccordionMentory: React.FC<AccordionProps> = ({
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
    <S.Wrapper>
      <TouchableWithoutFeedback onPress={toggleExpand}>
        <S.ViewWrapper>
          
          <Text label={title} size='medium' />
          {showText && (
            <>
              <RNCText
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
              </RNCText>
              <RNCText
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
              </RNCText>
            </>
          )}
          <FontAwesome
            name={isExpanded ? 'angle-up' : 'angle-down'}
            size={24}
            color="black"
          />
        </S.ViewWrapper>
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
            <RNCText style={{ fontFamily: 'Poppins', color: '#687076' }}>
              Implementação: {formatNumber(implementation)}
            </RNCText>
            <RNCText style={{ fontFamily: 'Poppins', color: '#687076' }}>
              Conhecimento: {formatNumber(knowledge)}
            </RNCText>
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
    </S.Wrapper>
  );
};

export default AccordionMentory;
