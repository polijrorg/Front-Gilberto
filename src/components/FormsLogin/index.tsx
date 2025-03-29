import * as React from 'react';
import { Alert, Platform, KeyboardAvoidingView, ScrollView, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as S from './styles';

import useAuth from '@hooks/useAuth';
import { useToast } from 'react-native-toast-notifications';
import { useState } from 'react';
import Input from '../../components/Input';
import DefaultButton from '@components/DefaultButton';

const FormsLogin: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const toast = useToast();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const token = await login({ email: email.toLowerCase(), password });

      if (token) {
        toast.show('Login realizado com sucesso!', {
          type: 'success',
          placement: 'bottom',
          duration: 3000,
        });
      } else {
        toast.show('Credenciais inválidas. Tente novamente.', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
        });
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const isEnviarDisabled = !email || !password;

  return (
      <S.Wrapper>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
            <S.Forms>
              <S.DivFields>
                <Input
                  label="Digite seu E-mail"
                  placeholder="email@example.com"
                  type="email"
                  onChangeValue={(text) => setEmail(text)}
                  value={email}
                />
                <Input
                  label="Digite sua Senha"
                  placeholder="Senha"
                  type="password"
                  showPasswordToggle={true}
                  secureTextEntry={true}
                  onChangeValue={(text) => setPassword(text)}
                  value={password}
                  onTogglePassword={toggleShowPassword}
                />
              </S.DivFields>

              <DefaultButton
                textButton="Enviar"
                loading={loading}
                isEnviarDisabled={isEnviarDisabled}
                onPress={handleLogin}
                />
            </S.Forms>
        </ScrollView>
      </S.Wrapper>
  );
};

export default FormsLogin;
