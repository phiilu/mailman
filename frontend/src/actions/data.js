import { getDomains } from "./domains";
import { getAccounts } from "./accounts";
import { getAliases } from "./aliases";
import { getTlsPolicies } from "./tlsPolicies";
import { handleRequestError } from "../util";

export const DATA_LOADING_START = "DATA_LOADING_START";
export const DATA_LOADING_END = "DATA_LOADING_END";

export const loading_start = () => ({
  type: DATA_LOADING_START
});

export const loading_end = () => ({
  type: DATA_LOADING_END
});

export const getAll = () => async dispatch => {
  dispatch(loading_start());

  try {
    await dispatch(getDomains());
    await dispatch(getAccounts());
    await dispatch(getAliases());
    await dispatch(getTlsPolicies());
  } catch (error) {
    const response = handleRequestError(error);
    if (response.status !== 401) {
      throw new Error(response.message);
    }
  }

  dispatch(loading_end());
};
