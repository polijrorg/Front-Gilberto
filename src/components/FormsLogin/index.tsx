import * as React from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Wrapper,
  Forms,
  Div,
  DivFields,
  LabelEmail,
  Input,
  ButtonEnviar,
  TitleBtn,
} from './styles';
import DivGradient from '@components/DivGradient';
import useAuth from '@hooks/useAuth';
import { useToast } from 'react-native-toast-notifications';

const FormsLogin: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const { login } = useAuth();
  const toast = useToast();

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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        <Forms>
          <Div>
            <DivFields>
              <LabelEmail>{'Digite seu E-mail'}</LabelEmail>
              <Input
                placeholder={'marco.rudas@gmail.com'}
                keyboardType={'email-address'}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </DivFields>

            <DivFields>
              <LabelEmail>{'Digite sua senha'}</LabelEmail>
              <Input
                placeholder={'Senha'}
                keyboardType="default"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </DivFields>
          </Div>
          <ButtonEnviar
            onPress={loading ? undefined : handleEnviarPress}
            disabled={loading}
          >
            {/* Desabilita o botão quando o carregamento estiver ocorrendo */}
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <TitleBtn>Entrar</TitleBtn>
            )}
          </ButtonEnviar>
        </Forms>
        <DivGradient />
      </Wrapper>
    </>
  );
};

export default FormsLogin;
