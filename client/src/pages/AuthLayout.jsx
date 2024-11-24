import { Spin } from "antd";
import { useEffect } from "react";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthLayout = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthLayout comp");
    if (isAuthenticated) {
      navigate("/app");
    }
  }, [isAuthenticated, navigate]);

  return <>{navigation.state === "loading" ? <Spin /> : <Outlet />}</>;
};

export default AuthLayout;
