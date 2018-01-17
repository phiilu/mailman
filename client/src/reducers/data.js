import {
  SET_DOMAINS,
  ADD_DOMAIN,
  REMOVE_DOMAIN,
  SET_DOMAIN
} from "../actions/domains";
import {
  SET_ACCOUNTS,
  ADD_ACCOUNT,
  REMOVE_ACCOUNT,
  SET_ACCOUNT
} from "../actions/accounts";
import {
  SET_ALIASES,
  ADD_ALIAS,
  REMOVE_ALIAS,
  SET_ALIAS
} from "../actions/aliases";
import {
  SET_TLS_POLICIES,
  ADD_TLS_POLICY,
  REMOVE_TLS_POLICY,
  SET_TLS_POLICY
} from "../actions/tlsPolicies";

import { DATA_LOADING_START, DATA_LOADING_END } from "../actions/data";

import { LOGOUT, TOKEN_EXPIRED } from "../actions/authentication";

const initialState = {
  domains: [],
  accounts: [],
  aliases: [],
  tlspolicies: [],
  loading: false,
  dataLoaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DOMAIN:
      return {
        ...state,
        domains: [
          ...state.domains,
          {
            ...action.domain
          }
        ]
      };
    case SET_DOMAIN:
      return {
        ...state,
        domains: state.domains.map(domain => {
          if (domain.id === action.domain.id) {
            return action.domain;
          }
          return domain;
        })
      };
    case REMOVE_DOMAIN:
      return {
        ...state,
        domains: state.domains.filter(d => d.id !== action.id)
      };
    case SET_DOMAINS:
      return {
        ...state,
        domains: action.domains
      };
    case SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.accounts
      };
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [
          ...state.accounts,
          {
            ...action.account
          }
        ]
      };
    case REMOVE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(d => d.id !== action.id)
      };
    case SET_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map(account => {
          if (account.id === action.account.id) {
            return action.account;
          }
          return account;
        })
      };
    case SET_ALIASES:
      return {
        ...state,
        aliases: action.aliases
      };
    case ADD_ALIAS:
      return {
        ...state,
        aliases: [
          ...state.aliases,
          {
            ...action.alias
          }
        ]
      };
    case REMOVE_ALIAS:
      return {
        ...state,
        aliases: state.aliases.filter(a => a.id !== action.id)
      };
    case SET_ALIAS:
      return {
        ...state,
        aliases: state.aliases.map(alias => {
          if (alias.id === action.alias.id) {
            return action.alias;
          }
          return alias;
        })
      };
    case SET_TLS_POLICIES:
      return {
        ...state,
        tlspolicies: action.tlspolicies
      };
    case ADD_TLS_POLICY:
      return {
        ...state,
        tlspolicies: [
          ...state.tlspolicies,
          {
            ...action.tlspolicy
          }
        ]
      };
    case REMOVE_TLS_POLICY:
      return {
        ...state,
        tlspolicies: state.tlspolicies.filter(a => a.id !== action.id)
      };
    case SET_TLS_POLICY:
      return {
        ...state,
        tlspolicies: state.tlspolicies.map(tlspolicy => {
          if (tlspolicy.id === action.tlspolicy.id) {
            return action.tlspolicy;
          }
          return tlspolicy;
        })
      };
    case TOKEN_EXPIRED:
    case LOGOUT:
      return {
        ...initialState
      };
    case DATA_LOADING_START:
      return {
        ...state,
        loading: true
      };
    case DATA_LOADING_END:
      return {
        ...state,
        loading: false,
        dataLoaded: true
      };
    default:
      return state;
  }
};
