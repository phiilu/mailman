import { createError } from "apollo-errors";

const AliasNotFoundError = createError("AliasNotFoundError", {
  message: "The Alias could not be found!"
});
const AliasNotCreatedError = createError("AliasNotCreatedError", {
  message: "The Alias could not be created!"
});
const AliasAlreadyExistsError = createError("AliasAlreadyExistsError", {
  message: "The Alias could not be created, because it already exists!"
});
const AliasNotUpdatedError = createError("AliasNotUpdatedError", {
  message: "The Alias could not be updated!"
});
const AliasValidationError = createError("AliasValidationError", {
  message: "The provided data was not valid!"
});

export default {
  AliasNotFoundError,
  AliasNotCreatedError,
  AliasAlreadyExistsError,
  AliasNotUpdatedError,
  AliasValidationError
};
