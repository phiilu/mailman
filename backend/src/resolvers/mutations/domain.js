import Domain from "model/domain";

import DomainErrors from "resolvers/errors/DomainErrors";
import PermissionErrors from "resolvers/errors/PermissionErrors";

const domainMutations = {
  async createDomain(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const { domain } = args.data;

    const [domainExists] = await Domain.getDomain({ domain });
    if (domainExists) {
      throw new DomainErrors.DomainAlreadyExistsError();
    }

    try {
      const [id] = await Domain.createDomain(domain);
      return (await Domain.getDomain({ id }))[0];
    } catch (error) {
      throw new DomainErrors.DomainNotCreatedError({
        data: { domain, statusCode: 422 }
      });
    }
  },
  async updateDomain(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const {
      id,
      data: { domain }
    } = args;

    try {
      const [newId] = await Domain.updateDomain(id, domain);
      return (await Domain.getDomain({ id: newId }))[0];
    } catch (error) {
      console.log(error);
      throw new DomainErrors.DomainNotUpdatedError({
        data: { id, domain, statusCode: 422 }
      });
    }
  },
  async deleteDomain(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const { id } = args;
    await Domain.deleteDomain(id);

    return "Domain deleted!";
  }
};

export default domainMutations;
