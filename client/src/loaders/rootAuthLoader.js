import { redirect } from "react-router-dom";
import { auth } from "../utils/auth";

const rootAuthLoader = async ({ request }) => {
  const authData = await auth.checkAuth();
  const url = new URL(request.url);
  const isAuthRoute =
    url.pathname === "/" ||
    url.pathname === "/login" ||
    url.pathname === "/register";
  const isAppRoute = url.pathname.startsWith("/app");

  if (authData.valid) {
    // If user is authenticated and trying to access auth routes, redirect to dashboard
    if (isAuthRoute) {
      return redirect("/app/dashboard");
    }
  } else {
    // If user is not authenticated and trying to access app routes, redirect to login
    if (isAppRoute) {
      console.log("hah");
      return redirect("/login");
    }
  }

  return null;
};

export default rootAuthLoader;
