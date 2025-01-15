import React from 'react';
import PrivateRoutes from './AppStack/private.routes';
import PublicRoutes from './AppStack/public.routes';
import useAuth from '@hooks/useAuth';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';



const Routes: React.FC = () => {
  const { user } = useAuth();
  
  return (<SafeAreaView style={styles.droidSafeArea}>
      {user?.id ? (
        <PrivateRoutes user={user} />
      ) : (
        <PublicRoutes />
      )}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'ios' ? 16 : 0,
  },
}); 

export default Routes;
