import axios from 'axios';
import * as actions from '../constants/cartConstants';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/products/${productId}`
  );
  console.log('data', data);
  const action = {
    type: actions.CART_ADD,
    payload: {
      productId: data._id,
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

export const updateQtyInCart = (productId, qty) => (dispatch, getState) => {
  const action = {
    type: actions.CART_UPDATE_QTY,
    payload: { productId, qty },
  };
  dispatch(action);
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  const action = {
    type: actions.CART_REMOVE,
    payload: productId,
  };
  dispatch(action);

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch) => {
  localStorage.removeItem('cartItems');
  localStorage.removeItem('paymentMethod');
  localStorage.removeItem('shippingAddress');
  dispatch({
    type: actions.CART_CLEAR,
  });
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: actions.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: actions.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
