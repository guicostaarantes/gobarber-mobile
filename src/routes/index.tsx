import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Auth = createStackNavigator();

export const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
      initialRouteName="sign-in"
    >
      <Auth.Screen name="sign-up" component={SignUp} />
      <Auth.Screen name="sign-in" component={SignIn} />
    </Auth.Navigator>
  );
};
