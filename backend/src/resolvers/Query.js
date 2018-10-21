import Domain from "../model/domain";
import Account from "../model/account";
import TLSPolicy from "../model/tlspolicy";

const Query = {
  async domain(parent, args, ctx, info) {
    const domain = await Domain.getDomain(args.id);
    if (!domain[0]) {
      throw new Error(`Domain not found for id ${args.id}`);
    }

    return domain[0];
  },
  async domains() {
    const domains = await Domain.getDomains();
    return domains;
  },
  async accounts() {
    const accounts = await Account.getAccounts();
    return accounts;
  },
  async tlspolicies() {
    const tlspolicies = await TLSPolicy.getTlsPolicies();
    console.log(tlspolicies);
    return tlspolicies;
  }
};

export default Query;
