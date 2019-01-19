import Alias from "model/alias";
import AliasErrors from "resolvers/errors/AliasErrors";
import PermissionErrors from "resolvers/errors/PermissionErrors";

const aliasMutations = {
  async createAlias(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const fields = {
      source_username: args.data.sourceUsername,
      source_domain: args.data.sourceDomain,
      destination_username: args.data.destinationUsername,
      destination_domain: args.data.destinationDomain,
      enabled: args.data.enabled
    };

    const [existsAlias] = await Alias.getAlias({
      source_username: fields.source_username,
      source_domain: fields.source_domain
    });
    if (existsAlias) {
      throw new AliasErrors.AliasAlreadyExistsError({
        data: {
          source_username: fields.source_username,
          source_domain: fields.source_domain
        }
      });
    }

    try {
      const [id] = await Alias.createAlias(fields);
      const [alias] = await Alias.getAlias({ id });
      return alias;
    } catch (error) {
      throw new AliasErrors.AliasNotCreatedError();
    }
  },

  async updateAlias(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const fields = {
      source_username: args.data.sourceUsername,
      source_domain: args.data.sourceDomain,
      destination_username: args.data.destinationUsername,
      destination_domain: args.data.destinationDomain,
      enabled: args.data.enabled
    };

    try {
      await Alias.updateAlias(args.id, fields);
      const [alias] = await Alias.getAlias({ id: args.id });
      return alias;
    } catch (error) {
      console.log(error);
      throw new AliasErrors.AliasNotUpdatedError();
    }
  },

  async deleteAlias(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const { id } = args;
    await Alias.deleteAlias(id);

    return "Alias deleted!";
  }
};

export default aliasMutations;
