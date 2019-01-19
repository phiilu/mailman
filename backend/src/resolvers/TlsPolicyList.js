import isArray from "lodash/isArray";

const TlsPolicyListResolver = {
  count(parent, args, ctx, info) {
    return TlsPolicyListResolver.nodes(parent).length;
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
      total: parent.total || TlsPolicyListResolver.count(parent)
    };
  }
};

export default TlsPolicyListResolver;
