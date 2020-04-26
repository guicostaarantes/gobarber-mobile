import React, { useEffect, useRef } from 'react';

import { TextInputProps, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useField } from '@unform/core';

import { Container, MyTextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueRef {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...otherProps }) => {
  const { registerField, defaultValue, error, fieldName } = useField(name);
  const textInputRef = useRef<TextInput>(null);
  const inputValueRef = useRef<InputValueRef>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container onTouchEnd={() => textInputRef.current?.focus()}>
      <Icon name={icon} size={20} color="#666360" />
      <MyTextInput
        ref={textInputRef}
        placeholderTextColor="#666360"
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...otherProps}
      />
    </Container>
  );
};

export default Input;
