import React, { useState } from 'react';
import * as S from './styles';
import Select from '@components/Select';

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { theme } from '@styles/default.theme';
import { Switch } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import ISeller from '@interfaces/Seller';
import IModules from '@interfaces/Module';
import IVisits from '@interfaces/Visit/Visit';

import PlainService from '@services/PlainService';

interface PlainActionProps {
  setState: () => void;
  seller: ISeller;
  modules: IModules[];
  visits: IVisits[];
  addNewPlain: (newPlain: any) => void;
}

const PlainMentory: React.FC<PlainActionProps> = ({
  seller,
  setState,
  modules,
  visits,
  addNewPlain,
}) => {
  console.log(visits);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [comment, setComment] = useState('');
  const [titleAction, setTitleAction] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModuleAction, setIsModuleAction] = useState(false);
  const toast = useToast();

  const handleModuleChange = (value: string) => setSelectedValue(value);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatePickerModal = () => setShowDatePicker(true);

  const handleCompletePlainAction = async () => {
    try {
      const newPlain = await PlainService.createPlain({
        title: titleAction,
        comments: comment,
        prize: date.toLocaleDateString(),
        sellerId: seller.id,
        supervisorId: seller.supervisorId,
        moduleId: isModuleAction ? selectedValue : null,
      });
      addNewPlain(newPlain);
      setState();
      showToast('Plano de ação efetivado com sucesso', 'success');
    } catch (error) {
      setState();
      showToast('Não foi possível criar plano de ação', 'warning');
    }
  };

  const returnPage = () => setState();

  const showToast = (message: string, type: 'success' | 'warning') => {
    toast.show(message, {
      type,
      placement: 'bottom',
      duration: 3000,
      animationType: 'zoom-in',
    });
  };

  return (
    <S.Wrapper>
      <S.WrapperView>
        <S.TextForms>Tipo de Ação</S.TextForms>
        <S.ActionTypeSwitch>
          <Switch
            value={isModuleAction}
            onValueChange={setIsModuleAction}
            trackColor={{
              false: theme.colors.secundary.main,
              true: theme.colors.secundary.main,
            }}
            thumbColor={isModuleAction ? '#f4f3f4' : '#f4f3f4'}
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
          />
          <S.ActionTypeLabel selected={isModuleAction}>
            {isModuleAction ? 'Módulo' : 'Visita'}
          </S.ActionTypeLabel>
        </S.ActionTypeSwitch>

        <ActionSpecificFields
          isModuleAction={isModuleAction}
          titleAction={titleAction}
          setTitleAction={setTitleAction}
          handleModuleChange={handleModuleChange}
          modules={modules}
          visits={visits}
        />

        <S.DivContainer>
          <DateTimePickerComponent
            date={date}
            showDatePicker={showDatePicker}
            showDatePickerModal={showDatePickerModal}
            handleDateChange={handleDateChange}
          />
        </S.DivContainer>

        <S.TextForms>Comentário</S.TextForms>
        <S.TextArea
          placeholder="Digite aqui..."
          multiline
          numberOfLines={5}
          value={comment}
          onChangeText={setComment}
        />

        <S.BtnCriarAction onPress={handleCompletePlainAction}>
          <S.TextBtn>criar plano de ação</S.TextBtn>
        </S.BtnCriarAction>
        <S.Outline onPress={returnPage}>
          <S.TextBtnNova>Voltar</S.TextBtnNova>
        </S.Outline>
      </S.WrapperView>
    </S.Wrapper>
  );
};

interface ActionSpecificFieldsProps {
  isModuleAction: boolean;
  titleAction: string;
  setTitleAction: React.Dispatch<React.SetStateAction<string>>;
  handleModuleChange: (value: string) => void;
  modules: IModules[];
  visits: IVisits[];
}

const ActionSpecificFields: React.FC<ActionSpecificFieldsProps> = ({
  isModuleAction,
  titleAction,
  setTitleAction,
  handleModuleChange,
  modules,
  visits,
}) => {
  return (
    <>
      {!isModuleAction && (
        <>
          <Select
            placeholder="Selecione"
            options={visits?.map(({ id, storeVisited }) => ({
              label: storeVisited,
              value: id,
            }))}
            onChange={handleModuleChange}
          />
          <S.TextForms>Ação Programada</S.TextForms>
          <S.InputText
            placeholder="Ex: Realizar nova visita"
            value={titleAction}
            onChangeText={setTitleAction}
          />
        </>
      )}

      {isModuleAction && (
        <>
          <S.TextForms>Módulo de Avaliação</S.TextForms>
          <Select
            placeholder="Selecione"
            options={modules?.map(({ name, id }) => ({
              label: name,
              value: id,
            }))}
            onChange={handleModuleChange}
          />
          <S.TextForms>Ação Programada</S.TextForms>
          <S.InputText
            placeholder="Ex: Realizar nova ação"
            value={titleAction}
            onChangeText={setTitleAction}
          />
        </>
      )}
    </>
  );
};

interface DateTimePickerComponentProps {
  date: Date;
  showDatePicker: boolean;
  showDatePickerModal: () => void;
  handleDateChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
}

const DateTimePickerComponent: React.FC<DateTimePickerComponentProps> = ({
  date,
  showDatePicker,
  showDatePickerModal,
  handleDateChange,
}) => {
  return (
    <>
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
    </>
  );
};

export default PlainMentory;
