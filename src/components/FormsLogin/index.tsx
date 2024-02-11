import * as S from './styles';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DivGradient from '@components/DivGradient';
import UserService from '@services/UserService';

type ILogin = {
  codigo?: boolean;
  msg?: string;
};

const FormsLogin: React.FC<ILogin> = ({ codigo, msg }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleEnviarPress = async () => {
    const data = {
      email,
      password,
    };
    const response = await UserService.login(data);
    navigation.navigate('Home' as never);
    console.log(response);
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
