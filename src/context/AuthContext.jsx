import { createContext, useState, useContext } from 'react';
import { loginRequest } from '../API/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username, password) => {
    try {
      const data = await loginRequest(username, password);
      localStorage.setItem('token', data.access_token);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
