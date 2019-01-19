import Alias from "model/alias";

const aliasQueries = {
  async aliases(parent, args, ctx, info) {
    const { email, pagination } = args;
    let aliases;

    if (email) {
      aliases = await Alias.getAliasesForEmail(email, pagination);
    } else {
      aliases = await Alias.getAliases(pagination);
    }

    return aliases;
  },
  async aliasesCount() {
    const count = await Alias.getAliasCount();
    return count;
  }
};

export default aliasQueries;
