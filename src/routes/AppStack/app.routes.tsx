/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@screens/Home';
import MyTeam from '@screens/MyTeam';
import Login from '@screens/Login';
import SalesInpector from '@screens/SalesInspector';

const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      name="Login"
      component={Login}
      options={{ header: () => <></> }}
    />
    <AppStack.Screen
      name="Home"
      component={Home}
      options={{ header: () => <></> }}
    />

    <AppStack.Screen
      name="MyTeam"
      component={MyTeam}
      options={{ header: () => <></> }}
    />
    <AppStack.Screen
      name="SalesInpector"
      component={SalesInpector}
      options={{ header: () => <></> }}
    />
  </AppStack.Navigator>
);

export default AppRoutes;
