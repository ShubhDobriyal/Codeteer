import { useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import AuthContext from "../store/auth-context";

import Layout from "../components/Layout/Layout";
import Auth from "../pages/Auth";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import SnippetDetail from "../pages/SnippetDetail";

const SiteRoutes = () => {
  const authCtx = useContext(AuthContext);
  const isUserLoggedIn = authCtx.isLoggedIn;

  const ProtectedRoutes = ({ children }) => {
    if (!isUserLoggedIn) {
      return <Navigate to="/auth" />;
    }
    return children;
  };

  const routes = [
    {
      path: "/",
      element: (
        <ProtectedRoutes>
          <Layout />
        </ProtectedRoutes>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/snippet/:snippetId",
          element: <SnippetDetail />,
        },
      ],
    },
    {
      path: "/auth",
      element: !isUserLoggedIn ? <Auth /> : <Navigate to="/" />,
    },

    {
      path: "/reset-password",
      element: <ForgotPassword />,
    },

    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default SiteRoutes;
