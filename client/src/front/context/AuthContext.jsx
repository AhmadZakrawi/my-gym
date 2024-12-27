import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { userdata: action.payload };
    case "LOGOUT":
      return { userdata: null };
    case "TASK_COMPLETED":
      return {userdata: action.payload}
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'))

    if (userdata) dispatch({type: 'LOGIN', payload: userdata})
    
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
