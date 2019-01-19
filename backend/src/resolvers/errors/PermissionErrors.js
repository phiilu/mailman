import { createError } from "apollo-errors";

const PermissionInsufficient = createError("PermissionInsufficient", {
  message: "You don't have enough permission to perform this action!"
});

export default {
  PermissionInsufficient
};
