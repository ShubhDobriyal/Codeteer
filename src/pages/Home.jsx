import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Snippet from "../components/Snippets/Snippet";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import AuthContext from "../store/auth-context";
import SnippetContext from "../store/snippets-context";

const Home = () => {
  const snippetCtx = useContext(SnippetContext);
  const snippetsData = snippetCtx.snippetsData;
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    snippetCtx.fetchSnippets();
  }, []);

  let snippetsList = [];

  for (const key in snippetsData) {
    const singleSnippet = {
      id: key,
      user: snippetsData[key].user_email,
      purpose: snippetsData[key].purpose,
      snippet: snippetsData[key].snippet,
      description: snippetsData[key].description,
      likes: snippetsData[key].likes,
      dislikes: snippetsData[key].dislikes,
    };
    snippetsList.push(singleSnippet);
  }

  const snippets = snippetsList.map((snippet) => {
    return <Snippet key={snippet.id} data={snippet} />;
  });

  return (
    <div className="px-5 py-8 container mx-auto dark:bg-slate-800 dark:text-gray-200 ">
      <div className="grid grid-flow-row-dense grid-cols-3 gap-6">
        {snippetCtx.isLoading && (
          <LoadingSpinner isOpen={snippetCtx.isLoading} />
        )}
        {!snippetCtx.isLoading && snippets}
      </div>
    </div>
  );
};

export default Home;
