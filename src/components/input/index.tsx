import React from 'react';

import { TextInputProps } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...otherProps }) => {
  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput placeholderTextColor="#666360" {...otherProps} />
    </Container>
  );
};

export default Input;
