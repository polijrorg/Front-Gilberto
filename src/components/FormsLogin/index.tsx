import * as S from './styles';
import { Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DivGradient from '@components/DivGradient';
import useAuth from '@hooks/useAuth';

type ILogin = {
  codigo?: boolean;
  msg?: string;
};

const FormsLogin: React.FC<ILogin> = ({ codigo, msg }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const { login } = useAuth();

  const handleEnviarPress = () => {
    try {
      console.log('aqui passou');
      login({ email, password });
      navigation.navigate('Home' as never);
    } catch (error) {
      Alert.alert('Erro ao Logar');
      console.log(error);
    }
  };

  return (
    <>
      <S.Wrapper>
        <S.Forms>
          <S.Div>
            <S.DivFields>
              <S.LabelEmail>{'Digite seu E-mail'}</S.LabelEmail>
              <S.Input
                placeholder={'marco.rudas@gmail.com'}
                keyboardType={'email-address'}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </S.DivFields>

            <S.DivFields>
              <S.LabelEmail>{'Digite sua senha'}</S.LabelEmail>
              <S.Input
                placeholder={'Senha'}
                keyboardType="default"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </S.DivFields>

            {!codigo && (
              <S.TextInfo hasError={msg !== undefined && msg !== ''}>
                {msg || 'Mandaremos um código para autenticar sua entrada'}
              </S.TextInfo>
            )}
          </S.Div>
          <S.ButtonEnviar onPress={handleEnviarPress}>
            <S.TitleBtn>Entrar</S.TitleBtn>
          </S.ButtonEnviar>
        </S.Forms>
        <DivGradient />
      </S.Wrapper>
    </>
  );
};

export default FormsLogin;
