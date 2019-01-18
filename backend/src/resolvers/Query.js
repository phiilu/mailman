import Domain from "../model/domain";
import Account from "../model/account";
import Alias from "../model/alias";
import TLSPolicy from "../model/tlspolicy";

import DomainErrors from "./errors/DomainErrors";

const Query = {
  async domain(parent, args, ctx, info) {
    const [domain] = await Domain.getDomain({ id: args.id });
    if (!domain) {
      throw new DomainErrors.DomainNotFoundError({ data: { id: args.id } });
    }

    return domain;
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
  async tlsPolicies() {
    const tlspolicies = await TLSPolicy.getTlsPolicies();
    return tlspolicies;
  },
  async tlsPoliciesCount() {
    const count = await TLSPolicy.getTlsPolicyCount();
    return count;
  }
};

export default Query;
