import isArray from "lodash/isArray";

const AliasListResolver = {
  count(parent, args, ctx, info) {
    return AliasListResolver.nodes(parent).length;
  },
  nodes(parent, args, ctx, info) {
    if (isArray(parent)) {
      return parent;
    }
    return parent.data;
  },
  pagination(parent, args, ctx, info) {
    return {
      perPage: parent.per_page || -1,
      currentPage: parent.current_page || -1,
      lastPage: parent.last_page || -1,
      total: parent.total || AliasListResolver.count(parent)
    };
  }
};

export default AliasListResolver;
