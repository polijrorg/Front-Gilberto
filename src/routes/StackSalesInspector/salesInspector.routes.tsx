import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import Home from '@screens/Home';

const Tab = createMaterialTopTabNavigator();

const TapRoutes: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen name="Mentoria" component={Home} />
    <Tab.Screen name="visita" component={Home} />
    <Tab.Screen name="acao" component={Home} />
  </Tab.Navigator>
);

export default TapRoutes;
