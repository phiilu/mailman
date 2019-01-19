import domainMutations from "resolvers/mutations/domain";
import accountMutations from "resolvers/mutations/account";
import aliasMutations from "resolvers/mutations/alias";
import tlsPolicyMutations from "resolvers/mutations/tlsPolicy";

const Mutation = {
  ...domainMutations,
  ...accountMutations,
  ...aliasMutations,
  ...tlsPolicyMutations
};

export default Mutation;
