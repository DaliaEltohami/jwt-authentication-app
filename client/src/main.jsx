import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import AuthLayout from "./pages/AuthLayout.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import rootAuthLoader from "./loaders/rootAuthLoader.js";

// const ProtectedRoute = ({ children, requireAuth }) => {
//   const { isAuthenticated } = useAuth();

//   const shouldRedirect =
//     (requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated);

//   if (shouldRedirect) {
//     return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
//   }

//   return children;
// };

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// // Wrapper for routes that should not be accessible if authenticated
// const PublicRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
// };

// const DashboardLoader = () => {
//   const { isAuthenticated } = useAuth();
//   if (!isAuthenticated) {
//     return redirect("/login"); // Redirect to login if not authenticated
//   }
//   return null; // Return null if the user is authenticated
// };

// Auth loader function

// Protected loader function

const browserRouter = createBrowserRouter([
  {
    element: <AuthProvider />,
    loader: rootAuthLoader,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          { index: true, element: <Register /> },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },

      {
        path: "/app",
        element: <AppLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={browserRouter}></RouterProvider>
  </StrictMode>
);
