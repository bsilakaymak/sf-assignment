import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

// Setup Apollo

const httpLink = createHttpLink({
  uri: "https://spacex-production.up.railway.app/",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        keyFields: [],
        fields: {
          launches: offsetLimitPagination(),
        },
      },
    },
  }),
});

// Start the application

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
