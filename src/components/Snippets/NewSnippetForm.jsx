import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isEmpty, isTooShort } from "../../helpers/validations";
import AuthContext from "../../store/auth-context";
import SnippetContext from "../../store/snippets-context";

const NewSnippetForm = () => {
  const purposeRef = useRef();
  const snippetRef = useRef();
  const descRef = useRef();

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const snippetCtx = useContext(SnippetContext);

  const [purposeError, setPurposeError] = useState("");
  const [snippetError, setSnippetError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const success = () => {
    toast.success("Snippet added successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const failure = () => {
    toast.error("Something went wrong!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const enteredPurpose = purposeRef.current.value;
    const enteredSnippet = snippetRef.current.value;
    const enteredDesc = descRef.current.value;

    if (isEmpty(enteredPurpose)) {
      setPurposeError("Please enter the purpose of the code snippet!");
      return;
    }

    if (isTooShort(enteredPurpose)) {
      setPurposeError("Purpose seems to be too short! Please add more");
      return;
    }

    setPurposeError("");

    if (isEmpty(enteredSnippet)) {
      setSnippetError("Please enter the code snippet!");
      return;
    }

    if (isTooShort(enteredSnippet)) {
      setSnippetError("Snippet seems to be too short!");
      return;
    }

    setSnippetError("");

    const snippetData = {
      purpose: enteredPurpose,
      snippet: enteredSnippet,
      description: enteredDesc,
      user_email: authCtx.userEmail,
    };

    setIsLoading(true);

    fetch(
      "https://react-router-9b414-default-rtdb.firebaseio.com/snippets.json",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(snippetData),
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (!res.ok) {
          const errorData = res.formData.error;
          return (errorData) => {
            throw new Error(errorData);
          };
        }
        return res.json();
      })
      .then(() => {
        snippetCtx.fetchSnippets();
        success();
      })
      .catch(() => {
        failure();
      });
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={formSubmitHandler}>
        <div className="flex w-full gap-4">
          <div className="my-4 flex-1">
            <label
              className="block mb-1 text-gray-600 text-sm dark:text-gray-200"
              htmlFor="snippet"
            >
              Code snippet
            </label>
            <input
              className="rounded w-full h-full dark:bg-slate-600 dark:border-slate-700"
              type="text"
              name="snippet"
              id="snippet"
              ref={snippetRef}
            />
            {snippetError && (
              <p className=" text-xs text-red-400 ">{snippetError}</p>
            )}
          </div>
          <div className="flex-1">
            <div className="my-4">
              <label
                className="block mb-1 text-gray-600 text-sm dark:text-gray-200"
                htmlFor="snippet_purpose"
              >
                Purpose of the snippet
              </label>
              <input
                className="rounded w-full dark:bg-slate-600 dark:border-slate-700"
                type="text"
                name="snippet_purpose"
                id="snippet_purpose"
                ref={purposeRef}
              />
              {purposeError && (
                <p className=" text-xs text-red-400 ">{purposeError}</p>
              )}
            </div>

            <textarea
              className="rounded w-full text-sm dark:bg-slate-600 dark:border-slate-700 dark:placeholder:text-gray-400"
              name="snippet_description"
              id="snippet_description"
              placeholder="Add a description for the snippet"
              rows="4"
              ref={descRef}
            ></textarea>
            <div>
              <button
                disabled={isLoading}
                className="border border-indigo-500 bg-indigo-500 py-2 px-4 rounded text-white hover:bg-indigo-700 "
              >
                {isLoading ? "Adding Snippet..." : "Add Snippet"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewSnippetForm;
