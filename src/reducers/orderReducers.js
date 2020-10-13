import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAIL,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  // initial state is shit
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (
  state = { loading: true, isPaid: false },
  action
) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
        isPaid: false,
      };
    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        isPaid: true,
      };
    case ORDER_PAY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderHistoryReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_HISTORY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_HISTORY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_HISTORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
