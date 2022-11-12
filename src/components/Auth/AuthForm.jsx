import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../helpers/validations";
import AuthContext from "../../store/auth-context";

const API_BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const API_KEY = "AIzaSyBRtpbecfbyUMzENjNaHP-HPeKzPSGFZzk";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const inputFocusHandler = () => {
    setError("");
  };

  const authSubmitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    let enteredConfirmPassword;
    if (!isLogin) {
      enteredConfirmPassword = confirmPasswordRef.current.value;
    }

    //Validations
    if (enteredEmail === "" || enteredPassword === "") {
      setError("Please enter all fields!");
      return;
    }

    if (!validateEmail(enteredEmail)) {
      setError("Please enter a valid email!");
      return;
    }

    if (enteredPassword.length < 6) {
      setError("Password should be atleast 6 characters long!");
      return;
    }

    if (!isLogin) {
      if (enteredPassword !== enteredConfirmPassword) {
        setError("Password and confirm password does not match!");
        return;
      }
    }

    setError("");

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    let url;
    if (isLogin) {
      url = `${API_BASE_URL}signInWithPassword?key=${API_KEY}`;
    } else {
      url = `${API_BASE_URL}signUp?key=${API_KEY}`;
    }

    setIsLoading(true);
    axios
      .post(url, userData)
      .then((res) => {
        setIsLoading(false);
        const expiresIn = res.data.expiresIn;
        const expirationDate = new Date(
          new Date().getTime() + +expiresIn * 1000
        );
        authCtx.login(res.data.idToken, expirationDate, res.data.email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setIsLoading(false);
        // console.log(err);
        // console.log(err.message);
        const error = err.response.data.error;
        // if (err.message === "INVALID_PASSWORD") {
        //   setError("Password is incorrect!");
        // }
        // if (err.message === "EMAIL_NOT_FOUND") {
        //   setError("Email does not exist!");
        // }
        switch (error.message) {
          case "INVALID_PASSWORD":
            setError("Password is incorrect!");
            break;

          case "EMAIL_NOT_FOUND":
            setError("Email does not exist!");
            break;

          case "Network Error":
            setError("Seems like internet is not connected!");

          default:
            setError(error.message);
            break;
        }
        console.log(error);
      });
  };

  let authTypeToggler = (
    <p className="dark:text-gray-200">
      Don't have a account?{" "}
      <button
        onClick={() => {
          setIsLogin((val) => !val);
        }}
        className="underline text-indigo-600"
        href="#"
      >
        Register here
      </button>
    </p>
  );

  if (!isLogin) {
    authTypeToggler = (
      <p>
        Already have a account?{" "}
        <button
          onClick={() => {
            setIsLogin((val) => !val);
          }}
          className="underline text-indigo-600"
          href="#"
        >
          Login here
        </button>
      </p>
    );
  }

  return (
    <>
      <h3 className="mt-6 text-center text-2xl tracking-tight text-gray-900 dark:text-gray-200">
        {isLogin ? "Sign in to your account" : "Create a new account"}
      </h3>

      <form className="mt-8 space-y-6" onSubmit={authSubmitHandler}>
        <input type="hidden" name="remember" value="true" />
        <div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2 dark:bg-slate-600 dark:border-slate-700 dark:placeholder:text-gray-400"
              required
              placeholder="Email address"
              ref={emailRef}
              onFocus={inputFocusHandler}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2 dark:bg-slate-600 dark:border-slate-700 dark:placeholder:text-gray-400"
              placeholder="Password"
              ref={passwordRef}
              onFocus={inputFocusHandler}
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirm Password"
                ref={confirmPasswordRef}
                onFocus={inputFocusHandler}
              />
            </div>
          )}
          <div className="text-sm text-red-700">{error}</div>
        </div>

        <div className="flex items-center justify-end">
          {/* <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div> */}
          {isLogin && (
            <div className="text-sm ">
              <Link
                to="/reset-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            disabled={isLoading}
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 "
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
            {isLoading ? "Processing..." : isLogin ? "Sign in" : "Register"}
          </button>
        </div>
        <div className="text-sm">{authTypeToggler}</div>
      </form>
    </>
  );
};

export default AuthForm;
