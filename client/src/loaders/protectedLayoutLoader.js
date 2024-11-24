import { redirect } from "react-router-dom";
import { auth } from "../utils/auth";

const protectedLayoutLoader = async () => {
  const authData = await auth.checkAuth();
  console.log("protected layout loader");

  if (!authData.valid) {
    return redirect("/login");
  }
  return null;
};

export default protectedLayoutLoader;
