import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@screens/Home';
import MyTeam from '@screens/MyTeam';
import Login from '@screens/Login';
import useAuth from '@hooks/useAuth';

const Stack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        // Auth screen
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Group>
      ) : (
        // Screens for logged in users
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MyTeam" component={MyTeam} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default AppRoutes;
