import React, { useEffect, useRef, useCallback } from 'react';

import { Image, KeyboardAvoidingView, View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { Container, Title, BackContainer, BackText } from './styles';
import Input from '../../components/input';
import Button from '../../components/button';

import logoImg from '../../assets/logo.png';
import { ScrollView } from 'react-native-gesture-handler';

const SignUp: React.FC = () => {
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
              secureTextEntry={true}
            />
            <Input
              name="confirmPassword"
              icon="lock"
              placeholder="Confirmar Senha"
              secureTextEntry={true}
            />
            <Button onPress={() => formRef.current?.submitForm()}>
              Cadastrar
            </Button>
          </Form>
        </Container>
      </ScrollView>
      <BackContainer onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#ff9000" />
        <BackText>Voltar para logon</BackText>
      </BackContainer>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
