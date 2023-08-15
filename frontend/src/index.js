import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";
import "./index.css";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
