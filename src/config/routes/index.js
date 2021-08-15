import React, {useEffect, useContext, useState, useReducer} from 'react';
import 'react-native-gesture-handler';
import {TouchableOpacity, Button, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-ionicons';
import RNBootSplash from 'react-native-bootsplash';

import Create from '../../pages/Create';
import Home from '../../pages/Home';
import Edit from '../../pages/Edit';
import Detail from '../../pages/Detail';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import {AuthContext} from '../../context/auth/AuthContext';
import {View, Text, Spinner} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from '../../pages/Item';
import {getUser} from '../../database/Users';

const Stack = createStackNavigator();

const Routes = () => {
  const {authState, dispatch} = useContext(AuthContext);
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);
  // const [authState, dispatch] = useReducer(AuthReducers, initialAuthState)

  // const authContext = useMemo(() => ({
  //   signIn: (username, password) => {
  //     let token = null;
  //     if (username === "nikko" && password === "123") {
  //       token = "abcd";
  //     }
  //     dispatch({ type: 'LOGIN', userToken: token });
  //   },
  //   signOut: () => {
  //     dispatch({ type: 'LOGOUT' });
  //   }
  // }), [])

  useEffect(() => {
    // const init = async () => {
    //   setTimeout(() => {
    //     dispatch({ type: 'RETREIVE_TOKEN' });
    //   }, 3000);
    // };

    const init = async () => {
      console.log('index route');
      let userData = null;
      try {
        getUserData = await AsyncStorage.getItem('userData');
        if (getUserData !== null) {
          userData = JSON.parse(getUserData);
          const cekUser = await getUser(userData);
          cekUser.success
            ? (userData = JSON.stringify(userData))
            : (userData = null);
        }
      } catch (error) {
        console.log('error restore token', error);
      }
      dispatch({type: 'RESTORE_TOKEN', userData});
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('INDEX Bootsplash has been hidden successfully');
    });
  }, []);

  if (authState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
        <Spinner size="lg" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {authState.userData === null ? <AuthStack /> : <MyTabs />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Index') {
            iconName = 'ios-home';
          } else if (route.name === 'ItemStack') {
            iconName = focused ? 'list-box' : 'list';
          } else if (route.name === 'About') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Logout') {
            iconName = 'ios-log-out';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Index" component={MainStack} />
      <Tab.Screen name="ItemStack" component={ItemStack} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Logout" component={LogoutScreen} />
    </Tab.Navigator>
  );
}

function AboutScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Spinner size="lg" />
      <Text>AboutScreen</Text>
    </View>
  );
}

function LogoutScreen() {
  const {authContext} = useContext(AuthContext);
  useEffect(() => {
    authContext.signOut();
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Spinner size="lg" />
      <Text>Signing out...</Text>
    </View>
  );
}

const ItemStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Item" component={Item} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => ({
          title: 'BekPek',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
              <Icon ios="ios-add" android="md-add" style={{marginRight: 15}} />
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
          title: 'Edit List',
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Detail List',
        }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          title: 'Signup',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
