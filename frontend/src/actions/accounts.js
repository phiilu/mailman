import api from "../services/api";

export const SET_ACCOUNTS = "SET_ACCOUNTS";
export const ADD_ACCOUNT = "ADD_ACCOUNT";
export const REMOVE_ACCOUNT = "REMOVE_ACCOUNT";
export const SET_ACCOUNT = "SET_ACCOUNT";

export const setAccounts = accounts => ({
  type: SET_ACCOUNTS,
  accounts
});

export const addAccount = account => ({
  type: ADD_ACCOUNT,
  account
});

export const removeAccount = id => ({
  type: REMOVE_ACCOUNT,
  id
});

export const setAccount = account => ({
  type: SET_ACCOUNT,
  account
});

export const getAccounts = () => async dispatch => {
  const response = await api.getAccounts();
  if (response) {
    const { accounts } = response.data;
    dispatch(setAccounts(accounts));
  } else {
    // dispatch some error
  }
};

export const saveAccount = data => async dispatch => {
  const { account } = (await api.saveAccount(data)).data;
  dispatch(addAccount(account));
};

export const deleteAccount = id => async dispatch => {
  await api.deleteAccount(id);
  dispatch(removeAccount(id));
};

export const updateAccount = (id, data) => async dispatch => {
  const { account } = (await api.updateAccount(id, data)).data;
  dispatch(setAccount(account));
};

export const updateAccountPassword = (id, data) => async dispatch => {
  await api.updateAccountPassword(id, data);
};
