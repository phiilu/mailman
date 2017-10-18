import api from "../services/api";

export const SET_ALIASES = "SET_ALIASES";

export const setAliases = aliases => ({
  type: SET_ALIASES,
  aliases
});

export const getAliases = () => async dispatch => {
  const { aliases } = (await api.getAliases()).data;
  dispatch(setAliases(aliases));
};
