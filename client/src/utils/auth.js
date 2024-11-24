import { message } from "antd";

export const auth = {
  async checkAuth() {
    // Validate token with backend if needed
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) return false;

      const response = await fetch(
        "http://localhost:5000/api/auth/verify-token",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const authData = await response.json();

      if (response.status === 200) {
        return authData;
      } else if (response.status === 401) {
        return false;
      } else {
        message.error("UnAuthoraized Access");
        return false;
      }

      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return false;
    }
  },
};
