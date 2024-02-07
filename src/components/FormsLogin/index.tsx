import * as S from './styles';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

type ILogin = {
  codigo?: boolean;
  msg?: string;
};

const FormsLogin: React.FC<ILogin> = ({ codigo, msg }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleEnviarPress = () => {
    console.log('Email:', email);

    console.log('Senha', password);
    navigation.navigate('Home' as never);
  };

  return (
    <S.Wrapper>
      <S.Forms>
        <S.Div>
          <S.LabelEmail>{'Insira seu e-mail'}</S.LabelEmail>
          <S.Input
            placeholder={'marco.rudas@gmail.com'}
            keyboardType={'email-address'}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <S.Input
            placeholder={'Senha'}
            keyboardType="default"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {!codigo && (
            <S.TextInfo hasError={msg !== undefined && msg !== ''}>
              {msg || 'Mandaremos um código para autenticar sua entrada'}
            </S.TextInfo>
          )}
        </S.Div>
        <S.ButtonEnviar onPress={handleEnviarPress}>
          <S.TitleBtn>Mandar Código</S.TitleBtn>
        </S.ButtonEnviar>
      </S.Forms>
      <S.DivGradiente />
    </S.Wrapper>
  );
};

export default FormsLogin;
