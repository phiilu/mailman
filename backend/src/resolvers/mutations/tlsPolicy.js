import TlsPolicy from "model/tlspolicy";
import TlsPolicyErrors from "resolvers/errors/TlsPolicyErrors";
import PermissionErrors from "resolvers/errors/PermissionErrors";

const tlsPoliciesMutations = {
  async createTlsPolicy(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const [existsDomain] = await TlsPolicy.getTlsPolicy({
      domain: args.data.domain
    });
    if (existsDomain) {
      throw new TlsPolicyErrors.TlsPolicyAlreadyExistsError();
    }

    try {
      const [id] = await TlsPolicy.createTlsPolicy(args.data);
      const [tlsPolicy] = await TlsPolicy.getTlsPolicy({ id });
      return tlsPolicy;
    } catch (error) {
      throw new TlsPolicyErrors.TlsPolicyNotCreatedError();
    }
  },

  async updateTlsPolicy(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    try {
      await TlsPolicy.updateTlsPolicy(args.id, args.data);
      const [tlsPolicy] = await TlsPolicy.getTlsPolicy({ id: args.id });
      return tlsPolicy;
    } catch (error) {
      throw new TlsPolicyErrors.TlsPolicyNotUpdatedError();
    }
  },

  async deleteTlsPolicy(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const { id } = args;
    await TlsPolicy.deleteTlsPolicy(id);

    return "TlsPolicy deleted!";
  }
};

export default tlsPoliciesMutations;
