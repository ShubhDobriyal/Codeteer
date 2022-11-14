export const getSnippets = async () => {
  const response = await fetch(
    "https://codeeter-default-rtdb.asia-southeast1.firebasedatabase.app/snippets.json"
  );

  if (!response.ok) {
    throw { message: "Failed to fetch snippets.", status: 500 };
  }

  return response.json();
};

export const getSnippet = async (id) => {
  const response = await fetch(
    `https://codeeter-default-rtdb.asia-southeast1.firebasedatabase.app/snippets/${id}.json`
  );

  if (!response.ok) {
    throw { message: "Failed to fetch snippet", status: 500 };
  }

  return response.json();
};

export const addSnippet = (snippet) => {
  const response = fetch(
    "https://codeeter-default-rtdb.asia-southeast1.firebasedatabase.app/snippets.json",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(snippet),
    }
  );

  if (!response.ok) {
    throw { message: "Failed to add snippet!", status: 500 };
  }
};
