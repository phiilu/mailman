import { createError } from "apollo-errors";

const AccountNotFoundError = createError("AccountNotFoundError", {
  message: "The Account could not be found!"
});
const AccountNotCreatedError = createError("AccountNotCreatedError", {
  message: "The Account could not be created!"
});
const AccountAlreadyExistsError = createError("AccountAlreadyExistsError", {
  message: "The Account could not be created, because it already exists!"
});
const AccountNotUpdatedError = createError("AccountNotUpdatedError", {
  message: "The Account could not be updated!"
});
const AccountValidationError = createError("AccountValidationError", {
  message: "The provided data was not valid!"
});

export default {
  AccountNotFoundError,
  AccountNotCreatedError,
  AccountAlreadyExistsError,
  AccountNotUpdatedError,
  AccountValidationError
};
