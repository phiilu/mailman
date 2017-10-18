import axios from "axios";
import api from "../services/api";

import { setDomains } from "./domains";
import { setAccounts } from "./accounts";
import { setAliases } from "./aliases";
import { setTlsPolicies } from "./tlsPolicies";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const loginAction = user => ({
  type: LOGIN,
  user
});

export const logoutAction = () => ({
  type: LOGOUT
});

export const login = data => async dispatch => {
  const { token, admin } = (await api.login(data)).data;
  localStorage.setItem(
    "user",
    JSON.stringify({ admin, token, email: data.email })
  );
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  dispatch(loginAction({ admin, token, email: data.email }));

  if (admin) {
    const { domains } = (await api.getDomains()).data;
    const { accounts } = (await api.getAccounts()).data;
    const { aliases } = (await api.getAliases()).data;
    const { tlspolicies } = (await api.getTlsPolicies()).data;

    dispatch(setDomains(domains));
    dispatch(setAccounts(accounts));
    dispatch(setAliases(aliases));
    dispatch(setTlsPolicies(tlspolicies));
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("user");
  dispatch(logoutAction());
};
