import { redirect } from "react-router-dom";
import { auth } from "../utils/auth";

const authLayoutLoader = async () => {
  const authData = await auth.checkAuth();
  console.log("authLayoutLoader");

  if (authData.valid) {
    console.log(authData.valid);
    return redirect("/app/dashboard");
  }
  return null;
};

export default authLayoutLoader;
