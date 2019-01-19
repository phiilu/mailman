import TLSPolicy from "model/tlspolicy";

const tlsPoliciesQueries = {
  async tlsPolicies(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const tlspolicies = await TLSPolicy.getTlsPolicies(args.pagination);
    return tlspolicies;
  },
  async tlsPoliciesCount(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const count = await TLSPolicy.getTlsPolicyCount();
    return count;
  }
};

export default tlsPoliciesQueries;
