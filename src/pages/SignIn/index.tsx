import React, { useEffect } from 'react';

import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Title,
  ForgotContainer,
  ForgotText,
  SignUpContainer,
  SignUpText,
} from './styles';
import Input from '../../components/input';
import Button from '../../components/button';

import logoImg from '../../assets/logo.png';
import { ScrollView } from 'react-native-gesture-handler';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Container>
          <Image source={logoImg} />
          <View>
            <Title>Faça seu logon</Title>
          </View>
          <Input name="email" icon="mail" placeholder="Email" />
          <Input name="password" icon="lock" placeholder="Senha" />
          <Button onPress={() => console.log('')}>Entrar</Button>
          <ForgotContainer>
            <ForgotText>Esqueci minha senha</ForgotText>
          </ForgotContainer>
        </Container>
      </ScrollView>
      <SignUpContainer onPress={() => navigation.navigate('sign-up')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <SignUpText>Criar nova conta</SignUpText>
      </SignUpContainer>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
