import {
  TouchableOpacity as RNTouchableOpacity,
  StatusBar as RNStatusBar,
  Text as RNText,
  TextInput as RNTextInput,
  View as RNView,
  ActivityIndicator,
  Switch as RNSwitch,
  Modal,
} from 'react-native';
import styled from 'styled-components/native';
import { Wrapper } from '../../../components/FormsLogin/styles';

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
  width: 90%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  margin: 50% auto;
`;

export const Input = styled(RNTextInput)`
  border-bottom-width: 1px;
  margin-bottom: 10px;
`;

export const ModalButtonsContainer = styled(RNView)`
  flex-direction: row;
  justify-content: space-between;
`;

export const CreatedTemplateContainer = styled(RNView)`
  min-width: 100%;
  margin: 16px auto;

  border: 1px solid #d7dbdf;

  border-radius: 8px;
`;

export const WrapperTemplate = styled(Wrapper)`
  min-width: 90%;
  height: auto;

  padding: 16px;
  margin: 16px auto;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: transparent;

  gap: 16px;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  padding: 8px;
`;

export const TitleCreatedTemplate = styled(RNText)`
  font-size: 14px;
  font-family: Poppins;
`;

export const InputNameTemplate = styled(RNTextInput)`
  min-width: 90% !important;

  border-radius: 4px;
  border: 1px solid #d7dbdf;
  font-size: 12px;
  background-color: #f1f3f5;

  padding: 4px 8px;
  font-family: Poppins;
  ::placeholder {
    color: #687076;
  }
`;

export const FormButtonsContainer = styled(RNView)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 90%;
`;

export const ButtonGeneric = styled(RNTouchableOpacity)`
  padding: 8px 16px;
  border-radius: 4px;

  background-color: #3e63dd;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalStyled = styled(Modal)`
  padding: 8px 16px;
  border-radius: 4px;

  box-sizing: border-box;

  height: auto;

  border: 1px solid #3e63dd;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SwitchContainer = styled(RNView)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;

  max-width: 90%;
`;

export const SwitchLabel = styled(RNText)`
  font-size: 16px;
  color: #333;
  margin-right: 4px;
`;

export const ButtonGenericText = styled(RNText)`
  color: white;
  font-size: 14px;
  font-family: Poppins;
`;
export const Switch = styled(RNSwitch).attrs(({ value }) => ({
  trackColor: {
    false: '#e0e0e0',
    true: '#e0e0e0',
  },
  thumbColor: value ? '#3e63dd' : '#3e63dd',
}))`
  margin-left: 10px;
`;
