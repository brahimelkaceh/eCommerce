export const isAuthenticad = () => {
  const jwt = localStorage.userT;

  if (jwt) {
    return JSON.parse(jwt);
  }

  return false;
};
