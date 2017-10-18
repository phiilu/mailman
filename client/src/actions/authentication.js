import axios from "axios";
import api from "../services/api";
import { setDomains } from "./domains";

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

  const { domains } = (await api.getDomains()).data;
  dispatch(setDomains(domains));
};

export const logout = () => dispatch => {
  localStorage.removeItem("user");
  dispatch(logoutAction());
};
