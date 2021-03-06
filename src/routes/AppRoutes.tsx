import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
      initialRouteName="dashboard"
    >
      <App.Screen name="dashboard" component={Dashboard} />
    </App.Navigator>
  );
};

export default AppRoutes;
