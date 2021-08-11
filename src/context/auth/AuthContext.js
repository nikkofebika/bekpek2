import React, {createContext, useMemo, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthReducers, initialAuthState} from './AuthReducers';
import {getUser} from '../../database/Users';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [authState, dispatch] = useReducer(AuthReducers, initialAuthState);
  const authContext = useMemo(
    () => ({
      signIn: async (username, password) => {
        let token = null;
        let userData = null;
        let cekUser = await getUser({username, password});
        console.log(cekUser);
        if (cekUser.success) {
          token = 'abcd';
          userData = cekUser.data;
          console.log('userData', userData);
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
        }
        dispatch({type: 'LOGIN', userToken: token, userData});
      },
      signOut: async () => {
        await AsyncStorage.removeItem('userToken');
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );
  return (
    <AuthContext.Provider value={{authContext, authState, dispatch}}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
