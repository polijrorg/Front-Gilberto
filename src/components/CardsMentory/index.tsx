import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { StyledWrapper, DivText, Title, Nota, DivNota } from './styles';
import { MaterialIcons } from '@expo/vector-icons';

interface CardMentoryProps {
  title: string;
  prize: string;
  isVisible?: boolean;
  onToggleVisibility: () => void;
  onMarkDone: () => void;
  typePlain?: string;
  complete?: boolean;
}

const CardsMentory: React.FC<CardMentoryProps> = ({
  title,
  prize,
  isVisible = false,
  onToggleVisibility,
  onMarkDone,
  typePlain = 'Tipo de Plano',
  complete,
}) => {
  const handleToggleVisibility = () => {
    if (!complete) {
      onMarkDone();
      onToggleVisibility();
    }
  };

  return (
    <StyledWrapper>
      <TouchableOpacity
        onPress={handleToggleVisibility}
        activeOpacity={complete ? 1 : 0}
        disabled={complete}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {complete ? (
            <MaterialIcons name="check-box" size={20} color="#08660b" />
          ) : (
            <MaterialIcons
              name="check-box-outline-blank"
              size={20}
              color="#8c8c8c"
            />
          )}
          <DivText>
            <Title>{title}</Title>
          </DivText>
          <DivNota>
            <Nota>{prize}</Nota>
          </DivNota>
          <DivText>
            <Title>{typePlain}</Title>
          </DivText>
        </View>
      </TouchableOpacity>
    </StyledWrapper>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#687076',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
});

export default CardsMentory;
