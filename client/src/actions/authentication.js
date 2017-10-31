import axios from "axios";

import api from "../services/api";
import { getAll } from "./data";

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
  const { token, admin, id } = (await api.login(data)).data;
  localStorage.setItem(
    "user",
    JSON.stringify({ admin, token, email: data.email, id })
  );
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  dispatch(loginAction({ admin, token, email: data.email, id }));
  dispatch(getAll());
};

export const logout = () => dispatch => {
  localStorage.removeItem("user");
  dispatch(logoutAction());
};
