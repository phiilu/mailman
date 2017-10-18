import axios from "axios";

export default {
  login(data) {
    return axios.post("/api/auth/authenticate", data);
  },
  getDomains() {
    return axios.get("/api/domains");
  },
  getAccounts() {
    return axios.get("/api/accounts");
  },
  getAliases() {
    return axios.get("/api/aliases");
  },
  getTlsPolicies() {
    return axios.get("/api/tlspolicies");
  },
  saveDomain(data) {
    return axios.post("/api/domains", data);
  },
  deleteDomain(id) {
    return axios.delete(`/api/domains/${id}`);
  }
};
