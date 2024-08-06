import { createContext, useState, useContext, useEffect } from 'react';
import { loginRequest } from '../API/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const TOKEN_EXPIRATION_TIME = 3600 * 1000 * 4;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const remainingTime = calculateRemainingTime();
      setLogoutTimer(remainingTime);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const data = await loginRequest(username, password);
      const currentTime = new Date().getTime();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('tokenTime', currentTime);
      setIsAuthenticated(true);
      setLogoutTimer(TOKEN_EXPIRATION_TIME);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTime');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const setLogoutTimer = (time) => {
    setTimeout(() => {
      logout();
    }, time);
  };

  const calculateRemainingTime = () => {
    const storedTime = localStorage.getItem('tokenTime');
    if (!storedTime) return 0;
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - storedTime;
    return TOKEN_EXPIRATION_TIME - elapsedTime;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
