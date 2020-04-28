import React, { useRef, useCallback } from 'react';

import {
  Image,
  KeyboardAvoidingView,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { useKeyboard } from '@react-native-community/hooks';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { Container, Title, BackContainer, BackText } from './styles';
import Input from '../../components/input';
import Button from '../../components/button';

import logoImg from '../../assets/logo.png';

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const keyboard = useKeyboard();

  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({}); // eslint-disable-line no-unused-expressions
        const schema = Yup.object().shape({
          fullName: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Email inválido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(8, 'Mínimo de 8 dígitos'),
          confirmPassword: Yup.string()
            .required('Senha obrigatória')
            .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
        });
        await schema.validate(data, { abortEarly: false });

        await api.post('users', data);
        Alert.alert(
          'Usuário criado',
          'Utilize suas credenciais para acessar a aplicação.',
        );
        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors); // eslint-disable-line no-unused-expressions
        } else {
          Alert.alert(
            'Erro na requisição',
            'Não foi possível criar o seu usuário nesse momento.',
          );
        }
      }
    },
    [navigation],
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
              <Title>Faça seu cadastro</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="fullName"
                icon="user"
                placeholder="Nome"
                autoCorrect={false}
                autoCapitalize="words"
              />
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
              <Input
                name="confirmPassword"
                icon="lock"
                placeholder="Confirmar Senha"
                secureTextEntry
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </TouchableWithoutFeedback>
      {!keyboard.keyboardShown && (
        <BackContainer onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#ff9000" />
          <BackText>Voltar para logon</BackText>
        </BackContainer>
      )}
    </KeyboardAvoidingView>
  );
};

export default SignUp;
