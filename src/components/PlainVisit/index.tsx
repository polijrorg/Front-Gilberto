import React, { useState } from 'react';
import * as S from './styles';
import { useToast } from 'react-native-toast-notifications';
import { DateTimePickerComponent } from '@screens/SalesInspector/TabScreens/Action/Plain/MentoryAndVisit';
import ISeller from '@interfaces/Seller';
import IModules from '@interfaces/Module';
import PlainService from '../../services/PlainService';
import Visit from '@interfaces/Visit/Visit';

interface PlainActionProps {
  seller: ISeller;
  dateVisited: Visit;
}

const PlainAction: React.FC<PlainActionProps> = ({ seller, dateVisited }) => {
  const [titleAction, setTitleAction] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [comment, setComment] = useState('');

  const toast = useToast();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    setDate(selectedDate || date);
  };

  const handleSave = async () => {
    try {
      if (!titleAction) {
        toast.show('Por favor, insira um título para a ação.', {
          type: 'warning',
        });
        return;
      }
      console.log('passou', seller, dateVisited, titleAction, comment, date);
      const plains = await PlainService.createPlain({
        title: titleAction,
        comments: comment,
        prize: date.toLocaleDateString(),
        sellerId: seller.id,
        supervisorId: seller.supervisorId,
        visitId: dateVisited.id,
      });
      showToast('Plano de ação criado com sucesso!', 'success');
    } catch (error) {
      console.log(error);
      showToast('Problema de para criar o plano', 'warning');
    }
  };

  const showToast = (message: string, type: string) => {
    toast.show(message, {
      type: type,
      placement: 'bottom',
      duration: 3500,
      animationType: 'zoom-in',
    });
  };

  return (
    <S.ContainerPlainVisit>
      <S.Title>Plano de Ação da Visita</S.Title>
      <S.InputText
        placeholder="Ex: Realizar nova visita"
        value={titleAction}
        onChangeText={setTitleAction}
      />
      <DateTimePickerComponent
        date={date}
        showDatePicker={showDatePicker}
        showDatePickerModal={() => setShowDatePicker(true)}
        handleDateChange={handleDateChange}
      />
      <S.TextForms>Comentário</S.TextForms>
      <S.TextArea
        placeholder="Digite aqui..."
        multiline
        numberOfLines={5}
        value={comment}
        onChangeText={setComment}
      />
      <S.ContainerButtons>
        <S.ButtonIniciar onPress={handleSave}>
          <S.TextBtn>Criar plano de ação</S.TextBtn>
        </S.ButtonIniciar>
      </S.ContainerButtons>
    </S.ContainerPlainVisit>
  );
};

export default PlainAction;
