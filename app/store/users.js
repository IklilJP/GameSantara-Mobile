const INITIAL_STATE = {
    loggedInUser: {}
  };
  
  export const user = (state = INITIAL_STATE, action) => {
    if (action.type === "LOGIN") {
      return { ...state, loggedInUser: action.payload };
    } else if (action.type === "LOGOUT") {
      return { ...state, loggedInUser: {} };
    } else {
      return state;
    }
  };