import { View, Text } from 'react-native';
import styled from 'styled-components/native';

export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: '#F1F3F5';
  padding: 10px;
  border-radius: 8px;
`;

export const CategoryContainer = styled(View)`
  margin-bottom: 10px;
`;

export const CommentText = styled(Text)`
  font-style: italic;
  color: #666;
  margin-left: 10px;
`;

export const CategoryTitle = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Title = styled(Text)`
  flex: 0.9;
  font-family: Poppins;
`;

export const Accordion = styled(View)`
  margin-bottom: 10px;
`;

export const ContentT = styled(View)`
  margin-top: 16px;
  border-radius: 8px;
`;

export const GradeText = styled(Text)`
  font-family: Poppins;
  color: #687076;
`;

export const QuestionText = styled(Text)`
  font-family: Poppins;
  color: #687076;
  width: 90%;
`;

export const Content = styled(View)`
  background-color: #F1F3F5;
  padding: 10px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const QuestionRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Media = styled(Text)`
  font-family: PoppinsBold;
  background-color: #E6E8EB;
  font-size: 12px;
  color: #687076;
  margin-right: 0;
  border-radius: 2px;
  padding: 2px;
`;