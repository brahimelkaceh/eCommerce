import { createContext, useReducer, useContext } from "react";
import { CartReducer } from "./CartReducer";

const CartContext = createContext();

export const CartContextStore = ({ children }) => {
  const [cart, dispatch] = useReducer(CartReducer, {
    shoppingCart: [],
    totalPrice: 0,
    qty: 0 
  });
  return (
    <CartContext.Provider value={{ ...cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContextStore;

export const CartStore = () => {
  const Context = useContext(CartContext);
  console.log(Context);
  if (!Context) {
    throw new Error("no context found");
  }
  return Context;
};
