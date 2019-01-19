import Alias from "model/alias";

const aliasQueries = {
  async aliases(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const { email, pagination } = args;
    let aliases;

    if (email) {
      aliases = await Alias.getAliasesForEmail(email, pagination);
    } else {
      aliases = await Alias.getAliases(pagination);
    }

    return aliases;
  },
  async aliasesCount(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const count = await Alias.getAliasCount();
    return count;
  }
};

export default aliasQueries;
