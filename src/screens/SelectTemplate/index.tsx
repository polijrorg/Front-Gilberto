import * as S from './styles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import HeaderPages from "@components/HeaderPages";
import { StatusBar } from "react-native";
import { useToast } from 'react-native-toast-notifications';
import Select from '@components/Select';
import type ITemplateVisit from '@interfaces/Visit/TemplateVisit';
import VisitService from '@services/VisitService';
import User from '@interfaces/User';
import { useNavigation } from '@react-navigation/native';

interface SelectTemplateProps {
  user: User
}

function SelectTemplate({ user }: SelectTemplateProps) {
  const [initialSelected, setInitialSelected] = useState<ITemplateVisit | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplateVisit | null>(null);
  const [templates, setTemplates] = useState<ITemplateVisit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();
  const toast = useToast();

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const [managerTemplate] = await Promise.all([
        VisitService.getTemplateByManagerId(user.id),
      ]);
      const validManagerTemplate = Array.isArray(managerTemplate)
        ? managerTemplate
        : [];
      setTemplates([...validManagerTemplate]);

      let selected = await VisitService.getSelectedTemplateByManager(user.id);
      if (!selected) {
        selected = await VisitService.getSelectedTemplateByCompany(user.companyId);
      }
      setInitialSelected(selected);
    } catch (error) {
      console.error('Erro ao buscar Templates:', error);
      toast.show('Erro ao buscar Templates', { type: 'danger' });
    } finally {
      setLoading(false);
    }
  }, [user.id, user.companyId]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleConfirmTemplate = async () => {
    if (!selectedTemplate) {
      toast.show('Template não selecionado', { type: 'danger' });
      return;
    }
    setLoading(true);

    try {
      const response = await VisitService.setSelectedForManager(user.id, selectedTemplate.id);
      setInitialSelected(selectedTemplate);
      toast.show('Template selecionado com sucesso', { type: 'success' });
    } catch (error) {
      toast.show('Erro ao selecionar template', { type: 'danger' });
    } finally {
      setLoading(false);
    }
  }
  
  const handleTemplateChange = useCallback(
    (value: string) => {
      const templateSelect = templates.find(
        (template) => template.id === value.trim()
      );
      if (templateSelect) {
        setSelectedTemplate(templateSelect);
      }
    },
    [templates]
  );

  const selectOptions = useMemo(
    () =>
      templates.map((template, index) => ({
        label: template.name || `Template ${index + 1}`,
        value: template.id,
      })),
    [templates]
  );

  return ( 
    <S.WrapperView>
      <StatusBar backgroundColor={'#3E63DD'} />
      <HeaderPages title="Selecionar Template" />
      {loading || templates.length === 0 ? (
        <S.Loading color="#0000ff" />
      ) : (
        <S.Container>
          <S.P>Selecionado atualmente: {initialSelected?.name}</S.P>
          <S.Title>Escolha template a ser usado:</S.Title>
          <Select
            onChange={handleTemplateChange}
            placeholder="Selecione um template"
            options={selectOptions}
          />
          <S.FormButtonsContainer>
            <S.ButtonGeneric
              onPress={() => {
                navigation.goBack();
              }}
            >
              <S.ButtonGenericText>Cancelar</S.ButtonGenericText>
            </S.ButtonGeneric>
            <S.ButtonGeneric onPress={handleConfirmTemplate}>
              <S.ButtonGenericText>Confirmar</S.ButtonGenericText>
            </S.ButtonGeneric>
          </S.FormButtonsContainer>
        </S.Container>
      )}
    </S.WrapperView>
   );
}

export default SelectTemplate;