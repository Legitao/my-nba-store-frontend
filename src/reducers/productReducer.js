import {
  PRODUCT_LIST_PENDING,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_PENDING:
      return { pending: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { pending: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { pending: false, error: action.payload };
    default:
      return state;
  }
};
