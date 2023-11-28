export const CartReducer = (state, action) => {
  const { shoppingCart, qty, totalPrice } = state;
  console.log("shopping", shoppingCart);
  console.log("qty", qty);

  let product;
  let index;
  let updatedPrice;
  let updatedQty;
  let filtered;

  switch (action.type) {
    case "ADD_TO_CART":
      console.log("actions", action);
      const check = shoppingCart.find((cart) => cart._id === action.id);
      console.log("check", check);
      if (check) {
        const index = shoppingCart.findIndex((cart) => cart._id === action.id);
        check.quantity += 1;
        updatedPrice = totalPrice + check.options.price;
        updatedQty = qty;
        shoppingCart[index] = check;
        return {
          shoppingCart: [...shoppingCart],
          totalPrice: updatedPrice,
          qty: updatedQty,
        };
      } else {
        product = action.product;
        product["quantity"] = 1;
        updatedQty = qty + 1;
        updatedPrice = totalPrice + product.options.price;
        return {
          shoppingCart: [product, ...shoppingCart],
          totalPrice: updatedPrice,
          qty: updatedQty,
        };
      }

    case "INCREMENT":
      product = shoppingCart.find((product) => product._id === action.id);
      index = shoppingCart.findIndex((prod) => prod._id === action.id);
      product.quantity = product.quantity + 1;
      updatedPrice = totalPrice + product.options.price;
      updatedQty = qty + 1;
      shoppingCart[index] = product;
      return {
        shoppingCart: [...shoppingCart],
        totalPrice: updatedPrice,
        qty: updatedQty,
      };

    case "DECREMENT":
      product = shoppingCart.find((product) => product._id === action.id);
      index = shoppingCart.findIndex((prod) => prod._id === action.id);
      if (product.quantity > 1) {
        console.log("minus product options.price", product.options.price);
        product.quantity = product.quantity - 1;
        updatedPrice = +(totalPrice - product.options.price).toFixed(2);
        console.log("updated options.price", updatedPrice);
        updatedQty = qty - 1;
        shoppingCart[index] = product;
        return {
          shoppingCart: [...shoppingCart],
          totalPrice: updatedPrice,
          qty: updatedQty,
        };
      } else {
        return {
          shoppingCart: [...shoppingCart],
          totalPrice: totalPrice,
          qty: qty,
        };
      }

    case "DELETE_PRODUCT":
      console.log("I Am Delete");
      filtered = shoppingCart.filter((cart) => cart.id !== action.id);
      product = shoppingCart.find((cart) => cart.id === action.id);
      updatedPrice = totalPrice - product.options.price * product.quantity;
      updatedQty = qty - product.quantity;
      return {
        shoppingCart: [...filtered],
        totalPrice: updatedPrice,
        qty: updatedQty,
      };

    case "EMPTY_CART":
      return {
        shoppingCart: [],
        totalPrice: 0,
        qty: 0,
      };

    default:
      return state;
  }
};
