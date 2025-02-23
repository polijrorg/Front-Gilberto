import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import SupervisorServices from '@services/SupervisorServices';
import ISupervisor from '@interfaces/Supervisor';
import User from '@interfaces/User';

interface IVendedor {
  nome: string;
  cargo: string;
  nota?: number;
  id: string;
  supervisorId?: string;
  companyId: string;
  stage: string;
  blocked?: boolean;
  userLogged: User;
};

const Cards: React.FC<IVendedor> = ({
  nome,
  cargo,
  nota,
  id,
  supervisorId,
  companyId,
  stage,
  blocked = false,
  userLogged
}) => {
  const navigation = useNavigation();
  const [supervisor, setSupervisor] = useState<ISupervisor>();

  const handlePress = () => {
    if (!blocked) {
      navigation.navigate('SalesInspector', {
        idEmployee: id,
        cargo: cargo,
        companyId: companyId,
        stage: stage,
      });
    }
  };
  const formattedNota =
    nota !== undefined ? nota.toFixed(1).replace('.', ',') : '';

  useEffect(() => {
    const fetchSupervisor = async () => {
      try {
        if (userLogged?.job === 'Gerente') {
          if (supervisorId) {
            const supervisorData =
              await SupervisorServices.getSupervisorByIdCompany(
                companyId,
                supervisorId
              );
            setSupervisor(supervisorData);
          }
        }
      } catch (error) {}
    };

    fetchSupervisor();
  }, [companyId, supervisorId, userLogged?.job]);
  return (
    <S.DivWrapper onPress={handlePress} disabled={blocked}>
      <S.DivImage>
         <S.ImageVendedor
          source={require('@assets/img/cardVendedor/foto.png')}
        /> 
      </S.DivImage>
      <S.DivText>
        <S.Name>{nome}</S.Name>
        {cargo === 'Vendedor' && <S.Stage>Estágio: {stage}</S.Stage>}
        {cargo === 'Supervisor' && <S.Stage>Cargo: {cargo}</S.Stage>}
        {supervisor && (
          <S.StyledText>{'Responsável: ' + supervisor?.name}</S.StyledText>
        )}
      </S.DivText>
      {cargo !== 'Supervisor' && cargo !== 'Diretor' && (
        <S.DivAvalia nota={nota ?? 0} stage={stage}>
          <S.Nota nota={nota ?? 0} stage={stage}>
            {formattedNota}
          </S.Nota>
        </S.DivAvalia>
      )}
    </S.DivWrapper>
  );
};

export default Cards;
