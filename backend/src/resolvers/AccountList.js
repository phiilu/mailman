const AccountListResolver = {
  count(parent, args, ctx, info) {
    return parent.length;
  },
  async nodes(parent, args, ctx, info) {
    return parent;
  }
};

export default AccountListResolver;
