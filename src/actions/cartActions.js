import axios from 'axios';
import * as actions from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/products/${id}`
  );
  console.log('data', data);
  const action = {
    type: actions.CART_ADD,
    payload: {
      id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  };
  dispatch(action);
  // After dispatch is returned, state is updated.
  // Save the updated state to localStorage, initialize preloadedState using this localStorage
  // Benefits: preserve state when refresh page
  // Otherwise: when refresh page, redux store is cleared
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const updateQtyInCart = (id, qty) => (dispatch, getState) => {
  const action = {
    type: actions.CART_UPDATE_QTY,
    payload: { id, qty },
  };
  dispatch(action);
};

export const removeFromCart = (id) => (dispatch, getState) => {
  const action = {
    type: actions.CART_REMOVE,
    payload: id,
  };
  dispatch(action);

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
