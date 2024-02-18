/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import * as S from './styles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Action from '@screens/SalesInspector/TabScreens/Action';
import Mentoring from '@screens/SalesInspector/TabScreens/Mentoring';
import Visit from '@screens/SalesInspector/TabScreens/Visit';
import { theme } from '@styles/default.theme';
import SalesInpector from '@screens/SalesInspector';

const Tab = createMaterialTopTabNavigator();

const TabNav: React.FC = ({ route }) => {
  return (
    <View style={{ flex: 1 }}>
      <SalesInpector route={route} />
      <S.Container>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: theme.colors.primary.main,
            tabBarLabelStyle: { fontSize: 16 },
            tabBarStyle: {
              backgroundColor: theme.colors.secundary.main,
            },
            tabBarIndicatorStyle: {
              borderBottomWidth: 2,
              borderBottomColor: 'white',
            },
          }}
        >
          <Tab.Screen name="Ação" component={Action} />
          <Tab.Screen name="Mentoria" component={Mentoring} />
          <Tab.Screen name="Visita" component={Visit} />
        </Tab.Navigator>
      </S.Container>
    </View>
  );
};

export default TabNav;
