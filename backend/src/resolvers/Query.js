import domainQueries from "resolvers/queries/domain";
import accountQueries from "resolvers/queries/account";
import aliasQueries from "resolvers/queries/alias";
import tlsPoliciesQueries from "resolvers/queries/tlsPolicy";

const Query = {
  ...domainQueries,
  ...accountQueries,
  ...aliasQueries,
  ...tlsPoliciesQueries
};

export default Query;
