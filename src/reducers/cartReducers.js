import * as actions from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  let new_state;
  switch (action.type) {
    case actions.CART_ADD:
      const existItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (existItem) {
        new_state = {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.productId === existItem.productId
              ? { ...item, qty: item.qty + action.payload.qty }
              : item
          ),
        };
      } else {
        new_state = {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
      return new_state;
    case actions.CART_UPDATE_QTY:
      new_state = {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };
      return new_state;
    case actions.CART_REMOVE:
      new_state = {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload
        ),
      };
      return new_state;
    case actions.CART_CLEAR:
      return { cartItems: [], shippingAddress: {} };
    case actions.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case actions.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
