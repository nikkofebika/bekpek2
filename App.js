import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import Routes from './src/config/routes';
import AuthContextProvider from './src/context/auth/AuthContext';
const App = () => {
  return (
    <AuthContextProvider>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </AuthContextProvider>
  );
};

export default App;
