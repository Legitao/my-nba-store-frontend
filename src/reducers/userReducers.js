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

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { pending: true };
    case USER_LOGIN_SUCCESS:
      return { pending: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { pending: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { pending: true };
    case USER_REGISTER_SUCCESS:
      return { pending: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { pending: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { pending: true };
    case USER_DETAILS_SUCCESS:
      return { pending: false, userProfile: action.payload };
    case USER_DETAILS_FAIL:
      return { pending: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { pending: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { pending: false, success: true, userProfile: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { pending: false, error: action.payload };
    default:
      return state;
  }
};
