import TLSPolicy from "model/tlspolicy";

const tlsPoliciesQueries = {
  async tlsPolicies(parent, args, ctx, info) {
    const tlspolicies = await TLSPolicy.getTlsPolicies(args.pagination);
    return tlspolicies;
  },
  async tlsPoliciesCount() {
    const count = await TLSPolicy.getTlsPolicyCount();
    return count;
  }
};

export default tlsPoliciesQueries;
