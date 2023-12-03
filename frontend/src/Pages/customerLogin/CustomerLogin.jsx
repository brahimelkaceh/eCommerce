import React from "react";
import LoginAdmin from "../../Features/customerlogin/LoginAdmin";
import { CustomerProvider } from "../../Features/customers/Context";

const CustomerLogin = () => {
  return (
    <CustomerProvider>
      <LoginAdmin />
    </CustomerProvider>
  );
};

export default CustomerLogin;
