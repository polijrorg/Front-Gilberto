import * as React from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as S from './styles';

import DivGradient from '@components/DivGradient';
import useAuth from '@hooks/useAuth';
import { useToast } from 'react-native-toast-notifications';
import { useState } from 'react';

const FormsLogin: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const { login } = useAuth();
  const toast = useToast();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEnviarPress = async () => {
    try {
      setLoading(true);
      const token = await login({ email, password });

      if (token !== undefined) {
        toast.show('Seja Bem-Vindo(a)', {
          type: 'success',
          placement: 'bottom',
          duration: 3000,
          animationType: 'zoom-in',
        });
        navigation.navigate('Home' as never);
      } else {
        navigation.navigate('Login' as never);
        toast.show('Credênciais não encontradas', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          animationType: 'zoom-in',
        });
      }
    } catch (error) {
      Alert.alert('Erro ao Logar');
    } finally {
      setLoading(false);
    }
  };

  // Verifica se ambos os campos estão preenchidos para habilitar o botão de enviar
  const isEnviarDisabled = !email || !password;

  // Define a opacidade do botão com base no conteúdo dos campos de e-mail e senha
  const buttonOpacity = email && password ? 1 : 0.8;

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
              <S.DivViewTextInput>
                <S.Input
                  placeholder={'Senha'}
                  keyboardType="default"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <S.BtnIconPass onPress={toggleShowPassword}>
                  <S.Icon
                    source={
                      showPassword
                        ? require('@assets/img/olho_aberto.png')
                        : require('@assets/img/olho_fechado.png')
                    }
                  />
                </S.BtnIconPass>
              </S.DivViewTextInput>
            </S.DivFields>
          </S.Div>
          <S.ButtonEnviar
            onPress={
              loading || isEnviarDisabled ? undefined : handleEnviarPress
            }
            disabled={loading || isEnviarDisabled}
            style={{ opacity: buttonOpacity }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <S.TitleBtn>Entrar</S.TitleBtn>
            )}
          </S.ButtonEnviar>
        </S.Forms>
        <DivGradient />
      </S.Wrapper>
    </>
  );
};

export default FormsLogin;
