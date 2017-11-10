import api from "../services/api";

export const SET_TLS_POLICIES = "SET_TLS_POLICIES";
export const ADD_TLS_POLICY = "ADD_TLS_POLICY";
export const REMOVE_TLS_POLICY = "REMOVE_TLS_POLICY";
export const SET_TLS_POLICY = "SET_TLS_POLICY";

export const setTlsPolicies = tlspolicies => ({
  type: SET_TLS_POLICIES,
  tlspolicies
});

export const addTlsPolicy = tlspolicy => ({
  type: ADD_TLS_POLICY,
  tlspolicy
});

export const removeTlsPolicy = id => ({
  type: REMOVE_TLS_POLICY,
  id
});

export const setTlsPolicy = tlspolicy => ({
  type: SET_TLS_POLICY,
  tlspolicy
});

export const getTlsPolicies = () => async dispatch => {
  const { tlspolicies } = (await api.getTlsPolicies()).data;
  dispatch(setTlsPolicies(tlspolicies));
};

export const saveTlsPolicy = data => async dispatch => {
  const { tlspolicy } = (await api.saveTlsPolicy(data)).data;
  dispatch(addTlsPolicy(tlspolicy));
};

export const deleteTlsPolicy = id => async dispatch => {
  await api.deleteTlsPolicy(id);
  dispatch(removeTlsPolicy(id));
};

export const updateTlsPolicy = (id, data) => async dispatch => {
  const { tlspolicy } = (await api.updateTlsPolicy(id, data)).data;
  dispatch(setTlsPolicy(tlspolicy));
};
