import {
  TouchableOpacity as RNTouchableOpacity,
  StatusBar as RNStatusBar,
  Text as RNText,
  TextInput as RNTextInput,
  View as RNView,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';

export const ContainerVisit = styled(RNView)`
  min-width: 90%;
  margin: 2rem;
  padding: 1rem;
`;

export const Loading = styled(ActivityIndicator)`
  margin: 25px auto;
`;

export const Title = styled(RNText)`
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0;
  font-family: Poppins;

  text-transform: capitalize;
`;

export const WrapperView = styled(RNView)`
  width: 100%;
  height: 100%;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
  display: flex;
`;

export const ContainerFields = styled(RNView)`
  max-width: 90%;
  height: 90%;
  margin: 2rem auto;
  padding: 1rem;
`;

export const NoCategoriesContainer = styled(RNView)`
  align-items: center;
  margin-top: 20px;
  min-width: 100%;
`;

export const NoCategoriesText = styled(RNText)`
  font-size: 16px;
  font-family: Poppins;

  text-align: ce;
`;

export const AddCategoryEmpty = styled(RNTouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 50%;
  padding: 8px 12px;

  background-color: #3e63dd;
  border-radius: 8px;
`;

export const AddCategoryEmptyText = styled(RNText)`
  font-size: 16px;
  font-family: Poppins;

  color: white;

  text-align: center;
`;

export const AddCategoryButton = styled(RNTouchableOpacity)`
  margin-top: 20px;
  align-items: center;
  width: 40%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px 12px;

  border-radius: 8px;

  background-color: #3e63dd;
`;

export const AddCategoryText = styled(RNText)`
  color: white;
  font-size: 14px;
  width: 100%;

  text-align: center;
`;

export const CategoryContainer = styled(RNView)`
  max-height: 70%;
`;

export const NavigationContainer = styled(RNView)`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-direction: row;
  min-height: auto;
  width: 100%;
`;
export const ButtonFirst = styled(RNTouchableOpacity)<{ isDisabled: boolean }>`
  padding: 8px 24px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
`;

export const TextBtn = styled(RNText)`
  font-family: Poppins;
  text-transform: uppercase;
  color: #3e63dd;
  font-size: 40px;
`;

export const ModalContainer = styled(RNView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled(RNView)`
  width: 80%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

export const Input = styled(RNTextInput)`
  border-bottom-width: 1px;
  margin-bottom: 10px;
`;

export const ModalButtonsContainer = styled(RNView)`
  flex-direction: row;
  justify-content: space-between;
`;
