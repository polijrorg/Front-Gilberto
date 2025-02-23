import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyledWrapper, DivText, Title, Nota, DivNota, Container } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import Seller from '@interfaces/Seller';
import User from '@interfaces/User';

interface CardMentoryProps {
  title: string;
  prize: string;
  isVisible?: boolean;
  onToggleVisibility: () => void;
  onMarkDone: () => void;
  complete?: boolean;
  seller?: Seller;
  user: User
}

const CardsMentory: React.FC<CardMentoryProps> = ({
  title,
  prize,
  seller,
  onToggleVisibility,
  onMarkDone,
  complete,
  user
}) => {

  const handleToggleVisibility = () => {
    if (!complete && user?.job !== 'Gerente') {
      onMarkDone();
      onToggleVisibility();
    }
  };

  return (
    <StyledWrapper>
      <Container>
        <TouchableOpacity
          onPress={handleToggleVisibility}
          activeOpacity={complete ? 1 : 0}
          disabled={complete}
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
        </TouchableOpacity>
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
      </Container>
    </StyledWrapper>
  );
};

export default CardsMentory;
