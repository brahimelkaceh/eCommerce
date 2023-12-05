export const isAuthenticad = () => {
  const jwt = localStorage.userT;

  if (jwt) {
    return JSON.parse(jwt);
  }

  return false;
};

export const customerAuthenticated = () => {
  const jwt = localStorage.customerToken;
  if (jwt) {
    return JSON.parse(jwt);
  }

  return false;
};
