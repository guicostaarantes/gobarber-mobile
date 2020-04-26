import React, { useEffect, useCallback, useRef } from 'react';

import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

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

  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Container>
          <Image source={logoImg} />
          <View>
            <Title>Faça seu logon</Title>
          </View>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              icon="mail"
              placeholder="Email"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Input
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry={true}
            />
            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>
          </Form>
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
