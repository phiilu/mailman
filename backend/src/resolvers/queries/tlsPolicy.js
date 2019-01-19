import TLSPolicy from "model/tlspolicy";

const tlsPoliciesQueries = {
  async tlsPolicies() {
    const tlspolicies = await TLSPolicy.getTlsPolicies();
    return tlspolicies;
  },
  async tlsPoliciesCount() {
    const count = await TLSPolicy.getTlsPolicyCount();
    return count;
  }
};

export default tlsPoliciesQueries;
