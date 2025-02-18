import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from '@styles/default.theme';
import SalesInspector from '@screens/SalesInspector';
import * as S from './styles';
import Mentoring from '@screens/SalesInspector/TabScreens/Mentoring';
import Visit from '@screens/SalesInspector/TabScreens/Visit';
import Card from '@components/Cards';
import SellerServices from '@services/SellerServices';
import ISeller from '@interfaces/Seller';
import Action from '@screens/SalesInspector/TabScreens/Action';
import User from '@interfaces/User';

const Tab = createMaterialTopTabNavigator();

interface TabNavProps {
  route: {
    params: {
      idEmployee: string;
      cargo: string;
      companyId: string;
      stage: string;
    };
  };
  user: User
}

const TabNav: React.FC<TabNavProps> = ({ route, user }) => {
  const { idEmployee, cargo, companyId, stage } = route.params;
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (cargo === 'Supervisor') {
        setLoading(true);
        try {
          const sellers =
            await SellerServices.getAllSellerFromSupervisor(idEmployee);
          setSellers(sellers);
        } catch (error) {
          console.error('Error fetching sellers:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [cargo, idEmployee, route.params]);

  const getScreenOptions = (screenName: string) => ({
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
    tabBarVisible: stage === screenName || screenName === 'Vendedores',
  });

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{ flex: 1 }}>
      <SalesInspector route={route} />
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
          {cargo === 'Vendedor' && (
            <Tab.Screen
              name="Planos de Ação"
              component={Action}
              initialParams={{ idEmployee, cargo, companyId }}
              options={getScreenOptions('Planos de Ação')}
            />
          )}

          {cargo === 'Supervisor' && user.job === 'Gerente' && (
            <Tab.Screen
              name="Vendedores"
              options={getScreenOptions('Vendedores')}
            >
              {() => (
                <>
                  {loading ? (
                    <LoadingIndicator />
                  ) : sellers.length > 0 ? (
                    <ScrollView
                      contentContainerStyle={{
                        flexGrow: 1,
                        backgroundColor: theme.colors.primary.main,
                      }}
                    >
                      {sellers.map((seller, index) => (
                        <View
                          key={index}
                          style={{ width: '100%', marginBottom: 16 }}
                        >
                          <CardItem seller={seller} />
                        </View>
                      ))}
                    </ScrollView>
                  ) : (
                    <NoDataMessage />
                  )}
                </>
              )}
            </Tab.Screen>
          )}
          {!(stage === 'Mentoria' || stage === 'Visita' || cargo === 'Vendedor' || (cargo === 'Supervisor' && user.job === 'Gerente')) && (
            <Tab.Screen name="Placeholder" component={NoInfoMessage} />
          )}
        </Tab.Navigator>
      </S.Container>
    </View>
  );
};

const LoadingIndicator: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator  color="#0000ff" />
  </View>
);

const NoDataMessage: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 18 }}>Não há vendedores cadastrados</Text>
  </View>
);

const NoInfoMessage: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 18 }}>Sem informações</Text>
  </View>
);

const CardItem: React.FC<{ seller: ISeller }> = ({ seller }) => {
  const fullName = seller.name || 'Usuário';
  const nameParts = fullName.split(' ');
  let displayName = '';

  if (nameParts.length > 1) {
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    displayName = `${firstName} ${lastName}`;
  } else {
    displayName = fullName;
  }

  return (
    <Card
      blocked={true}
      id={seller.id}
      nome={displayName}
      stage={seller.stage}
      cargo={seller.job}
      companyId={seller.companyId}
    />
  );
};

export default TabNav;
