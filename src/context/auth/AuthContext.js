import React, { createContext } from "react";

export const AuthContext = createContext();

// const AuthContextProvider = (props) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [userToken, setUserToken] = useState(null);
//     return (
//         <AuthContext.Provider value={ }>
//             {props.childern}
//         </AuthContext.Provider>
//     )
// }