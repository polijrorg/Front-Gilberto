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
import SelectTemplate from '@screens/SelectTemplate';

const PrivateStack = createNativeStackNavigator();

interface IRoutes {
  user: User;
}

const PrivateRoutes: React.FC<IRoutes> = ({ user }) => {
  return (
    <PrivateStack.Navigator>
      <PrivateStack.Screen name="Home" options={{ header: () => <></> }}>
        {() => <Home user={user} />}
      </PrivateStack.Screen>
      
      <PrivateStack.Screen name="MyTeam" options={{ header: () => <></> }}>
        {() => <MyTeam user={user} />}
      </PrivateStack.Screen>
      
      <PrivateStack.Screen name="SalesInspector" options={{ header: () => <></> }}>
        {({ route }: { route: any }) => (
          <TabNav
            user={user}
            route={route}
          />
        )}
      </PrivateStack.Screen>
      
      <PrivateStack.Screen name="AddCollaborators" options={{ header: () => <></> }}>
        {() => <AddCollaborators user={user} />}
      </PrivateStack.Screen>
      
      <PrivateStack.Screen name="EvaluateVisit" options={{ header: () => <></> }}>
        {() => <EvaluateVisit user={user} />}
      </PrivateStack.Screen>
      
      <PrivateStack.Screen name="EvaluateVisitManager" options={{ header: () => <></> }}>
        {() => <EvaluateVisitManager user={user} />}
      </PrivateStack.Screen>
      
      <PrivateStack.Screen name="AskEvaluateMentoring" options={{ header: () => <></> }}>
        {(props: any) => <ModuloAsk {...props} />}
      </PrivateStack.Screen>
      
      <PrivateStack.Screen name="CompleteMentoring" options={{ header: () => <></> }}>
        {() => <CompleteMentorship />}
      </PrivateStack.Screen>
      
      <PrivateStack.Screen name="PlainAction" options={{ header: () => <></> }}>
        {() => <PlainActionTemplate user={user} />}
      </PrivateStack.Screen>
      
      {user && user.job === 'Supervisor' && (
        <PrivateStack.Screen name="EvaluateMentoring" options={{ header: () => <></> }}>
          {() => <EvaluateMentoring user={user} />}
        </PrivateStack.Screen>
      )}
      
      {user && user.job === 'Gerente' && (
        <PrivateStack.Screen name="SelectTemplate" options={{ header: () => <></> }}>
          {() => <SelectTemplate user={user} />}
        </PrivateStack.Screen>
      )}

    </PrivateStack.Navigator>
  );
};

export default PrivateRoutes;
