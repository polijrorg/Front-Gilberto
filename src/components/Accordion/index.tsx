/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Accordion = ({ title }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showText, setShowText] = useState(true); // Estado para controlar a visibilidade do texto
  const [comentario, setComentario] = useState<string>();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setShowText(isExpanded); // Alterna a visibilidade do texto
  };

  return (
    <View style={{ marginTop: 16, borderRadius: 8 }}>
      <TouchableWithoutFeedback onPress={toggleExpand}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F1F3F5',
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ flex: 1, fontFamily: 'Poppins' }}>{title}</Text>
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
                I: X,X
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
                C: X,X
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
              Implementação: X,X
            </Text>
            <Text style={{ fontFamily: 'Poppins', color: '#687076' }}>
              Conhecimento: X,X
            </Text>
          </View>
          <TextInput
            placeholder="Comentários"
            value={comentario}
            onChangeText={(text) => setComentario(text)}
            multiline={true}
            numberOfLines={5}
            style={{
              backgroundColor: '#E6E8EB',
              padding: 16,
              borderRadius: 4,
              fontFamily: 'Poppins',
              color: '#687076',
              textAlignVertical: 'top',
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Accordion;
