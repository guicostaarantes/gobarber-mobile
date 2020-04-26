import React, { useEffect, useRef } from 'react';

import { TextInputProps } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useField } from '@unform/core';

import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueRef {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...otherProps }) => {
  const { registerField, defaultValue, error, fieldName } = useField(name);
  const inputValueRef = useRef<InputValueRef>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
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
