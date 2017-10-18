import { SET_DOMAINS } from "../actions/domains";
import { LOGOUT } from "../actions/authentication";

const initialState = {
  domains: [],
  accounts: [],
  aliases: [],
  tlspolicies: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DOMAINS:
      return {
        ...state,
        domains: action.domains
      };
    case LOGOUT: {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
};
