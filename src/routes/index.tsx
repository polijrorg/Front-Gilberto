import React from 'react';
import AppRoutes from '../routes/AppStack/app.routes';
import AuthRoutes from '../routes/AppStack/auth.routes';

interface IUser {
  user?: {
    id?: string;
  };
}

const Routes: React.FC<IUser> = ({ user }) => {
  return <>{user && user.id ? <AppRoutes /> : <AuthRoutes />}</>;
};

export default Routes;
