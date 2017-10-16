import api from "../services/api";

export const SET_DOMAINS = "SET_DOMAINS";

export const setDomains = domains => ({
  type: SET_DOMAINS,
  domains
});

export const getDomains = () => async dispatch => {
  const { domains } = (await api.getDomains()).data;
  dispatch(setDomains(domains));
};
