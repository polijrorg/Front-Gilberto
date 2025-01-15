import React from 'react';
import PrivateRoutes from './AppStack/private.routes';
import PublicRoutes from './AppStack/public.routes';
import useAuth from '@hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';
import { InputVendedor } from '../screens/MyTeam/styles';


const Routes: React.FC = () => {
  const { user } = useAuth();
  
  return (<>
      {user?.id ? (
        <PrivateRoutes user={user} />
      ) : (
        <PublicRoutes />
      )}
      </>
  );
};

export default Routes;
