import React, { createContext, useMemo, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthReducers, initialAuthState } from "./AuthReducers";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [authState, dispatch] = useReducer(AuthReducers, initialAuthState)
    const authContext = useMemo(() => ({
        signIn: async (username, password) => {
            let token = null;
            if (username === "nikko" && password === "123") {
                token = "abcd";
                await AsyncStorage.setItem("userToken", token);
            }
            dispatch({ type: 'LOGIN', userToken: token });
        },
        signOut: async () => {
            await AsyncStorage.removeItem("userToken");
            dispatch({ type: 'LOGOUT' });
        }
    }), [])
    return (
        <AuthContext.Provider value={{ authContext, authState, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;