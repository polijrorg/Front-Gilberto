import AppProvider from '@hooks/index';
import { NavigationContainer } from '@react-navigation/native';
import Routes from '@routes/index';
import { useFonts } from 'expo-font';
import React from 'react';

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
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
}
