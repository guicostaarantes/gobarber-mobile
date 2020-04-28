import React, { useCallback, useRef } from 'react';

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { useKeyboard } from '@react-native-community/hooks';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

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
import { useUser } from '../../context/UserContext';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useUser();
  const navigation = useNavigation();
  const keyboard = useKeyboard();

  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({}); // eslint-disable-line no-unused-expressions
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Email inválido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, { abortEarly: false });
        await signIn(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors); // eslint-disable-line no-unused-expressions
        }
      }
    },
    [signIn],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{ flexGrow: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
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
                secureTextEntry
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
      </TouchableWithoutFeedback>
      {!keyboard.keyboardShown && (
        <SignUpContainer onPress={() => navigation.navigate('sign-up')}>
          <Icon name="log-in" size={20} color="#ff9000" />
          <SignUpText>Criar nova conta</SignUpText>
        </SignUpContainer>
      )}
    </KeyboardAvoidingView>
  );
};

export default SignIn;
