import { SubcategoryProvider } from "../../../categories/Context";

export const CartReducer = (state, action) => {
  const { shoppingCart, qty, totalPrice } = state;
  //  console.log("shoppingLocalStorage ", shoppingCart);

  let product;
  let index;
  let subTotal;
  let ProductQty;
  let filtered;

  switch (action.type) {
    case "SET_TO_CART":
      subTotal = 0;
      ProductQty = 0;
      if (action.payload) {
        action.payload.forEach((product) => {
          product.RealPrice =   product?.options[0]?.price - (    (product?.discountPrice * product?.options[0]?.price) /    100   ).toFixed(2);
          subTotal += product.orderQty * product.RealPrice;
          ProductQty += 1;
        });
      }

      return {
        shoppingCart: action.payload ? action.payload : [],
        totalPrice: subTotal,
        qty: ProductQty,
      };
    case "ADD_TO_CART":
      const check = shoppingCart.find((cart) => cart._id === action.id);
      if (check) {
        const index = shoppingCart.findIndex((cart) => cart._id === action.id);
        if (check.quantity > check.orderQty) {
          check.orderQty += 1;
          check.RealPrice =
            product?.options[0]?.price -
            (
              (product?.discountPrice * product?.options[0]?.price) /
              100
            ).toFixed(2);
           subTotal = totalPrice + check.RealPrice;
          check.subTotal = check.RealPrice * check.orderQty;
          
           ProductQty = qty;
          shoppingCart[index] = check;
           return {
             shoppingCart: [...shoppingCart],
             totalPrice: subTotal,
             qty: ProductQty,
           };
        } else if (check.orderQty > check.quantity) {
          return {
            shoppingCart: [...shoppingCart],
            totalPrice: totalPrice,
            qty : qty
          }
        }
          
      } else {
        product = action.product;
        //  product["quantity"] = 1;
        product.orderQty = 1;
        product.RealPrice =
          product?.options[0]?.price -
          ((product?.discountPrice * product?.options[0]?.price) / 100).toFixed(
            2
          );
        ProductQty = qty + 1;
        subTotal = totalPrice + product.RealPrice;
        
        product.subTotal = product.RealPrice * product.orderQty;
        
        return {
          shoppingCart: [product, ...shoppingCart],
          totalPrice: subTotal,
          qty: ProductQty,
        };
      }

    case "INCREMENT":
      product = shoppingCart.find((product) => product._id === action.id);
      index = shoppingCart.findIndex((prod) => prod._id === action.id);
      if (product.quantity > product.orderQty) {
        product.orderQty += 1;
         product.RealPrice =
           product?.options[0]?.price -
           (
             (product?.discountPrice * product?.options[0]?.price) /
             100
           ).toFixed(2);
        subTotal = totalPrice + product.RealPrice;
        product.subTotal = product.orderQty * product.RealPrice;
        ProductQty = qty + 1;
        shoppingCart[index] = product;
         return {
           shoppingCart: [...shoppingCart],
           totalPrice: subTotal,
           qty: qty,
         };
      } else {
        return {
          shoppingCart: [...shoppingCart],
          totalPrice: totalPrice,
          qty: qty
        }
      }
     

    case "DECREMENT":
      product = shoppingCart.find((product) => product._id === action.id);
      index = shoppingCart.findIndex((prod) => prod._id === action.id);
      if (product.orderQty > 1) {
        product.orderQty -= 1;
         product.RealPrice =
           product?.options[0]?.price -
           (
             (product?.discountPrice * product?.options[0]?.price) /
             100
           ).toFixed(2);
        subTotal = +(totalPrice - product.RealPrice).toFixed(2);
        product.subTotal = product.orderQty * product.RealPrice;
        ProductQty = qty - 1;
        shoppingCart[index] = product;
        return {
          shoppingCart: [...shoppingCart],
          totalPrice: subTotal,
          qty: qty,
        };
      } else {
        return {
          shoppingCart: [...shoppingCart],
          totalPrice: totalPrice,
          qty: qty,
        };
      }

    case "DELETE_PRODUCT":
      filtered = shoppingCart.filter((cart) => cart.id !== action.id);
      product = shoppingCart.find((cart) => cart.id === action.id);
      subTotal = totalPrice - product.RealPrice * product.orderQty;
      ProductQty = qty - 1;
      return {
        shoppingCart: [...filtered],
        totalPrice: subTotal,
        qty: ProductQty,
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
