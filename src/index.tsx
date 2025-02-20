"use client";

import React from "react";
import { hydrateRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import "./index.css";

import { App } from "./App/App";

const queryClient = new QueryClient();

hydrateRoot(
  document.getElementById("root")!,
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  </React.StrictMode>
);
