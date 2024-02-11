/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '@screens/Home';
import Login from '@screens/Login';
import MyTeam from '@screens/MyTeam';
import useAuth from '@hooks/useAuth';

const Stack = createNativeStackNavigator();

const Root: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ header: () => <></> }}
      />
      <Stack.Screen
        name="MyTeam"
        component={MyTeam}
        options={{ header: () => <></> }}
      />
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Root"
            component={Root}
            options={{ header: () => <></> }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ header: () => <></> }}
          />
        )}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ header: () => <></> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
