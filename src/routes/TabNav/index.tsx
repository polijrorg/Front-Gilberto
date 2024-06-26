/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from '@styles/default.theme';
import SalesInpector from '@screens/SalesInspector';
import * as S from './styles';
import Action from '@screens/SalesInspector/TabScreens/Action';
import Mentoring from '@screens/SalesInspector/TabScreens/Mentoring';
import Visit from '@screens/SalesInspector/TabScreens/Visit';

const Tab = createMaterialTopTabNavigator();

const TabNav: React.FC = ({ route }) => {
  const { idEmployee, cargo, companyId, stage } = route.params;

  const getScreenOptions = (screenName) => ({
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: theme.colors.primary.main,
    tabBarLabelStyle: { fontSize: 13 },
    tabBarStyle: {
      backgroundColor: theme.colors.secundary.main,
    },
    tabBarIndicatorStyle: {
      borderBottomWidth: 2,
      borderBottomColor: 'white',
    },
    tabBarVisible: stage === screenName || screenName === 'Planos de Ação',
  });

  return (
    <View style={{ flex: 1 }}>
      <SalesInpector route={route} />
      <S.Container>
        <Tab.Navigator>
          {stage === 'Mentoria' && (
            <Tab.Screen
              name="Mentoria"
              component={Mentoring}
              initialParams={{ idEmployee, cargo, companyId }}
              options={getScreenOptions('Mentoria')}
            />
          )}
          {stage === 'Visita' && (
            <Tab.Screen
              name="Visita"
              component={Visit}
              initialParams={{ idEmployee, cargo, companyId }}
              options={getScreenOptions('Visita')}
            />
          )}
          <Tab.Screen
            name="Planos de Ação"
            component={Action}
            initialParams={{ idEmployee, cargo, companyId }}
            options={getScreenOptions('Planos de Ação')}
          />
        </Tab.Navigator>
      </S.Container>
    </View>
  );
};

export default TabNav;
