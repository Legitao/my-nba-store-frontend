import axios from 'axios';
import * as actions from '../constants/productConstants';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actions.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/products`
    );
    dispatch({ type: actions.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const showProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/products/${id}`
    );
    dispatch({ type: actions.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
