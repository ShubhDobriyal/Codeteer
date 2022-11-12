import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { isEmpty, validateEmail } from "../helpers/validations";
import AuthContext from "../store/auth-context";

const ForgotPassword = () => {
  const resetEmailRef = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const resetFormHandler = (e) => {
    e.preventDefault();

    const enteredResetMail = resetEmailRef.current.value;

    if (isEmpty(enteredResetMail)) {
      setError("Please enter a email address!");
      return;
    }

    if (!validateEmail(enteredResetMail)) {
      setError("Please enter a valid email address!");
      return;
    }

    setError("");

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBRtpbecfbyUMzENjNaHP-HPeKzPSGFZzk",
        {
          requestType: "PASSWORD_RESET",
          email: enteredResetMail,
        }
      )
      .then((res) => {
        toast.success("Reset link sent to the mail!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          if (authCtx.isLoggedIn) {
            authCtx.logout();
          }
          navigate("/");
        });
      })
      .catch((error) => {
        const err = error.response.data.error;
        setError(err.message);
        if (err.message === "EMAIL_NOT_FOUND") {
          setError("Email does not exist!");
        }
      });
  };

  return (
    <div className="min-h-[calc(100%-100px)] flex items-center justify-center">
      <ToastContainer />
      <form onSubmit={resetFormHandler}>
        <div>
          <label
            htmlFor="password-reset-email"
            className="text-lg dark:text-gray-200"
          >
            Email
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-300 mb-3">
            Please enter email address for which you want to reset the password.
          </p>
          <input
            type="email"
            name="password-reset-email"
            id="password-reset-email"
            placeholder="Please enter email here"
            className="w-full rounded py-3 dark:bg-slate-600 dark:border-slate-700 dark:placeholder:text-gray-400"
            ref={resetEmailRef}
          />
          <p className="text-xs text-red-500">{error}</p>
        </div>
        <div>
          <button
            type="submit"
            className="w-full mt-3 rounded py-2 px-3 bg-indigo-600 text-white"
          >
            Send password reset mail
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
