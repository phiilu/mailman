import Domain from "model/domain";

const AccountResolver = {
  email(parent, args, ctx, info) {
    return `${parent.username}@${parent.domain}`;
  },
  async domain(parent, args, ctx, info) {
    const domain = (await Domain.getDomainForEmail(
      `${parent.username}@${parent.domain}`
    ))[0];
    return domain;
  }
};

export default AccountResolver;
