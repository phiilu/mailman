import { createError } from "apollo-errors";

const DomainNotFoundError = createError("DomainNotFoundError", {
  message: "The Domain could not be found!"
});
const DomainNotCreatedError = createError("DomainNotCreatedError", {
  message: "The Domain could not be created!"
});
const DomainAlreadyExistsError = createError("DomainAlreadyExistsError", {
  message: "The Domain could not be created, because it already exists!"
});
const DomainNotUpdatedError = createError("DomainNotUpdatedError", {
  message: "The Domain could be updated!"
});

export default {
  DomainNotFoundError,
  DomainNotCreatedError,
  DomainAlreadyExistsError,
  DomainNotUpdatedError
};
