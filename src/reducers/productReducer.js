import * as actions from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actions.PRODUCT_LIST_REQUEST:
      return { pending: true, products: [] };
    case actions.PRODUCT_LIST_SUCCESS:
      return { pending: false, products: action.payload };
    case actions.PRODUCT_LIST_FAIL:
      return { pending: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actions.PRODUCT_DETAILS_REQUEST:
      return { pending: true, product: {} };
    case actions.PRODUCT_DETAILS_SUCCESS:
      return { pending: false, product: action.payload };
    case actions.PRODUCT_DETAILS_FAIL:
      return { pending: false, error: action.payload };
    default:
      return state;
  }
};
