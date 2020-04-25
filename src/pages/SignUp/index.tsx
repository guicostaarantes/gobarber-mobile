import React, { useEffect } from 'react';

import { Image, KeyboardAvoidingView, View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

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

const SignUp: React.FC = () => {
  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Container>
          <Image source={logoImg} />
          <View>
            <Title>Faça seu cadastro</Title>
          </View>
          <Input name="fullName" icon="user" placeholder="Nome" />
          <Input name="email" icon="mail" placeholder="Email" />
          <Input name="password" icon="lock" placeholder="Senha" />
          <Input
            name="confirmPassword"
            icon="lock"
            placeholder="Confirmar Senha"
          />
          <Button onPress={() => console.log('')}>Entrar</Button>
        </Container>
      </ScrollView>
      <SignUpContainer>
        <Icon name="arrow-left" size={20} color="#ff9000" />
        <SignUpText>Voltar para logon</SignUpText>
      </SignUpContainer>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
