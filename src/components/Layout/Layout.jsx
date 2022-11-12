import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

import AuthContext from "../../store/auth-context";

const Layout = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <div className="dark:text-gray-200">
      {authCtx.isLoggedIn && <Header />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
