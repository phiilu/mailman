import domainMutations from "resolvers/mutations/domain";
import accountMutations from "resolvers/mutations/account";

const Mutation = {
  ...domainMutations,
  ...accountMutations
};

export default Mutation;
