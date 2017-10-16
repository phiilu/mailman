import { SET_DOMAINS } from "../actions/domains";

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
    default:
      return state;
  }
};
