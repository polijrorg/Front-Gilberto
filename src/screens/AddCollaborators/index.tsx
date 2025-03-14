import React, { useState } from 'react';
import { View, Switch, Text } from 'react-native';
import SellerAdded from './SellerAdded';
import SupervisorAdded from './SupervisorAdded';
import HeaderPages from '@components/HeaderPages';
import { StatusBar as RNStatusBar } from 'react-native';
import { theme } from '@styles/default.theme';
import User from '@interfaces/User';

interface AddCollaboratorsProps{
  user: User
}

const AddCollaborator: React.FC<AddCollaboratorsProps> = ({user}) => {
  const [isSeller, setIsSeller] = useState(true);
  const [value, setValue] = useState('Vendedor');

  const handleToggleSwitch = () => {
    setIsSeller(!isSeller);
    setValue(isSeller ? 'Supervisor' : 'Vendedor');
  };

  return (
    <View
      style={{
        marginTop: RNStatusBar.currentHeight || 0,
        backgroundColor: theme.colors.primary.main, // Corrigido para acessar a cor corretamente
      }}
    >
      <HeaderPages title={`Adicionar ${value}`} />

      {user.job === 'Gerente' && (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '80%',
              marginLeft: '10%',
            }}
          >
            <Switch
              value={isSeller}
              onValueChange={handleToggleSwitch}
              trackColor={{ false: '#378CDF', true: '#378CDF' }}
              thumbColor={isSeller ? '#f4f3f4' : '#f4f3f4'}
            />
            <Text style={{ marginLeft: 10, fontSize: 16 }}>
              {isSeller ? 'Vendedor' : 'Supervisor'}
            </Text>
          </View>
          {isSeller ? <SellerAdded user={user} /> : <SupervisorAdded user={user} />}
        </>
      )}

      {user.job === 'Supervisor' && <SellerAdded user={user} />}
    </View>
  );
};

export default AddCollaborator;
