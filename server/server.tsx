require("ignore-styles");

import React from "react";
import express from "express";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { renderToString } from "react-dom/server";
import { App } from "../src/App/App";

const app = express();
const port = 4000;
const queryClient = new QueryClient();

//* - it will match every request
app.use(express.static("public"));
app.get("*", (req, res) => {
  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  res.send(
    `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Search pilot dictionary - SSR</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `
  );
});

app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
