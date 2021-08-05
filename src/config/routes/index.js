import React, { useEffect, useMemo, useState } from 'react';
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-ionicons';

import Create from '../../pages/Create';
import Home from '../../pages/Home';
import Edit from '../../pages/Edit';
import Detail from '../../pages/Detail';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import { AuthContext } from '../../context/auth/AuthContext';
import { View, Text, Spinner } from 'native-base';

const Stack = createStackNavigator();

const Routes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => ({
    signIn: () => {
      setIsLoading(false);
      setUserToken("abcd");
    },
    signOut: () => {
      setIsLoading(false);
      setUserToken(null);
    }
  }), [])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
        <Spinner size="lg" />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <NavigationContainer>
          {
            userToken === null ? <AuthStack /> : <MainStack />
          }
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: 'BekPek',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
              <Icon
                ios="ios-add"
                android="md-add"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Create"
        component={Create}
      // options={({navigation}) => ({
      //   headerRight: () => (
      // <HStack>
      //   <TouchableOpacity onPress={() => alert('search')}>
      //     <Icon
      //       ios="ios-search"
      //       android="md-search"
      //       style={{marginRight: 15}}
      //     />
      //   </TouchableOpacity>
      //   <TouchableOpacity onPress={() => alert('created')}>
      //     <Icon
      //       ios="ios-checkmark-circle-outline"
      //       android="md-checkmark-circle-outline"
      //       style={{marginRight: 15, color: 'green'}}
      //     />
      //   </TouchableOpacity>
      // </HStack>
      // ),
      // })}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{
          title: 'Edit List'
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Detail List'
        }}
      />
    </Stack.Navigator>
  )
}

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login'
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          title: 'Signup',
          presentation: 'modal'
        }}
      />
    </Stack.Navigator>
  )
}

export default Routes;
