import api from "../services/api";

export const SET_ACCOUNTS = "SET_ACCOUNTS";

export const setAccounts = accounts => ({
  type: SET_ACCOUNTS,
  accounts
});

export const getAccounts = () => async dispatch => {
  const { accounts } = (await api.getAccounts()).data;
  dispatch(setAccounts(accounts));
};
