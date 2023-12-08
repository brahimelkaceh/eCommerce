import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserState } from "./Features/auth/Context.jsx";
import { SubcategoryProvider } from "./Features/categories/Context.jsx";
import { DataProvider } from "./Features/orders/Context.jsx";
import { CustomerProvider } from "./Features/customers/Context.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserState>
      <DataProvider>
        <CustomerProvider>
          <SubcategoryProvider>
            <App />
          </SubcategoryProvider>
        </CustomerProvider>
      </DataProvider>
    </UserState>
  </BrowserRouter>
);
