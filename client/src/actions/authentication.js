import axios from "axios";
import api from "../services/api";
import { setDomains } from "./domains";

export const SET_TOKEN = "SET_TOKEN";
export const SET_EMAIL = "SET_EMAIL";
export const SET_ADMIN = "SET_ADMIN";
export const LOGOUT = "LOGOUT";

export const setToken = token => ({
  type: SET_TOKEN,
  token
});

export const setEmail = email => ({
  type: SET_EMAIL,
  email
});

export const setAdmin = admin => ({
  type: SET_ADMIN,
  admin
});

export const login = data => async dispatch => {
  const { token, admin } = (await api.login(data)).data;
  localStorage.setItem("token", token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  dispatch(setToken(token));
  dispatch(setAdmin(admin));
  dispatch(setEmail(data.email));

  const { domains } = (await api.getDomains()).data;
  dispatch(setDomains(domains));
};

export const logout = () => dispatch => {
  localStorage.removeItem("token");
  dispatch(setToken(""));
  dispatch(setAdmin(false));
  dispatch(setEmail(""));
};
