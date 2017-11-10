import { LOGIN, LOGOUT } from "../actions/authentication";

const initialState = {
  id: 0,
  email: "",
  token: "",
  admin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.user
      };
    case LOGOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
