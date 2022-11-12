import { createContext, useCallback, useEffect, useState } from "react";

let logoutTimer;

const AuthContext = createContext({
  token: "",
  userEmail: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const expirationDuration = new Date(expirationTime).getTime();

  const remainingTime = expirationDuration - currentTime;
  return remainingTime;
};

const retriveToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedUserEmail = localStorage.getItem("curr_user_email");
  const storedExpirationTime = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiratationPeriod");
    return null;
  }

  return {
    token: storedToken,
    duration: +remainingTime,
    userEmail: storedUserEmail,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retriveToken();
  let intialToken;
  let intialUserEmail;

  if (tokenData) {
    intialToken = tokenData.token;
    intialUserEmail = tokenData.userEmail;
  }

  const [token, setToken] = useState(intialToken);
  const [userEmail, setUserEmail] = useState(intialUserEmail);

  const isUserLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("curr_user_email");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (userToken, expirationTime, email) => {
    setToken(userToken);
    setUserEmail(email);
    localStorage.setItem("token", userToken);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("curr_user_email", email);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const authContextData = {
    token,
    userEmail,
    isLoggedIn: isUserLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
