export const initialAuthState = {
    isLoading: true,
    userToken: null
}
export const AuthReducers = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLoading: false,
                userToken: action.userToken
            }
        // break;
        case "LOGOUT":
            return {
                ...state,
                isLoading: false,
                userToken: null
            }
        // break;
        case "RESTORE_TOKEN":
            return {
                ...state,
                userToken: action.userToken,
                isLoading: false
            }
        // break;
        default:
            return state;
    }
}