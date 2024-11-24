import { useState } from "react";
import { message } from "antd";
import { useAuth } from "./useAuth";
// import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  // const navigate = useNavigate();

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm) {
      return setError("Passwords Don't match");
    }

    try {
      setError(null);
      setLoading(true);

      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.status == 201) {
        message.success(data.message);
        login(data.token, data.user);
        // navigate("/app/dashboard");
      } else if (res.status == 400) {
        setError(data.message);
      } else {
        message.error("Registration Failed!");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { error, loading, registerUser };
};
