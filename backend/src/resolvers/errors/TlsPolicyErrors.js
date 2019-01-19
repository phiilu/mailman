import { createError } from "apollo-errors";

const TlsPolicyNotFoundError = createError("TlsPolicyNotFoundError", {
  message: "The TlsPolicy could not be found!"
});
const TlsPolicyNotCreatedError = createError("TlsPolicyNotCreatedError", {
  message: "The TlsPolicy could not be created!"
});
const TlsPolicyAlreadyExistsError = createError("TlsPolicyAlreadyExistsError", {
  message: "The TlsPolicy could not be created, because it already exists!"
});
const TlsPolicyNotUpdatedError = createError("TlsPolicyNotUpdatedError", {
  message: "The TlsPolicy could not be updated!"
});
const TlsPolicyValidationError = createError("TlsPolicyValidationError", {
  message: "The provided data was not valid!"
});

export default {
  TlsPolicyNotFoundError,
  TlsPolicyNotCreatedError,
  TlsPolicyAlreadyExistsError,
  TlsPolicyNotUpdatedError,
  TlsPolicyValidationError
};
