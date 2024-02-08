/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@screens/Login';

const AppStack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      name="Login"
      component={Login}
      options={{ header: () => <></> }}
    />
  </AppStack.Navigator>
);

export default AuthRoutes;
