import { LOGIN, LOGOUT, TOKEN_EXPIRED } from "../actions/authentication";

const initialState = {
  id: 0,
  email: "",
  token: "",
  admin: false,
  tokenExpired: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.user,
        tokenExpired: false
      };
    case TOKEN_EXPIRED:
    case LOGOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
