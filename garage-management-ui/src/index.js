import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./app/styles/index.css";
// import "./app/styles/global.css";
import { LanguageProvider } from "./app/context/LanguageContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
