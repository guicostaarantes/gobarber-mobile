import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useUser } from '../context/UserContext';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';

const Routes: React.FC = () => {
  const { loading, token } = useUser();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#312e38',
        }}
      >
        <ActivityIndicator size="large" color="#ff9000" />
      </View>
    );
  }

  return token ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
