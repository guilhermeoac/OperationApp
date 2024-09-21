  export const UserActionTypes = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
  };
  
  const initialState = {
    type: UserActionTypes.LOGOUT,
    currentUser: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case UserActionTypes.LOGIN:
        return { ...state, currentUser: action.payload };
      case UserActionTypes.LOGOUT:
        return { ...state, currentUser: null };
      default:
        return state;
    }
  };
  
  export const loginUser = (payload) => ({
    type: UserActionTypes.LOGIN,
    payload,
  });
  
  export const logoutUser = () => ({
    type: UserActionTypes.LOGOUT,
  });
  export default userReducer;