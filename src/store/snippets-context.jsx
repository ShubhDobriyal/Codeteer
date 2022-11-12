import { createContext, useState } from "react";

const SnippetContext = createContext({
  snippetsData: [],
  fetchSnippets: () => {},
  isLoading: true,
});

export const SnippetContextProvider = (props) => {
  const [snippetsData, setSnippetsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSnippetsHandler = () => {
    fetch(
      "https://react-router-9b414-default-rtdb.firebaseio.com/snippets.json"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setSnippetsData(data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const SnippetsContextData = {
    snippetsData,
    fetchSnippets: fetchSnippetsHandler,
    isLoading,
  };

  return (
    <SnippetContext.Provider value={SnippetsContextData}>
      {props.children}
    </SnippetContext.Provider>
  );
};

export default SnippetContext;
