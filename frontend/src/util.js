import axios from "axios";
import { toast } from "react-toastify";

import store from "./store";
import { tokenExpired } from "./actions/authentication";

export const handleRequestError = error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      status: error.response.status,
      message: error.response.data.message || "Something went wrong",
      headers: error.response.headers
    };
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return {
      status: 500,
      message: "The API server did not respond"
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      status: 500,
      message: error.message
    };
  }
};

export const setupAxiosInterceptors = () => {
  const base = process.env.REACT_APP_BASENAME;
  if (base.endsWith("/")) {
    axios.defaults.baseURL = base.slice(0, -1);
  } else {
    axios.defaults.baseURL = base;
  }
  axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      const data = error.response.data;
      if (
        error.response.status === 401 &&
        data &&
        data.error === "jwt expired"
      ) {
        store.dispatch(tokenExpired());
        toast.warn("Your session has expired. Login again!");
      }
      return Promise.reject(error);
    }
  );
};

export const getParams = query => {
  if (!query) {
    return {};
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split("&")
    .reduce((params, param) => {
      let [key, value] = param.split("=");
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
      return params;
    }, {});
};
