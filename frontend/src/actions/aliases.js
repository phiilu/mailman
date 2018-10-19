import api from "../services/api";

export const SET_ALIASES = "SET_ALIASES";
export const ADD_ALIAS = "ADD_ALIASES";
export const REMOVE_ALIAS = "REMOVE_ALIASES";
export const SET_ALIAS = "SET_ALIAS";

export const setAliases = aliases => ({
  type: SET_ALIASES,
  aliases
});

export const addAlias = alias => ({
  type: ADD_ALIAS,
  alias
});

export const removeAlias = id => ({
  type: REMOVE_ALIAS,
  id
});

export const setAlias = alias => ({
  type: SET_ALIAS,
  alias
});

export const getAliases = () => async dispatch => {
  const response = await api.getAliases();
  if (response) {
    const { aliases } = response.data;
    dispatch(setAliases(aliases));
  } else {
    // dispatch some error
  }
};

export const deleteAlias = id => async dispatch => {
  await api.deleteAlias(id);
  dispatch(removeAlias(id));
};

export const saveAlias = data => async dispatch => {
  const { alias } = (await api.saveAlias(data)).data;
  dispatch(addAlias(alias));
};

export const updateAlias = (id, data) => async dispatch => {
  const { alias } = (await api.updateAlias(id, data)).data;
  dispatch(setAlias(alias));
};
