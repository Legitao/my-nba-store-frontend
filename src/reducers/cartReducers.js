import * as actions from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  let new_state;
  switch (action.type) {
    case actions.CART_ADD:
      const existItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existItem) {
        new_state = {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === existItem.id ? action.payload : item
          ),
        };
      } else {
        new_state = {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
      return new_state;
    case actions.CART_REMOVE:
      new_state = {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
      return new_state;
    default:
      return state;
  }
};
