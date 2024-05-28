import * as S from './styles';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '@hooks/useAuth';
import SupervisorServices from '@services/SupervisorServices';
import ISupervisor from '@interfaces/Supervisor';

type IVendedor = {
  nome: string;
  cargo: string;
  nota: number;
  id: string;
  supervisorId?: string;
  companyId: string;
  stage:string
};

const Cards: React.FC<IVendedor> = ({
  nome,
  cargo,
  nota,
  id,
  supervisorId,
  companyId,
  stage
}) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [supervisor, setSupervisor] = useState<ISupervisor>();

  const handlePress = () => {
    navigation.navigate('SalesInspector', {
      idEmployee: id,
      cargo: cargo,
      companyId: companyId,
      stage: stage
    });
  };
  const formattedNota =
    nota !== undefined ? nota.toFixed(1).replace('.', ',') : '';

  useEffect(() => {
    const fetchSupervisor = async () => {
      try {
        if (user.job === 'Gerente') {
          const supervisorData =
            await SupervisorServices.getSupervisorByIdCompany(
              companyId,
              supervisorId
            );
          setSupervisor(supervisorData);
        }
      } catch (error) {}
    };

    fetchSupervisor();
  }, [companyId, supervisorId, user.job]);
  return (
    <S.DivWrapper onPress={handlePress}>
      <S.DivImage>
        <S.ImageVendedor
          source={require('@assets/img/cardVendedor/foto.png')}
        />
      </S.DivImage>
      <S.DivText>
        <S.Name>{nome}</S.Name>
        {cargo === 'Vendedor' && (
          <S.Stage>
            Estágio: {stage}
          </S.Stage>
        )}
        {cargo === 'Supervisor' && (
          <S.Stage>
            Cargo: {cargo}
          </S.Stage>
        )}
        {supervisor && (
          <S.StyledText>{'Responsável: ' + supervisor?.name}</S.StyledText>
        )}
      </S.DivText>
      {cargo !== 'Supervisor' && cargo !== 'Diretor' && (
        <S.DivAvalia nota={nota}>
          <S.Nota nota={nota}>{formattedNota}</S.Nota>
        </S.DivAvalia>
      )}
    </S.DivWrapper>
  );
};

export default Cards;
