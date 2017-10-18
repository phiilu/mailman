import api from "../services/api";

export const SET_TLS_POLICIES = "SET_TLS_POLICIES";

export const setTlsPolicies = tlspolicies => ({
  type: SET_TLS_POLICIES,
  tlspolicies
});

export const getTlsPolicies = () => async dispatch => {
  const { tlspolicies } = (await api.getTlsPolicies()).data;
  dispatch(setTlsPolicies(tlspolicies));
};
