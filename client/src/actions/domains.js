import api from "../services/api";

export const SET_DOMAINS = "SET_DOMAINS";
export const ADD_DOMAIN = "ADD_DOMAIN";
export const REMOVE_DOMAIN = "REMOVE_DOMAIN";

export const setDomains = domains => ({
  type: SET_DOMAINS,
  domains
});

export const addDomain = domain => ({
  type: ADD_DOMAIN,
  domain
});

export const removeDomain = id => ({
  type: REMOVE_DOMAIN,
  id
});

export const getDomains = () => async dispatch => {
  const { domains } = (await api.getDomains()).data;
  dispatch(setDomains(domains));
};

export const saveDomain = data => async dispatch => {
  const { domain } = (await api.saveDomain(data)).data;
  dispatch(addDomain(domain));
};

export const deleteDomain = id => async dispatch => {
  await api.deleteDomain(id);
  dispatch(removeDomain(id));
};
