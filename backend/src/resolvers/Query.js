import Domain from "../model/domain";
import Account from "../model/account";
import Alias from "../model/alias";
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
  async domainCount() {
    const count = await Domain.getDomainCount();
    return count;
  },
  async accounts(parent, args, ctx, info) {
    const { domain } = args;
    let accounts;

    if (domain) {
      accounts = await Account.getAccountsByDomain(domain);
    } else {
      accounts = await Account.getAccounts();
    }

    return accounts;
  },
  async accountsCount() {
    const count = await Account.getAccountCount();
    return count;
  },
  async aliases(parent, args, ctx, info) {
    const { email } = args;
    let aliases;

    if (email) {
      aliases = await Alias.getAliasesForEmail(email);
    } else {
      aliases = await Alias.getAliases();
    }

    return aliases;
  },
  async aliasesCount() {
    const count = await Alias.getAliasCount();
    return count;
  },
  async tlspolicies() {
    const tlspolicies = await TLSPolicy.getTlsPolicies();
    console.log(tlspolicies);
    return tlspolicies;
  },
  async tlspoliciesCount() {
    const count = await TLSPolicy.getTlsPolicyCount();
    return count;
  }
};

export default Query;
