import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [user, setUser] = useState(cookies.user);

  // useEffect(() => {
  //   console.log("Checking login");
  //   if (!user) {
  //     console.log("User not logged in");
  //     navigate('/login'); // Redirect to login page
  //   }
  // }, [navigate]);

  const updateUser = (user) => {
    console.log("Setting cookie", user);
    setCookie('user', user);
    setUser(user);
  }

  const removeUser = () => {
    removeCookie('user');
    setUser(null);
    
  }

  return <AuthContext.Provider value={{user, updateUser, removeUser}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
