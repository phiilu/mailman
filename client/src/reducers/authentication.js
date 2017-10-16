import { SET_TOKEN, SET_EMAIL, SET_ADMIN } from "../actions/authentication";

const initialState = {
  email: "",
  token: "",
  admin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.email
      };
    case SET_ADMIN:
      return {
        ...state,
        admin: action.admin
      };
    default:
      return state;
  }
};
