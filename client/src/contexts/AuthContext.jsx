/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";
import { Spin } from "antd";

export const AuthContext = createContext();
export const AuthProvider = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // const getAuthData = async () => {
  //   const authData = await auth.checkAuth();
  //   if (authData) {
  //     const { user } = authData;
  //     setUserData(user);
  //     setIsAuthenticated(true);
  //   }
  // };

  // useEffect(() => {
  //   console.log("authContext useEffect");
  //   getAuthData();
  // }, []);

  (async () => {
    if (isLoading) {
      try {
        const authData = await auth.checkAuth();
        if (authData) {
          const { user } = authData;
          setUserData(user);
          setIsAuthenticated(true);
        }
      } finally {
        setIsLoading(false);
      }
    }
  })();

  const login = (newToken, newUserData) => {
    localStorage.setItem("token", JSON.stringify(newToken));
    setToken(newToken);
    setUserData(newUserData);
    setIsAuthenticated(true);
    navigate("/app");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken(null);
    setUserData(null);
    navigate("/login", { replace: true });
  };

  if (isLoading) {
    return <Spin />; // Show loading state while checking auth
  }

  return (
    <AuthContext.Provider
      value={{ token, userData, isAuthenticated, login, logout }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
};
