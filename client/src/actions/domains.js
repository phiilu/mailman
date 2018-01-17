import api from "../services/api";

export const SET_DOMAINS = "SET_DOMAINS";
export const ADD_DOMAIN = "ADD_DOMAIN";
export const REMOVE_DOMAIN = "REMOVE_DOMAIN";
export const SET_DOMAIN = "SET_DOMAIN";

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

export const setDomain = domain => ({
  type: SET_DOMAIN,
  domain
});

export const getDomains = () => async dispatch => {
  const response = await api.getDomains();
  if (response) {
    const { domains } = response.data;
    dispatch(setDomains(domains));
  } else {
    // dispatch some error
    throw new Error("Fetch failed");
  }
};

export const saveDomain = data => async dispatch => {
  const { domain } = (await api.saveDomain(data)).data;
  dispatch(addDomain(domain));
};

export const deleteDomain = id => async dispatch => {
  await api.deleteDomain(id);
  dispatch(removeDomain(id));
};

export const updateDomain = (id, data) => async dispatch => {
  const { domain } = (await api.updateDomain(id, data)).data;
  dispatch(setDomain(domain));
};
