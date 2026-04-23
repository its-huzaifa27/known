import React, { createContext, useContext, useEffect, useReducer, useMemo, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const initialState = {
  user: null,
  token: null,
  loading: true
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, token: action.token, user: action.user, loading: false };
    case 'LOGOUT':
      return { ...state, token: null, user: null, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      dispatch({ type: 'LOGIN', token: storedToken, user: JSON.parse(storedUser) });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = useCallback((accessToken, userData) => {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch({ type: 'LOGIN', token: accessToken, user: userData });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const value = useMemo(() => ({
    user: state.user,
    token: state.token,
    loading: state.loading,
    login,
    logout
  }), [state.user, state.token, state.loading, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {!state.loading && children}
    </AuthContext.Provider>
  );
};
