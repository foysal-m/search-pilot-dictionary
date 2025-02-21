import express from "express";
import React from "react";
import fs from "fs";
import path from "path";
import ReactDOMServer from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "../src/App/App";

const PORT = 3000;
const app = express();
const queryClient = new QueryClient();

// Serve static assets (like JS and CSS)
app.use(express.static(path.resolve(__dirname, "../dist")));

// Function to create the HTML string with SSR
const createHtml = async () => {
  const app = ReactDOMServer.renderToString(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  const html = await fs.promises.readFile(
    path.resolve(__dirname, "../dist/index.html"),
    "utf-8"
  );

  const reactHtml = html.replace(
    '<div id="root"></div>',
    `<div id="root">${app}</div>`
  );
  return reactHtml;
};

// Handle all routes by sending the SSR page
app.get("*", async (req, res) => {
  const html = await createHtml();
  res.send(html);
});

// Start the server
app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
