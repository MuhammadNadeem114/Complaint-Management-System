import { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('scms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    const data = await loginUser(credentials);
    localStorage.setItem('scms_token', data.token);
    localStorage.setItem('scms_user', JSON.stringify(data.user));
    setUser(data.user);
    setLoading(false);
    navigate(data.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
  };

  const register = async (formData) => {
    setLoading(true);
    const data = await registerUser(formData);
    localStorage.setItem('scms_token', data.token);
    localStorage.setItem('scms_user', JSON.stringify(data.user));
    setUser(data.user);
    setLoading(false);
    navigate('/user/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('scms_token');
    localStorage.removeItem('scms_user');
    setUser(null);
    navigate('/');
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
