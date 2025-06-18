 import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem('username') || null);

  const login = (name) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  const logout = () => {
    setUsername(null);
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
