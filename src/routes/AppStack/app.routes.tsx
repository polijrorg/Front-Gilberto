/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@screens/Home';
import MyTeam from '@screens/MyTeam';
import { SellerAdded } from '@screens/SellerAdded';
import Login from '@screens/Login';
import TabNav from '@routes/TabNav';
import EvaluateMentoring from '@screens/EvaluateMentoring';
import EvaluateVisit from '@screens/EvaluateVisit';
import useAuth from '@hooks/useAuth';
import ModuloAsk from '@screens/EvaluateMentoring/ModuloAsk';

const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
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
      <AppStack.Screen
        name="EvaluateVisit"
        component={EvaluateVisit}
        options={{ header: () => <></> }}
      />
      <AppStack.Screen
        name="AskEvaluateMentoring"
        component={ModuloAsk}
        options={{ header: () => <></> }}
      />

      {user && user.job === 'Supervisor' && (
        <AppStack.Screen
          name="EvaluateMentoring"
          component={EvaluateMentoring}
          options={{ header: () => <></> }}
        />
      )}
    </AppStack.Navigator>
  );
};

export default AppRoutes;
