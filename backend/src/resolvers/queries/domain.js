import Domain from "model/domain";
import DomainErrors from "resolvers/errors/DomainErrors";

const domainQueries = {
  async domain(parent, args, ctx, info) {
    const [domain] = await Domain.getDomain({ id: args.id });
    if (!domain) {
      throw new DomainErrors.DomainNotFoundError({ data: { id: args.id } });
    }

    return domain;
  },
  async domains(parent, args, ctx, info) {
    const domains = await Domain.getDomains(args.pagination);
    return domains;
  },
  async domainCount() {
    const count = await Domain.getDomainCount();
    return count;
  }
};

export default domainQueries;
