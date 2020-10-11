import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_DETAILS_REQUEST:
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, pending: true };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
    case USER_DETAILS_SUCCESS:
      return { pending: false, userInfo: action.payload };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { pending: false, updateSuccess: true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case USER_DETAILS_FAIL:
    case USER_UPDATE_PROFILE_FAIL:
      return { pending: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
