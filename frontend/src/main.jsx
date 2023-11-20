import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserState } from "./Features/auth/Context.jsx";
import { SubcategoryProvider } from "./Features/categories/Context.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserState>
      <SubcategoryProvider>
        <App />
      </SubcategoryProvider>
    </UserState>
  </BrowserRouter>
);
