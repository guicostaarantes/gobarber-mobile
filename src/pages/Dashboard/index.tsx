import React from 'react';

import Icon from 'react-native-vector-icons/Feather';

import { Container } from './styles';

import { useUser } from '../../context/UserContext';

const Dashboard: React.FC = () => {
  const { signOut } = useUser();

  return (
    <Container>
      <Icon name="log-out" size={40} color="#ff9000" onPress={signOut} />
    </Container>
  );
};

export default Dashboard;
