import Domain from "model/domain";

const AliasResolver = {
  sourceEmail(parent, args, ctx, info) {
    return `${parent.source_username}@${parent.source_domain}`;
  },
  sourceUsername(parent) {
    return parent.source_username;
  },
  async sourceDomain(parent, args, ctx, info) {
    return parent.source_domain;
  },
  destinationEmail(parent, args, ctx, info) {
    return `${parent.destination_username}@${parent.destination_domain}`;
  },
  destinationUsername(parent) {
    return parent.destination_username;
  },
  destinationDomain(parent) {
    return parent.destination_domain;
  }
};

export default AliasResolver;
