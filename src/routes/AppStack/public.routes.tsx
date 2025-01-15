/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '@screens/Login';


const PublicStack = createNativeStackNavigator();


const AppRoutes: React.FC = () => {

  return (
    <PublicStack.Navigator>
      <PublicStack.Screen
        name="Login"
        component={Login}
        options={{ header: () => <></> }}
      />
    </PublicStack.Navigator>
  );
};

export default AppRoutes;
