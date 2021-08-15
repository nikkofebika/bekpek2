export const initialAuthState = {
  userData: null,
  isLoading: true,
  // userToken: null,
  // userData: {
  //   id: null,
  //   name: null,
  //   username: null,
  //   password: null,
  // },
};
export const AuthReducers = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userData: action.userData,
        isLoading: false,
        // userToken: action.userToken,
      };
    // break;
    case 'LOGOUT':
      return {
        ...state,
        userData: null,
        isLoading: false,
        // userToken: null,
      };
    // break;
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userData: action.userData,
        isLoading: false,
        // userToken: action.userToken,
      };
    // break;
    default:
      return state;
  }
};
