import React, { useEffect, useRef, useState } from 'react';

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

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  };

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isFocused={isFocused}
      isFilled={isFilled}
      onTouchEnd={() => textInputRef.current?.focus()}
    >
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <MyTextInput
        ref={textInputRef}
        placeholderTextColor="#666360"
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...otherProps}
      />
    </Container>
  );
};

export default Input;
