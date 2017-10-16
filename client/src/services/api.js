import axios from "axios";

export default {
  login(data) {
    return axios.post("/api/auth/authenticate", data);
  },
  getDomains() {
    return axios.get("/api/domains");
  }
};
