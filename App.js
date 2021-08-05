import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import Routes from './src/config/routes';

const App = () => {
  return (
    <NativeBaseProvider>
      <Routes />
    </NativeBaseProvider>
  );
};

export default App;
