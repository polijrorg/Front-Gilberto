import React, { useState } from 'react';
import * as S from './styles';
import Select from '@components/Select';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import ISeller from '@interfaces/Seller';
import IModules from '@interfaces/Module';
import PlainService from '@services/PlainService';
import { useToast } from 'react-native-toast-notifications';
interface PlainActionProps {
  setState: () => void;
  seller: ISeller;
  modules: IModules[];
}

const PlainMentory: React.FC<PlainActionProps> = ({
  seller,
  setState,
  modules,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [comment, setComment] = useState('');
  const [titleAction, setTitleAction] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const toast = useToast();

  const handleModuleChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleCompletePlainAction = async () => {
    try {
      await PlainService.createPlain({
        title: titleAction,
        comments: comment,
        prize: date.toLocaleDateString(),
        sellerId: seller.id,
        supervisorId: seller.supervisorId,
        moduleId: selectedValue,
      });

      setState();

      toast.show('Plano de ação efetivado com sucesso', {
        type: 'success',
        placement: 'bottom',
        duration: 3000,
        animationType: 'zoom-in',
      });
    } catch (error) {
      setState();
      toast.show('Não foi possível criar plano de ação', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        animationType: 'zoom-in',
      });
    }
  };

  return (
    <S.Wrapper>
      <S.WrapperView>
        <S.TextForms>Módulo de Avaliação</S.TextForms>
        <Select
          placeholder="Selecione"
          options={modules.map((module) => {
            return {
              label: module.name,
              value: module.id,
            };
          })}
          onChange={handleModuleChange}
        />

        <S.TextForms>Ação Programada</S.TextForms>
        <S.InputText
          placeholder="Ex: Realizar nova visita"
          value={titleAction}
          onChangeText={(text) => setTitleAction(text)}
        />

        <S.DivContainer>
          <S.TextForms>Data</S.TextForms>
          <S.BtnData onPress={showDatePickerModal}>
            <S.TextBtnData>
              {date ? date.toLocaleDateString() : 'Selecione a Data'}
            </S.TextBtnData>
          </S.BtnData>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </S.DivContainer>

        <S.TextForms>Comentário</S.TextForms>
        <S.TextArea
          placeholder="Digite aqui..."
          multiline={true}
          numberOfLines={5}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />

        <S.BtnCriarAction onPress={handleCompletePlainAction}>
          <S.TextBtn>criar plano de ação</S.TextBtn>
        </S.BtnCriarAction>
      </S.WrapperView>
    </S.Wrapper>
  );
};

export default PlainMentory;
