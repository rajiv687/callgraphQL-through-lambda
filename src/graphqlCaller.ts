import fetch from "node-fetch";

export const handler = async () => {
  const url = process.env.GRAPHQL_API_URL;

  // Example query
  const query = `
    query listItemsStores {
  listItemsStores {
    items {
      id
      field1
    }
  }
}
  `;

  try {
  const response = await fetch(process.env.GRAPHQL_API_URL!, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.GRAPHQL_API_KEY!,   // required for AppSync
  },
  body: JSON.stringify({ query: query })
});


    const data = await response.json();
    console.log("GraphQL Response:", data);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
 let errorMessage = "Unknown error";
    if (err instanceof Error) {
      errorMessage = err.message;
    } else {
      errorMessage = JSON.stringify(err);
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};
