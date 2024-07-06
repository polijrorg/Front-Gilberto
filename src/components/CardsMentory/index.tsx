import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { StyledWrapper, DivText, Title, Nota, DivNota } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import Seller from '@interfaces/Seller';

interface CardMentoryProps {
  title: string;
  prize: string;
  isVisible?: boolean;
  onToggleVisibility: () => void;
  onMarkDone: () => void;
  complete?: boolean;
  seller?: Seller;
}

const CardsMentory: React.FC<CardMentoryProps> = ({
  title,
  prize,
  seller,
  onToggleVisibility,
  onMarkDone,
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
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            paddingHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-around',
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
          {seller && (
            <DivText>
              <Title>{seller?.name}</Title>
              <Title>{seller?.stage}</Title>
            </DivText>
          )}
          <DivNota>
            <Nota>{prize}</Nota>
          </DivNota>
        </View>
      </TouchableOpacity>
    </StyledWrapper>
  );
};

export default CardsMentory;
