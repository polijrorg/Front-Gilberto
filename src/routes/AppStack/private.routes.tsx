/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@screens/Home';
import MyTeam from '@screens/MyTeam';
import AddCollaborators from '@screens/AddCollaborators';
import TabNav from '@routes/TabNav';
import EvaluateMentoring from '@screens/EvaluateMentoring';
import CompleteMentorship from '@screens/EvaluateMentoring/CompleteMentorship';
import EvaluateVisit from '@screens/EvaluateVisit';
import EvaluateVisitManager from '@screens/EvaluateVisit/EvaluateVisitManager';
import ModuloAsk from '@screens/EvaluateMentoring/ModuloAsk';
import PlainActionTemplate from '@screens/PlainAction';
import User from '@interfaces/User';

const PrivateStack = createNativeStackNavigator();

interface IRoutes {
  user: User
}

const PrivateRoutes: React.FC<IRoutes> = ({ user }) => {

  return (
    <PrivateStack.Navigator>
      
      <PrivateStack.Screen
        name="Home"
        component={() => <Home user={user} />}
        options={{ header: () => <></> }}
      />
      <PrivateStack.Screen
        name="MyTeam"
        component={() => <MyTeam user={user} />}
        options={{ header: () => <></> }}
      />
      <PrivateStack.Screen
        name="SalesInspector"
        component={({ route }: { route: any }) => <TabNav user={user} route={{ ...route, params: { idEmployee: '', cargo: '', companyId: '', stage: '' } }} />}
        options={{ header: () => <></> }}
      />
      <PrivateStack.Screen
        name="AddCollaborators"
        component={() => <AddCollaborators user={user} />}
        options={{ header: () => <></> }}
      />
      <PrivateStack.Screen
        name="EvaluateVisit"
        component={() => <EvaluateVisit user={user} />}
        options={{ header: () => <></> }}
      />
      <PrivateStack.Screen
        name="EvaluateVisitManager"
        component={() => <EvaluateVisitManager user={user} />}
        options={{ header: () => <></> }}
      />
      <PrivateStack.Screen
        name="AskEvaluateMentoring"
        component={(props: any) => <ModuloAsk {...props} />}
        options={{ header: () => <></> }}
      />

      <PrivateStack.Screen
        name="CompleteMentoring"
        component={() => <CompleteMentorship />}
        options={{ header: () => <></> }}
      />

      <PrivateStack.Screen
        name="PlainAction"
        component={() => <PlainActionTemplate user={user} />}
        options={{ header: () => <></> }}
      />

      {user && user.job === 'Supervisor' && (
        <PrivateStack.Screen
          name="EvaluateMentoring"
          component={() => <EvaluateMentoring user={user} />}
          options={{ header: () => <></> }}
        />
      )}
    </PrivateStack.Navigator>
  );
};

export default PrivateRoutes;
