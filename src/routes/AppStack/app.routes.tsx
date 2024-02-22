/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@screens/Home';
import MyTeam from '@screens/MyTeam';
import SellerAdded from '@screens/SellerAdded';
import Login from '@screens/Login';
import TabNav from '@routes/TabNav';

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
      name="SalesInspector"
      component={TabNav}
      options={{ header: () => <></> }}
    />
    <AppStack.Screen
      name="SellerAdded"
      component={SellerAdded}
      options={{ header: () => <></> }}
    />
  </AppStack.Navigator>
);

export default AppRoutes;
