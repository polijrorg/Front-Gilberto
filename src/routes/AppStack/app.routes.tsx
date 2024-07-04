/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@screens/Home';
import MyTeam from '@screens/MyTeam';
import { SellerAdded } from '@screens/SellerAdded';
import Login from '@screens/Login';
import TabNav from '@routes/TabNav';
import EvaluateMentoring from '@screens/EvaluateMentoring';
import CompleteMentorship from '@screens/EvaluateMentoring/CompleteMentorship';
import EvaluateVisit from '@screens/EvaluateVisit';
import EvaluateVisitManager from '@screens/EvaluateVisit/EvaluateVisitManager';
import useAuth from '@hooks/useAuth';
import ModuloAsk from '@screens/EvaluateMentoring/ModuloAsk';
import PlainActionTemplate from '@screens/PlainAction';

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
        name="EvaluateVisitManager"
        component={EvaluateVisitManager}
        options={{ header: () => <></> }}
      />  
      <AppStack.Screen
        name="AskEvaluateMentoring"
        component={ModuloAsk}
        options={{ header: () => <></> }}
      />

      <AppStack.Screen
        name="CompleteMentoring"
        component={CompleteMentorship}
        options={{ header: () => <></> }}
      />

      <AppStack.Screen
        name="PlainAction"
        component={PlainActionTemplate}
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
