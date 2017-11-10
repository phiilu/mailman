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
