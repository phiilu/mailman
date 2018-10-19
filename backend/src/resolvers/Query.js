import Domain from "../model/domain";
import Account from "../model/account";
import TLSPolicy from "../model/tlspolicy";

const Query = {
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
