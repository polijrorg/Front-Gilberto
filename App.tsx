import AppProvider from '@hooks/index';
import Routes from '@routes/index';
import { useFonts } from 'expo-font';
import { ToastProvider } from 'react-native-toast-notifications';
import { DataProvider } from 'src/context/DataContext';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: require('@assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('@assets/fonts/Poppins-Bold.ttf'),
    PoppinsMedium: require('@assets/fonts/Poppins-Medium.ttf'),
    PoppinsItalic: require('@assets/fonts/Poppins-Italic.ttf'),
  });

  if (!fontsLoaded) return null;
  return (
    <NavigationContainer>
      <ToastProvider>
        <DataProvider>
          <AppProvider>
            <Routes  />
          </AppProvider>
        </DataProvider>
      </ToastProvider>
      </NavigationContainer>
  );
}
