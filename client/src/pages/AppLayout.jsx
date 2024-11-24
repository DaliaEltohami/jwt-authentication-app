import { Spin } from "antd";
import { useEffect } from "react";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AppLayout = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("App layout comp", isAuthenticated);
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return <>{navigation.state === "loading" ? <Spin /> : <Outlet />}</>;
};

export default AppLayout;
