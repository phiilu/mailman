import axios from "axios";

export default {
  login(data) {
    return axios.post("/api/auth/authenticate", data);
  },
  getDomains() {
    return axios.get("/api/domains");
  },
  saveDomain(data) {
    return axios.post("/api/domains", data);
  },
  deleteDomain(id) {
    return axios.delete(`/api/domains/${id}`);
  },
  updateDomain(id, data) {
    return axios.put(`/api/domains/${id}`, data);
  },
  saveAccount(data) {
    return axios.post("/api/accounts", data);
  },
  deleteAccount(id) {
    return axios.delete(`/api/accounts/${id}`);
  },
  updateAccount(id, data) {
    return axios.put(`/api/accounts/${id}`, data);
  },
  getAccounts() {
    return axios.get("/api/accounts");
  },
  getAliases() {
    return axios.get("/api/aliases");
  },
  deleteAlias(id) {
    return axios.delete(`/api/aliases/${id}`);
  },
  saveAlias(data) {
    return axios.post("/api/aliases", data);
  },
  updateAlias(id, data) {
    return axios.put(`/api/aliases/${id}`, data);
  },
  getTlsPolicies() {
    return axios.get("/api/tlspolicies");
  },
  deleteTlsPolicy(id) {
    return axios.delete(`/api/tlspolicies/${id}`);
  },
  saveTlsPolicy(data) {
    return axios.post("/api/tlspolicies", data);
  },
  updateTlsPolicy(id, data) {
    return axios.put(`/api/tlspolicies/${id}`, data);
  }
};
