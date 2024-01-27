import * as S from './styles';
import React, { useState } from 'react';

type ILogin = {
  codigo?: boolean;
  msg?: string;
};

const FormsLogin: React.FC<ILogin> = ({ codigo, msg }) => {
  const [email, setEmail] = useState('');
  const [codigoAuth, setCodigoAuth] = useState('');

  const handleEnviarPress = () => {
    console.log('Email:', email);
    console.log('codigo:', codigoAuth);
  };

  return (
    <S.Wrapper>
      <S.Forms>
        <S.Div>
          <S.LabelEmail>
            {codigo
              ? 'Insira o código recebido no e-mail'
              : 'Insira seu e-mail'}
          </S.LabelEmail>
          <S.InputEmail
            placeholder={codigo ? 'XXXXXXXX' : 'marco.rudas@gmail.com'}
            keyboardType={codigo ? 'numeric' : 'email-address'}
            value={codigo ? codigoAuth : email}
            onChangeText={(text) =>
              codigo ? setCodigoAuth(text) : setEmail(text)
            }
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
